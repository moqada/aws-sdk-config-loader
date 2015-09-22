/**
 * return config object
 *
 * @param {Object} AWS AWS SDK module
 * @param {Function[]} getters function list
 * @param {Object} opts options
 * @return {Object}
 */
export default function configProvider(AWS, getters, opts = {}) {
  let config = {region: undefined};
  for (const getter of getters) {
    config = getter(config, AWS, opts);
  }
  return config;
}
