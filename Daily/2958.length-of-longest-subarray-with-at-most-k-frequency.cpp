/*
 * @lc app=leetcode id=2958 lang=cpp
 *
 * [2958] Length of Longest Subarray With at Most K Frequency
 */
#include <cmath>
#include <map>
#include <vector>
#include <iostream>

using std::unordered_map;
using std::vector;

// @lc code=start
class Solution {
 public:
  int maxSubarrayLength(const vector<int>& nums, int k) {
    int left = 0;
    int right = 0;
    unordered_map<int, int> numToFreq;
    int maxSubArrayLength = 0;

    while (right < nums.size()) {
      int num = nums[right];
      numToFreq[num]++;

      while (numToFreq[num] > k && left <= right) {
        numToFreq[nums[left]]--;
        left++;
      }
      right++;
      maxSubArrayLength = std::max(maxSubArrayLength, right - left);
    }

    return maxSubArrayLength;
  }
};
// @lc code=end
