/*
 * @lc app=leetcode id=3068 lang=cpp
 *
 * [3068] Find the Maximum Sum of Node Values
 */

#include <algorithm>
#include <numeric>
#include <vector>

// @lc code=start
class Solution {
 public:
  long long maximumValueSum(const std::vector<int>& nums,
                            const int k,
                            const std::vector<std::vector<int>>& edges) {
    std::vector<int> xor_gain(nums.size(), 0);
    for (int i = 0; i < nums.size(); i++) {
      xor_gain[i] = (nums[i] ^ k) - nums[i];
    }
    std::ranges::sort(xor_gain, std::greater<int>());

    long long max_sum = std::accumulate(nums.cbegin(), nums.cend(), 0ll);
    for (int i = 0; i < xor_gain.size() - 1; i += 2) {
      if (xor_gain[i] + xor_gain[i + 1] > 0) {
        max_sum += xor_gain[i] + xor_gain[i + 1];
      }
    }

    return max_sum;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.maximumValueSum({1, 2, 1}, 3, {{0, 1}, {0, 2}});
}
