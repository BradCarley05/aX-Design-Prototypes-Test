# ax-design-prototypes

## Adding new prototypes

All new prototypes must be added to `src/PrototypesApp.tsx` — never to `src/App.tsx`.

### Steps to add a prototype

1. Create the prototype component in `src/components/ui/` or `src/pages/`.

2. Import it in `src/PrototypesApp.tsx`:
   ```tsx
   import { MyPrototype } from './components/ui/my-prototype'
   ```

3. Add a nav item to the `PROTOTYPE_ITEMS` array:
   ```tsx
   { id: 'my-prototype', label: 'My Prototype', icon: 'icon-xxx' }
   ```

4. Add a case to `renderPrototype()`:
   ```tsx
   case 'my-prototype': return <MyPrototype />
   ```

The prototype will then appear in the sidebar and render inline in the main content panel.

## Architecture

- `src/main.tsx` — entry point, renders `PrototypesApp` directly
- `src/PrototypesApp.tsx` — the prototype shell: sidebar nav + main content panel
- `src/App.tsx` — legacy component library, not used in the deployed app
- Hash-based routing: each prototype maps to a URL hash (e.g. `#supervisor-checklist`)
