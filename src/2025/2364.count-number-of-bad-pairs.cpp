/*
 * @lc app=leetcode id=2364 lang=cpp
 *
 * [2364] Count Number of Bad Pairs
 */

#include <cinttypes>
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

    const size_t kNumsLength = nums.size();
    const std::uint64_t kAllPairsNumber =
        kNumsLength % 2 ? kNumsLength * ((kNumsLength - 1) / 2)
                        : (kNumsLength / 2) * (kNumsLength - 1);

    std::unordered_map<int, std::uint64_t> diffToNumbers;
    for (int i = 0; i < nums.size(); i++) {
      diffToNumbers[nums[i] - i]++;
    }

    std::uint64_t goodPairsNumber = 0;
    for (const auto& diffToNumber : diffToNumbers) {
      const std::uint64_t diffNumber = diffToNumber.second;

      goodPairsNumber += diffNumber % 2 ? diffNumber * ((diffNumber - 1) / 2)
                                        : (diffNumber / 2) * (diffNumber - 1);
    }

    return static_cast<long long>(kAllPairsNumber - goodPairsNumber);
  }
};
// @lc code=end
