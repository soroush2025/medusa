---
"@medusajs/ui": patch
---

fix(ui): use logical Tailwind properties and provide the locale direction to Radix primitives so components render correctly in right-to-left languages

Notes for consumers:

- Radix's `Direction.Provider` sets no `dir` attribute on the DOM, and Tailwind's `rtl:` variant matches ancestors, so a `dir="ltr"` island inside an RTL page must not contain components that use plain `rtl:` classes. The `Switch` thumb and the `Drawer` slide animation use the `[&:dir(rtl)]:` variant for that reason, so they follow the element's own direction. `:dir()` is supported in Chrome 120+, Safari 16.4+ and Firefox 49+.
- After the logical sweep, tailwind-merge no longer collapses the ui logical defaults with axis shorthands passed by consumers (`twMerge("ps-0 pe-6", "px-4")` keeps all three classes, so the default wins by CSS order). Consumers that override ui defaults with `px-*`, `mx-*`, `inset-x-*` or `border-x` should use `ps-`/`pe-`, `ms-`/`me-`, `start-`/`end-` and `border-s`/`border-e` instead.
