# AI Instructions

This file mirrors Claude's local memory for this project. It is not auto-loaded by Claude but is kept in sync with memory manually.

---

## Icons (feedback)

Never use lucide-react icons. Always use icon font classes via `<i className="icon-*" />` from the aXcelerate icon font.

**Why:** The project uses a custom aXcelerate icon font served from CDN. Lucide-react adds an external dependency and is inconsistent with the design system.

**How to apply:** Any time an icon is needed, use `<i className="icon-name-here" />`. Do not import from lucide-react. Check the blacklist before using any icon. Whitelisted icons are always allowed even if they fall in a blacklisted range.

### Blacklist

The following Unicode code point ranges are blacklisted and must not be used:

- `e901` – `e90f`
- `e914` – `ea68`

### Whitelist

Icons added here are always allowed, even if they fall within a blacklisted range. This list will grow over time.

*(empty — will be built over time)*

---

## aXcelerate Icon Font (reference)

Icon font is loaded from: `https://cdn.axcelerate.com.au/iconfont/ax-icon/style.css?v=1.62`

Imported in `src/index.css` line 2. Icons are used as `<i className="icon-*" />` or `<i className="ax-icon icon-*" />` depending on context.

---

## CSS Design Tokens (feedback)

When the user provides specific CSS values (colours, spacing, radii, shadows, etc.), look up and use the equivalent token from `design-tokens.css` rather than hardcoding the raw value.

**Why:** The project uses a design token system. Raw values bypass the token layer and make the codebase harder to maintain and theme.

**How to apply:** Before writing any CSS value the user has specified, search `design-tokens.css` for the matching token and use `var(--token-name)` instead.

---

## Avoid Inline Styles (feedback)

Do not use inline `style={{}}` props. If a style change is needed, prompt the user to update the relevant component CSS class or add/update a design token.

**Why:** Inline styles bypass the design system, are hard to maintain, and can't be themed or overridden cleanly.

**How to apply:** If a visual change is requested that would normally result in an inline style, stop and ask whether to update the component's CSS class in `components.css` or add a new token to `design-tokens.css`.

---

## ai-instructions.md sync (feedback)

Whenever memory is added or updated for this project, also update `ai-instructions.md` at the project root to mirror the current memory content.

**Why:** The user wants a version-controllable, human-readable copy of Claude's memory that lives in the repo.
