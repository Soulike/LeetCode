/*
 * @lc app=leetcode id=2311 lang=cpp
 *
 * [2311] Longest Binary Subsequence Less Than or Equal to K
 */

#include <string>

// @lc code=start
class Solution {
 public:
  int longestSubsequence(std::string s, int k) {
    const int k_bit_count = GetBitCountOfNumber(k);
    int subsequence_length = 0;
    int current_num = 0;
    for (int i = s.size() - 1; i >= 0; i--) {
      if (s[i] == '0') {
        subsequence_length++;
      } else if (s.size() - i <= k_bit_count) {
        const int add_num = 1 << (s.size() - i - 1);
        if (current_num + add_num <= k) {
          current_num += add_num;
          subsequence_length++;
        }
      }
    }

    return subsequence_length;
  }

 private:
  static int GetBitCountOfNumber(const std::uint64_t num) {
    std::uint64_t current_num = num;
    int bit_count = 0;
    while (current_num > 0) {
      current_num >>= 1;
      bit_count++;
    }
    return bit_count;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.longestSubsequence(
      "000101010011011001011101111000111111100001011000000100010000111100000011"
      "111001000111100111101001111001011101001011011101001011011001111111010011"
      "100011110111010000010000010111001001111101100001111",
      300429827);
}
