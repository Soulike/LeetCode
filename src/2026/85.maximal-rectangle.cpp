/*
 * @lc app=leetcode id=85 lang=cpp
 *
 * [85] Maximal Rectangle
 */

#include <stack>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maximalRectangle(const std::vector<std::vector<char>>& matrix) {
    const int rows = matrix.size();
    const int cols = matrix[0].size();

    std::vector<int> heights(cols, 0);
    int max_rectangle_area = 0;
    for (int i = 0; i < rows; i++) {
      for (int j = 0; j < cols; j++) {
        if (matrix[i][j] == '1') {
          heights[j]++;
        } else {
          heights[j] = 0;
        }
      }
      max_rectangle_area =
          std::max(max_rectangle_area, largestRectangleArea(heights));
    }

    return max_rectangle_area;
  }

 private:
  static int largestRectangleArea(std::vector<int>& heights) {
    // Force empty the stack in the end.
    heights.push_back(0);

    std::stack<int> increasing_height_index_stack;
    int max_area = 0;
    for (int i = 0; i < heights.size(); i++) {
      // For every heights[i], the maximum rectangle with its height is
      // calculated when it is popped from the increasing stack.
      while (!increasing_height_index_stack.empty() &&
             heights[increasing_height_index_stack.top()] >= heights[i]) {
        // heights[i] is shorter heights[top]. heights[top] needs to be popped.
        const int top_height_index = increasing_height_index_stack.top();
        increasing_height_index_stack.pop();

        const int top_height = heights[top_height_index];
        // Since this is an increasing stack, heights[new_top] < heights[top].
        // So new_top is the exact previous index of heights[top]'s rectangle.
        const int top_height_prev_index =
            increasing_height_index_stack.empty()
                ? -1
                : increasing_height_index_stack.top();
        // heights[i] < heights[top].
        // So i is the exact next index of heights[top]'s rectangle.
        const int top_height_next_index = i;

        // top_height_next_index - top_height_prev_index + 1: the length from
        // top_height_next_index to top_height_prev_index.
        // -2: Exclude new_top and i.
        const int top_height_width =
            top_height_next_index - top_height_prev_index + 1 - 2;

        // Calculate the maximum rectangle with heights[top] and compare.
        max_area = std::max(max_area, top_height * top_height_width);
      }
      increasing_height_index_stack.push(i);
    }

    // Restore the array.
    heights.pop_back();

    return max_area;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.maximalRectangle({
      {'1', '0', '1', '0', '0'},
      {'1', '0', '1', '1', '1'},
      {'1', '1', '1', '1', '1'},
      {'1', '0', '0', '1', '0'},
  });
}