import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Select, toast } from "@medusajs/ui"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import * as zod from "zod"

import { HttpTypes } from "@medusajs/types"
import { Form } from "../../../../../components/common/form"
import { SwitchBox } from "../../../../../components/common/switch-box"
import { RouteDrawer, useRouteModal } from "../../../../../components/modals"
import { KeyboundForm } from "../../../../../components/utilities/keybound-form"
import { useStore } from "../../../../../hooks/api/store"
import { useUpdateUser } from "../../../../../hooks/api/users"
import { languages } from "../../../../../i18n/languages"
import { getCurrencyDisplayUnit } from "../../../../../lib/data/currency-display-units"
import {
  isLatinDigitsEnabled,
  setLatinDigitsEnabled,
} from "../../../../../lib/format-locale"
import { useDisplayUnits } from "../../../../../providers/display-unit-provider"

type EditProfileProps = {
  user: HttpTypes.AdminUser
  // usageInsights: boolean
}

const EditProfileSchema = zod.object({
  first_name: zod.string().optional(),
  last_name: zod.string().optional(),
  language: zod.string(),
  display_units: zod.boolean(),
  latin_digits: zod.boolean(),
  // usage_insights: zod.boolean(),
})

export const EditProfileForm = ({ user }: EditProfileProps) => {
  const { t, i18n } = useTranslation()
  const { handleSuccess } = useRouteModal()
  const { enabled: displayUnitsEnabled, setEnabled: setDisplayUnits } =
    useDisplayUnits()
  const { store } = useStore()

  // The preference only matters to stores that sell in a currency with an
  // alternative display unit (for example IRR with Toman).
  const hasDisplayUnitCurrency = !!store?.supported_currencies?.some(
    (currency) => !!getCurrencyDisplayUnit(currency.currency_code)
  )

  const form = useForm<zod.infer<typeof EditProfileSchema>>({
    defaultValues: {
      first_name: user.first_name ?? "",
      last_name: user.last_name ?? "",
      language: i18n.language,
      display_units: displayUnitsEnabled,
      latin_digits: isLatinDigitsEnabled(),
      // usage_insights: usageInsights,
    },
    resolver: zodResolver(EditProfileSchema),
  })

  // The toggle is only meaningful for languages that use digits of their own.
  const selectedLanguage = form.watch("language")
  const hasOwnDigits = Boolean(
    languages.find((language) => language.code === selectedLanguage)
      ?.intl_locale
  )

  const changeLanguage = async (code: string) => {
    await i18n.changeLanguage(code)
  }

  const sortedLanguages = languages.sort((a, b) =>
    a.display_name.localeCompare(b.display_name)
  )

  const { mutateAsync, isPending } = useUpdateUser(user.id!)

  const handleSubmit = form.handleSubmit(async (values) => {
    await mutateAsync(
      {
        first_name: values.first_name,
        last_name: values.last_name,
      },
      {
        onError: (error) => {
          toast.error(error.message)
          return
        },
      }
    )

    setLatinDigitsEnabled(values.latin_digits)

    await changeLanguage(values.language)

    toast.success(t("profile.toast.edit"))
    handleSuccess()

    // The provider remounts its subtree when the preference changes. handleSuccess
    // navigates in a setTimeout(0), so apply the preference in a later timer, after
    // the drawer has closed and the route has changed.
    setTimeout(() => {
      setDisplayUnits(values.display_units)
    }, 0)
  })

  return (
    <RouteDrawer.Form form={form}>
      <KeyboundForm onSubmit={handleSubmit} className="flex flex-1 flex-col">
        <RouteDrawer.Body>
          <div className="flex flex-col gap-y-8">
            <div className="grid grid-cols-2 gap-4">
              <Form.Field
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label>{t("fields.firstName")}</Form.Label>
                    <Form.Control>
                      <Input {...field} />
                    </Form.Control>
                    <Form.ErrorMessage />
                  </Form.Item>
                )}
              />
              <Form.Field
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label>{t("fields.lastName")}</Form.Label>
                    <Form.Control>
                      <Input {...field} />
                    </Form.Control>
                    <Form.ErrorMessage />
                  </Form.Item>
                )}
              />
            </div>
            <Form.Field
              control={form.control}
              name="language"
              render={({ field: { ref, ...field } }) => (
                <Form.Item className="gap-y-4">
                  <div>
                    <Form.Label>{t("profile.fields.languageLabel")}</Form.Label>
                    <Form.Hint>{t("profile.edit.languageHint")}</Form.Hint>
                  </div>
                  <div>
                    <Form.Control>
                      <Select {...field} onValueChange={field.onChange}>
                        <Select.Trigger ref={ref} className="py-1 text-[13px]">
                          <Select.Value
                            placeholder={t("profile.edit.languagePlaceholder")}
                          >
                            {
                              sortedLanguages.find(
                                (language) => language.code === field.value
                              )?.display_name
                            }
                          </Select.Value>
                        </Select.Trigger>
                        <Select.Content>
                          {languages.map((language) => (
                            <Select.Item
                              key={language.code}
                              value={language.code}
                            >
                              {language.display_name}
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select>
                    </Form.Control>
                    <Form.ErrorMessage />
                  </div>
                </Form.Item>
              )}
            />
            {hasOwnDigits && (
              <SwitchBox
                control={form.control}
                name="latin_digits"
                label={t("profile.fields.latinDigitsLabel")}
                description={t("profile.edit.latinDigitsHint")}
              />
            )}
            {hasDisplayUnitCurrency && (
              <SwitchBox
                control={form.control}
                name="display_units"
                label={t("profile.fields.currencyDisplayUnitLabel")}
                description={t("profile.edit.currencyDisplayUnitHint")}
              />
            )}
            {/* TODO: Do we want to implement usage insights in V2? */}
            {/* <Form.Field
              control={form.control}
              name="usage_insights"
              render={({ field: { value, onChange, ...rest } }) => (
                <Form.Item>
                  <div className="flex items-center justify-between">
                    <Form.Label>
                      {t("profile.fields.usageInsightsLabel")}
                    </Form.Label>
                    <Form.Control>
                      <Switch dir="ltr"
                        className="rtl:rotate-180"
                        {...rest}
                        checked={value}
                        onCheckedChange={onChange}
                      />
                    </Form.Control>
                  </div>
                  <Form.Hint>
                    <span>
                      <Trans
                        i18nKey="profile.edit.usageInsightsHint"
                        components={[
                          <a
                            key="hint-link"
                            className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover transition-fg underline"
                            href="https://docs.medusajs.com/resources/usage#admin-analytics"
                            target="_blank"
                            rel="noopener noreferrer"
                          />,
                        ]}
                      />
                    </span>
                  </Form.Hint>
                  <Form.ErrorMessage />
                </Form.Item>
              )}
            /> */}
          </div>
        </RouteDrawer.Body>
        <RouteDrawer.Footer>
          <div className="flex items-center gap-x-2">
            <RouteDrawer.Close asChild>
              <Button size="small" variant="secondary">
                {t("actions.cancel")}
              </Button>
            </RouteDrawer.Close>
            <Button size="small" type="submit" isLoading={isPending}>
              {t("actions.save")}
            </Button>
          </div>
        </RouteDrawer.Footer>
      </KeyboundForm>
    </RouteDrawer.Form>
  )
}
