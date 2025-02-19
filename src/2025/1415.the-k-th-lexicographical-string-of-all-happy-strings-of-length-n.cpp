/*
 * @lc app=leetcode id=1415 lang=cpp
 *
 * [1415] The k-th Lexicographical String of All Happy Strings of Length n
 */

#include <algorithm>
#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::string getHappyString(const int n, const int k) {
    std::string currentString;
    std::vector<std::string> happyStrings;
    backtrack(n, currentString, happyStrings);
    std::sort(happyStrings.begin(), happyStrings.end());
    return happyStrings.size() < k ? "" : happyStrings[k - 1];
  }

 private:
  static constexpr std::array<char, 3> kCandidateLetters = {'a', 'b', 'c'};

  static void backtrack(const size_t targetLength,
                        std::string& currentString,
                        std::vector<std::string>& happyStrings) {
    if (currentString.size() == targetLength) {
      happyStrings.push_back(currentString);
      return;
    }

    for (const char candidateLetter : kCandidateLetters) {
      if (!currentString.empty() && candidateLetter == currentString.back()) {
        continue;
      }

      currentString.push_back(candidateLetter);
      backtrack(targetLength, currentString, happyStrings);
      currentString.pop_back();
    }
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.getHappyString(1, 3);
}
