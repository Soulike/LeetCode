/*
 * @lc app=leetcode id=763 lang=cpp
 *
 * [763] Partition Labels
 */

#include <algorithm>
#include <array>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> partitionLabels(const std::string& s) {
    std::array<int, 26> letter_last_indexes{};
    std::fill(letter_last_indexes.begin(), letter_last_indexes.end(), -1);
    for (int i = 0; i < s.size(); i++) {
      letter_last_indexes[s[i]] = i;
    }

    int current_partition_begin = -1;
    int current_partition_end = -1;
    std::vector<int> partition_sizes;
    for (int i = 0; i < s.size(); i++) {
      if (current_partition_begin == -1) {
        current_partition_begin = i;
        current_partition_end = i;
      }
      if (i > current_partition_end) {
        partition_sizes.push_back(current_partition_end -
                                  current_partition_begin + 1);
        current_partition_begin = i;
      }
      current_partition_end =
          std::max(current_partition_end, letter_last_indexes[s[i]]);
    }
    partition_sizes.push_back(current_partition_end - current_partition_begin +
                              1);
    return partition_sizes;
  }
};
// @lc code=end
