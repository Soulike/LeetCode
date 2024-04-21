/*
 * @lc app=leetcode id=832 lang=javascript
 *
 * [832] Flipping an Image
 */

// @lc code=start
/**
 * @param {number[][]} image
 * @return {number[][]}
 */
var flipAndInvertImage = function (image) {
  for (const row of image) {
    row.reverse();
    for (let i = 0; i < row.length; i++) {
      row[i] = ~row[i] & 0b1;
    }
  }

  return image;
};
// @lc code=end
