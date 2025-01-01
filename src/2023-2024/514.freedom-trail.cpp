/*
 * @lc app=leetcode id=514 lang=cpp
 *
 * [514] Freedom Trail
 */
#include <climits>
#include <cmath>
#include <string>
#include <vector>

using std::string;
using std::vector;

// @lc code=start
class Solution {
 public:
  int findRotateSteps(const string& ring, const string& key) {
    /*
    dp[k][r]: ring is at ring[r], how many steps needed at minimum to fulfill
    key[k:]
    */
    vector<vector<int>> dp;
    dp.resize(2);
    for (int i = 0; i < dp.size(); i++) {
      dp[i].resize(ring.size());
    }
    std::fill(dp[key.size() % 2].begin(), dp[key.size() % 2].end(), 0);

    vector<vector<int>> letterToRingIndexes;
    letterToRingIndexes.resize(26);

    for (int i = 0; i < ring.size(); i++) {
      letterToRingIndexes[ring[i] - 'a'].push_back(i);
    }

    for (int k = key.size() - 1; k >= 0; k--) {
      int dpIndex = k % 2;
      int prevDpIndex = (k + 1) % 2;
      std::fill(dp[dpIndex].begin(), dp[dpIndex].end(), INT_MAX);

      const vector<int>& keyLetterInRingIndexes =
          letterToRingIndexes[key[k] - 'a'];
      for (int r = 0; r < ring.size(); r++) {
        for (const auto& keyLetterInRingIndex : keyLetterInRingIndexes) {
          dp[dpIndex][r] = std::min(
              dp[dpIndex][r], 1 + std::abs(r - keyLetterInRingIndex) +
                                  dp[(prevDpIndex) % 2][keyLetterInRingIndex]);
          dp[dpIndex][r] = std::min(
              dp[dpIndex][r],
              1 + ((int)ring.size() - std::abs(r - keyLetterInRingIndex)) +
                  dp[prevDpIndex][keyLetterInRingIndex]);
        }
      }
    }

    return dp[0][0];
  }
};
// @lc code=end

int main() {
  Solution sol;
  string ring = "godding";
  string key = "godding";
  sol.findRotateSteps(ring, key);
}