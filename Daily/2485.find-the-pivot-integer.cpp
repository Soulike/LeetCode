/*
 * @lc app=leetcode id=2485 lang=cpp
 *
 * [2485] Find the Pivot Integer
 */
// @lc code=start
class Solution {
 public:
  int pivotInteger(int n) {
    int prefixSum[n + 1];
    prefixSum[0] = 0;
    prefixSum[1] = 1;
    for (int i = 2; i <= n; i++) {
      prefixSum[i] = prefixSum[i - 1] + i;
    }

    for (int i = 1; i <= n; i++) {
      if (prefixSum[i] == prefixSum[n] - prefixSum[i - 1]) {
        return i;
      }
    }

    return -1;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.pivotInteger(1);
}