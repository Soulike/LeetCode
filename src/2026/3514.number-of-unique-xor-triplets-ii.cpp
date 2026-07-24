/*
 * @lc app=leetcode id=3514 lang=cpp
 *
 * [3514] Number of Unique XOR Triplets II
 */

#include <numeric>
#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  int uniqueXorTriplets(const std::vector<int>& nums) {
    const int max_possible_xor_value = GetMaxPossibleXorValueWithNum(
        *std::max_element(nums.cbegin(), nums.cend()));

    std::vector<bool> has_two_num_xor(max_possible_xor_value + 1, false);
    for (const int num1 : nums) {
      for (const int num2 : nums) {
        has_two_num_xor[num1 ^ num2] = true;
      }
    }

    std::vector<bool> has_three_num_xor(max_possible_xor_value + 1, false);
    for (int two_num_xor = 0; two_num_xor < has_two_num_xor.size();
         two_num_xor++) {
      if (!has_two_num_xor[two_num_xor]) {
        continue;
      }
      for (const int num : nums) {
        has_three_num_xor[two_num_xor ^ num] = true;
      }
    }

    return std::accumulate(
        has_three_num_xor.cbegin(), has_three_num_xor.cend(), 0,
        [](const int prev, const int curr) { return prev + curr; });
  }

 private:
  static int GetMaxPossibleXorValueWithNum(int num) {
    // With num, the max possible xor value is fill all bits in num as 1s.
    int result = 0;
    while (num > 0) {
      result <<= 1;
      result += 1;
      num >>= 1;
    }
    return result;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.uniqueXorTriplets({1, 3});
}
