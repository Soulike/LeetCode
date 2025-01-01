/*
 * @lc app=leetcode id=1863 lang=cpp
 *
 * [1863] Sum of All Subset XOR Totals
 */
#include <vector>

using std::vector;

// @lc code=start
class Solution {
 public:
  int subsetXORSum(const vector<int>& nums) {
    backtrack(nums, 0);
    return xorSum;
  }

 private:
  int xorSum = 0;
  int currentXor = 0;

  void backtrack(const vector<int>& nums, int startIndex) {
    if (startIndex == nums.size()) {
      return;
    }

    for (int i = startIndex; i < nums.size(); i++) {
      currentXor ^= nums[i];
      xorSum += currentXor;
      backtrack(nums, i + 1);
      currentXor ^= nums[i];
    }
  }
};
// @lc code=end
