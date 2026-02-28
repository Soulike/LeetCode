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
    std::uint64_t result = 0;
    for (int i = 1; i <= n; i++) {
      const std::size_t binary_length = GetBinaryLength(i);
      result <<= binary_length;
      result += i;
      result %= kMod;
    }
    return static_cast<int>(result);
  }

 private:
  static std::size_t GetBinaryLength(int num) {
    std::size_t result = 0;
    while (num > 0) {
      num >>= 1;
      result++;
    }
    return result;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.concatenatedBinary(12);
}