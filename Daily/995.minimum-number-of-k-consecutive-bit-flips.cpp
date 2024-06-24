/*
 * @lc app=leetcode id=995 lang=cpp
 *
 * [995] Minimum Number of K Consecutive Bit Flips
 */

#include <queue>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minKBitFlips(std::vector<int>& nums, int k) {
    std::queue<int> flips;
    int result = 0;
    for (auto i = 0; i < nums.size(); i++) {
      /*
       nums[i] == 1 && flips.size() % 2 == 1 ||
       nums[i] == 0 && flips.size() % 2 == 0
      */
      if (nums[i] != (flips.size() % 2 ? 0 : 1)) {
        result++;
        flips.push(i + k - 1);
      }
      if (!flips.empty() && flips.front() <= i) {
        flips.pop();
      }
    }
    return flips.empty() ? result : -1;
  }
};
// @lc code=end
