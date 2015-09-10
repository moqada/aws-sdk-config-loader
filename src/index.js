import path from 'path';


/**
 * return region string load from config file or environment variables.
 *
 * @param {Object} AWS AWS SDK module
 * @return {string|undefined}
 */
function regionProvider(AWS) {
  let region = process.env.AWS_REGION || process.env.AMAZON_REGION;
  if (region) {
    return region;
  }
  const filename = (
    process.env.AWS_CONFIG_FILE
    || process.env.HOME
    && path.join(process.env.HOME, '.aws', 'config')
  );
  if (!filename) {
    return region;
  }
  try {
    const profile = process.env.AWS_PROFILE || 'default';
    const configs = AWS.util.ini.parse(AWS.util.readFileSync(filename));
    if (typeof configs[profile] === 'object') {
      region = configs[profile].region;
    }
  } finally {
    return region;
  }
}


/**
 * initialize AWS.config using regionProvider
 *
 * @param {Object} AWS AWS SDK module
 */
export default function loader(AWS) {
  AWS.util.update(AWS.Config.prototype.keys, {
    region: regionProvider(AWS)
  });
  AWS.config = new AWS.Config();
}


export {loader, regionProvider};
