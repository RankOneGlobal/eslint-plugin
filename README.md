# eslint-plugin-rankone

RankOne ESLint plugin

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i -D eslint
```

Next, install `@rankone/eslint-plugin`:

```sh
npm i -D @rankone/eslint-plugin
```

## Usage

Add `@rankone/eslint-plugin` to the extends section of your `.eslintrc` configuration file.

```json
{
  "extends": [
    "@rankone/eslint-plugin/recommended"
  ]
}
```

## Supported Rules

`@rankone/function-argument-to-array-map`

Enforce function argument to Array.map() instead of anonymous function that passes through arguments.


## Development

Can be tested locally by [importing](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#local-paths) from the local file system.

First, build the plugin with `npm run build`.

Then go to the project where you wish to try it and run `npm i -D ../eslint-plugin` (relative path may differ)

This should add someting like this to `package.json`:

```json
{
  "devDependencies": {
    "@rankone/eslint-plugin": "file:../eslint-plugin",
  }
}
```

Add to `.eslintrc`:

```json
{
  "extends": [
    "@rankone/eslint-plugin/recommended"
  ]
}
```
