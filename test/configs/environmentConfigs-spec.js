import assert from 'power-assert';

import environmentConfigs from '../../src/configs/environmentConfigs';
import {resetEnv} from '../helpers';


/** @test {environmentConfigs} */
describe('environmentConfigs()', () => {
  let defaultConfig = null;
  beforeEach(() => {
    resetEnv();
    defaultConfig = {region: undefined};
  });
  afterEach(resetEnv);

  it('when no specific env return default config', () => {
    assert.deepEqual(environmentConfigs(defaultConfig), {region: undefined});
  });

  it('when env.AWS_REGION exists return overriden config', () => {
    process.env.AWS_REGION = 'foo';
    assert.deepEqual(environmentConfigs(defaultConfig), {region: 'foo'});
  });

  it('when env.AMAZON_REGION exists return overriden config', () => {
    process.env.AMAZON_REGION = 'bar';
    assert.deepEqual(environmentConfigs(defaultConfig), {region: 'bar'});
  });

  it('when AMAZON_REGION and AWS_REGION exists return overriden config by AWS_REGION', () => {
    process.env.AWS_REGION = 'foo';
    process.env.AMAZON_REGION = 'bar';
    assert.deepEqual(environmentConfigs(defaultConfig), {region: 'foo'});
  });
});
