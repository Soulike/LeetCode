/*
 * @lc app=leetcode id=2108 lang=cpp
 *
 * [2108] Find First Palindromic String in the Array
 */
#include <string>
#include <vector>
using std::string;
using std::vector;

// @lc code=start
class Solution {
 public:
  string firstPalindrome(vector<string>& words) {
    for (const auto& word : words) {
      if (this->isPalindrome(word)) {
        return word;
      }
    }
    return "";
  }

  bool isPalindrome(const string& str) {
    int left = 0;
    int right = str.length() - 1;
    while (left < right) {
      if (str[left] != str[right]) {
        return false;
      }
      left++;
      right--;
    }
    return true;
  }
};
// @lc code=end
