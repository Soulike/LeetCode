/*
 * @lc app=leetcode id=523 lang=cpp
 *
 * [523] Continuous Subarray Sum
 */
#include <unordered_map>
#include <vector>

using std::unordered_map;
using std::vector;

// @lc code=start
class Solution {
 public:
  bool checkSubarraySum(vector<int>& nums, int k) {
    const auto N = nums.size();
    int prefixSumMod = 0;
    unordered_map<int, int> prefixSumModToIndex;
    // Initialize to handle the case
    // where the subarray starts from the beginning
    prefixSumModToIndex[0] = -1;

    for (int i = 0; i < N; i++) {
      prefixSumMod = (prefixSumMod + nums[i]) % k;
      if (prefixSumModToIndex.count(prefixSumMod)) {
        const int index = prefixSumModToIndex[prefixSumMod];
        if (i - index > 1) {
          return true;
        }
      } else {
        prefixSumModToIndex[prefixSumMod] = i;
      }
    }

    return false;
  }
};
// @lc code=end

int main() {
  Solution sol;
  vector<int> nums = {5, 0, 0, 0};
  sol.checkSubarraySum(nums, 3);
}
