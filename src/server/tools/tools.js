import path from 'path';

/**
 * Returns the Path of the public folder
 *
 * **Do not change if you don't know what you're doing!!**
 */
function publicPath() {
  if (process.env.FrontEnd) {
    return path.resolve(__dirname, './../', 'public/dist');
  }
  return path.resolve(__dirname, './../', 'public/prod');
}
export default { publicPath };
