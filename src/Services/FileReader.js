import fs from 'fs';

export default class FileReader {
  /**
   * Sync read file content from disk
   *
   * @param path
   * @param encoding
   * @returns {*}
   */
  static read(path, encoding = 'utf-8') {
    return fs.readFileSync(path, { encoding });
  }

  /**
   * Check exist file with data in disk
   *
   * @param path
   * @returns {boolean}
   */
  static exists(path) {
    try {
      fs.accessSync(path);
      return true;
    } catch (e) {
      return false;
    }
  }
}
