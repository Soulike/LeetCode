/*
 * @lc app=leetcode id=2924 lang=cpp
 *
 * [2924] Find Champion II
 */

#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  int findChampion(int n, std::vector<std::vector<int> >& edges) {
    std::unordered_set<int> teams;
    teams.reserve(n);
    for (int i = 0; i < n; i++) {
      teams.insert(i);
    }

    for (const auto& edge : edges) {
      teams.erase(edge[1]);
    }

    if (teams.size() != 1) {
      return -1;
    }

    return *teams.begin();
  }
};

// @lc code=end
