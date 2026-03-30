/*
 * @lc app=leetcode id=2840 lang=cpp
 *
 * [2840] Check if Strings Can be Made Equal With Operations II
 */

#include <string>
#include <unordered_map>

// @lc code=start
class Solution {
 public:
  bool checkStrings(std::string s1, std::string s2) {
    std::unordered_map<char, int> s1_odd_freq, s1_even_freq, s2_even_freq,
        s2_odd_freq;
    for (int i = 0; i < s1.size(); i++) {
      const char c = s1[i];
      s1_odd_freq[c] += i % 2 == 1;
      s1_even_freq[c] += i % 2 == 0;
    }
    for (int i = 0; i < s2.size(); i++) {
      const char c = s2[i];
      s2_odd_freq[c] += i % 2 == 1;
      s2_even_freq[c] += i % 2 == 0;
    }

    return s1_even_freq == s2_even_freq && s1_odd_freq == s2_odd_freq;
  }
};
// @lc code=end
