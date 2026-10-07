import { createContext } from "react"

export type DisplayUnitContextValue = {
  enabled: boolean
  setEnabled: (enabled: boolean) => void
}

export const DisplayUnitContext = createContext<DisplayUnitContextValue | null>(
  null
)
