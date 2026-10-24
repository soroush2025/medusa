import { Text } from "@medusajs/ui"
import { useTranslation } from "react-i18next"
import { useDisplayUnits } from "../../../providers/display-unit-provider"

/**
 * CSV files always carry stored amounts (for example Rials for IRR). While a
 * display unit is active, remind the user so a Toman number is not typed into a
 * Rial column.
 */
export const CsvStoredUnitsHint = () => {
  const { t } = useTranslation()
  const { enabled } = useDisplayUnits()

  if (!enabled) {
    return null
  }

  return (
    <Text size="small" className="text-ui-fg-subtle mt-4">
      {t("general.csvStoredUnitsHint")}
    </Text>
  )
}
