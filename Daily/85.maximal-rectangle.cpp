/*
 * @lc app=leetcode id=85 lang=cpp
 *
 * [85] Maximal Rectangle
 */
#include <algorithm>
#include <stack>
#include <vector>

using std::stack;
using std::vector;

// @lc code=start
class Solution {
 public:
  int maximalRectangle(vector<vector<char>>& matrix) {
    // We see every row as a histogram.
    // Then the issue is converted to
    // LeetCode 84. Largest Rectangle in Histogram
    const int M = matrix.size();
    const int N = matrix[0].size();

    vector<int> heights(N);
    std::fill(heights.begin(), heights.end(), 0);

    int maxArea = 0;

    for (int i = 0; i < M; i++) {
      for (int j = 0; j < N; j++) {
        if (matrix[i][j] == '1') {
          heights[j]++;
        } else {
          heights[j] = 0;
        }
      }

      maxArea = std::max(maxArea, largestRectangleArea(heights));
    }

    return maxArea;
  }

  // LeetCode 84
  int largestRectangleArea(vector<int>& heights) {
    heights.push_back(0);  // force stack to empty in the end

    int maxArea = 0;
    stack<int> increasingIndexStack;
    for (int i = 0; i < heights.size(); i++) {
      while (!increasingIndexStack.empty() &&
             heights[increasingIndexStack.top()] >= heights[i]) {
        int topIndex = increasingIndexStack.top();
        increasingIndexStack.pop();

        int topHeight = heights[topIndex];
        int topHeightWidth =
            i -
            (increasingIndexStack.empty() ? -1 : increasingIndexStack.top()) -
            1;
        // (i - increasingIndexStack.top() + 1) - 1 - 1
        // `(i - increasingIndexStack.top() + 1)`
        // width from i to increasingIndexStack.top()
        // `-1`
        // exclude i, as height[i] < topHeight
        // `-1`
        // exclude increasingIndexStack.top()
        // as height[increasingIndexStack.top()] < topHeight
        maxArea = std::max(maxArea, topHeight * topHeightWidth);
      }
      increasingIndexStack.push(i);
    }

    heights.pop_back();
    return maxArea;
  }
};
// @lc code=end

int main() {
  vector<vector<char>> matrix = {{'0', '1'}, {'1', '0'}};
  Solution sol;
  sol.maximalRectangle(matrix);
}