/*
 * @lc app=leetcode id=386 lang=cpp
 *
 * [386] Lexicographical Numbers
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> lexicalOrder(const int n) {
    int current_num = 1;
    std::vector<int> lexical_numbers;

    for (int i = 0; i < n; i++) {
      lexical_numbers.push_back(current_num);
      if (current_num * 10 <= n) {
        current_num *= 10;
      } else {
        while (current_num % 10 == 9 || current_num >= n) {
          current_num /= 10;
        }
        current_num++;
      }
    }

    return lexical_numbers;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.lexicalOrder(100);
}
