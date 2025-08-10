/*
 * @lc app=leetcode id=869 lang=cpp
 *
 * [869] Reordered Power of 2
 */

#include <cinttypes>
#include <cmath>
#include <unordered_map>

// @lc code=start
class Solution {
 public:
  bool reorderedPowerOf2(const int n) {
    const std::uint64_t hash = GetNumberHash(n);
    for (int i = 0; i < 31; i++) {
      if (GetNumberHash(1 << i) == hash) {
        return true;
      }
    }

    return false;
  }

 private:
  static inline std::unordered_map<int, std::uint64_t> hash_memo_;

  static std::uint64_t GetNumberHash(int n) {
    if (hash_memo_.contains(n)) {
      return hash_memo_.at(n);
    }

    std::uint64_t hash = 0;
    while (n > 0) {
      hash += static_cast<std::uint64_t>(std::pow(10, n % 10));
      n /= 10;
    }

    hash_memo_[n] = hash;
    return hash;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.reorderedPowerOf2(10);
}
