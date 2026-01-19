/*
 * @lc app=leetcode id=1292 lang=cpp
 *
 * [1292] Maximum Side Length of a Square with Sum Less than or Equal to
 * Threshold
 */

#include <optional>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maxSideLength(const std::vector<std::vector<int>>& mat,
                    const int threshold) {
    const size_t row_count = mat.size();
    const size_t col_count = mat[0].size();
    const std::vector<std::vector<std::int64_t>> matrix_prefix_sum =
        GetMatrixPrefixSum(mat);

    std::int32_t left = 0;
    std::int32_t right = std::min(row_count, col_count) + 1;

    while (left < right) {
      const std::int32_t mid = (right - left) / 2 + left;
      bool has_square = !mid;

      if (mid > 0) {
        for (std::int64_t i = 0; i + mid - 1 < row_count; i++) {
          for (std::int64_t j = 0; j + mid - 1 < col_count; j++) {
            const std::optional<std::int64_t> square_sum =
                GetSquareSum(matrix_prefix_sum, {{i, j}, mid});
            has_square = square_sum && square_sum.value() <= threshold;
            if (has_square) {
              break;
            }
          }
          if (has_square) {
            break;
          }
        }
      }

      if (has_square) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    return left - 1;
  }

 private:
  struct Coordinate {
    std::int64_t x;
    std::int64_t y;
  };

  class Square {
   public:
    Square(const Coordinate top_left, const std::int32_t size)
        : top_left_(top_left),
          bottom_right_(top_left.x + size - 1, top_left.y + size - 1) {}

    [[nodiscard]] const Coordinate& GetBottomRight() const {
      return bottom_right_;
    }

    [[nodiscard]] const Coordinate& GetTopLeft() const { return top_left_; }

   private:
    Coordinate top_left_;
    Coordinate bottom_right_;
  };

  static std::vector<std::vector<std::int64_t>> GetMatrixPrefixSum(
      const std::vector<std::vector<int>>& matrix) {
    const size_t row_count = matrix.size();
    const size_t col_count = matrix[0].size();

    // mat_prefix_sum[i][j] - The sum of the rectangle (0,0,i,j).
    // mat_prefix_sum[i][j] = mat_prefix_sum[i-1][j] + mat_prefix_sum[i][j-1] -
    // mat_prefix_sum[i-1][j-1] + mat[i][j]
    std::vector<std::vector<std::int64_t>> mat_prefix_sum(
        row_count, std::vector<std::int64_t>(col_count, 0));

    for (int i = 0; i < row_count; i++) {
      for (int j = 0; j < col_count; j++) {
        mat_prefix_sum[i][j] =
            (i - 1 >= 0 ? mat_prefix_sum[i - 1][j] : 0) +
            (j - 1 >= 0 ? mat_prefix_sum[i][j - 1] : 0) -
            (i - 1 >= 0 && j - 1 >= 0 ? mat_prefix_sum[i - 1][j - 1] : 0) +
            matrix[i][j];
      }
    }

    return mat_prefix_sum;
  }

  static std::optional<std::int64_t> GetSquareSum(
      const std::vector<std::vector<std::int64_t>>& mat_prefix_sum,
      const Square& square) {
    const size_t row_count = mat_prefix_sum.size();
    const size_t col_count = mat_prefix_sum[0].size();

    const auto& [top_x, left_y] = square.GetTopLeft();
    const auto& [bottom_x, right_y] = square.GetBottomRight();

    if (top_x < 0 || left_y < 0 || bottom_x >= row_count ||
        right_y >= col_count) {
      return std::nullopt;
    }

    return mat_prefix_sum[bottom_x][right_y] -
           (left_y - 1 >= 0 ? mat_prefix_sum[bottom_x][left_y - 1] : 0) -
           (top_x - 1 >= 0 ? mat_prefix_sum[top_x - 1][right_y] : 0) +
           (top_x - 1 >= 0 && left_y - 1 >= 0
                ? mat_prefix_sum[top_x - 1][left_y - 1]
                : 0);
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.maxSideLength({{2, 2, 2, 2, 2},
                     {2, 2, 2, 2, 2},
                     {2, 2, 2, 2, 2},
                     {2, 2, 2, 2, 2},
                     {2, 2, 2, 2, 2}},
                    1);
}