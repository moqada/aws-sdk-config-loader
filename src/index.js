import environmentConfigs from './configs/environmentConfigs';
import fileConfigs from './configs/fileConfigs';
import configProvider from './configProvider';

/**
 * initialize AWS.config using regionProvider
 *
 * @param {Object} AWS AWS SDK module
 * @param {Object} opts options
 * @param {string} opts.configFile config file path
 * @param {string} opts.profile profile name
 */
export default function loader(AWS, opts = {}) {
  AWS.util.update(AWS.Config.prototype.keys, configProvider(AWS, [
    fileConfigs,
    environmentConfigs
  ], opts));
  AWS.config = new AWS.Config();
}
