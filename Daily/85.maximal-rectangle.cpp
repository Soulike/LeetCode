/*
 * @lc app=leetcode id=85 lang=cpp
 *
 * [85] Maximal Rectangle
 */
#include <algorithm>
#include <vector>

using std::vector;

// @lc code=start
class Solution {
 public:
  int maximalRectangle(vector<vector<char>>& matrix) {
    if (matrix.empty()) {
      return 0;
    }
    const int M = matrix.size();
    const int N = matrix[0].size();

    // The left boundary of rectangle
    // if the height of the rectangle is height[j]
    // -1 means no rectangle here
    int left[N];
    // The right boundary of rectangle
    // if the height of the rectangle is height[j]
    // N means no rectangle here
    int right[N];

    int height[N];
    std::fill_n(left, N, -1);
    std::fill_n(right, N, N);
    std::fill_n(height, N, 0);

    int maxArea = 0;

    for (int i = 0; i < M; i++) {
      int currentLeft = 0;
      int currentRight = N - 1;

      for (int j = 0; j < N; j++) {
        // compute height (can do this from either side)
        if (matrix[i][j] == '1') {
          height[j]++;
        } else {
          height[j] = 0;
        }
      }
      for (int j = 0; j < N; j++) {
        // compute left (from left to right)
        if (matrix[i][j] == '1') {
          left[j] = std::max(left[j], currentLeft);
        } else {
          left[j] = 0;
          currentLeft = j + 1;
        }
      }
      // compute right (from right to left)
      for (int j = N - 1; j >= 0; j--) {
        if (matrix[i][j] == '1')
          right[j] = std::min(right[j], currentRight);
        else {
          right[j] = N;
          currentRight = j - 1;
        }
      }
      // compute the area of rectangle (can do this from either side)
      for (int j = 0; j < N; j++)
        maxArea = std::max(maxArea, (right[j] - left[j] + 1) * height[j]);
    }
    return maxArea;
  }
};
// @lc code=end

int main() {
  vector<vector<char>> matrix = {{'1', '0', '1', '0', '0'},
                                 {'1', '0', '1', '1', '1'},
                                 {'1', '1', '1', '1', '1'},
                                 {'1', '0', '0', '1', '0'}};
  Solution sol;
  sol.maximalRectangle(matrix);
}