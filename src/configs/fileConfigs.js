import path from 'path';

import osHomeDir from 'os-homedir';


/**
 * return default config file path
 *
 * @return {string|null}
 */
function getDefaultConfigFile() {
  const homedir = osHomeDir();
  return homedir && path.join(homedir, '.aws', 'config');
}


/**
 * return config object load from config file.
 *
 * @param {Object} config config object
 * @param {Object} AWS AWS SDK module
 * @param {Object} opts options
 * @param {string} opts.profile profile name
 * @param {string} opts.configFile config file path
 * @return {Object}
 */
export default function fileConfigs(config, AWS, opts = {}) {
  const filename = opts.configFile || process.env.AWS_CONFIG_FILE || getDefaultConfigFile();
  if (!filename) {
    return config;
  }
  const prof = opts.profile || process.env.AWS_PROFILE || 'default';
  try {
    const conf = AWS.util.ini.parse(AWS.util.readFileSync(filename))[prof];
    if (typeof conf === 'object' && conf.region) {
      return Object.assign({}, config, {region: conf.region});
    }
    return config;
  } catch (err) {
    return config;
  }
}
