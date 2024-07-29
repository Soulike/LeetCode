/*
 * @lc app=leetcode id=1395 lang=cpp
 *
 * [1395] Count Number of Teams
 */

#include <stack>
#include <vector>

// @lc code=start
class Solution {
 public:
  int numTeams(const std::vector<int>& ratings) {
    const int N = ratings.size();
    int teamCount = 0;
    /*
     * dp[i][j]
     * At ratings[i], how many soldiers form increasing/decreasing sequence at
     * length j+1
     * */
    std::vector<std::vector<int>> increasingDp(N, {1, 0});
    std::vector<std::vector<int>> decreasingDp(N, {1, 0});
    const int TEAM_SIZE_ONE = 0;
    const int TEAM_SIZE_TWO = 1;

    for (int i = 0; i < N; i++) {
      for (int k = i - 1; k >= 0; k--) {
        if (ratings[k] < ratings[i]) {
          increasingDp[i][TEAM_SIZE_TWO] += increasingDp[k][TEAM_SIZE_ONE];
          teamCount += increasingDp[k][TEAM_SIZE_TWO];
        } else if (ratings[k] > ratings[i]) {
          decreasingDp[i][TEAM_SIZE_TWO] += decreasingDp[k][TEAM_SIZE_ONE];
          teamCount += decreasingDp[k][TEAM_SIZE_TWO];
        }
      }
    }

    return teamCount;
  }
};
// @lc code=end

int main() {
  std::vector<int> ratings = {1, 2, 3, 4};
  Solution sol;
  sol.numTeams(ratings);
}
