/*
 * @lc app=leetcode id=1980 lang=cpp
 *
 * [1980] Find Unique Binary String
 */

#include <bitset>
#include <cinttypes>
#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::string findDifferentBinaryString(std::vector<std::string>& nums) {
    const size_t kBinaryStringLength = nums[0].size();
    const std::uint_fast16_t kPossibleMaxNumber =
        (1 << kBinaryStringLength) - 1;
    std::vector<bool> numberFound(kPossibleMaxNumber + 1, false);
    for (const std::string& num : nums) {
      numberFound[binaryStringToNumber(num)] = true;
    }

    for (int i = 0; i < numberFound.size(); i++) {
      if (!numberFound[i]) {
        return numberToBinaryString(i, kBinaryStringLength);
      }
    }

    return "";
  }

 private:
  static std::uint_fast16_t binaryStringToNumber(
      const std::string& binaryString) {
    std::uint_fast16_t number = 0;
    int currentPower = 1;
    for (int i = static_cast<int>(binaryString.size()) - 1; i >= 0; i--) {
      number += (binaryString[i] - '0') * currentPower;
      currentPower <<= 1;
    }
    return number;
  }

  static std::string numberToBinaryString(const std::uint_fast16_t number,
                                          const size_t length) {
    const std::string numberString = std::bitset<16>(number).to_string();
    return numberString.substr(numberString.size() - length, length);
  }
};
// @lc code=end

int main() {
  std::vector<std::string> nums = {"01", "10"};
  Solution sol;
  sol.findDifferentBinaryString(nums);
}
