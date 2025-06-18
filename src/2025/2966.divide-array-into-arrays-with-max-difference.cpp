/*
 * @lc app=leetcode id=2966 lang=cpp
 *
 * [2966] Divide Array Into Arrays With Max Difference
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<std::vector<int>> divideArray(std::vector<int>& nums,
                                            const int k) {
    std::ranges::sort(nums);
    std::vector<std::vector<int>> groups;
    for (int i = 0; i < nums.size(); i += 3) {
      if (nums[i + 2] - nums[i] <= k) {
        groups.push_back({nums[i], nums[i + 1], nums[i + 2]});
      } else {
        return {};
      }
    }

    return groups;
  }
};
// @lc code=end
