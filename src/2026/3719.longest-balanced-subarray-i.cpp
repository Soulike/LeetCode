/*
 * @lc app=leetcode id=3719 lang=cpp
 *
 * [3719] Longest Balanced Subarray I
 */

#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  int longestBalanced(const std::vector<int>& nums) {
    int longest_subarray_size = 0;
    for (int i = 0; i < nums.size(); i++) {
      std::unordered_map<int, int> odd_number_to_count;
      std::unordered_map<int, int> even_number_to_count;
      for (int j = i; j < nums.size(); j++) {
        if (nums[j] % 2 == 0) {
          even_number_to_count[nums[j]]++;
        } else {
          odd_number_to_count[nums[j]]++;
        }
        const int even_number_count = even_number_to_count.size();
        const int odd_number_count = odd_number_to_count.size();
        if (even_number_count == odd_number_count) {
          longest_subarray_size = std::max(longest_subarray_size, j - i + 1);
        }
      }
    }

    return longest_subarray_size;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.longestBalanced({10, 6, 10, 7});
}
