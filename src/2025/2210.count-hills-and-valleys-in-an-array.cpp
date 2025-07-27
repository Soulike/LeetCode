/*
 * @lc app=leetcode id=2210 lang=cpp
 *
 * [2210] Count Hills and Valleys in an Array
 */

#include <stack>
#include <vector>

// @lc code=start
class Solution {
 public:
  int countHillValley(const std::vector<int>& nums) {
    std::vector<int> left_non_equal_element_index(nums.size(), -1);
    std::vector<int> right_non_equal_element_index(nums.size(), nums.size());

    for (int i = 1; i < nums.size(); i++) {
      if (nums[i] != nums[i - 1]) {
        left_non_equal_element_index[i] = i - 1;
      } else {
        left_non_equal_element_index[i] = left_non_equal_element_index[i - 1];
      }
    }

    for (int i = nums.size() - 2; i >= 0; i--) {
      if (nums[i] != nums[i + 1]) {
        right_non_equal_element_index[i] = i + 1;
      } else {
        right_non_equal_element_index[i] = right_non_equal_element_index[i + 1];
      }
    }

    int count = 0;
    for (int i = 0; i < nums.size(); i++) {
      if (left_non_equal_element_index[i] == -1 ||
          right_non_equal_element_index[i] == nums.size()) {
        continue;
      }
      if (left_non_equal_element_index[i] ==
              left_non_equal_element_index[i - 1] &&
          right_non_equal_element_index[i] ==
              right_non_equal_element_index[i - 1]) {
        continue;
      }

      if (nums[left_non_equal_element_index[i]] < nums[i] &&
              nums[i] > nums[right_non_equal_element_index[i]] ||
          nums[left_non_equal_element_index[i]] > nums[i] &&
              nums[i] < nums[right_non_equal_element_index[i]]) {
        count++;
      }
    }

    return count;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.countHillValley({57, 57, 57, 57, 57, 90, 90, 90, 90, 90, 90, 90, 90, 90,
                       90, 90, 90, 90, 90, 90, 90, 90, 85, 85, 85, 86, 86, 86});
}
