import {
  Fragment,
  PropsWithChildren,
  useMemo,
  useSyncExternalStore,
} from "react"
import { DisplayUnitContext } from "./display-unit-context"
import {
  isDisplayUnitsEnabled,
  setDisplayUnitsEnabled,
  subscribeDisplayUnits,
} from "./display-unit-store"

/**
 * Keeps React in sync with the display-unit store.
 *
 * The money helpers are plain functions that read the store while rendering, so
 * React has no way to know that their output changed. When the preference
 * changes the subtree is remounted (a changed key), which re-runs every helper
 * call. The preference is changed from the profile drawer, so the remount is not
 * visible. Providers that must keep their state (query cache, theme, toaster)
 * are mounted outside this one.
 */
export const DisplayUnitProvider = ({ children }: PropsWithChildren) => {
  const enabled = useSyncExternalStore(
    subscribeDisplayUnits,
    isDisplayUnitsEnabled,
    () => false
  )

  const value = useMemo(
    () => ({ enabled, setEnabled: setDisplayUnitsEnabled }),
    [enabled]
  )

  return (
    <DisplayUnitContext.Provider value={value}>
      <Fragment key={enabled ? "display-units-on" : "display-units-off"}>
        {children}
      </Fragment>
    </DisplayUnitContext.Provider>
  )
}
