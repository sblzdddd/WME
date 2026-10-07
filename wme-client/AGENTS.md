This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Node

Use nvm. Versions live in `~/.local/share/nvm` (the fish nvm plugin). Homebrew Node is on `PATH` first and is the wrong runtime.

```bash
nvm use lts   # Node 24, currently v24.19.0
```

`node`, `pnpm`, and `npx` must resolve under `~/.local/share/nvm`. Do not install another Node, and do not run package managers through `npx` (`npx pnpm`, `npx --yes pnpm@…`). That creates a separate toolchain; delete it if one was created.

## Commands

Run these only after `nvm use lts`. Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Styling

Style every view with Tailwind classes on `className` (NativeWind). Do not add `StyleSheet.create`, CSS modules, or inline `style` objects for layout, color, spacing, typography, borders, or backgrounds.

- Put colors, spacing, flex, and type in utilities, including `dark:` for the light and dark theme.
- When a library injects a `style` that fights a utility (inline styles win over classes), override that one property with a Tailwind important utility such as `justify-center!`. Do not copy the library style into a new style object.
- Use inline `style` only for a value that changes at runtime and has no static utility, such as a measured safe-area inset or a rotation driven by component state.

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md
