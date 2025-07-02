/*
 * @lc app=leetcode id=3333 lang=cpp
 *
 * [3333] Find the Original Typed String II
 */

#include <algorithm>
#include <numeric>
#include <string>
#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  int possibleStringCount(const std::string& word, const int k) {
    if (word.size() < k) {
      return 0;
    }
    if (word.size() == k) {
      return 1;
    }

    std::vector<int> letter_repeats;
    letter_repeats.push_back(1);
    for (int i = 1; i < word.size(); i++) {
      if (word[i - 1] != word[i]) {
        letter_repeats.push_back(1);
      } else {
        letter_repeats.back()++;
      }
    }

    const int all_possible_string_count =
        std::accumulate(letter_repeats.cbegin(), letter_repeats.cend(), 1,
                        [](const std::int64_t prev, const int curr) {
                          return (prev * curr) % kMod;
                        });
    if (letter_repeats.size() >= k) {
      return all_possible_string_count;
    }

    /**
     * dp[i][j] Ways of using letter_repeats[0..i-1] to form a string of length
     * j
     *
     * base case
     * dp[0][j] = 0
     * dp[0][0] = 1
     *
     * formula
     * dp[i][j] = sum(for l from 1 to letter_repeats[i-1], dp[i-1][j-l])
     *
     * result
     * sum of dp[letter_repeats.size()][0...k-1]
     */
    std::vector<std::vector<int>> dp(2, std::vector<int>(k, 0));
    dp[0][0] = 1;

    for (int i = 1; i <= letter_repeats.size(); i++) {
      std::vector<int> prefix_sum(k + 1, 0);  // prefix sum of dp[i-1]
      prefix_sum[0] = 0;
      for (int j = 0; j < k; j++) {
        prefix_sum[j + 1] = (prefix_sum[j] + dp[(i - 1) % 2][j]) % kMod;
      }

      std::ranges::fill(dp[i % 2], 0);

      for (int j = 1; j < k; j++) {
        const int max_l = std::min(static_cast<int>(letter_repeats[i - 1]), j);
        dp[i % 2][j] = (prefix_sum[j] - prefix_sum[j - max_l] + kMod) % kMod;
      }
    }

    const int result = (kMod + all_possible_string_count -
                        std::accumulate(dp[letter_repeats.size() % 2].cbegin(),
                                        dp[letter_repeats.size() % 2].cend(), 0,
                                        [](const int prev, const int curr) {
                                          return (prev + curr) % kMod;
                                        })) %
                       kMod;
    return result;
  }

 private:
  static constexpr int kMod = 1e9 + 7;
};
// @lc code=end

int main() {
  Solution sol;
  sol.possibleStringCount(
      "mmzzzzzbbbbbbbbbmmyyyyyyyyttttttzzzooogggggggggyyyyyyyyhhhttllllhhhhqccc"
      "chh",
      65);
}
