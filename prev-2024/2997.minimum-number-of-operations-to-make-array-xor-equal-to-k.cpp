/*
 * @lc app=leetcode id=2997 lang=cpp
 *
 * [2997] Minimum Number of Operations to Make Array XOR Equal to K
 */
#include <vector>

using std::vector;

// @lc code=start
class Solution {
 public:
  int minOperations(vector<int>& nums, int k) {
    int xorResult = 0;
    for (const int& num : nums) {
      xorResult ^= num;
    }
    xorResult ^= k;

    int bitCount = 0;
    while (xorResult > 0) {
      if (xorResult & 1) {
        bitCount++;
      }
      xorResult >>= 1;
    }

    return bitCount;
  }
};
// @lc code=end
