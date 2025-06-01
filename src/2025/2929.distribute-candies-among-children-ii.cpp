/*
 * @lc app=leetcode id=2929 lang=cpp
 *
 * [2929] Distribute Candies Among Children II
 */

#include <vector>
// @lc code=start
class Solution {
 public:
  long long distributeCandies(const int total_candy_count,
                              int candy_count_per_kid_limit) {
    if (candy_count_per_kid_limit > total_candy_count) {
      candy_count_per_kid_limit = total_candy_count;
    }

    long long result = 0;
    for (int first_kid_candy_count = 0;
         first_kid_candy_count <= candy_count_per_kid_limit;
         first_kid_candy_count++) {
      const int left_candy_count = total_candy_count - first_kid_candy_count;
      if (left_candy_count > 2 * candy_count_per_kid_limit) {
        continue;
      }
      const int second_kid_candy_count_min =
          std::max(left_candy_count - candy_count_per_kid_limit, 0);
      const int second_kid_candy_count_max =
          std::min(left_candy_count, candy_count_per_kid_limit);
      result += second_kid_candy_count_max - second_kid_candy_count_min + 1;
    }
    return result;
  }
};
// @lc code=end
