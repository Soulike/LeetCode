/*
 * @lc app=leetcode id=71 lang=javascript
 *
 * [71] Simplify Path
 */

// @lc code=start
/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function (path) {
  const directories = path.split('/');

  /**
   * 遇到空或者.，无视
   * 遇到非空，保留
   * 遇到 ..，删除自己和上一个
   */

  const simplifiedDirectories = [];

  for (const directory of directories) {
    if (directory.length === 0 || directory === '.') {
      continue;
    } else if (directory === '..') {
      simplifiedDirectories.pop();
    } else if (directory.length > 0) {
      simplifiedDirectories.push(directory);
    }
  }

  return '/' + simplifiedDirectories.join('/');
};
// @lc code=end
