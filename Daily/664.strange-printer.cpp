/*
 * @lc app=leetcode id=664 lang=cpp
 *
 * [664] Strange Printer
 */
#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  int strangePrinter(const std::string& s) {
    std::string sWithoutConsecutiveDuplicates;
    for (const char c : s) {
      if (sWithoutConsecutiveDuplicates.empty() ||
          sWithoutConsecutiveDuplicates.back() != c) {
        sWithoutConsecutiveDuplicates.push_back(c);
      }
    }

    const int length = static_cast<int>(sWithoutConsecutiveDuplicates.size());

    std::vector<std::vector<int>> memo(length, std::vector<int>(length, -1));

    int result = helper(sWithoutConsecutiveDuplicates, 0, length - 1, memo);
    return result;
  }

 private:
  int helper(const std::string& s,
             int startIndex,
             int endIndex,
             std::vector<std::vector<int>>& memo) {
    if (startIndex > endIndex) {
      return 0;
    }

    if (memo[startIndex][endIndex] != -1) {
      return memo[startIndex][endIndex];
    }

    int steps = 1 + helper(s, startIndex + 1, endIndex, memo);
    for (int i = startIndex + 1; i <= endIndex; i++) {
      if (s[i] == s[startIndex]) {
        // Here, if s[i] == s[startIndex], we try to print s[i] along with
        // s[startIndex], and make following prints overwrite it.
        // This can reduce the steps to
        // print s[startIndex] and s[i] respectively.
        steps = std::min(steps, helper(s, startIndex, i - 1, memo) +
                                    helper(s, i + 1, endIndex, memo));
      }
    }

    memo[startIndex][endIndex] = steps;
    return steps;
  }
};
// @lc code=end
