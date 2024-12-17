/*
 * @lc app=leetcode id=2182 lang=cpp
 *
 * [2182] Construct String With Repeat Limit
 */
#include <map>
#include <string>

// @lc code=start
class Solution {
 public:
  std::string repeatLimitedString(const std::string& s, const int repeatLimit) {
    std::map<char, uint_fast16_t, std::greater<> > charToFreq;
    for (const char c : s) {
      charToFreq[c]++;
    }

    std::string result;
    result.reserve(s.size());

    char currentChar = '\0';
    int currentRepeat = 0;

    while (!charToFreq.empty()) {
      const char topChar = charToFreq.cbegin()->first;
      if (topChar != currentChar) {
        // Append new char until no char is available or reaching the limit
        currentChar = topChar;
        currentRepeat = 0;
        while (currentRepeat < repeatLimit) {
          result += currentChar;
          currentRepeat++;
          charToFreq[currentChar]--;
          if (charToFreq[currentChar] == 0) {
            charToFreq.erase(currentChar);
            break;
          }
        }
      } else {
        // If the branch is reached, it means `topChar` reaches the limit (if
        // not, `topChar` would have changed). We need to append a
        // second-largest char.
        const auto topPair = *charToFreq.cbegin();
        charToFreq.erase(topChar);
        if (charToFreq.empty()) {
          break;
        }
        const char secondTopChar = charToFreq.cbegin()->first;
        currentChar = secondTopChar;
        result += currentChar;
        currentRepeat = 1;
        charToFreq[currentChar]--;
        if (charToFreq[currentChar] == 0) {
          charToFreq.erase(currentChar);
        }
        charToFreq.emplace(topPair);
      }
    }

    return result;
  }
};

// @lc code=end

int main() {
  Solution sol;
  sol.repeatLimitedString("cczazcc", 3);
}
