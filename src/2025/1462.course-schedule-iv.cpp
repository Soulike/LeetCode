/*
 * @lc app=leetcode id=1462 lang=cpp
 *
 * [1462] Course Schedule IV
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<bool> checkIfPrerequisite(
      const int numCourses,
      const std::vector<std::vector<int>>& prerequisites,
      const std::vector<std::vector<int>>& queries) {
    std::vector<std::vector<bool>> isReachable(
        numCourses, std::vector<bool>(numCourses, false));
    for (const auto& prerequisite : prerequisites) {
      const int from = prerequisite[0];
      const int to = prerequisite[1];
      isReachable[from][to] = true;
    }

    for (int m = 0; m < numCourses; m++) {
      for (int i = 0; i < numCourses; i++) {
        for (int j = 0; j < numCourses; j++) {
          isReachable[i][j] =
              isReachable[i][j] || (isReachable[i][m] && isReachable[m][j]);
        }
      }
    }

    std::vector<bool> queryResults(queries.size(), false);
    for (int i = 0; i < queries.size(); i++) {
      queryResults[i] = isReachable[queries[i][0]][queries[i][1]];
    }

    return queryResults;
  }
};
// @lc code=end
