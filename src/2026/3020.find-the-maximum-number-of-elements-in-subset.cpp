/*
 * @lc app=leetcode id=3020 lang=cpp
 *
 * [3020] Find the Maximum Number of Elements in Subset
 */

#include <cmath>
#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maximumLength(const std::vector<int>& nums) {
    static const int kIntMaxSqrt = static_cast<int>(std::sqrt(INT_MAX)) + 1;

    std::unordered_map<int, int> num_to_freq;
    num_to_freq.reserve(nums.size());
    for (const int num : nums) {
      num_to_freq[num]++;
    }

    int max_length =
        num_to_freq.contains(1)
            // Odd 1s can also form valid sequence
            ? (num_to_freq[1] % 2 == 0 ? num_to_freq[1] - 1 : num_to_freq[1])
            // Only one number is also a valid sequence
            : 1;

    for (const auto& [num, freq] : num_to_freq) {
      if (
          // Already handled 1s, skip
          num == 1 ||
          // Expect num to be at 2 sides. Square can not > INT_MAX and at least
          // has 2 available.
          num >= kIntMaxSqrt || freq < 2) {
        continue;
      }

      int current_length = 2;
      int current_num = num;
      while (current_num <= kIntMaxSqrt &&
             num_to_freq.contains(current_num * current_num)) {
        current_num *= current_num;
        const int next_num_freq = num_to_freq.at(current_num);
        if (next_num_freq == 1) {
          // Only can be the middle one and terminate the sequence.
          current_length++;
          break;
        } else {
          // POSSIBLE 2-side ones.
          current_length += 2;
        }
      }

      if (num_to_freq.at(current_num) > 1) {
        // The last possible 2-side ones can not find a middle square, so it
        // become the middle number and only one is used.
        current_length--;
      }

      max_length = std::max(max_length, current_length);
    }

    return max_length;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.maximumLength({15, 15, 225, 225, 50625, 50625});
}
