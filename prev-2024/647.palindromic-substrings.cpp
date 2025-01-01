/*
 * @lc app=leetcode id=647 lang=cpp
 *
 * [647] Palindromic Substrings
 */
#include <algorithm>
#include <string>
#include <vector>
using std::string;
using std::vector;

// @lc code=start
/**
 * isPalindrome[i][j]: s[i] - s[j] is palindrome
 *
 * base case
 * isPalindrome[i][i] = true
 *
 * isPalindrome[i][j] = s[i] == s[j] && isPalindrome[i+1][j-1]
 */
class Solution {
 public:
  int countSubstrings(string s) {
    int palindromeSubstringCount = s.size();

    bool** isPalindrome = new bool*[2];
    for (int i = 0; i < 2; i++) {
      isPalindrome[i] = new bool[s.size()];
    }

    for (int i = s.size() - 1; i >= 0; i--) {
      isPalindrome[i % 2][i] = true;

      for (int j = i + 1; j < s.size(); j++) {
        if (i + 1 == j) {
          isPalindrome[i % 2][j] = s[i] == s[j];
        } else {
          isPalindrome[i % 2][j] =
              s[i] == s[j] && isPalindrome[(i + 1) % 2][j - 1];
        }

        if (isPalindrome[i % 2][j]) {
          palindromeSubstringCount++;
        }
      }
    }

    for (int i = 0; i < 2; i++) {
      delete[] isPalindrome[i];
    }
    delete[] isPalindrome;

    return palindromeSubstringCount;
  }
};
// @lc code=end
