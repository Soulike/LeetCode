/*
 * @lc app=leetcode id=260 lang=cpp
 *
 * [260] Single Number III
 */

#include <algorithm>
#include <numeric>
#include <vector>

using std::vector;

// @lc code=start
class Solution {
 public:
  vector<int> singleNumber(vector<int>& nums) {
    // Pass 1 :
    // Get the XOR of the two numbers we need to find
    uint32_t diff =
        std::accumulate(nums.begin(), nums.end(), 0, std::bit_xor<int>());
    // Find one of set bit
    // Here we choose last set bit
    diff &= (~diff + 1);

    // Pass 2 :
    vector<int> rets = {0, 0};
    for (int num : nums) {
      // The contribution to the set bit tells the two numbers
      if ((num & diff) == 0) {
        rets[0] ^= num;
      } else {
        rets[1] ^= num;
      }
    }
    return rets;
  }
};
// @lc code=end
