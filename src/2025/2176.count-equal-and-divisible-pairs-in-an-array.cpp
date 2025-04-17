/*
 * @lc app=leetcode id=2176 lang=cpp
 *
 * [2176] Count Equal and Divisible Pairs in an Array
 */

#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  int countPairs(std::vector<int>& nums, int k) {
    int pairNumber = 0;
    for (int i = 0; i < nums.size(); i++) {
      for (int j = i + 1; j < nums.size(); j++) {
        pairNumber += nums[i] == nums[j] && (i * j) % k == 0;
      }
    }

    return pairNumber;
  }
};
// @lc code=end
