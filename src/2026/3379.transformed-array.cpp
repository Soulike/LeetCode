/*
 * @lc app=leetcode id=3379 lang=cpp
 *
 * [3379] Transformed Array
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> constructTransformedArray(const std::vector<int>& nums) {
    const int kNumsSize = static_cast<int>(nums.size());
    std::vector<int> result(nums.size());
    for (int i = 0; i < nums.size(); i++) {
      result[i] = nums[(i + nums[i] % kNumsSize + kNumsSize) % kNumsSize];
    }
    return result;
  }
};
// @lc code=end

int main() {
  std::vector<int> nums = {-10, -10, -4};
  Solution sol;
  sol.constructTransformedArray(nums);
}