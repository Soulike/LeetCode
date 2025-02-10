/*
 * @lc app=leetcode id=2364 lang=cpp
 *
 * [2364] Count Number of Bad Pairs
 */

#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  long long countBadPairs(std::vector<int>& nums) {
    /**
     * We can find good pairs and get bad pairs from that.
     * Total pairs: C(n,2) = n!/(2!*(n-2)!) = n(n-1)/2.
     * For good pairs: j - i = nums[j] - nums[i] => nums[i] - i = nums[j] - j
     * We can group the diffs in maps and calculate the number of good pairs
     */

    long long badPairNumber = 0;
    std::unordered_map<int, long long> diffToFrequency;

    for (int i = 0; i < nums.size(); i++) {
      const int diff = nums[i] - i;
      const long long newGoodPairNumber = diffToFrequency[diff];
      const long long totalNewPairNumber = i;
      badPairNumber += totalNewPairNumber - newGoodPairNumber;
      diffToFrequency[diff]++;
    }

    return badPairNumber;
  }
};
// @lc code=end
