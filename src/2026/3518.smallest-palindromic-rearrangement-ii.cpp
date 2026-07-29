/*
 * @lc app=leetcode id=3518 lang=cpp
 *
 * [3518] Smallest Palindromic Rearrangement II
 */

#include <algorithm>
#include <array>
#include <cinttypes>
#include <string>

// @lc code=start
class Solution {
 public:
  std::string smallestPalindrome(const std::string& s, int k) {
    std::array<std::uint64_t, 26> letter_to_freq = {};
    for (std::uint64_t i = 0; i < s.size() / 2; i++) {
      letter_to_freq[s[i] - 'a']++;
    }

    if (WaysToFill(letter_to_freq, s.size() / 2, k + 1) < k) {
      return "";
    }

    std::string left;
    left.resize(s.size() / 2);

    for (int i = 0; i < left.size(); i++) {
      for (int l = 0; l < 26; l++) {
        if (letter_to_freq[l] == 0) {
          continue;
        }

        letter_to_freq[l]--;
        const std::uint64_t ways_to_fill_starts_with_letter_l =
            WaysToFill(letter_to_freq, left.size() - i - 1, k + 1);
        if (ways_to_fill_starts_with_letter_l >= k) {
          left[i] = l + 'a';
          break;
        } else {
          k -= ways_to_fill_starts_with_letter_l;
          letter_to_freq[l]++;
        }
      }
    }

    std::string mid;

    if (s.size() % 2 == 1) {
      mid += s[s.size() / 2];
    }

    std::string right;
    right.resize(left.size());
    std::ranges::reverse_copy(left, right.begin());

    return left + mid + right;
  }

 private:
  static std::uint64_t Combination(const std::uint64_t m,
                                   const std::uint64_t n,
                                   const std::uint64_t max_cap) {
    std::uint64_t result = 1;
    for (std::uint64_t i = 1; i <= n; i++) {
      // Multiply before dividing: `result` always holds an exact C(m-n+i, i),
      // so the product is divisible by `i`. Computing (m-n+i)/i on its own
      // truncates and silently produces a wrong binomial coefficient.
      result = result * (m - n + i) / i;
      if (result >= max_cap) {
        return result;
      }
    }
    return result;
  }

  static std::uint64_t WaysToFill(
      const std::array<std::uint64_t, 26>& letter_to_freq,
      const std::uint64_t slots,
      const std::uint64_t max_cap) {
    std::uint64_t remaining_slots = slots;
    std::uint64_t ways = 1;
    for (int i = 0; i < 26; i++) {
      if (letter_to_freq[i] == 0) {
        continue;
      }

      ways *= Combination(remaining_slots, letter_to_freq[i], max_cap);
      if (ways >= max_cap) {
        return ways;
      }
      remaining_slots -= letter_to_freq[i];
    }

    return ways;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.smallestPalindrome("gnllllng", 6);
}
