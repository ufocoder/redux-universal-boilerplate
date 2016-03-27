Redux universal boilerplate
===========================

Boilerplate for react universal application building on flux architecture based on redux implementation.

[![Dependencies](https://david-dm.org/ufocoder/redux-universal-boilerplate.svg)](https://david-dm.org/ufocoder/redux-universal-boilerplate)
[![MIT License](https://img.shields.io/npm/l/check-dependencies.svg?style=flat-square)](http://opensource.org/licenses/MIT)

Boilerplate based on:

* [ExpressJS](http://expressjs.com)
* [React](https://github.com/reactjs/)
* [React-router](https://github.com/reactjs/react-router)
* [React-redux](https://github.com/reactjs/react-redux)
* [Redux](https://github.com/reactjs/redux)
* [BabelJS](https://babeljs.io)
* [Webpack](https://webpack.github.io/)
* and etc.

# Features

* Testing enviroment
* Server and client side rendering
* Routing on client and server sides
* Hot module replacement [Work in progress]
* Html layout as `react` component
* Not Found page with 404 HTTP status

# Installation

```bash
git clone https://github.com/ufocoder/redux-universal-boilerplate.git
cd redux-universal-boilerplate

npm install
NODE_ENV=production npm run build
NODE_ENV=production npm run start
```

# Development

There're two ways to work with boilerplate

1) Build once and then run bunldes:

```bash
NODE_ENV=dev npm build
NODE_ENV=dev npm start
```

2) Developing in `watch` mode:

```bash
NODE_ENV=dev npm watch
```

# Testing enviroment

* [Karma](https://karma-runner.github.io/)
* [Karma-phantomjs-launcher](https://github.com/karma-runner/karma-phantomjs-launcher)
* [Mocha](https://mochajs.org/)
* [Chai](http://chaijs.com/)
* [Sinon](http://sinonjs.org/)
* [Enzyme](https://github.com/airbnb/enzyme)
* and etc.

# Contributing

Current boilerplate could be used for building but it need to be improved.

I would be thankful for your [issues](https://github.com/ufocoder/redux-universal-boilerplate/issues) and [pull requests](https://github.com/ufocoder/redux-universal-boilerplate/pulls)

# License

MIT license. Copyright © 2016, Ufocoder. All rights reserved.
