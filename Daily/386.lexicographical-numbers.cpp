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
    int currentPrefix = 0;
    recursive(n, results, currentPrefix);
    return results;
  }

 private:
  void recursive(int n, std::vector<int>& results, const int& currentPrefix) {
    if (currentPrefix * 10 > n) {
      return;
    }

    for (int i = 0; i <= 9; i++) {
      const int num = currentPrefix * 10 + i;
      if (num == 0) {
        continue;
      }
      if (num > n) {
        break;
      }
      results.push_back(num);
      recursive(n, results, num);
    }
  }
};
// @lc code=end
