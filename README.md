# makeup-navigation-emitter

<p>
    <a href="https://travis-ci.org/makeup-js/makeup-navigation-emitter"><img src="https://api.travis-ci.org/makeup-js/makeup-navigation-emitter.svg?branch=master" alt="Build Status" /></a>
    <a href='https://coveralls.io/github/makeup-js/makeup-navigation-emitter?branch=master'><img src='https://coveralls.io/repos/makeup-js/makeup-navigation-emitter/badge.svg?branch=master&service=github' alt='Coverage Status' /></a>
    <a href="https://david-dm.org/makeup-js/makeup-navigation-emitter"><img src="https://david-dm.org/makeup-js/makeup-navigation-emitter.svg" alt="Dependency status" /></a>
    <a href="https://david-dm.org/makeup-js/makeup-navigation-emitter#info=devDependencies"><img src="https://david-dm.org/makeup-js/makeup-navigation-emitter/dev-status.svg" alt="devDependency status" /></a>
</p>

Emits custom events based on keyboard navigation of one or two dimensional model.

A vanilla JavaScript port of <a href="https://github.com/ianmcburnie/jquery-linear-navigation">jquery-linear-navigation</a>.

## Experimental

This module is still in an experimental state, until it reaches v1.0.0 you must consider all minor releases as breaking changes. Patch releases may introduce new features, but will be backwards compatible.

## Install

```js
// via npm
npm install makeup-navigation-emitter

// via yarn
yarn add makeup-navigation-emitter
```

## Dependencies

* makeup-exit-emitter
* makeup-key-emitter

## Development

* `npm start`
* `npm test`
* `npm run lint`
* `npm run fix`
* `npm run build`
* `npm run clean`

The following hooks exist, and do not need to be invoked manually:

* `npm prepublishOnly` cleans, lints, tests and builds on every `npm publish` command
* `pre-commit` cleans, lints, tests and builds on every `git commit` command

## Test Reports

Each test run will generate the following reports:

* `/reports/coverage` contains Istanbul code coverage report
* `/reports/html` contains HTML test report

## CI Build

https://travis-ci.org/makeup-js/makeup-navigation-emitter

## Code Coverage

https://coveralls.io/github/makeup-js/makeup-navigation-emitter
