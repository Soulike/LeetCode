/*
 * @lc app=leetcode id=1689 lang=cpp
 *
 * [1689] Partitioning Into Minimum Number Of Deci-Binary Numbers
 */

#include <algorithm>
#include <string>

// @lc code=start
class Solution {
 public:
  int minPartitions(std::string n) {
    return *std::ranges::max_element(n) - '0';
  }
};
// @lc code=end
