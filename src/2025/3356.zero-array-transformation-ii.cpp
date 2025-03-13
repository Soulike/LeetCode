/*
 * @lc app=leetcode id=3356 lang=cpp
 *
 * [3356] Zero Array Transformation II
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int minZeroArray(const std::vector<int>& nums,
                   const std::vector<std::vector<int>>& queries) {
    int left = 0;
    int right = static_cast<int>(queries.size());  // Exclusive right

    while (left <= right) {
      const int mid = (right - left) / 2 + left;
      if (canFormZeroArray(nums, queries, mid)) {
        if (mid - 1 < 0 || !canFormZeroArray(nums, queries, mid - 1)) {
          return mid;
        }
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return -1;
  }

 private:
  static bool canFormZeroArray(const std::vector<int>& nums,
                               const std::vector<std::vector<int>>& queries,
                               const int queryRight) {
    std::vector<int> diffArray(nums.size() + 1, 0);

    for (int i = 0; i < queryRight; i++) {
      const int from = queries[i][0];
      const int to = queries[i][1];
      const int num = queries[i][2];

      diffArray[from] += num;
      diffArray[to + 1] -= num;
    }

    int diffArrayPrefixSum = 0;
    for (int i = 0; i < nums.size(); i++) {
      diffArrayPrefixSum += diffArray[i];

      if (nums[i] > diffArrayPrefixSum) {
        return false;
      }
    }

    return true;
  }
};
// @lc code=end
