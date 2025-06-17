/*
 * @lc app=leetcode id=3405 lang=cpp
 *
 * [3405] Count the Number of Arrays with K Matching Adjacent Elements
 */

#include <cinttypes>

// @lc code=start
class Solution {
 public:
  int countGoodArrays(const int array_size, const int max_value, const int k) {
    // We have `array_size - 1` adjacent pairs in the array, and we need
    // `k` adjacent equal pairs.
    // So we have `array_size - 1 - k` adjacent non-equal pairs.
    // See each adjacent non-equal pair as a separator.
    // We have `array_size - 1` slots to put the separators.
    // Total ways to get segments: `C(array_size - 1, array_size - 1 - k) =
    // C(array_size - 1, k)`.
    //
    // Now we have `array_size - k` segments.
    // Each segment should contain equal values.
    // The first segment have `max_value` values to use.
    // All other segments have `max_value - 1` values to use.
    // Total ways to set values: `m * (m - 1) ^ (array_size - k - 1)`.
    //
    // Result: `C(array_size - 1, k) * (m * (m - 1) ^ (array_size - k - 1))`.

    static constexpr std::intmax_t kMod = 1e9 + 7;
    const std::intmax_t combination_mod_result =
        CombinationMod(array_size - 1, k, kMod);
    const std::intmax_t exponent_mod_result =
        ExponentMod(max_value - 1, array_size - k - 1, kMod);
    return static_cast<int>(combination_mod_result * max_value % kMod *
                            exponent_mod_result % kMod);
  }

 private:
  static std::intmax_t ExponentMod(std::intmax_t base,
                                   std::intmax_t exp,
                                   std::intmax_t mod) {
    std::intmax_t result = 1;
    base %= mod;
    while (exp > 0) {
      if (exp & 1)
        result = (result * base) % mod;
      base = (base * base) % mod;
      exp >>= 1;
    }
    return result;
  }

  static std::intmax_t ModInverse(std::intmax_t a, std::intmax_t mod) {
    return ExponentMod(a, mod - 2,
                       mod);  // Fermat's little theorem for prime modulus
  }

  static std::intmax_t CombinationMod(const int n,
                                      const int k,
                                      const std::intmax_t mod) {
    if (k > n)
      return 0;
    if (k == 0 || k == n)
      return 1;

    std::intmax_t result = 1;
    for (int i = 1; i <= k; ++i) {
      result = (result * (n - (i - 1))) % mod;
      result = (result * ModInverse(i, mod)) % mod;
    }
    return result;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.countGoodArrays(5581, 58624, 4766);
}
