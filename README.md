# TD/UI

A small React design system built to demonstrate production-oriented component engineering rather than a catalogue of visual effects.

**React · TypeScript · Storybook · Vitest · semantic CSS tokens · accessibility-first interaction**

**Live Storybook:** https://tdugini.github.io/react-design-system/

## Why this exists

Most portfolio UI repositories optimize for screenshots. TD/UI optimizes for the questions that appear after the screenshot:

- Is the component API reusable outside the demo?
- Are keyboard and screen-reader states deliberate?
- Can the visual language survive light/dark themes without component rewrites?
- Do loading, empty, disabled, error and long-content states work?
- Can another engineer understand why a decision was made?

The result is intentionally restrained. Visual hierarchy comes from type, spacing, borders and density before decoration.

## Current components

| Component | Focus |
| --- | --- |
| `Button` | variants, loading state, sizing, icon slots |
| `IconButton` | compact actions with required accessible labels |
| `Badge` | semantic status communication |
| `TextField` | label / hint / error relationships and adornments |
| `Checkbox` | native semantics plus indeterminate state |
| `Switch` | explicit `role="switch"` behavior |
| `Tabs` | compound API and keyboard navigation |
| `Dialog` | native `<dialog>` focus behavior with controlled React state |
| `Skeleton` | reduced-motion-aware loading placeholder |
| `DataTable<T>` | typed columns, sortable headers and generic row models |
| `Combobox<T>` | searchable generic data, keyboard navigation and listbox semantics |
| `ToastProvider` | queued feedback, semantic tones, actions and live-region behavior |

## Storybook

Storybook is the primary workshop for the system. It contains:

- a custom overview instead of the default starter screen;
- foundation, token and accessibility reference pages;
- interactive component controls;
- state-specific stories;
- light and dark theme switching;
- axe-powered accessibility checks through `@storybook/addon-a11y`;
- component API documentation through autodocs;
- realistic product-pattern stories that compose multiple primitives.

Run it locally with:

```bash
npm ci
npm run storybook
```

Storybook runs on `http://localhost:6006`.

The static Storybook build is also deployed from `main` to GitHub Pages.

## Verification

```bash
npm run typecheck
npm test
npm run build
npm run build:storybook
```

Or run the complete local gate:

```bash
npm run verify
```

The GitHub Actions workflow repeats the same verification for every pull request using the committed npm lockfile.

## Package usage

The project builds as an ESM library with TypeScript declarations.

```tsx
import { Button, TextField } from '@tdugini/ui';
import '@tdugini/ui/styles.css';

export function ProfileForm() {
  return (
    <form>
      <TextField label="Display name" />
      <Button type="submit">Save changes</Button>
    </form>
  );
}
```

The package is intentionally marked `private` while it is a portfolio project. Publishing to npm is not required to demonstrate a stable library boundary.

## Design principles

### 1. Quiet surfaces

Most product interfaces do not need gradients, glass effects or oversized rounded containers to establish hierarchy. TD/UI starts with neutral surfaces and introduces elevation only when an element actually leaves the document plane.

### 2. Semantic tokens

Components reference semantic variables such as `--td-color-surface`, `--td-color-text-muted` and `--td-color-danger` rather than hard-coded theme values. Dark mode therefore changes the token layer, not component logic.

### 3. Native semantics first

Native HTML behavior is preferred when it already solves the interaction correctly. The dialog, checkbox and input components deliberately build on browser primitives instead of recreating them with generic `div` elements.

### 4. Small public APIs

Props are added for product requirements, not configurability for its own sake. Composition is preferred over components with dozens of appearance flags.

### 5. Motion explains state

Motion is short and functional. The global styles respect `prefers-reduced-motion` and remove non-essential transition duration when requested by the user.

## Repository structure

```text
src/
├── components/        component + CSS + stories + focused tests
├── stories/           foundations and realistic product patterns
├── styles/            semantic tokens and global baseline
├── utils/             framework-agnostic helpers
└── index.ts           public package boundary

.storybook/            workshop configuration and custom manager theme
.github/workflows/     verification and Pages deployment
```

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for component rules and engineering trade-offs.

## Roadmap

Future work is intentionally driven by engineering value rather than component count:

- shared form-field composition across input primitives;
- responsive table-to-list behavior for narrow product surfaces;
- automated visual regression testing;
- package versioning and release notes if the API starts evolving across consumers;
- npm publishing only if the library starts being consumed outside this repository.

## Status

This repository is a portfolio design-system exercise, not an attempt to replace established production libraries. Its purpose is to make component architecture, accessibility decisions and frontend craft easy to inspect through both source code and a live Storybook workshop.
