/*
 * @lc app=leetcode id=2501 lang=cpp
 *
 * [2501] Longest Square Streak in an Array
 */
#include <cinttypes>
#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  int longestSquareStreak(std::vector<int>& nums) {
    std::unordered_set<int> uniqueNums(nums.cbegin(), nums.cend());
    int maxStreakLength = 1;
    std::int64_t NUM_MAX = 1e5;

    for (std::int64_t num : uniqueNums) {
      int currentStreakLength = 0;
      while (uniqueNums.contains(static_cast<int>(num))) {
        currentStreakLength++;
        if (num * num > NUM_MAX) {
          break;
        }

        num *= num;
      }
      maxStreakLength = std::max(maxStreakLength, currentStreakLength);
    }

    return maxStreakLength > 1 ? maxStreakLength : -1;
  }
};
// @lc code=end
