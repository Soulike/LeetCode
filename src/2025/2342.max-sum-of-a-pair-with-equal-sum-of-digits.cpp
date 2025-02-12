/*
 * @lc app=leetcode id=2342 lang=cpp
 *
 * [2342] Max Sum of a Pair With Equal Sum of Digits
 */

#include <array>
#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maximumSum(const std::vector<int>& nums) {
    std::unordered_map<int, std::array<int, 2>> digitSumToLargest2Nums;

    for (const int num : nums) {
      const int numDigitSum = getDigitSum(num);
      std::array<int, 2>& largest2Nums = digitSumToLargest2Nums[numDigitSum];
      if (num > largest2Nums[0]) {
        largest2Nums[1] = largest2Nums[0];
        largest2Nums[0] = num;
      } else if (num > largest2Nums[1]) {
        largest2Nums[1] = num;
      }
    }

    int maximum2NumDigitSum = -1;
    for (const auto& digitSumToLargest2Num : digitSumToLargest2Nums) {
      const int digitSum = digitSumToLargest2Num.first;
      std::array<int, 2> largest2Nums = digitSumToLargest2Num.second;
      if (largest2Nums[1] == 0 || largest2Nums[0] == 0) {
        continue;
      }
      maximum2NumDigitSum =
          std::max(maximum2NumDigitSum, largest2Nums[0] + largest2Nums[1]);
    }

    return maximum2NumDigitSum;
  }

 private:
  static int getDigitSum(int num) {
    int digitSum = 0;
    while (num > 0) {
      digitSum += num % 10;
      num /= 10;
    }

    return digitSum;
  }
};
// @lc code=end
