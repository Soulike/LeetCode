/*
 * @lc app=leetcode id=1829 lang=cpp
 *
 * [1829] Maximum XOR for Each Query
 */

#include <cinttypes>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> getMaximumXor(std::vector<int>& nums, int maximumBit) {
    const std::uint32_t kMaxK = 1 << maximumBit;
    std::vector<int> results(nums.size());
    std::uint32_t currentXor = 0;
    for (int i = 0; i < nums.size(); i++) {
      currentXor ^= static_cast<std::uint32_t>(nums[i]);
      results[nums.size() - 1 - i] = static_cast<int>(~currentXor % kMaxK);
    }

    return results;
  }
};
// @lc code=end

int main() {
  Solution sol;
  std::vector<int> nums = {0, 1, 1, 3};
  sol.getMaximumXor(nums, 2);
}
