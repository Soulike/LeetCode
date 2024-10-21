/*
 * @lc app=leetcode id=1593 lang=cpp
 *
 * [1593] Split a String Into the Max Number of Unique Substrings
 */
#include <string>
#include <unordered_set>

// @lc code=start
class Solution {
 public:
  int maxUniqueSplit(const std::string& s) {
    backtrack(s, 0);
    return maxSplitNumber;
  }

 private:
  void backtrack(const std::string& s, int beginIndex) {
    if (beginIndex == s.size()) {
      maxSplitNumber =
          std::max(maxSplitNumber, static_cast<int>(usedSubstrings.size()));
      return;
    }
    for (int i = beginIndex + 1; i <= s.size(); i++) {
      std::string substring = s.substr(beginIndex, i - beginIndex);
      if (usedSubstrings.contains(substring)) {
        continue;
      }

      usedSubstrings.insert(substring);
      backtrack(s, i);
      usedSubstrings.erase(substring);
    }
  }

 private:
  std::unordered_set<std::string> usedSubstrings;
  int maxSplitNumber = 0;
};
// @lc code=end

int main() {
  Solution sol;
  sol.maxUniqueSplit("aa");
}
