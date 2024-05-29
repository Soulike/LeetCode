/*
 * @lc app=leetcode id=1404 lang=cpp
 *
 * [1404] Number of Steps to Reduce a Number in Binary Representation to One
 */

#include <string>

using std::string;

// @lc code=start
class Solution {
 public:
  int numSteps(string s) {
    int N = s.size();

    int operations = 0;
    int carry = 0;
    for (int i = N - 1; i > 0; i--) {
      if (((s[i] - '0') + carry) % 2) {
        operations += 2;
        carry = 1;
      } else {
        operations++;
      }
    }

    return operations + carry;
  }
};
// @lc code=end
