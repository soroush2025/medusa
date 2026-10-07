import { useContext } from "react"
import { DisplayUnitContext } from "./display-unit-context"

export const useDisplayUnits = () => {
  const context = useContext(DisplayUnitContext)

  if (!context) {
    throw new Error("useDisplayUnits must be used within a DisplayUnitProvider")
  }

  return context
}
