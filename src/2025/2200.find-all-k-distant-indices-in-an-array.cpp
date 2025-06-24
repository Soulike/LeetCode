/*
 * @lc app=leetcode id=2200 lang=cpp
 *
 * [2200] Find All K-Distant Indices in an Array
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> findKDistantIndices(const std::vector<int>& nums,
                                       const int key,
                                       const int k) {
    std::vector<int> distance_to_nearest_key(nums.size(), INT_MAX);
    int last_left_key_index = -1;
    for (int i = 0; i < nums.size(); i++) {
      if (nums[i] == key) {
        last_left_key_index = i;
        break;
      }
    }

    for (int i = last_left_key_index; i < nums.size(); i++) {
      if (nums[i] == key) {
        last_left_key_index = i;
        distance_to_nearest_key[i] = 0;
      } else {
        distance_to_nearest_key[i] = i - last_left_key_index;
      }
    }

    int last_right_key_index = nums.size();
    for (int i = nums.size() - 1; i >= 0; i--) {
      if (nums[i] == key) {
        last_right_key_index = i;
        break;
      }
    }

    for (int i = last_right_key_index; i >= 0; i--) {
      if (nums[i] == key) {
        last_right_key_index = i;
        distance_to_nearest_key[i] = 0;
      } else {
        distance_to_nearest_key[i] =
            std::min(distance_to_nearest_key[i], last_right_key_index - i);
      }
    }

    std::vector<int> indexes;
    for (int i = 0; i < nums.size(); i++) {
      if (distance_to_nearest_key[i] <= k) {
        indexes.push_back(i);
      }
    }

    return indexes;
  }
};
// @lc code=end
