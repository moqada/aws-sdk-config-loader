import AWS from 'aws-sdk';
import sinon from 'sinon';
import assert from 'power-assert';
import proxyquire from 'proxyquire';

import configProvider from '../src/configProvider';
import {resetEnv} from './helpers';


describe('aws-sdk-config-loader', () => {
  let orgConfig = null;
  let loader = null;
  let sandbox = null;
  let stubs = null;

  beforeEach(done => {
    resetEnv();
    orgConfig = AWS.config;
    sandbox = sinon.sandbox.create();
    stubs = {
      configProvider: sandbox.spy(configProvider),
      fileConfigs: config => {
        return Object.assign({}, config, {region: 'ap-northeast-1'});
      },
      environmentConfigs: config => config
    };
    loader = proxyquire('../src', {
      './configProvider': stubs.configProvider,
      './configs/fileConfigs': stubs.fileConfigs,
      './configs/environmentConfigs': stubs.environmentConfigs
    });
    done();
  });

  afterEach(done => {
    resetEnv();
    sandbox.restore();
    stubs = null;
    AWS.config = orgConfig;
    done();
  });

  it('override AWS.config', done => {
    loader(AWS);
    assert(stubs.configProvider.args.length === 1);
    assert.deepEqual(stubs.configProvider.args[0], [
      AWS,
      [stubs.fileConfigs, stubs.environmentConfigs],
      {}
    ]);
    assert(AWS.config.region === 'ap-northeast-1');
    done();
  });

  it('override AWS.confg by options', done => {
    const opts = {profile: 'buz'};
    loader(AWS, opts);
    assert(stubs.configProvider.args.length === 1);
    assert.deepEqual(stubs.configProvider.args[0], [
      AWS,
      [stubs.fileConfigs, stubs.environmentConfigs],
      opts
    ]);
    assert(AWS.config.region === 'ap-northeast-1');
    done();
  });
});
