/*
 * @lc app=leetcode id=3867 lang=cpp
 *
 * [3867] Sum of GCD of Formed Pairs
 */

#include <algorithm>
#include <numeric>
#include <vector>

// @lc code=start
class Solution {
 public:
  long long gcdSum(const std::vector<int>& nums) {
    int max_num = nums[0];
    std::vector<int> prefix_gcd(nums.size(), -1);
    for (int i = 0; i < nums.size(); i++) {
      const int num = nums[i];
      max_num = std::max(max_num, num);
      prefix_gcd[i] = CalculateGCD(num, max_num);
    }

    std::ranges::sort(prefix_gcd);

    long long pairs_sum = 0;
    int left = 0;
    int right = prefix_gcd.size() - 1;

    while (left < right) {
      pairs_sum += CalculateGCD(prefix_gcd[left], prefix_gcd[right]);
      left++;
      right--;
    }

    return pairs_sum;
  }

 private:
  static int CalculateGCD(int num1, int num2) {
    if (num1 < num2) {
      std::swap(num1, num2);
    }

    while (num2 > 0) {
      num1 = num1 % num2;
      std::swap(num1, num2);
    }

    return num1;
  }
};
// @lc code=end
