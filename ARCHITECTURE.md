# Architecture and design decisions

## Goal

TD/UI should feel like a small internal design system extracted from a real product team: opinionated enough to be coherent, small enough that every abstraction can be justified.

## Component contract

Every public component should satisfy four checks before it is considered complete:

1. **Semantic HTML** — start from the correct browser primitive whenever possible.
2. **Keyboard behavior** — interactive states must work without a pointer.
3. **Stable API** — domain data stays outside the component and appearance props remain finite.
4. **Inspectable states** — important variants and edge states get their own Storybook stories.

## Styling

The project intentionally uses plain CSS rather than Tailwind or CSS-in-JS. This keeps the design tokens and cascade visible to reviewers and avoids coupling the library to an application styling runtime.

CSS is split into:

- semantic tokens (`src/styles/tokens.css`);
- a small global baseline (`src/styles/base.css`);
- co-located component CSS.

All component rules live in the `td-components` cascade layer. Public class names use the `td-` prefix so consumers are less likely to collide with application styles.

## Theme model

Theme values are selected with `data-theme` on the document root. Component code does not branch on light/dark mode.

This is intentional: a visual theme is a token concern, not a React state concern. Product applications may decide how the root attribute is managed.

## Why no component dependency

The initial primitives are implemented directly rather than built as styled wrappers around another design-system package. The point of the repository is to expose implementation decisions.

For genuinely difficult widgets such as comboboxes, date pickers or menus, adopting a proven accessible primitive library would be preferable to shipping an incomplete custom implementation. “Build it yourself” is not treated as a virtue when it reduces correctness.

## Complex examples

### `Tabs`

Tabs use a compound API because triggers and panels are separate semantic elements but share one state machine. The implementation supports controlled and uncontrolled state, arrow-key navigation and correct `aria-controls` / `aria-labelledby` relationships.

### `Dialog`

Dialog builds on the native `<dialog>` element. The browser owns modal focus containment and Escape semantics; React owns application state. Custom overlay-click behavior is kept intentionally small.

### `DataTable<T>`

The table accepts a generic row model and column definitions instead of dictating a product-specific schema. Columns own render functions and optional sort-value selectors. This gives consumers strong type inference without requiring the design system to understand their domain objects.

## Accessibility strategy

Accessibility is handled at three levels:

- semantics in the components themselves;
- focused unit tests for relationships and state;
- Storybook's axe integration for visual compositions.

Automated checks do not replace keyboard and screen-reader review, especially for future composite widgets.

## What is intentionally absent

- no catch-all `Box` component;
- no arbitrary `color` prop on every primitive;
- no spacing props that duplicate CSS;
- no “card” abstraction for every bordered rectangle;
- no animation library;
- no icon library runtime dependency;
- no theme provider required to render a button.

The absence of an abstraction is a design decision too.

## Interaction primitives

### Combobox

`Combobox<T>` keeps option identity and presentation separate through `getOptionValue` and `getOptionLabel`. The component owns disclosure, filtering and keyboard navigation while allowing product code to own the selected value. It follows the ARIA combobox/listbox relationship instead of simulating a native select with generic divs.

### Toasts

Transient feedback is exposed as an imperative `toast()` call through a provider because notifications are usually triggered by async product events rather than rendered inline. The provider bounds the queue, keeps dismissal centralized and uses `status`/`alert` semantics based on tone. It deliberately does not introduce a global singleton or external event bus.

## Storybook as a workshop

Storybook is treated as the product surface for the system rather than a screenshot gallery. Component stories cover behavior and state, while pattern stories demonstrate composition and responsive layout without introducing domain-specific abstractions into the library itself.
