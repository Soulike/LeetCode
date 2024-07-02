/*
 * @lc app=leetcode id=350 lang=cpp
 *
 * [350] Intersection of Two Arrays II
 */

#include <cmath>
#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> intersect(std::vector<int>& nums1, std::vector<int>& nums2) {
    std::unordered_map<int, int> nums1NumToFreqs;
    for (const auto& num : nums1) {
      nums1NumToFreqs[num]++;
    }

    std::vector<int> intersectedNums;
    for (const auto& num : nums2) {
      if (nums1NumToFreqs[num] > 0) {
        nums1NumToFreqs[num]--;
        intersectedNums.push_back(num);
      }
    }

    return intersectedNums;
  }
};
// @lc code=end
