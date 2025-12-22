/*
 * @lc app=leetcode id=960 lang=cpp
 *
 * [960] Delete Columns to Make Sorted III
 */

#include <string>
#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minDeletionSize(const std::vector<std::string>& strs) {
    const int col_count = strs[0].size();
    // dp[i]: ends with column i, the LIS of cols
    std::vector<int> dp(col_count, 1);
    for (int j = 1; j < col_count; j++) {
      for (int i = j - 1; i >= 0; i--) {
        if (IsInLexicographicOrder(strs, i, j)) {
          dp[j] = std::max(dp[j], dp[i] + 1);
        }
      }
    }

    return col_count - (*std::max_element(dp.cbegin(), dp.cend()));
  }

 private:
  static bool IsInLexicographicOrder(const std::vector<std::string>& strs,
                                     const int col1,
                                     const int col2) {
    for (int i = 0; i < strs.size(); i++) {
      if (strs[i][col1] > strs[i][col2]) {
        return false;
      }
    }

    return true;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.minDeletionSize({"babca", "bbazb"});
}