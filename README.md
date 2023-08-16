# eslint-plugin-testing

![npm](https://img.shields.io/npm/v/eslint-plugin-testing)
[![ci](https://github.com/MatanYadaev/eslint-plugin-testing/actions/workflows/ci.yaml/badge.svg?branch=main)](https://github.com/MatanYadaev/eslint-plugin-testing/actions/workflows/ci.yaml)

ESLint plugin for testing.

## Installation

1. First, install [ESLint](https://eslint.org/):

   ```sh
   npm install --save-dev eslint
   ```

2. Next, install `eslint-plugin-testing`:

   ```sh
   npm install --save-dev eslint-plugin-testing
   ```

## Usage

Add `testing` to the plugins section of your `.eslintrc` configuration file:

```json
{
  "plugins": ["testing"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "testing/aaa-comments": "error"
  }
}
```

### Recommended

To use the recommended configuration, extend it in your `.eslintrc` file:

```json
{
  "extends": ["plugin:testing/recommended"]
}
```

All recommend rules will be set to error by default. You can however disable some rules by setting turning them `off` in your `.eslintrc` file or by setting them to `warn` in your `.eslintrc`.

### All

To use the all configuration, extend it in your `.eslintrc` file:

```json
{
  "extends": ["plugin:testing/all"]
}
```

## Rules

<!-- begin auto-generated rules list -->

| Name                                       | Description          |
| :----------------------------------------- | :------------------- |
| [aaa-comments](docs/rules/aaa-comments.md) | Enforce AAA comments |

<!-- end auto-generated rules list -->

## Licence

[MIT](https://github.com/MatanYadaev/eslint-plugin-testing/blob/main/LICENSE)

Copyright &copy; 2023-present, Matan Yadaev 