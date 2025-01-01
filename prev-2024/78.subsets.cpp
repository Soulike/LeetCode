/*
 * @lc app=leetcode id=78 lang=cpp
 *
 * [78] Subsets
 */
#include <algorithm>
#include <set>
#include <vector>

using std::set;
using std::vector;

// @lc code=start
class Solution {
 public:
  vector<vector<int>> subsets(vector<int>& nums) {
    std::sort(nums.begin(), nums.end());
    vector<int> emptySet;
    backtrack(nums, 0);
    return allSubsets;
  }

 private:
  set<int> currentSubset;
  vector<vector<int>> allSubsets;

  void backtrack(vector<int>& nums, int startIndex) {
    allSubsets.push_back(
        vector<int>(currentSubset.cbegin(), currentSubset.cend()));
    for (int i = startIndex; i < nums.size(); i++) {
      const int num = nums[i];
      if (!currentSubset.count(num)) {
        currentSubset.insert(num);

        backtrack(nums, i + 1);

        currentSubset.erase(num);
      }
    }
  }
};
// @lc code=end

int main() {
  Solution sol;
  vector<int> vec = {1, 2, 3};
  sol.subsets(vec);
}