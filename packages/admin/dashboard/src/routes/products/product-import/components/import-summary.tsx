import { HttpTypes } from "@medusajs/types"
import { Divider, Text } from "@medusajs/ui"
import { useTranslation } from "react-i18next"
import { getIntlLocale } from "../../../../lib/format-locale"

export const ImportSummary = ({
  summary,
}: {
  summary: HttpTypes.AdminImportProductResponse["summary"]
}) => {
  const { t } = useTranslation()

  return (
    <div className="shadow-elevation-card-rest bg-ui-bg-component transition-fg flex flex-row rounded-md px-3 py-2">
      <Stat
        title={summary.toCreate.toLocaleString(getIntlLocale())}
        description={t("products.import.upload.productsToCreate")}
      />
      <Divider orientation="vertical" className="h-10 px-3" />
      <Stat
        title={summary.toUpdate.toLocaleString(getIntlLocale())}
        description={t("products.import.upload.productsToUpdate")}
      />
    </div>
  )
}

const Stat = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <Text size="xlarge" className="font-sans font-medium">
        {title}
      </Text>

      <Text
        leading="compact"
        size="xsmall"
        weight="plus"
        className="text-ui-fg-subtle"
      >
        {description}
      </Text>
    </div>
  )
}
