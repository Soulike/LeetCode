/*
 * @lc app=leetcode id=1415 lang=cpp
 *
 * [1415] The k-th Lexicographical String of All Happy Strings of Length n
 */

#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::string getHappyString(const int n, int k) {
    const std::string result = GetHappyStringHelper(n, k, {'a', 'b', 'c'});
    return result;
  }

 private:
  static std::string GetHappyStringHelper(
      const int n,
      int k,
      const std::vector<char>& first_letter_candidates) {
    if (n == 0) {
      return "";
    }

    // 2 ^ (n-1)
    const int group_string_count = 1 << (n - 1);

    // 3 choices for the first letter, 2 choices for all following letters.
    const int total_string_count = 3 * group_string_count;
    if (k > total_string_count) {
      return "";
    }

    std::string result;

    // Determine the first letter
    int first_letter_index = 0;
    while (k > group_string_count) {
      k -= group_string_count;
      first_letter_index++;
    }

    const char first_letter = first_letter_candidates[first_letter_index];
    result.push_back(first_letter);

    std::vector<char> next_first_letter_candidates;
    switch (first_letter) {
      case 'a':
        next_first_letter_candidates = {'b', 'c'};
        break;
      case 'b':
        next_first_letter_candidates = {'a', 'c'};
        break;
      default:
        next_first_letter_candidates = {'a', 'b'};
    }
    result.append(GetHappyStringHelper(n - 1, k, next_first_letter_candidates));
    return result;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.getHappyString(1, 3);
}
