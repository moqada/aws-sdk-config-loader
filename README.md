# aws-sdk-config-loader

AWS config file loader for CLI tools.

this library load `~/.aws/config` that aws-sdk-js is not supported.


## Installation

```
npm install aws-sdk-config-loader
```

## Usage

put `~/.aws/config`.

```javascript
import AWS from 'aws-sdk';
import loader from 'aws-sdk-config-loader';

loader(AWS);
```
