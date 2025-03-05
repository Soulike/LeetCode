/*
 * @lc app=leetcode id=2579 lang=cpp
 *
 * [2579] Count Total Number of Colored Cells
 */

// @lc code=start
class Solution {
 public:
  long long coloredCells(int n) {
    /**
     * When i = 1, we have 1 cell.
     * Every time i = i + 1, cells increase by (i - 2) * 4 + 4 = 4(i - 1)
     * So for i from 1 to n, the number of cells is:
     * 1 + 4(2 - 1) + 4(3 - 1) + ... + 4(n - 1) + 4(n)
     * = 1 + 4[1 + 2 + 3 + ... + (n-1)]
     * = 1 + 4[n(n - 1) / 2]
     * = 1 + 2n(n - 1)
     */
    return 2 * static_cast<long long>(n) * (n - 1) + 1;
  }
};
// @lc code=end
