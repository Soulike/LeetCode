/*
 * @lc app=leetcode id=1671 lang=cpp
 *
 * [1671] Minimum Number of Removals to Make Mountain Array
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int minimumMountainRemovals(const std::vector<int>& nums) {
    const int kNumsSize = static_cast<int>(nums.size());
    std::vector<int> lisFromLeft(kNumsSize, 1);
    std::vector<int> lisFromRight(kNumsSize, 1);

    // LIS from left
    for (int i = 0; i < kNumsSize; i++) {
      for (int j = i - 1; j >= 0; j--) {
        if (nums[j] < nums[i]) {
          lisFromLeft[i] = std::max(lisFromLeft[i], lisFromLeft[j] + 1);
        }
      }
    }

    // LIS from right
    for (int i = kNumsSize - 1; i >= 0; i--) {
      for (int j = i + 1; j < kNumsSize; j++) {
        if (nums[i] > nums[j]) {
          lisFromRight[i] = std::max(lisFromRight[i], lisFromRight[j] + 1);
        }
      }
    }

    int maxMountainSize = 0;
    for (int i = 0; i < kNumsSize; i++) {
      const int fromLeftLisSize = lisFromLeft[i];
      const int fromRightLisSize = lisFromRight[i];
      if (fromLeftLisSize < 2 || fromRightLisSize < 2) {
        continue;
      }
      maxMountainSize =
          std::max(maxMountainSize, fromLeftLisSize + fromRightLisSize - 1);
    }

    return kNumsSize - maxMountainSize;
  }
};
// @lc code=end

int main() {
  std::vector<int> nums = {2, 1, 1, 5, 6, 2, 3, 1};
  Solution sol;
  sol.minimumMountainRemovals(nums);
}
