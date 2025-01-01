/*
 * @lc app=leetcode id=40 lang=cpp
 *
 * [40] Combination Sum II
 */
#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<std::vector<int>> combinationSum2(std::vector<int>& candidates,
                                                const int target) {
    std::sort(candidates.begin(), candidates.end());
    backtrack(candidates, 0, target);
    return resultCombinations;
  }

 private:
  void backtrack(const std::vector<int>& candidates,
                 const int index,
                 const int target) {
    if (currentSum > target) {
      return;
    }

    if (currentSum == target) {
      resultCombinations.push_back(currentCombination);
      return;
    }

    for (int i = index; i < candidates.size(); i++) {
      if (i > 0 && i != index && candidates[i - 1] == candidates[i]) {
        continue;
      }
      currentSum += candidates[i];
      currentCombination.push_back(candidates[i]);
      backtrack(candidates, i + 1, target);
      currentCombination.pop_back();
      currentSum -= candidates[i];
    }
  }

 private:
  int currentSum = 0;
  std::vector<int> currentCombination;
  std::vector<std::vector<int>> resultCombinations;
};
// @lc code=end

int main() {
  Solution sol;
  std::vector<int> nums = {10, 1, 2, 7, 6, 1, 5};
  sol.combinationSum2(nums, 8);
}
