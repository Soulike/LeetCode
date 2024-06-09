/*
 * @lc app=leetcode id=974 lang=cpp
 *
 * [974] Subarray Sums Divisible by K
 */

#include <memory>
#include <unordered_map>
#include <vector>

using std::unordered_map;
using std::vector;

// @lc code=start
class Solution {
 public:
  int subarraysDivByK(vector<int>& nums, int k) {
    const int N = nums.size();
    int prefixSumMod[2] = {0, 0};

    int* prefixSumModCount = new int[k];
    std::fill_n(prefixSumModCount, k, 0);
    // The prefix sum mod without all nums
    prefixSumModCount[0] = 1;
    int subArrayNumber = 0;

    for (int i = 0; i < N; i++) {
      const auto prevPrefixSumMod = i - 1 >= 0 ? prefixSumMod[(i - 1) % 2] : 0;
      prefixSumMod[i % 2] = ((prevPrefixSumMod + nums[i]) % k + k) % k;
      subArrayNumber += prefixSumModCount[prefixSumMod[i % 2]];
      prefixSumModCount[prefixSumMod[i % 2]]++;
    }

    delete[] prefixSumModCount;
    return subArrayNumber;
  }
};
// @lc code=end

int main() {
  vector<int> nums = {7, 4, -10};
  Solution sol;
  sol.subarraysDivByK(nums, 5);
}