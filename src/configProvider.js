/**
 * return config object
 *
 * @param {Object} AWS AWS SDK module
 * @param {Function[]} getters function list
 * @param {Object} opts options
 * @param {string} opts.configFile config file path
 * @param {string} opts.profile profile name
 * @return {Object}
 */
export default function configProvider(AWS, getters, opts = {}) {
  let config = {region: undefined};
  for (const getter of getters) {
    config = getter(config, AWS, opts);
  }
  return config;
}
