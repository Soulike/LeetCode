/*
 * @lc app=leetcode id=1915 lang=cpp
 *
 * [1915] Number of Wonderful Substrings
 */
#include <cctype>
#include <string>
#include <unordered_map>

using std::string;
using std::unordered_map;

// @lc code=start
class Solution {
 public:
  long long wonderfulSubstrings(string word) {
    long long result = 0;
    unordered_map<int_fast16_t, int> prefixBitmaskToCount;
    // insert empty string here to handle single chars
    prefixBitmaskToCount.insert({0, 1});
    int_fast16_t currentPrefixBitmask = 0;
    for (int i = 0; i < word.size(); i++) {
      int_fast16_t mask = 1 << (word[i] - 'a');
      currentPrefixBitmask ^= mask;

      result += prefixBitmaskToCount[currentPrefixBitmask];
      // we want other prefix bitmasks having only single bit difference
      for (int i = 0; i < 10; i++) {
        int_fast16_t wantedBitmask = currentPrefixBitmask ^ (1 << i);
        result += prefixBitmaskToCount[wantedBitmask];
      }

      prefixBitmaskToCount[currentPrefixBitmask]++;
    }

    return result;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.wonderfulSubstrings("aabb");
}