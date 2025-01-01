/*
 * @lc app=leetcode id=476 lang=cpp
 *
 * [476] Number Complement
 */

// @lc code=start
class Solution {
 public:
  int findComplement(int num) {
    int result = 0;
    for (int i = 0; num > 0; i++, num >>= 1) {
      const int bit = num & 0b1;
      result += (0b1 - bit) << i;
    }
    return result;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.findComplement(5);
}
