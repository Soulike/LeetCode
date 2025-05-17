/*
 * @lc app=leetcode id=75 lang=cpp
 *
 * [75] Sort Colors
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  void sortColors(std::vector<int>& nums) {
    int left = 0;
    int right = static_cast<int>(nums.size()) - 1;
    int mid = left;

    while (mid <= right) {
      if (nums[mid] == 0) {
        std::swap(nums[left], nums[mid]);
        left++;
        mid++;
      } else if (nums[mid] == 1) {
        mid++;
      } else if (nums[mid] == 2) {
        std::swap(nums[mid], nums[right]);
        right--;
      }
    }
  }
};
// @lc code=end

int main() {
  Solution sol;
  std::vector<int> nums = {2, 1, 0};
  sol.sortColors(nums);
}
