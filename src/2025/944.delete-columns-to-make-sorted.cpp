/*
 * @lc app=leetcode id=944 lang=cpp
 *
 * [944] Delete Columns to Make Sorted
 */

#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minDeletionSize(const std::vector<std::string>& strs) {
    const std::size_t row_count = strs.size();
    const std::size_t column_count = strs[0].size();
    int deletion_size = 0;
    for (std::size_t column = 0; column < column_count; column++) {
      for (std::size_t row = 1; row < row_count; row++) {
        if (strs[row - 1][column] > strs[row][column]) {
          deletion_size++;
          break;
        }
      }
    }

    return deletion_size;
  }
};
// @lc code=end
