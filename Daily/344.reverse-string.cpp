/*
 * @lc app=leetcode id=344 lang=cpp
 *
 * [344] Reverse String
 */

#include <vector>

using std::vector;

// @lc code=start
class Solution {
 public:
  void reverseString(vector<char>& s) {
    int left = 0;
    int right = s.size() - 1;

    while (left < right) {
      const char temp = s[left];
      s[left] = s[right];
      s[right] = temp;
      left++;
      right--;
    }
  }
};
// @lc code=end
