const fs = require('fs');
const projectRootPath = __dirname;
const AddonConfigurationRegistry = require('@plone/registry/src/addon-registry');

let coreLocation;
if (fs.existsSync(`${projectRootPath}/core`))
  coreLocation = `${projectRootPath}/core`;
else if (fs.existsSync(`${projectRootPath}/../../core`))
  coreLocation = `${projectRootPath}/../../core`;

const registry = new AddonConfigurationRegistry(
  `${coreLocation}/packages/volto`,
);

// Extends ESlint configuration for adding the aliases to `src` directories in Volto addons
const addonAliases = Object.keys(registry.packages).map((o) => [
  o,
  registry.packages[o].modulePath,
]);

module.exports = {
  extends: `${coreLocation}/packages/volto/.eslintrc`,
  rules: {
    'import/no-unresolved': 1,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@plone/volto', `${coreLocation}/packages/volto/src`],
          [
            '@plone/volto-slate',
            `${coreLocation}/core/packages/volto-slate/src`,
          ],
          ['@plone/registry', `${coreLocation}/packages/registry/src`],
          [
            '@plone-collective/volto-eventbrite-block',
            './packages/volto-eventbrite-block/src',
          ],
          ...addonAliases,
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    },
  },
};
