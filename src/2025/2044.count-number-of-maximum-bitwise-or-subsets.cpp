/*
 * @lc app=leetcode id=2044 lang=cpp
 *
 * [2044] Count Number of Maximum Bitwise-OR Subsets
 */

#include <numeric>
#include <vector>

// @lc code=start
class Solution {
 public:
  int countMaxOrSubsets(const std::vector<int>& nums) {
    const int max_or = std::accumulate(
        nums.cbegin(), nums.cend(), 0,
        [](const int num1, const int num2) { return num1 | num2; });

    int max_or_count = 0;
    int current_or = 0;
    backtrack(nums, 0, max_or, current_or, max_or_count);
    return max_or_count;
  }

 private:
  void backtrack(const std::vector<int>& nums,
                 const int start_index,
                 const int target,
                 int& current_or,
                 int& max_or_count) {
    if (current_or == target) {
      max_or_count++;
    }
    for (int i = start_index; i < nums.size(); i++) {
      const int original_current_or = current_or;
      current_or |= nums[i];
      backtrack(nums, i + 1, target, current_or, max_or_count);
      current_or = original_current_or;
    }
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.countMaxOrSubsets({2, 2, 2});
}
