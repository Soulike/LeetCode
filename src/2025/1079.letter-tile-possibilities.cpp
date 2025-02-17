/*
 * @lc app=leetcode id=1079 lang=cpp
 *
 * [1079] Letter Tile Possibilities
 */

#include <algorithm>

#include <string>
#include <unordered_set>

// @lc code=start
class Solution {
 public:
  int numTilePossibilities(std::string tiles) {
    std::sort(tiles.begin(), tiles.end());
    std::unordered_set<int> usedTiles;
    std::string currentSequence;
    int possibilities = backtrack(tiles, usedTiles, currentSequence);
    return possibilities - 1;  // Remove empty string
  }

 private:
  int backtrack(const std::string& tiles,
                std::unordered_set<int>& usedTiles,
                std::string& currentSequence) {
    if (usedTiles.size() == tiles.size()) {
      return 1;
    }

    int possibilities = 1;  // Every time in backtrack we get a new sequence,
                            // including empty string
    char lastUsedChar = 0;
    for (int i = 0; i < tiles.size(); i++) {
      if (usedTiles.contains(i)) {
        continue;
      }

      if (tiles[i] == lastUsedChar) {
        continue;
      }

      usedTiles.insert(i);
      currentSequence += tiles[i];
      possibilities += backtrack(tiles, usedTiles, currentSequence);
      currentSequence.pop_back();
      usedTiles.erase(i);
      lastUsedChar = tiles[i];
    }

    return possibilities;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.numTilePossibilities("AAABBC");
}
