/*
 * @lc app=leetcode id=179 lang=cpp
 *
 * [179] Largest Number
 */
#include <algorithm>
#include <numeric>
#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::string largestNumber(std::vector<int>& nums) {
    std::vector<std::string> numStrings(nums.size());
    for (int i = 0; i < nums.size(); i++) {
      numStrings[i] = std::to_string(nums[i]);
    }

    std::sort(numStrings.begin(), numStrings.end(),
              [](const std::string& num1, const std::string& num2) {
                return num1 + num2 > num2 + num1;
              });

    std::string result =
        std::accumulate(numStrings.cbegin(), numStrings.cend(), std::string());
    if (result[0] == '0') {
      return "0";
    }
    return result;
  }
};
// @lc code=end
