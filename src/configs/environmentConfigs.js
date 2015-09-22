/**
 * return config object load from environment variables.
 *
 * @param {Object} config config object
 * @return {Object}
 */
export default function environmentConfigs(config) {
  const region = process.env.AWS_REGION || process.env.AMAZON_REGION;
  if (region) {
    return Object.assign({}, config, {region});
  }
  return config;
}
