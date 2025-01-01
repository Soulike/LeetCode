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

    int left = 1;
    int right = n;

    while (left <= right) {
      int mid = left + (right - left) / 2;
      int leftSum = prefixSum[mid];
      int rightSum = prefixSum[n] - prefixSum[mid - 1];
      if (leftSum == rightSum) {
        return mid;
      } else if (leftSum < rightSum) {
        left = mid + 1;
      } else {
        right = mid - 1;
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