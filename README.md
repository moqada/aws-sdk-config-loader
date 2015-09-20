# aws-sdk-config-loader

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-download-image]][npm-download-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![DevDependency Status][daviddm-dev-image]][daviddm-dev-url]
[![License][license-image]][license-url]

AWS config file loader for CLI tools.

this library load `~/.aws/config` that [aws-sdk-js](https://github.com/aws/aws-sdk-js) is not supported.


## Installation

```
npm install aws-sdk-config-loader aws-sdk
```


## Usage

put following `~/.aws/config`.

```
[default]
region = ap-northeast-1
```


```javascript
import AWS from 'aws-sdk';
import loader from 'aws-sdk-config-loader';

loader(AWS);

// AWS.config.region === 'ap-northeast-1'
```


[npm-url]: https://www.npmjs.com/package/aws-sdk-config-loader
[npm-image]: https://img.shields.io/npm/v/aws-sdk-config-loader.svg?style=flat-square
[npm-download-url]: https://www.npmjs.com/package/aws-sdk-config-loader
[npm-download-image]: https://img.shields.io/npm/dt/aws-sdk-config-loader.svg?style=flat-square
[travis-url]: https://travis-ci.org/moqada/aws-sdk-config-loader
[travis-image]: https://img.shields.io/travis/moqada/aws-sdk-config-loader.svg?style=flat-square
[coveralls-url]: https://coveralls.io/github/moqada/aws-sdk-config-loader
[coveralls-image]: https://img.shields.io/coveralls/moqada/aws-sdk-config-loader.svg?style=flat-square
[daviddm-dev-url]: https://david-dm.org/moqada/aws-sdk-config-loader#info=devDependencies
[daviddm-dev-image]: https://img.shields.io/david/dev/moqada/aws-sdk-config-loader.svg?style=flat-square
[license-url]: http://opensource.org/licenses/MIT
[license-image]: https://img.shields.io/npm/l/aws-sdk-config-loader.svg?style=flat-square
