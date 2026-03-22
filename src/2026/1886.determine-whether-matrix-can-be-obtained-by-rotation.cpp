/*
 * @lc app=leetcode id=1886 lang=cpp
 *
 * [1886] Determine Whether Matrix Can Be Obtained By Rotation
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  bool findRotation(const std::vector<std::vector<int>>& mat,
                    const std::vector<std::vector<int>>& target) {
    const int matrix_size = mat.size();

    bool rotate_0_equal = true;
    for (int i = 0; i < matrix_size; i++) {
      for (int j = 0; j < matrix_size; j++) {
        if (mat[i][j] != target[i][j]) {
          rotate_0_equal = false;
          break;
        }
      }
    }
    if (rotate_0_equal) {
      return true;
    }

    bool rotate_90_equal = true;
    for (int i = 0; i < matrix_size; i++) {
      for (int j = 0; j < matrix_size; j++) {
        const Coordinate new_coordinate =
            GetRotate90ClockwiseCoordinate({i, j}, matrix_size);
        if (mat[i][j] != target[new_coordinate.x][new_coordinate.y]) {
          rotate_90_equal = false;
          break;
        }
      }
    }
    if (rotate_90_equal) {
      return true;
    }

    bool rotate_180_equal = true;
    for (int i = 0; i < matrix_size; i++) {
      for (int j = 0; j < matrix_size; j++) {
        const Coordinate new_coordinate =
            GetRotate180ClockwiseCoordinate({i, j}, matrix_size);
        if (mat[i][j] != target[new_coordinate.x][new_coordinate.y]) {
          rotate_180_equal = false;
          break;
        }
      }
    }
    if (rotate_180_equal) {
      return true;
    }

    bool rotate_270_equal = true;
    for (int i = 0; i < matrix_size; i++) {
      for (int j = 0; j < matrix_size; j++) {
        const Coordinate new_coordinate =
            GetRotate270ClockwiseCoordinate({i, j}, matrix_size);
        if (mat[i][j] != target[new_coordinate.x][new_coordinate.y]) {
          rotate_270_equal = false;
          break;
        }
      }
    }
    if (rotate_270_equal) {
      return true;
    }

    return false;
  }

 private:
  struct Coordinate {
    int x;
    int y;
  };

 private:
  static Coordinate GetRotate90ClockwiseCoordinate(
      const Coordinate& original_coordinate,
      const int matrix_size) {
    // y2 = (n - 1) - x1
    // x2 = (y1)
    return {original_coordinate.y, (matrix_size - 1 - original_coordinate.x)};
  }

  static Coordinate GetRotate180ClockwiseCoordinate(
      const Coordinate& original_coordinate,
      const int matrix_size) {
    // x2 = (n-1) - x1
    // y2 = (n-1) - y1
    return {(matrix_size - 1) - original_coordinate.x,
            (matrix_size - 1 - original_coordinate.y)};
  }

  static Coordinate GetRotate270ClockwiseCoordinate(
      const Coordinate& original_coordinate,
      const int matrix_size) {
    // y2 = x1
    // x2 = n - 1 - y1
    return {(matrix_size - 1) - original_coordinate.y, original_coordinate.x};
  }
};
// @lc code=end
