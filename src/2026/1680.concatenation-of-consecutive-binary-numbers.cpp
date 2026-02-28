/*
 * @lc app=leetcode id=1680 lang=cpp
 *
 * [1680] Concatenation of Consecutive Binary Numbers
 */

#include <cstddef>
#include <cstdint>

// @lc code=start
class Solution {
 public:
  int concatenatedBinary(const int n) {
    static constexpr std::uint64_t kMod = 1e9 + 7;
    std::uint64_t current_binary_length = 0;
    std::uint64_t result = 0;
    for (int i = 1; i <= n; i++) {
      current_binary_length += IsPowerOfTwo(i);
      result <<= current_binary_length;
      result += i;
      result %= kMod;
    }
    return static_cast<int>(result);
  }

 private:
  static bool IsPowerOfTwo(const int num) { return (num & (num - 1)) == 0; }
};
// @lc code=end

int main() {
  Solution sol;
  sol.concatenatedBinary(12);
}