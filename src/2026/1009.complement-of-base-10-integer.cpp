/*
 * @lc app=leetcode id=1009 lang=cpp
 *
 * [1009] Complement of Base 10 Integer
 */

// @lc code=start
class Solution {
 public:
  int bitwiseComplement(int n) {
    if (n == 0) {
      return 1;
    }
    int result = 0;
    int shift_count = 0;
    while (n > 0) {
      result += (!(n & 0b1)) << shift_count;
      n >>= 1;
      shift_count++;
    }
    return result;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.bitwiseComplement(0);
}
