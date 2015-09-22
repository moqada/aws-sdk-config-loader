import path from 'path';

import AWS from 'aws-sdk';
import sinon from 'sinon';
import assert from 'power-assert';
import proxyquire from 'proxyquire';

import configProvider from '../src/configProvider';
import environmentConfigs from '../src/configs/environmentConfigs';
import fileConfigs from '../src/configs/fileConfigs';
import {resetEnv, fixtureDir} from './helpers';


/** @test {loader} */
describe('aws-sdk-config-loader', () => {
  let orgConfigKeys = null;
  let loader = null;
  let sandbox = null;
  let stubs = null;

  beforeEach(done => {
    resetEnv();
    process.env.HOME = path.join(fixtureDir(), 'default');
    orgConfigKeys = Object.assign({}, AWS.Config.prototype.keys);
    sandbox = sinon.sandbox.create();
    stubs = {
      configProvider: sandbox.spy(configProvider)
    };
    loader = proxyquire('../src', {
      './configProvider': stubs.configProvider
    });
    done();
  });

  afterEach(done => {
    resetEnv();
    sandbox.restore();
    stubs = null;
    AWS.Config.prototype.keys = orgConfigKeys;
    done();
  });

  it('override AWS.config', () => {
    loader(AWS);
    assert(stubs.configProvider.args.length === 1);
    assert.deepEqual(stubs.configProvider.args[0], [
      AWS,
      [fileConfigs, environmentConfigs],
      {}
    ]);
    assert(AWS.config.region === 'ap-northeast-1');
    assert(AWS.config.credentials.accessKeyId === 'default_key_id');
    assert(AWS.config.credentials.secretAccessKey === 'default_secret_key');
  });

  context('when apply options', () => {
    it('override config and credentials', () => {
      const opts = {profile: 'customize'};
      loader(AWS, opts);
      assert(stubs.configProvider.args.length === 1);
      assert.deepEqual(stubs.configProvider.args[0], [
        AWS,
        [fileConfigs, environmentConfigs],
        opts
      ]);
      assert(AWS.config.region === 'us-east-1');
      assert(AWS.config.credentials.accessKeyId === 'customize_key_id');
      assert(AWS.config.credentials.secretAccessKey === 'customize_secret_key');
    });

    it('and apply noReflectCredentials override only config', () => {
      const opts = {
        profile: 'customize',
        noReflectCredentials: true
      };
      loader(AWS, opts);
      assert(stubs.configProvider.args.length === 1);
      assert.deepEqual(stubs.configProvider.args[0], [
        AWS,
        [fileConfigs, environmentConfigs],
        opts
      ]);
      assert(AWS.config.region === 'us-east-1');
      assert(AWS.config.credentials.accessKeyId === 'default_key_id');
      assert(AWS.config.credentials.secretAccessKey === 'default_secret_key');
    });

    it('and apply noReflectCredentials and throw error', () => {
      const opts = {
        profile: 'customize'
      };
      class StubCredentials {
        get(cb) {
          cb('err');
        }
      }
      sandbox.stub(AWS, 'SharedIniFileCredentials', StubCredentials);
      loader(AWS, opts);
      assert(AWS.config.region === 'us-east-1');
      assert(AWS.config.credentials === null);
    });
  });
});
