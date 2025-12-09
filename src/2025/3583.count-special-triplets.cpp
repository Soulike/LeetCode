/*
 * @lc app=leetcode id=3583 lang=cpp
 *
 * [3583] Count Special Triplets
 */

#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  int specialTriplets(const std::vector<int>& nums) {
    static constexpr int kMod = 1e9 + 7;
    static constexpr int kMaxNum = 1e5;

    std::array<int, kMaxNum + 1> num_to_freqs = {};
    for (const int num : nums) {
      num_to_freqs[num]++;
    }

    std::uint64_t triplet_count = 0;

    std::array<int, kMaxNum + 1> prefix_num_to_freqs = {};

    for (const int num : nums) {
      prefix_num_to_freqs[num]++;

      const int num_double = num * 2;
      if (num_double > kMaxNum) {
        continue;
      }

      const int num_double_prev_freq = prefix_num_to_freqs[num_double];
      const int num_double_after_freq =
          num_to_freqs[num_double] - num_double_prev_freq - (num == 0);

      if (num_double_prev_freq == 0 || num_double_after_freq <= 0) {
        continue;
      }

      triplet_count +=
          (1ll * num_double_prev_freq * num_double_after_freq) % kMod;
      triplet_count %= kMod;
    }

    return static_cast<int>(triplet_count);
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.specialTriplets({0, 0, 0});
}