/*
 * @lc app=leetcode id=1331 lang=cpp
 *
 * [1331] Rank Transform of an Array
 */

#include <algorithm>
#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> arrayRankTransform(const std::vector<int>& arr) {
    if (arr.empty()) {
      return {};
    }

    std::vector<int> sorted_arr = arr;
    std::ranges::sort(sorted_arr);

    std::unordered_map<int, int> element_to_ranks;
    element_to_ranks[sorted_arr[0]] = 1;

    for (int i = 1; i < sorted_arr.size(); i++) {
      if (sorted_arr[i] == sorted_arr[i - 1]) {
        element_to_ranks[sorted_arr[i]] = element_to_ranks[sorted_arr[i - 1]];
      } else {
        element_to_ranks[sorted_arr[i]] =
            element_to_ranks[sorted_arr[i - 1]] + 1;
      }
    }

    std::vector<int> ranks(arr.size());
    for (int i = 0; i < arr.size(); i++) {
      ranks[i] = element_to_ranks[arr[i]];
    }

    return ranks;
  }
};
// @lc code=end
