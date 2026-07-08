/*
 * @lc app=leetcode id=3756 lang=cpp
 *
 * [3756] Concatenate Non-Zero Digits and Multiply by Sum II
 */

#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> sumAndMultiply(
      const std::string& s,
      const std::vector<std::vector<int>>& queries) {
    // non_zero_prefix_mod[i] - the number of s[0...i] without 0, % kMod
    std::vector<std::int64_t> non_zero_prefix_mod(s.size());

    // non_zero_prefix_length[i] - the original length of non-zero prefix ends
    // with s[i].
    std::vector<int> non_zero_prefix_length(s.size());

    std::vector<int> non_zero_prefix_digit_sum(s.size());

    for (int i = 0; i < s.size(); i++) {
      if (s[i] != '0') {
        non_zero_prefix_mod[i] =
            (i - 1 >= 0 ? non_zero_prefix_mod[i - 1] : 0) * 10 + (s[i] - '0');
        non_zero_prefix_mod[i] %= kMod;

        non_zero_prefix_length[i] =
            (i - 1 >= 0 ? non_zero_prefix_length[i - 1] : 0) + 1;
      } else {
        if (i - 1 >= 0) {
          non_zero_prefix_mod[i] = non_zero_prefix_mod[i - 1];
          non_zero_prefix_length[i] = non_zero_prefix_length[i - 1];
        } else {
          non_zero_prefix_mod[i] = 0;
          non_zero_prefix_length[i] = 0;
        }
      }

      non_zero_prefix_digit_sum[i] =
          (i - 1 >= 0 ? non_zero_prefix_digit_sum[i - 1] : 0) + (s[i] - '0');
    }

    const auto query_non_zero_digits_num_mod = [&](const int left,
                                                   const int right) {
      if (left == 0) {
        return non_zero_prefix_mod[right];
      }

      const int left_prefix_length = non_zero_prefix_length[left - 1];
      const int right_prefix_length = non_zero_prefix_length[right];
      const int left_prefix_pow_10_exp =
          right_prefix_length - left_prefix_length;

      std::int64_t result =
          non_zero_prefix_mod[right] -
          (non_zero_prefix_mod[left - 1]) * Pow10Mod(left_prefix_pow_10_exp);
      while (result < 0) {
        result += kMod;
      }
      return result % kMod;
    };

    const auto query_non_zero_digits_sum = [&](const int left,
                                               const int right) {
      if (left == 0) {
        return non_zero_prefix_digit_sum[right];
      }
      return non_zero_prefix_digit_sum[right] -
             non_zero_prefix_digit_sum[left - 1];
    };

    std::vector<int> results;
    results.reserve(queries.size());
    for (const std::vector<int>& query : queries) {
      const int left = query[0];
      const int right = query[1];

      results.push_back(query_non_zero_digits_num_mod(left, right) *
                        query_non_zero_digits_sum(left, right) % kMod);
    }

    return results;
  }

 private:
  static constexpr int kMod = 1e9 + 7;

  static int Pow10Mod(const int exp) {
    // cache[i] - 10 ^ i
    static std::vector<int> cache(1, 1);

    while (cache.size() - 1 < exp) {
      cache.push_back((static_cast<std::int64_t>(cache.back()) * 10) % kMod);
    }

    return cache[exp];
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.sumAndMultiply("10203004", {{0, 7}, {1, 3}, {4, 6}});
}
