/*
 * @lc app=leetcode id=2799 lang=cpp
 *
 * [2799] Count Complete Subarrays in an Array
 */

#include <memory>
#include <unordered_map>
#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  int countCompleteSubarrays(const std::vector<int>& nums) {
    auto nums_set =
        std::make_unique<std::unordered_set<int>>(nums.cbegin(), nums.cend());
    const size_t distinct_num_count = nums_set->size();
    nums_set.reset();

    std::unordered_map<int, int> num_to_count;

    int complete_subarray_count = 0;
    int left = 0;
    int right = 0;

    while (right < nums.size()) {
      num_to_count[nums[right]]++;
      while (num_to_count.size() == distinct_num_count) {
        complete_subarray_count += static_cast<int>(nums.size()) - right;
        num_to_count[nums[left]]--;
        if (num_to_count[nums[left]] == 0) {
          num_to_count.erase(nums[left]);
        }
        left++;
      }
      right++;
    }

    return complete_subarray_count;
  }
};
// @lc code=end
