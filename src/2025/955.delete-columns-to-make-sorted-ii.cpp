/*
 * @lc app=leetcode id=955 lang=cpp
 *
 * [955] Delete Columns to Make Sorted II
 */

#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minDeletionSize(const std::vector<std::string>& strs) {
    int min_deletion_size = 0;
    // For strs[i], is_str_less_than_prev_str[i] == true means we have known
    // strs[i-1] < strs[i]. So we don't need further comparison.
    std::vector<bool> is_str_less_than_prev_str(strs.size(), false);
    is_str_less_than_prev_str[0] = true;
    int undetermined_str_count = strs.size() - 1;

    for (int j = 0; j < strs[0].size(); j++) {
      std::vector<bool> next_is_str_less_than_prev_str =
          is_str_less_than_prev_str;
      int next_undetermined_str_count = undetermined_str_count;
      bool is_column_deleted = false;

      for (int i = 1; i < strs.size(); i++) {
        if (is_str_less_than_prev_str[i]) {
          // Previous column has ensured strs[i - 1] < strs[i]
          continue;
        }
        if (strs[i - 1][j] > strs[i][j]) {
          // The column is deleted.
          min_deletion_size++;
          is_column_deleted = true;
          break;
        }
        if (strs[i - 1][j] < strs[i][j]) {
          // If not deleted, the column can ensure strs[i - 1] < strs[i].
          next_is_str_less_than_prev_str[i] = true;
          next_undetermined_str_count--;
        } else {
          // The column can not ensure strs[i - 1] < strs[i].
          // next_is_str_less_than_prev_str[i] = false;
        }
      }

      if (!is_column_deleted) {
        // The column is not deleted, still effective for further comparison.
        is_str_less_than_prev_str = std::move(next_is_str_less_than_prev_str);
        undetermined_str_count = next_undetermined_str_count;
      } else {
        // The column is deleted. No effect for further comparison. Keep
        // is_str_less_than_prev_str and undetermined_str_count.
      }

      if (undetermined_str_count == 0) {
        break;
      }
    }

    return min_deletion_size;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.minDeletionSize({"vdy", "vei", "zvc", "zld"});
}