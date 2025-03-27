/*
 * @lc app=leetcode id=2780 lang=cpp
 *
 * [2780] Minimum Index of a Valid Split
 */

#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minimumIndex(const std::vector<int>& nums) {
    const int dominant_element = GetDominantElement(nums);
    std::vector<int> prefix_dominant_element_number(nums.size(), 0);
    prefix_dominant_element_number[0] = nums[0] == dominant_element;
    for (int i = 1; i < nums.size(); i++) {
      prefix_dominant_element_number[i] = prefix_dominant_element_number[i - 1];
      if (nums[i] == dominant_element) {
        prefix_dominant_element_number[i]++;
      }
    }

    for (int i = 0; i < nums.size() - 1; i++) {
      const int split1_size = i + 1;
      const int split2_size = static_cast<int>(nums.size()) - i - 1;
      const int split1_dominant_element_number =
          prefix_dominant_element_number[i];
      const int split2_dominant_element_number =
          prefix_dominant_element_number[nums.size() - 1] -
          prefix_dominant_element_number[i];

      if (split1_dominant_element_number * 2 > split1_size &&
          split2_dominant_element_number * 2 > split2_size) {
        return i;
      }
    }

    return -1;
  }

 private:
  static int GetDominantElement(const std::vector<int>& nums) {
    std::unordered_map<int, int> numToFrequency;
    for (const int num : nums) {
      numToFrequency[num]++;
      if (numToFrequency[num] * 2 > nums.size()) {
        return num;
      }
    }

    return -1;
  }
};
// @lc code=end
