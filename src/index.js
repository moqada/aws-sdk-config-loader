import environmentConfigs from './configs/environmentConfigs';
import fileConfigs from './configs/fileConfigs';
import configProvider from './configProvider';

/**
/**
 * initialize AWS.config using regionProvider
 *
 * @param {Object} AWS AWS SDK module
 */
export default function loader(AWS) {
  AWS.util.update(AWS.Config.prototype.keys, configProvider(AWS, [
    fileConfigs,
    environmentConfigs
  ]));
  AWS.config = new AWS.Config();
}
