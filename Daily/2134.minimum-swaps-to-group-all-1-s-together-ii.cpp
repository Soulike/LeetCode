/*
 * @lc app=leetcode id=2134 lang=cpp
 *
 * [2134] Minimum Swaps to Group All 1's Together II
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minSwaps(const std::vector<int>& nums) {
    const int N = nums.size();
    const int ONE_COUNT = Solution::getOneCountOfArray(nums);

    /**
     * Maintain a window of size ONE_COUNT.
     * The number of 0s in the window is the swap time.
     * Find the minimum one.
     */
    int left = 0;
    int right = ONE_COUNT - 1;
    int currentSwapTime = 0;
    for (int i = left; i <= right; i++) {
      if (nums[i] == 0) {
        currentSwapTime++;
      }
    }

    int minSwapTime = currentSwapTime;
    while (right < 2 * N - 1) {
      left++;
      right++;

      if (nums[(left - 1) % N] == 0) {
        currentSwapTime--;
      }
      if (nums[right % N] == 0) {
        currentSwapTime++;
      }

      minSwapTime = std::min(minSwapTime, currentSwapTime);
    }

    return minSwapTime;
  }

 private:
  static int getOneCountOfArray(const std::vector<int>& nums) {
    int oneCount = 0;
    for (const auto num : nums) {
      if (num == 1) {
        oneCount++;
      }
    }
    return oneCount;
  }
};
// @lc code=end
