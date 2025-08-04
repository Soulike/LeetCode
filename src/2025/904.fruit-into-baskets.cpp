/*
 * @lc app=leetcode id=904 lang=cpp
 *
 * [904] Fruit Into Baskets
 */

#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  int totalFruit(const std::vector<int>& fruits) {
    std::unordered_map<int, int> fruit_to_counts;
    int left = 0;
    int right = 0;
    int max_fruit_count = 0;
    int current_fruit_count = 0;

    while (right < fruits.size()) {
      if (fruit_to_counts.size() == 2 &&
          !fruit_to_counts.contains(fruits[right])) {
        max_fruit_count = std::max(max_fruit_count, current_fruit_count);

        while (fruit_to_counts.size() == 2) {
          fruit_to_counts[fruits[left]]--;
          current_fruit_count--;
          if (fruit_to_counts[fruits[left]] == 0) {
            fruit_to_counts.erase(fruits[left]);
          }
          left++;
        }
      }

      current_fruit_count++;
      fruit_to_counts[fruits[right]]++;
      right++;
    }

    max_fruit_count = std::max(max_fruit_count, current_fruit_count);

    return max_fruit_count;
  }
};
// @lc code=end
