/*
 * @lc app=leetcode id=2698 lang=cpp
 *
 * [2698] Find the Punishment Number of an Integer
 */

#include <string>
#include <string_view>

// @lc code=start
class Solution {
 public:
  int punishmentNumber(int n) {
    int punishmentNumber = 0;
    for (int i = 1; i <= n; i++) {
      if (canSplitSumToEqualTarget(std::to_string(i * i), i)) {
        punishmentNumber += (i * i);
      }
    }

    return punishmentNumber;
  }

 private:
  /**
   * @return Whether we can split `numString` into multiple parts and make their
   * sum to be `target`.
   */
  static bool canSplitSumToEqualTarget(std::string_view numString,
                                       const int target) {
    if (numString.empty() && target == 0) {
      return true;
    }

    if (target < 0) {
      return false;
    }

    for (int i = 0; i < numString.size(); i++) {
      std::string_view firstPartNumString = numString.substr(0, i + 1);
      const int firstPartNum = std::stoi(std::string(firstPartNumString));
      std::string_view remainPartNumString = numString.substr(i + 1);
      if (canSplitSumToEqualTarget(remainPartNumString,
                                   target - firstPartNum)) {
        return true;
      }
    }

    return false;
  }
};
// @lc code=end
