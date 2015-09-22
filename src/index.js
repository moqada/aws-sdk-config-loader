import environmentConfigs from './configs/environmentConfigs';
import fileConfigs from './configs/fileConfigs';
import configProvider from './configProvider';

/**
 * initialize AWS.config using regionProvider
 *
 * @param {Object} AWS AWS SDK module
 * @param {Object} opts options
 * @param {string} opts.profile profile name
 * @param {boolean} opts.noReflectCredentials opts.profile doesnot reflect credentials
 */
export default function loader(AWS, opts = {}) {
  AWS.util.update(AWS.Config.prototype.keys, configProvider(AWS, [
    fileConfigs,
    environmentConfigs
  ], opts));
  if (!opts.noReflectCredentials) {
    AWS.util.update(AWS.Config.prototype.keys, {
      credentials: () => {
        let credentials = null;
        new AWS.CredentialProviderChain([
          () => new AWS.EnvironmentCredentials('AWS'),
          () => new AWS.EnvironmentCredentials('AMAZON'),
          () => new AWS.SharedIniFileCredentials({profile: opts.profile})
        ]).resolve((err, creds) => {
          if (!err) {
            credentials = creds;
          }
        });
        return credentials;
      }
    });
  }
  AWS.config = new AWS.Config();
}
