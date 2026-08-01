/*
 * @lc app=leetcode id=486 lang=cpp
 *
 * [486] Predict the Winner
 */

#include <optional>
#include <vector>

// @lc code=start
class Solution {
 public:
  bool predictTheWinner(const std::vector<int>& nums) {
    std::vector<std::vector<std::optional<int>>> cache(
        nums.size(), std::vector<std::optional<int>>(nums.size()));
    return GetMaxScoreDiff(nums, 0, nums.size() - 1, cache) >= 0;
  }

 private:
  // If current player can now first pick from nums[left...right], the max score
  // diff between current player and opponent.
  static int GetMaxScoreDiff(
      const std::vector<int>& nums,
      const int left,
      const int right,
      std::vector<std::vector<std::optional<int>>>& cache) {
    if (left == right) {
      return nums[left];
    }
    if (cache[left][right].has_value()) {
      return cache[left][right].value();
    }

    const int max_score_diff =
        std::max(nums[left] - GetMaxScoreDiff(nums, left + 1, right, cache),
                 nums[right] - GetMaxScoreDiff(nums, left, right - 1, cache));
    cache[left][right] = max_score_diff;
    return max_score_diff;
  }
};
// @lc code=end
