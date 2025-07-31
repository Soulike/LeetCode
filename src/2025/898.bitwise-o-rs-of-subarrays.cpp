/*
 * @lc app=leetcode id=898 lang=cpp
 *
 * [898] Bitwise ORs of Subarrays
 */

#include <array>
#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  int subarrayBitwiseORs(const std::vector<int>& arr) {
    /**
     * dp[i]: Distinct bitwise ORs of all the non-empty subarrays ends with i.
     */
    std::array<std::unordered_set<int>, 2> dp = {};
    std::unordered_set<int> all_distinct_subarray_ors;

    for (int i = 0; i < arr.size(); i++) {
      dp[i % 2].clear();
      dp[i % 2].insert(arr[i]);
      all_distinct_subarray_ors.insert(arr[i]);
      for (const int num : dp[(i - 1 + 2) % 2]) {
        dp[i % 2].insert(num | arr[i]);
        all_distinct_subarray_ors.insert(num | arr[i]);
      }
    }

    return all_distinct_subarray_ors.size();
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.subarrayBitwiseORs({1, 1, 2});
}
