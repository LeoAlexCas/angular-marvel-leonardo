// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  API_PROTOCOL: 'https:',
  API_BASE_URL: '//gateway.marvel.com:443/v1/public/',
  API_KEY: 'characters?apikey=56d2cc44b1c84eb7c6c9673565a9eb4b'
};
