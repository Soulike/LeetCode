/*
 * @lc app=leetcode id=2106 lang=cpp
 *
 * [2106] Maximum Fruits Harvested After at Most K Steps
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maxTotalFruits(const std::vector<std::vector<int>>& fruits,
                     const int startPos,
                     const int k) {
    const int max_x = fruits.back()[0];
    std::vector<int> fruits_prefix_sum(fruits.size() + 1, 0);
    for (int i = 0; i < fruits.size(); i++) {
      fruits_prefix_sum[i + 1] = fruits_prefix_sum[i] + fruits[i][1];
    }

    int left_pos = startPos;
    int max_total = 0;
    while (left_pos >= 0 && left_pos + k >= startPos) {
      const int move_left_step_count = startPos - left_pos;
      // 1. Move left to `left_pos` first and then move right
      int right_pos =
          std::min(startPos + (k - 2 * move_left_step_count), max_x);
      if (left_pos <= right_pos) {
        max_total = std::max(
            max_total,
            GetFruitsInRange(left_pos, right_pos, fruits, fruits_prefix_sum));
      }

      // 2. Move right first and then move left to `left_pos`
      right_pos = std::min(max_x, startPos + (k - move_left_step_count) / 2);
      if (left_pos <= right_pos) {
        max_total = std::max(
            max_total,
            GetFruitsInRange(left_pos, right_pos, fruits, fruits_prefix_sum));
      }

      left_pos--;
    }

    return max_total;
  }

 private:
  // left_position and right_position is included.
  static int GetFruitsInRange(const int left_position,
                              const int right_position,
                              const std::vector<std::vector<int>>& fruits,
                              const std::vector<int>& fruits_prefix_sum) {
    const int left_index = GetFruitsLeftIndex(fruits, left_position);
    const int right_index = GetFruitsRightIndex(fruits, right_position);

    if (left_index > right_index || left_index >= fruits.size()) {
      return 0;
    }

    return fruits_prefix_sum[right_index + 1] - fruits_prefix_sum[left_index];
  }

  // 找到第一个位置 >= left_position 的水果索引
  static int GetFruitsLeftIndex(const std::vector<std::vector<int>>& fruits,
                                const int left_position) {
    int left = 0;
    int right = fruits.size();
    while (left < right) {
      const int mid = (right - left) / 2 + left;
      if (fruits[mid][0] >= left_position) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    return left;
  }

  // 找到最后一个位置 <= right_position 的水果索引
  static int GetFruitsRightIndex(const std::vector<std::vector<int>>& fruits,
                                 const int right_position) {
    int left = 0;
    int right = fruits.size();
    while (left < right) {
      const int mid = (right - left) / 2 + left;
      if (fruits[mid][0] <= right_position) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    return left - 1;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.maxTotalFruits({{2, 8}, {6, 3}, {8, 6}}, 5, 4);
}
