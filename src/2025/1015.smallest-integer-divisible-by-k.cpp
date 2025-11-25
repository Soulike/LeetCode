/*
 * @lc app=leetcode id=1015 lang=cpp
 *
 * [1015] Smallest Integer Divisible by K
 */

// @lc code=start
class Solution {
 public:
  int smallestRepunitDivByK(const int k) {
    if (k % 2 == 0 || k % 5 == 0) {
      return -1;
    }
    int length = 1;
    int num = 1;
    while (true) {
      if (num % k == 0) {
        return length;
      }
      num = (num * 10 + 1) % k;
      length++;
    }
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.smallestRepunitDivByK(1141);
}