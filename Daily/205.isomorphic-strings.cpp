/*
 * @lc app=leetcode id=205 lang=cpp
 *
 * [205] Isomorphic Strings
 */
#include <map>
#include <string>
#include <iostream>

using std::string;
using std::unordered_map;

// @lc code=start
class Solution {
 public:
  bool isIsomorphic(string s, string t) {
    unordered_map<char, char> charToMapsTo;
    unordered_map<char, char> charToMappedFrom;

    const int N = s.size();
    for (int i = 0; i < N; i++) {
      char sChar = s[i];
      char tChar = t[i];
      if (charToMapsTo.find(sChar) != charToMapsTo.end()) {
        if (charToMapsTo[sChar] != tChar) {
          // 1 -> N
          return false;
        }
      } else if (charToMappedFrom.find(tChar) != charToMappedFrom.end()) {
        // N -> 1
        return false;
      } else {
        charToMapsTo[sChar] = tChar;
        charToMappedFrom[tChar] = sChar;
      }
    }

    return true;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.isIsomorphic("badc", "baba");
}