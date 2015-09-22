/**
 * return config object
 *
 * @param {Object} AWS AWS SDK module
 * @param {Function[]} getters function list
 * @return {Object}
 */
export default function configProvider(AWS, getters) {
  let config = {region: undefined};
  for (const getter of getters) {
    config = getter(config, AWS);
  }
  return config;
}
