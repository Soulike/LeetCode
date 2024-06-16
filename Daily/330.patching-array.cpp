/*
 * @lc app=leetcode id=330 lang=cpp
 *
 * [330] Patching Array
 */
#include <cinttypes>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minPatches(std::vector<int>& nums, int n) {
    /**
     * All nums between [0, missingNum) are form-able
     */
    std::int64_t missingNum = 1;
    int patchCount = 0;
    int numsIndex = 0;
    while (missingNum <= n) {
      if (numsIndex < nums.size() && nums[numsIndex] <= missingNum) {
        /**
         * nums[numsIndex] <= missingNum so we can extend the form-able range to
         * [0, missingNum) + [0+nums[numsIndex], nums[numsIndex]+missingNum)
         * => [0, missingNum + nums[numsIndex])
         */
        missingNum += nums[numsIndex];
        numsIndex++;
      } else {
        /**
         * nums[numsIndex] > missingNum, we need to extend the range.
         * Add missingNum to maximize the range.
         */
        missingNum += missingNum;
        patchCount++;
      }
    }
    return patchCount;
  }
};
// @lc code=end
