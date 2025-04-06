/*
 * @lc app=leetcode id=368 lang=cpp
 *
 * [368] Largest Divisible Subset
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> largestDivisibleSubset(std::vector<int>& nums) {
    std::ranges::sort(nums);
    std::vector<DpInfo> dp(nums.size());
    for (int i = 0; i < nums.size(); i++) {
      dp[i].prev_index_ = i;
      dp[i].subset_length = 1;
    }

    int max_subset_length = 1;
    int max_subset_length_index = 0;

    for (int j = 0; j < nums.size(); j++) {
      for (int i = j - 1; i >= 0; i--) {
        if (nums[j] % nums[i] == 0) {
          if (dp[i].subset_length + 1 > dp[j].subset_length) {
            dp[j].prev_index_ = i;
            dp[j].subset_length = dp[i].subset_length + 1;

            if (dp[j].subset_length > max_subset_length) {
              max_subset_length = dp[j].subset_length;
              max_subset_length_index = j;
            }
          }
        }
      }
    }

    return GetSubSetFromDpInfo(max_subset_length_index, dp, nums);
  }

 private:
  struct DpInfo {
    int prev_index_ = -1;
    int subset_length = -1;
  };

  static std::vector<int> GetSubSetFromDpInfo(const int index,
                                              const std::vector<DpInfo>& dp,
                                              const std::vector<int>& nums) {
    int current_index = index;
    std::vector<int> subset;
    while (dp[current_index].prev_index_ != current_index) {
      subset.push_back(nums[current_index]);
      current_index = dp[current_index].prev_index_;
    }
    subset.push_back(nums[current_index]);
    std::ranges::reverse(subset);
    return subset;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.largestDivisibleSubset({1});
}
