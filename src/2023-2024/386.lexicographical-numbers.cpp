/*
 * @lc app=leetcode id=386 lang=cpp
 *
 * [386] Lexicographical Numbers
 */
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> lexicalOrder(int n) {
    std::vector<int> results;
    int currentNumber = 1;

    // Have at most `n` digits
    for (int i = 0; i < n; i++) {
      results.push_back(currentNumber);

      if (currentNumber * 10 <= n) {
        // If we can multiply it by 10, do it to maintain order
        currentNumber *= 10;
      } else {
        // If we can't multiply it by 10, remove its last digit
        // and increment it to maintain order
        while (currentNumber % 10 == 9 || currentNumber >= n) {
          currentNumber /= 10;
        }
        currentNumber++;
      }
    }

    return results;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.lexicalOrder(13);
}
