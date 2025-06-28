/*
 * @lc app=leetcode id=2099 lang=cpp
 *
 * [2099] Find Subsequence of Length K With the Largest Sum
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> maxSubsequence(const std::vector<int>& nums, const int k) {
    std::vector<NumInfo> num_infos(nums.size());
    for (int i = 0; i < nums.size(); i++) {
      num_infos[i] = {nums[i], i};
    }

    std::ranges::sort(num_infos,
                      [](const NumInfo& info1, const NumInfo& info2) {
                        return info1.num > info2.num;
                      });

    std::vector<NumInfo> subsequence_num_infos(num_infos.cbegin(),
                                               num_infos.cbegin() + k);
    std::ranges::sort(subsequence_num_infos,
                      [](const NumInfo& info1, const NumInfo& info2) {
                        return info1.index < info2.index;
                      });

    std::vector<int> subsequence(k);
    for (int i = 0; i < k; i++) {
      subsequence[i] = subsequence_num_infos[i].num;
    }
    return subsequence;
  }

 private:
  struct NumInfo {
    int num = 0;
    int index = -1;
  };
};
// @lc code=end
