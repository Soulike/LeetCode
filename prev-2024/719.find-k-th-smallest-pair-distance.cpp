/*
 * @lc app=leetcode id=719 lang=cpp
 *
 * [719] Find K-th Smallest Pair Distance
 */
#include <algorithm>
#include <array>
#include <cmath>
#include <vector>

// @lc code=start
class Solution {
 public:
  int smallestDistancePair(std::vector<int>& nums, int k) {
    std::array<int, 1000000> buckets = {0};
    for (int i = 0; i < nums.size(); i++) {
      for (int j = i + 1; j < nums.size(); j++) {
        int diff = std::abs(nums[i] - nums[j]);
        buckets[diff]++;
      }
    }

    int bucketPrefixSum = 0;
    for (int i = 0; i < buckets.size(); i++) {
      bucketPrefixSum += buckets[i];
      if (bucketPrefixSum >= k) {
        return i;
      }
    }

    return -1;
  }
};
// @lc code=end

int main() {
  std::vector<int> nums = {1, 3, 1};
  Solution sol;
  sol.smallestDistancePair(nums, 1);
}
