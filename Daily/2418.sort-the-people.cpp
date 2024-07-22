/*
 * @lc app=leetcode id=2418 lang=cpp
 *
 * [2418] Sort the People
 */
#include <string>
#include <utility>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<std::string> sortPeople(std::vector<std::string>& names,
                                      std::vector<int>& heights) {
    const int N = heights.size();
    std::vector<std::pair<std::string, int>> nameToHeights(N);
    for (int i = 0; i < N; i++) {
      nameToHeights[i] = {names[i], heights[i]};
    }

    std::sort(nameToHeights.begin(), nameToHeights.end(),
              [](const auto& pair1, const auto& pair2) {
                return pair1.second > pair2.second;
              });
    std::vector<std::string> result;
    result.reserve(N);

    for (const auto& nameToHeight : nameToHeights) {
      result.push_back(nameToHeight.first);
    }

    return result;
  }
};
// @lc code=end
