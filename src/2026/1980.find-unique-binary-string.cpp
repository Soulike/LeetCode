/*
 * @lc app=leetcode id=1980 lang=cpp
 *
 * [1980] Find Unique Binary String
 */

#include <algorithm>
#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::string findDifferentBinaryString(std::vector<std::string>& nums) {
    const size_t n = nums.size();
    std::ranges::sort(nums.begin(), nums.end());
    for (std::uint16_t i = 0; i < n; i++) {
      if (ConvertBinaryStringToUInt16(nums[i]) != i) {
        return ConvertUInt16ToBinaryString(i, n);
      }
    }

    return ConvertUInt16ToBinaryString(n, n);
  }

 private:
  static std::uint16_t ConvertBinaryStringToUInt16(
      const std::string_view binary_string) {
    std::uint16_t result = 0;
    for (const char c : binary_string) {
      result <<= 1;
      result += c - '0';
    }

    return result;
  }

  static std::string ConvertUInt16ToBinaryString(std::uint16_t num,
                                                 const size_t length) {
    std::string result;
    result.reserve(length);
    while (num > 0) {
      result.push_back((num & 0b1) + '0');
      num /= 2;
    }
    if (result.size() < length) {
      const std::string padding(length - result.size(), '0');
      result.append(padding);
    }

    std::ranges::reverse(result);

    return result;
  }
};
// @lc code=end

int main() {
  Solution sol;
  std::vector<std::string> nums = {"00", "01"};
  sol.findDifferentBinaryString(nums);
}
