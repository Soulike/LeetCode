/*
 * @lc app=leetcode id=84 lang=cpp
 *
 * [84] Largest Rectangle in Histogram
 */
#include <algorithm>
#include <stack>
#include <vector>

using std::stack;
using std::vector;

// @lc code=start
class Solution {
 public:
  int largestRectangleArea(vector<int>& heights) {
    heights.push_back(0); // force stack to empty in the end

    int maxArea = 0;
    stack<int> increasingIndexStack;
    for (int i = 0; i < heights.size(); i++) {
      while (!increasingIndexStack.empty() &&
             heights[increasingIndexStack.top()] >= heights[i]) {
        int topIndex = increasingIndexStack.top();
        increasingIndexStack.pop();

        int topHeight = heights[topIndex];
        int topHeightWidth = increasingIndexStack.empty()
                           ? i
                           : i - increasingIndexStack.top() -
                                 1;
        maxArea = std::max(maxArea, topHeight * topHeightWidth);
      }
      increasingIndexStack.push(i);
    }

    return maxArea;
  }
};
// @lc code=end

int main() {
  Solution sol;
  vector<int> vec = {1, 2, 2};  // 4
  sol.largestRectangleArea(vec);
}