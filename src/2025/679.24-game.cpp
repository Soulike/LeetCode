/*
 * @lc app=leetcode id=679 lang=cpp
 *
 * [679] 24 Game
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  bool judgePoint24(const std::vector<int>& nums) {
    std::vector<double> double_nums(nums.cbegin(), nums.cend());
    std::ranges::sort(double_nums);
    do {
      if (CanGet24(double_nums)) {
        return true;
      }
    } while (std::ranges::next_permutation(double_nums).found);
    return false;
  }

 private:
  static constexpr double kDelta = 0.001;

  static bool CanGet24(const std::vector<double>& nums) {
    if (nums.size() == 1) {
      return std::abs(nums[0] - 24.0) <= kDelta;
    }
    bool can_get_24 = false;
    for (int i = 0; i < nums.size() - 1; i++) {
      const std::array<double, 4> calculateResults =
          GetCalculateResults(nums[i], nums[i + 1]);
      for (const double calculateResult : calculateResults) {
        std::vector<double> next_nums;
        next_nums.reserve(nums.size() - 1);
        for (int j = 0; j < i; j++) {
          next_nums.push_back(nums[j]);
        }
        next_nums.push_back(calculateResult);
        for (int j = i + 2; j < nums.size(); j++) {
          next_nums.push_back(nums[j]);
        }
        can_get_24 = can_get_24 || CanGet24(next_nums);
      }
    }

    return can_get_24;
  }

  static std::array<double, 4> GetCalculateResults(const double num1,
                                                   const double num2) {
    return {
        num1 + num2,
        num1 - num2,
        num1 * num2,
        num1 / num2,
    };
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.judgePoint24({4, 1, 8, 7});
}
