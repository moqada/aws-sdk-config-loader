import path from 'path';

import AWS from 'aws-sdk';
import assert from 'power-assert';
import proxyquire from 'proxyquire';

import {resetEnv, fixtureDir} from '../helpers';


/** @test {fileConfigs} */
describe('fileConfigs()', () => {
  const defaultConfig = {region: undefined};
  let fileConfigs = null;

  beforeEach(() => {
    resetEnv();
    fileConfigs = proxyquire('../../src/configs/fileConfigs', {
      'os-homedir': () => path.join(fixtureDir(), 'default')
    });
  });

  afterEach(() => {
    resetEnv();
  });

  it('return default profile config', () => {
    assert.deepEqual(fileConfigs(defaultConfig, AWS), {region: 'ap-northeast-1'});
  });

  it('when env.HOME and env.AWS_CONFIG_FILE doesnot exists return default config', () => {
    fileConfigs = proxyquire('../../src/configs/fileConfigs', {
      'os-homedir': () => null
    });
    assert.deepEqual(fileConfigs(defaultConfig, AWS), {region: undefined});
  });

  it('when default profile doesnot exists in file return default config', () => {
    fileConfigs = proxyquire('../../src/configs/fileConfigs', {
      'os-homedir': () => path.join(fixtureDir(), 'non-default')
    });
    assert.deepEqual(fileConfigs(defaultConfig, AWS), {region: undefined});
  });

  it('when set env.AWS_CONFIG_FILE return config from specific file', () => {
    process.env.AWS_CONFIG_FILE = path.join(fixtureDir(), 'specification-config');
    assert.deepEqual(fileConfigs(defaultConfig, AWS), {region: 'us-west-1'});
  });

  it('when config file doesnot exists return default config', () => {
    fileConfigs = proxyquire('../../src/configs/fileConfigs', {
      'os-homedir': () => path.join(fixtureDir(), 'unknown')
    });
    assert.deepEqual(fileConfigs(defaultConfig, AWS), {region: undefined});
  });

  context('when set env.AWS_PROFILE', () => {
    it('and profile exists in file return specific profile config', () => {
      process.env.AWS_PROFILE = 'customize';
      assert.deepEqual(fileConfigs(defaultConfig, AWS), {region: 'us-east-1'});
    });
    it('and profile doesnot exists in file return default config', () => {
      process.env.AWS_PROFILE = 'unknown';
      assert.deepEqual(fileConfigs(defaultConfig, AWS), {region: undefined});
    });
  });

  it('when apply opts.profile return config using opts.profile', () => {
    assert.deepEqual(
      fileConfigs(defaultConfig, AWS, {profile: 'customize'}),
      {region: 'us-east-1'}
    );
  });

  it('when apply opts.configFile return config from opts.configFile', () => {
    const configFile = path.join(fixtureDir(), 'specification-config');
    assert.deepEqual(
      fileConfigs(defaultConfig, AWS, {configFile}),
      {region: 'us-west-1'}
    );
  });
});
