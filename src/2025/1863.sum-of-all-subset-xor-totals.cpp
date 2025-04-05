/*
 * @lc app=leetcode id=1863 lang=cpp
 *
 * [1863] Sum of All Subset XOR Totals
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int subsetXORSum(const std::vector<int>& nums) {
    Backtrack(nums, 0);
    return total_xor_;
  }

 private:
  int current_xor_ = 0;
  int total_xor_ = 0;

  void Backtrack(const std::vector<int>& nums, const int start_index) {
    if (start_index >= nums.size()) {
      return;
    }

    for (int i = start_index; i < nums.size(); i++) {
      current_xor_ ^= nums[i];
      total_xor_ += current_xor_;
      Backtrack(nums, i + 1);
      current_xor_ ^= nums[i];
    }
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.subsetXORSum({5, 1, 6});
}
