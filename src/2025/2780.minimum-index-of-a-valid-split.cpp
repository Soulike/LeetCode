/*
 * @lc app=leetcode id=2780 lang=cpp
 *
 * [2780] Minimum Index of a Valid Split
 */

#include <algorithm>
#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minimumIndex(const std::vector<int>& nums) {
    const int dominant_element = GetDominantElement(nums);
    const int dominant_element_total_number = static_cast<int>(
        std::count(nums.cbegin(), nums.cend(), dominant_element));
    int dominant_element_number_in_split1 = 0;
    int dominant_element_number_in_split2 = dominant_element_total_number;
    int split1_size = 0;
    int split2_size = static_cast<int>(nums.size());

    for (int i = 0; i < nums.size() - 1; i++) {
      split1_size++;
      split2_size--;
      if (nums[i] == dominant_element) {
        dominant_element_number_in_split1++;
        dominant_element_number_in_split2--;
      }

      if (dominant_element_number_in_split1 * 2 > split1_size &&
          dominant_element_number_in_split2 * 2 > split2_size) {
        return i;
      }
    }

    return -1;
  }

 private:
  static int GetDominantElement(const std::vector<int>& nums) {
    int current_element = nums[0];
    int current_element_vote = 0;

    for (const int num : nums) {
      if (current_element == num) {
        current_element_vote++;
      } else {
        current_element_vote--;
        if (current_element_vote == 0) {
          current_element = num;
          current_element_vote = 1;
        }
      }
    }

    return current_element;
  }
};
// @lc code=end
