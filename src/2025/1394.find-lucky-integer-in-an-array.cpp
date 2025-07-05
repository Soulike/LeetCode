/*
 * @lc app=leetcode id=1394 lang=cpp
 *
 * [1394] Find Lucky Integer in an Array
 */

#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  int findLucky(const std::vector<int>& arr) {
    std::unordered_map<int, int> num_frequencies;
    for (const int num : arr) {
      num_frequencies[num]++;
    }
    int lucky_number = -1;
    for (const auto& [num, frequency] : num_frequencies) {
      if (num == frequency) {
        lucky_number = std::max(lucky_number, num);
      }
    }
    return lucky_number;
  }
};
// @lc code=end
