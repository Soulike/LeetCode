/*
 * @lc app=leetcode id=514 lang=cpp
 *
 * [514] Freedom Trail
 */
#include <cmath>
#include <string>
#include <vector>

using std::string;
using std::vector;

// @lc code=start
class Solution {
 public:
  int findRotateSteps(const string& ring, const string& key) {
    vector<vector<int>> memo;
    memo.resize(ring.size());
    for (int i = 0; i < memo.size(); i++) {
      memo[i].resize(key.size());
      std::fill(memo[i].begin(), memo[i].end(), -1);
    }

    int result = findRotateSteps(ring, 0, key, 0, memo);
    return result;
  }

 private:
  /*
  Ring is at ring[r], how many steps needed at minimum to fulfill key[k:]
  */
  int findRotateSteps(const string& ring,
                      int r,
                      const string& key,
                      int k,
                      vector<vector<int>>& memo) {
    if (k == key.size()) {
      return 0;  // done
    }

    if (memo[r][k] != -1) {
      return memo[r][k];
    }

    if (ring[r] == key[k]) {
      int steps = 1 + findRotateSteps(ring, r, key, k + 1, memo);
      memo[r][k] = steps;
      return steps;
    }

    int clockwiseR = r;
    int clockwiseSteps = 0;
    while (ring[clockwiseR] != key[k]) {
      clockwiseSteps++;
      clockwiseR--;
      clockwiseR = (clockwiseR + ring.size()) % ring.size();
    }

    int anticlockwiseR = r;
    int anticlockwiseSteps = 0;
    while (ring[anticlockwiseR] != key[k]) {
      anticlockwiseSteps++;
      anticlockwiseR++;
      anticlockwiseR = anticlockwiseR % ring.size();
    }

    int steps =
        std::min(clockwiseSteps +
                     findRotateSteps(ring, clockwiseR, key, k + 1, memo),
                 anticlockwiseSteps +
                     findRotateSteps(ring, anticlockwiseR, key, k + 1, memo)) +
        1;
    memo[r][k] = steps;
    return steps;
  }
};
// @lc code=end

int main() {
  Solution sol;
  string ring = "nyngl";
  string key = "yyynnnnnnlllggg";
  sol.findRotateSteps(ring, key);
}