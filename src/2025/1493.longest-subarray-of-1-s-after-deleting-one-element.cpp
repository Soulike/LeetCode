/*
 * @lc app=leetcode id=1493 lang=cpp
 *
 * [1493] Longest Subarray of 1's After Deleting One Element
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int longestSubarray(const std::vector<int>& nums) {
    size_t left = 0;
    size_t right = 0;
    bool element_deleted = false;
    size_t longest_subarray_size = 0;

    while (right < nums.size()) {
      if (nums[right] == 1) {
        right++;
      } else {
        if (!element_deleted) {
          element_deleted = true;
          right++;
        } else {
          longest_subarray_size =
              std::max(longest_subarray_size, right - left - 1);
          while (element_deleted) {
            if (nums[left] == 0) {
              element_deleted = false;
            }
            left++;
          }
        }
      }
    }

    longest_subarray_size = std::max(longest_subarray_size, right - left - 1);

    return static_cast<int>(longest_subarray_size);
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.longestSubarray({0, 1, 1, 1, 0, 1, 1, 0, 1});
}
