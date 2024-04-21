/*
 * @lc app=leetcode id=1750 lang=cpp
 *
 * [1750] Minimum Length of String After Deleting Similar Ends
 */

#include <string>
using std::string;

// @lc code=start
class Solution {
 public:
  int minimumLength(string s) {
    string::size_type left = 0;
    string::size_type right = s.size() - 1;

    while (left < right && s[left] == s[right]) {
      char currentChar = s[left];
      while (s[left] == currentChar && left <= right) {
        left++;
      }

      while (s[right] == currentChar && left <= right) {
        right--;
      }
    }

    return right - left + 1;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.minimumLength("ccbcbcbcc");
}