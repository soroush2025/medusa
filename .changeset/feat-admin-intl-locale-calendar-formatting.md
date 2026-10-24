---
"@medusajs/dashboard": patch
"@medusajs/ui": patch
---

feat(dashboard): add an optional `intl_locale` to admin languages and use it for dates, numbers and the date pickers. Persian (`fa`) now renders Jalali dates and Persian digits.

fix(ui): mark today in the Calendar for calendars other than the Gregorian one, such as the Persian calendar.
