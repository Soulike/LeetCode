/*
 * @lc app=leetcode id=594 lang=cpp
 *
 * [594] Longest Harmonious Subsequence
 */

#include <cinttypes>
#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  int findLHS(const std::vector<int>& nums) {
    std::unordered_map<int, std::uint64_t> num_to_freqs;
    for (const int num : nums) {
      num_to_freqs[num]++;
    }

    std::uint64_t max_sequence_size = 0;
    for (const auto& [num, freq] : num_to_freqs) {
      if (num_to_freqs.contains(num + 1)) {
        max_sequence_size =
            std::max(max_sequence_size, freq + num_to_freqs[num + 1]);
      }
    }

    return static_cast<int>(max_sequence_size);
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.findLHS({11702305, 84420925, 37477084, 27336327, 72660336, 59126505,
               5750846, 32621729, 661313, 33925857});
}
