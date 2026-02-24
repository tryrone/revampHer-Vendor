#!/usr/bin/env node

/**
 * Postinstall patch for react-native-date-picker.
 *
 * Removes the incorrect `modulesProvider` from codegenConfig.ios.
 * RNDatePickerManager is a RCTViewManager (view component), NOT a TurboModule,
 * so declaring it as a modulesProvider crashes on RN 0.81 New Architecture:
 *   "Module provider RNDatePickerManager does not conform to RCTModuleProvider"
 */

const fs = require("fs");
const path = require("path");

const pkgPath = path.resolve(
  __dirname,
  "../node_modules/react-native-date-picker/package.json"
);

if (!fs.existsSync(pkgPath)) {
  // Not installed yet — skip silently.
  process.exit(0);
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

const modulesProvider = pkg?.codegenConfig?.ios?.modulesProvider;
if (modulesProvider) {
  delete pkg.codegenConfig.ios.modulesProvider;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
  console.log(
    "[fix-date-picker] Removed modulesProvider from react-native-date-picker codegenConfig"
  );
} else {
  console.log("[fix-date-picker] No patch needed (modulesProvider already absent)");
}
