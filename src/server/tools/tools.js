import path from 'path';

/**
 * Returns the Path of the public folder
 */
function publicPath() {
  if (process.env.FrontEnd) {
    return path.resolve(__dirname, './../', 'public/dist');
  }
  return path.resolve(__dirname, './../', 'public/prod');
}
export default { publicPath };
