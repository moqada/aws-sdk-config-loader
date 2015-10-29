# aws-sdk-config-loader

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-download-image]][npm-download-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][codecov-image]][codecov-url]
[![DevDependency Status][daviddm-dev-image]][daviddm-dev-url]
[![License][license-image]][license-url]

AWS config file loader for CLI tools.

this library load `~/.aws/config` that [aws-sdk-js](https://github.com/aws/aws-sdk-js) is not supported.


## Installation

```
npm install aws-sdk-config-loader aws-sdk
```


## Usage

API Document: https://moqada.github.io/aws-sdk-config-loader/

put following `~/.aws/credentials`

```
[default]
aws_access_key_id = default_key_id
aws_secret_access_key = default_secret_key
[foo]
aws_access_key_id = foo_key_id
aws_secret_access_key = foo_secret_key
```

put following `~/.aws/config`.

```
[default]
region = ap-northeast-1
[foo]
region = us-east-1
```


```javascript
import AWS from 'aws-sdk';
import loader from 'aws-sdk-config-loader';

loader(AWS);
// AWS.config.region === 'ap-northeast-1'
// AWS.config.credentials.accessKeyId = 'default_key_id'
// AWS.config.credentials.secretAccessKey = 'default_secret_key'

// export AWS_PROFILE=foo
loader(AWS);
// AWS.config.region === 'us-east-1'
// AWS.config.credentials.accessKeyId = 'foo_key_id'
// AWS.config.credentials.secretAccessKey = 'foo_secret_key'

// export AWS_CONFIG_FILE=/path/to/config
loader(AWS);
// set AWS.config from /path/to/config

loader(AWS, {profile: 'foo'})
// AWS.config.region === 'us-east-1'
// AWS.config.credentials.accessKeyId = 'foo_key_id'
// AWS.config.credentials.secretAccessKey = 'foo_secret_key'

loader(AWS, {profile: 'foo', noReflectCredentials: true})
// AWS.config.region === 'us-east-1'
// AWS.config.credentials.accessKeyId = 'default_key_id'
// AWS.config.credentials.secretAccessKey = 'default_secret_key'
```


[npm-url]: https://www.npmjs.com/package/aws-sdk-config-loader
[npm-image]: https://img.shields.io/npm/v/aws-sdk-config-loader.svg?style=flat-square
[npm-download-url]: https://www.npmjs.com/package/aws-sdk-config-loader
[npm-download-image]: https://img.shields.io/npm/dt/aws-sdk-config-loader.svg?style=flat-square
[travis-url]: https://travis-ci.org/moqada/aws-sdk-config-loader
[travis-image]: https://img.shields.io/travis/moqada/aws-sdk-config-loader.svg?style=flat-square
[codecov-url]: https://codecov.io/github/moqada/aws-sdk-config-loader
[codecov-image]: https://img.shields.io/codecov/c/github/moqada/aws-sdk-config-loader.svg?style=flat-square
[daviddm-dev-url]: https://david-dm.org/moqada/aws-sdk-config-loader#info=devDependencies
[daviddm-dev-image]: https://img.shields.io/david/dev/moqada/aws-sdk-config-loader.svg?style=flat-square
[license-url]: http://opensource.org/licenses/MIT
[license-image]: https://img.shields.io/npm/l/aws-sdk-config-loader.svg?style=flat-square
