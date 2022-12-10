# eslint-plugin-rankone

RankOne ESLint plugin

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-rankone`:

```sh
npm install eslint-plugin-rankone --save-dev
```

## Usage

Add `rankone` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "rankone"
    ]
}
```

## Supported Rules

`function-argument-to-array-map`

Enforce function argument to Array.map() instead of anonymous function that passes through arguments.


## Development

Can be tested locally by [importing](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#local-paths) from the local file system.

Run `npm i -D ../eslint-plugin` (relative path may differ)

This should add someting like this to `package.json`:

```
{
  "devDependencies": {
    "eslint-plugin-rankone": "file:../eslint-plugin",
  }
}
```

Add to `.eslintrc`:

```
{
  plugins: ['rankone']
}
```
