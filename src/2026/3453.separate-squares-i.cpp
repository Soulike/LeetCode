/*
 * @lc app=leetcode id=3453 lang=cpp
 *
 * [3453] Separate Squares I
 */

#include <algorithm>
#include <numeric>
#include <vector>

// @lc code=start
class Solution {
 public:
  double separateSquares(std::vector<std::vector<int>>& squares) {
    std::ranges::sort(squares, [](const std::vector<int>& square1,
                                  const std::vector<int>& square2) {
      return square1[kY] < square2[kY];
    });

    int max_y = INT_MIN;

    const double target_area =
        std::accumulate(squares.cbegin(), squares.cend(), 0.0,
                        [&](const double prev, const std::vector<int>& square) {
                          max_y = std::max(max_y, square[kY] + square[kL]);
                          return prev + 1.0 * square[kL] * square[kL];
                        }) /
        2;

    double left = squares.front()[kY];
    double right = max_y + kEpsilon;
    while (DoubleLessThan(left, right)) {
      const double mid = (right - left) / 2 + left;
      const double below_area = GetAreaBelowY(mid, squares);
      if (DoubleLessThan(below_area, target_area)) {
        left = mid + kEpsilon;
      } else {
        right = mid;
      }
    }
    return left;
  }

 private:
  static constexpr int kX = 0;
  static constexpr int kY = 1;
  static constexpr int kL = 2;
  static constexpr double kEpsilon = 1e-5;

  static double GetAreaBelowY(const double y,
                              const std::vector<std::vector<int>>& squares) {
    double below_area = 0;
    for (const std::vector<int>& square : squares) {
      const int square_bottom_y = square[kY];
      const int square_top_y = square[kY] + square[kL];
      const double square_area = 1.0 * square[kL] * square[kL];
      if (y >= square_top_y) {
        below_area += square_area;
      } else if (y <= square_bottom_y) {
        break;
      } else {
        const double below_y_height = y - square_bottom_y;
        below_area += below_y_height * square[kL];
      }
    }
    return below_area;
  }

  static bool DoubleLessThan(const double a, const double b) {
    if (std::abs(a - b) < kEpsilon) {
      return false;
    }
    return a < b;
  }
};
// @lc code=end

int main() {
  Solution sol;
  std::vector<std::vector<int>> squares = {{8, 16, 1}, {6, 15, 10}};
  sol.separateSquares(squares);
}