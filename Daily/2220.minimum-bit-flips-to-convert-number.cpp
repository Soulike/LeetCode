/*
 * @lc app=leetcode id=2220 lang=cpp
 *
 * [2220] Minimum Bit Flips to Convert Number
 */

// @lc code=start
class Solution {
 public:
  int minBitFlips(int start, int goal) {
    const int mask = start ^ goal;
    return countBits(mask);
  }

 private:
  int countBits(int num) {
    int count = 0;
    while (num > 0) {
      count += num & 0b1;
      num >>= 1;
    }
    return count;
  }
};
// @lc code=end
