/*
 * @lc app=leetcode id=1079 lang=cpp
 *
 * [1079] Letter Tile Possibilities
 */

#include <algorithm>

#include <array>
#include <string>

// @lc code=start
class Solution {
 public:
  int numTilePossibilities(const std::string& tiles) {
    std::array<int, 26> tileNumberOfLetters = {};
    for (const char letter : tiles) {
      tileNumberOfLetters[letter - 'A']++;
    }
    std::string currentSequence;
    const int possibilities = backtrack(tileNumberOfLetters, currentSequence);
    return possibilities - 1;  // Remove empty sequence
  }

 private:
  int backtrack(std::array<int, 26>& tileNumberOfLetters,
                std::string& currentSequence) {
    int possibilities =
        1;  // Every backtrack contains a sequence, including empty sequence.
    for (int i = 0; i < 26; i++) {
      if (tileNumberOfLetters[i] == 0) {
        continue;
      }

      tileNumberOfLetters[i]--;
      currentSequence += static_cast<char>('a' + i);
      possibilities += backtrack(tileNumberOfLetters, currentSequence);
      currentSequence.pop_back();
      tileNumberOfLetters[i]++;
    }

    return possibilities;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.numTilePossibilities("AAABBC");
}
