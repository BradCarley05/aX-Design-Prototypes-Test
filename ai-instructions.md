# AI Instructions
This file mirrors Claude's local memory for this project. It is not auto-loaded by Claude but is kept in sync with memory manually.

---

## Icons (feedback)
Never use lucide-react icons. Always use icon font classes via `<i className="icon-*" />` from the aXcelerate icon font.

**Why:** The project uses a custom aXcelerate icon font served from CDN. Lucide-react adds an external dependency and is inconsistent with the design system.

**How to apply:** Any time an icon is needed, use `<i className="icon-name-here" />`. Do not import from lucide-react. Check the blacklist before using any icon. Whitelisted icons are always allowed even if they fall in a blacklisted range.

Only use icon names that are confirmed to exist in the font — do not guess icon names. Refer to icons already used in the codebase (e.g. `icon-edit-outline`, `icon-calendar-outline`, `icon-unit-add`, `icon-arrow-right-short`) or ask the user to confirm the name. Using an invalid icon name renders nothing silently.

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

## Prototype Registration (rule)
Every new prototype must be added to the `PROTOTYPE_ITEMS` array in `App.tsx` so it appears as a menu item in the Prototypes tab of the sidebar.

**Format:** `['route-id', 'Display Name', 'icon-class-name']`

The route-id must match the `activeNav` string used to render the prototype. Name the menu item in plain english, e.g. `LoginPage.tsx` becomes `'Login Page'`.

**Why:** The Prototypes tab in the sidebar is driven by this array. If a prototype is not added here it will not appear in the navigation.

---

## Prototype Layout (rule)
All new prototypes must render as a full page using the early-return pattern, not as a panel inside the main layout. Follow the existing `supervisor-checklist` pattern exactly:

```tsx
if (activeNav === 'your-prototype-id') {
  return (
    <TooltipProvider>
      <div style={{ position: 'fixed', inset: 0, zIndex: 100 }}>
        <YourPrototypeComponent />
      </div>
      <button
        onClick={() => setActiveNav('buttons')}
        style={{
          position: 'fixed', top: 12, right: 12, zIndex: 200,
          background: 'rgba(0,0,0,0.5)', color: 'white',
          border: 'none', borderRadius: 6, padding: '6px 12px',
          cursor: 'pointer', fontSize: 13, fontWeight: 500,
        }}
      >
        ✕ Close demo
      </button>
    </TooltipProvider>
  )
}
```

**Why:** Prototypes are full page designs built to a specific viewport size. Rendering them inside the component library layout breaks the design and adds unwanted chrome around them.

---

## Prototype Viewport (rule)
All prototypes must be built to a mobile viewport of **376px wide by 750px high**.

**Why:** Prototypes represent mobile UI designs. Building to this size ensures they render correctly and match the Figma designs they are based on.

**How to apply:** Wrap the prototype content in a container constrained to these dimensions, centred on the screen if viewed on a larger display.

---

## ai-instructions.md sync (feedback)
Whenever memory is added or updated for this project, also update `ai-instructions.md` at the project root to mirror the current memory content.

**Why:** The user wants a version-controllable, human-readable copy of Claude's memory that lives in the repo.
