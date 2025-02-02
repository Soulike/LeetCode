/*
 * @lc app=leetcode id=1752 lang=cpp
 *
 * [1752] Check if Array Is Sorted and Rotated
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  bool check(const std::vector<int>& nums) {
    /**
     * For a rotated sorted array [a,...,b,c,...,d], we can
     * 1. Check if d <= a.
     * 2. Find the index of c by find the ending index of first non-decreasing
     * span [a,...,b]
     * 3. Validate if [c,...,d] is a single non-decreasing span.
     */

    int expectedSecondNonDecreasingSpanStartIndex = 0;
    for (int i = 1; i < nums.size(); i++) {
      if (nums[i - 1] > nums[i]) {
        break;
      }
      expectedSecondNonDecreasingSpanStartIndex = i;
    }
    expectedSecondNonDecreasingSpanStartIndex++;

    if (expectedSecondNonDecreasingSpanStartIndex == nums.size()) {
      // The array is not rotated.
      return true;
    }
    if (nums[nums.size() - 1] > nums[0]) {
      return false;
    }

    for (int i = expectedSecondNonDecreasingSpanStartIndex; i < nums.size() - 1;
         i++) {
      if (nums[i] > nums[i + 1]) {
        return false;
      }
    }

    return true;
  }
};
// @lc code=end

int main() {
  Solution sol;
  std::vector<int> nums = {3, 4, 5, 1, 2};
  sol.check(nums);
}
