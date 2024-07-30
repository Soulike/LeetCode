/*
 * @lc app=leetcode id=1653 lang=cpp
 *
 * [1653] Minimum Deletions to Make String Balanced
 */

#include <algorithm>
#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minimumDeletions(const std::string& s) {
    const int N = s.size();
    int previousBCount = 0;
    /*
     * dp[i] - minimum deletions at s[i - 1]
     * */
    std::vector<int> dp(2, 0);

    for (int i = 0; i < N; i++) {
      // At this point, s[0] - s[i] is already a balanced string
      // like aaaaa or aaaabbbb
      if (s[i] == 'b') {
        dp[(i + 1) % 2] = dp[i % 2];
        previousBCount++;
      } else {
        // s[i] == 'a'
        dp[(i + 1) % 2] =
            std::min(dp[i % 2] + 1,  // Delete this `a`
                     previousBCount  // or remove all previous `b`s
            );
      }
    }

    return dp[N % 2];
  }
};
// @lc code=end
