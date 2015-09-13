import AWS from 'aws-sdk';
import sinon from 'sinon';
import assert from 'power-assert';

import loader from '../src/';


describe('loader', () => {
  let orgConfig = null;

  beforeEach(() => {
    orgConfig = AWS.config;
    process.env.HOME = __dirname;
    process.env.USER = process.env.LOGNAME = 'test';
    delete process.env.AWS_CONFIG_FILE;
    delete process.env.AWS_REGION;
    delete process.env.AMAZON_REGION;
    delete process.env.AWS_PROFILE;
  });

  afterEach(() => {
    AWS.config = orgConfig;
  });

  it('does not applied config', () => {
    loader(AWS);
    assert(AWS.config.region === undefined);
  });

  it('env.HOME does not set', () => {
    delete process.env.HOME;
    delete process.env.USER;
    delete process.env.LOGNAME;
    loader(AWS);
    assert(AWS.config.region === undefined);
  });

  describe('set $HOME/.aws/config', () => {
    let stub = null;

    beforeEach(() => {
      const mock = `[default]
region = ap-northeast-1
[customize]
region = us-east-1`;
      stub = sinon.stub(AWS.util, 'readFileSync');
      stub.returns(mock);
    });

    afterEach(() => {
      stub.restore();
    });

    it('and no more configs', () => {
      loader(AWS);
      assert(AWS.config.region === 'ap-northeast-1');
    });

    it('and set AWS_REGION', () => {
      process.env.AWS_REGION = 'us-east-1';
      loader(AWS);
      assert(AWS.config.region === 'us-east-1');
    });

    it('and set AMAZON_REGION', () => {
      process.env.AMAZON_REGION = 'us-east-1';
      loader(AWS);
      assert(AWS.config.region === 'us-east-1');
    });

    it('and set AWS_PROFILE', () => {
      process.env.AWS_PROFILE = 'customize';
      loader(AWS);
      assert(AWS.config.region === 'us-east-1');
    });

    it('and set undefined AWS_PROFILE', () => {
      process.env.AWS_PROFILE = 'unknown';
      loader(AWS);
      assert(AWS.config.region === undefined);
    });
  });

  describe('set empty config', () => {
    let stub = null;

    beforeEach(() => {
      const mock = '';
      stub = sinon.stub(AWS.util, 'readFileSync');
      stub.returns(mock);
    });

    afterEach(() => {
      stub.restore();
    });

    it('return undefined', () => {
      loader(AWS);
      assert(AWS.config.region === undefined);
    });
  });
});
