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


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "rankone/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here


