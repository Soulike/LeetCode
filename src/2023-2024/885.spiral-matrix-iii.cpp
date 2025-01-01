/*
 * @lc app=leetcode id=885 lang=cpp
 *
 * [885] Spiral Matrix III
 */
#include <vector>

// @lc code=start
enum class HorizontalDirection { TO_LEFT, TO_RIGHT };
enum class VerticalDirection { TO_UP, TO_DOWN };
enum class Direction { HORIZONTAL, VERTICAL };

class Solution {
 public:
  std::vector<std::vector<int>> spiralMatrixIII(int rows,
                                                int cols,
                                                int rStart,
                                                int cStart) {
    const int POSITION_NUMBER = rows * cols;
    std::vector<std::vector<int>> positions;

    Direction direction = Direction::HORIZONTAL;
    HorizontalDirection horizontalDirection = HorizontalDirection::TO_RIGHT;
    VerticalDirection verticalDirection = VerticalDirection::TO_DOWN;
    int horizontalSteps = 1;
    int verticalSteps = 1;

    int x = rStart;
    int y = cStart;
    positions.push_back({x, y});

    while (positions.size() < POSITION_NUMBER) {
      if (direction == Direction::HORIZONTAL) {
        int moveFactor =
            horizontalDirection == HorizontalDirection::TO_RIGHT ? 1 : -1;
        for (int i = 0; i < horizontalSteps; i++) {
          y += moveFactor;

          if (Solution::isValidCoordinate(x, y, rows, cols)) {
            positions.push_back({x, y});
            if (positions.size() == POSITION_NUMBER) {
              break;
            }
          }
        }
        horizontalDirection =
            horizontalDirection == HorizontalDirection::TO_RIGHT
                ? HorizontalDirection::TO_LEFT
                : HorizontalDirection::TO_RIGHT;
        horizontalSteps++;
        direction = Direction::VERTICAL;
      } else if (direction == Direction::VERTICAL) {
        int moveFactor =
            verticalDirection == VerticalDirection::TO_DOWN ? 1 : -1;
        for (int i = 0; i < verticalSteps; i++) {
          x += moveFactor;

          if (Solution::isValidCoordinate(x, y, rows, cols)) {
            positions.push_back({x, y});
            if (positions.size() == POSITION_NUMBER) {
              break;
            }
          }
        }
        verticalDirection = verticalDirection == VerticalDirection::TO_DOWN
                                ? VerticalDirection::TO_UP
                                : VerticalDirection::TO_DOWN;
        verticalSteps++;
        direction = Direction::HORIZONTAL;
      }
    }

    return positions;
  }

 private:
  static bool isValidCoordinate(int x, int y, int rows, int cols) {
    return x >= 0 && x < rows && y >= 0 && y < cols;
  }
};
// @lc code=end
