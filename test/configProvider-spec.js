import AWS from 'aws-sdk';
import assert from 'power-assert';
import sinon from 'sinon';

import configProvider from '../src/configProvider';


/** @test {configProvider} */
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

  it('when apply options getter args applied options', () => {
    const spy = sinon.spy(config => config);
    const getters = [spy];
    const opts = {profile: 'buz'};
    assert.deepEqual(configProvider(AWS, getters, opts), {region: undefined});
    assert(spy.args.length === 1);
    assert.deepEqual(spy.args[0], [
      {region: undefined},
      AWS,
      opts
    ]);
  });
});
