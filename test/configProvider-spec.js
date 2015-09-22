import AWS from 'aws-sdk';
import assert from 'power-assert';

import configProvider from '../src/configProvider';


describe('configProvider()', () => {
  it('when apply multiple getteres return overriden config', () => {
    const getters = [
      config => config,
      config => Object.assign({}, config, {region: 'foo'}),
      config => config,
      config => Object.assign({}, config, {region: 'bar'})
    ];
    assert.deepEqual(configProvider(AWS, getters), {region: 'bar'});
  });

  it('when doesnot apply getters return default config', () => {
    assert.deepEqual(configProvider(AWS, []), {region: undefined});
  });
});
