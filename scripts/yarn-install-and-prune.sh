set -e
yarn --frozen-lockfile
# Removing non-essentials to save megabytes on CI cache download/unzipping.
rm -fr node_modules/{@webassemblyjs,hiredis,leveldown,node-notifier,serve-index,webpack-dev-server}/*
rm -fr node_modules/typescript/lib/*/diagnosticMessages.generated.json
rm -fr node_modules/rollup*
