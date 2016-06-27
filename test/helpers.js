import path from 'path';


/**
 * reset process.env
 */
function resetEnv() {
  delete process.env.HOME;
  delete process.env.USER;
  delete process.env.LOGNAME;
  delete process.env.AWS_REGION;
  delete process.env.AMAZON_REGION;
  delete process.env.AWS_CONFIG_FILE;
  delete process.env.AWS_PROFILE;
}


/**
 * Return fixture directory path
 *
 * @return {string}
 */
function fixtureDir() {
  return path.join(__dirname, 'fixtures');
}


export {
  resetEnv,
  fixtureDir
};
