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

    std::unordered_map<int, int> nums2NumToFreqs;
    for (const auto& num : nums2) {
      nums2NumToFreqs[num]++;
    }

    std::unordered_map<int, int> intersectNumToFreqs;
    for (const auto& num1ToFreq : nums1NumToFreqs) {
      const auto num = num1ToFreq.first;

      const auto num1Freq = num1ToFreq.second;
      const auto num2Freq = nums2NumToFreqs[num];

      const auto intersectedNumFreq = std::min(num1Freq, num2Freq);
      if (intersectedNumFreq > 0) {
        intersectNumToFreqs[num] = intersectedNumFreq;
      }
    }

    std::vector<int> intersectedNums;
    for (const auto& numToFreq : intersectNumToFreqs) {
      const auto num = numToFreq.first;
      const auto freq = numToFreq.second;
      std::vector<int> nums(freq, num);
      intersectedNums.insert(intersectedNums.end(), nums.begin(), nums.end());
    }

    return intersectedNums;
  }
};
// @lc code=end
