/*
 * @lc app=leetcode id=409 lang=cpp
 *
 * [409] Longest Palindrome
 */

#include <string>
#include <unordered_map>

using std::string;
using std::unordered_map;

// @lc code=start
class Solution {
 public:
  int longestPalindrome(const string& s) {
    unordered_map<char, int> letterToCount;
    for (const auto& c : s) {
      letterToCount[c]++;
    }

    bool hasOddCount = false;
    int palindromeLength = 0;

    for (const auto& letterAndCount : letterToCount) {
      palindromeLength += (letterAndCount.second / 2) * 2;
      hasOddCount = hasOddCount || letterAndCount.second % 2;
    }

    palindromeLength += hasOddCount;

    return palindromeLength;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.longestPalindrome("ccd");
}