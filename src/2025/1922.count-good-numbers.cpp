/*
 * @lc app=leetcode id=1922 lang=cpp
 *
 * [1922] Count Good Numbers
 */

#include <cinttypes>

// @lc code=start
class Solution {
 public:
  int countGoodNumbers(const long long n) {
    constexpr int kMod = 1e9 + 7;
    constexpr int kPrimeDigitCount = 4;
    constexpr int kEvenDigitCount = 5;

    const long long odd_index_count = n / 2;
    const long long even_index_count = (n + 1) / 2;

    return static_cast<int>(GetModExp(kPrimeDigitCount, odd_index_count, kMod) *
                            GetModExp(kEvenDigitCount, even_index_count, kMod) %
                            kMod);
  }

 private:
  // Calculate (base ^ exp) % mod
  static long long GetModExp(const long long base,
                             const long long exp,
                             const int mod) {
    long long result = 1;
    long long current_base = base;
    // How many multiplies we need on current_base
    long long remaining_current_base_exp = exp;

    while (remaining_current_base_exp > 0) {
      if (remaining_current_base_exp % 2 == 1) {
        result *= current_base;
        result %= mod;
      }
      current_base *= current_base;
      current_base %= mod;
      remaining_current_base_exp /= 2;
    }

    return result;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.countGoodNumbers(4);
}
