/*
 * @lc app=leetcode id=3047 lang=cpp
 *
 * [3047] Find the Largest Area of Square Inside Two Rectangles
 */

#include <optional>
#include <vector>

// @lc code=start
class Solution {
 public:
  long long largestSquareArea(const std::vector<std::vector<int>>& bottom_left,
                              const std::vector<std::vector<int>>& top_right) {
    const size_t square_count = bottom_left.size();

    std::uint64_t largest_square_area = 0;

    for (size_t i = 0; i < square_count; i++) {
      for (size_t j = i + 1; j < square_count; j++) {
        const std::vector<int>& square_1_bottom_left = bottom_left[i];
        const std::vector<int>& square_1_top_right = top_right[i];
        const Rectangle rectangle_1(
            {square_1_bottom_left[0], square_1_bottom_left[1]},
            {square_1_top_right[0], square_1_top_right[1]});

        const std::vector<int>& square_2_bottom_left = bottom_left[j];
        const std::vector<int>& square_2_top_right = top_right[j];
        const Rectangle rectangle_2(
            {square_2_bottom_left[0], square_2_bottom_left[1]},
            {square_2_top_right[0], square_2_top_right[1]});

        const std::optional<Rectangle> overlap =
            rectangle_1.GetOverlapRectangle(rectangle_2);
        if (!overlap) {
          continue;
        }
        const std::uint64_t max_square_length =
            std::min(overlap.value().GetXRange().GetLength(),
                     overlap.value().GetYRange().GetLength());
        largest_square_area = std::max(largest_square_area,
                                       max_square_length * max_square_length);
      }
    }

    return static_cast<long long>(largest_square_area);
  }

 private:
  struct Coordinate {
    int x;
    int y;
  };

  struct Range {
    int min;
    int max;

    [[nodiscard]] std::optional<Range> GetOverlapWith(const Range other) const {
      if (!HasOverlapWith(other)) {
        return std::nullopt;
      }
      return Range(std::max(min, other.min), std::min(max, other.max));
    }

    [[nodiscard]] size_t GetLength() const { return max - min; }

   private:
    [[nodiscard]] bool HasOverlapWith(const Range other) const {
      return (min <= other.min && other.min <= max) ||
             (min <= other.max && other.max <= max) ||
             (other.min <= min && min <= other.max) ||
             (other.min <= max && max <= other.max);
    }
  };

  class Rectangle {
   public:
    Rectangle(const Coordinate bottom_left, const Coordinate top_right)
        : bottom_left_(bottom_left), top_right_(top_right) {}

    [[nodiscard]] std::optional<Rectangle> GetOverlapRectangle(
        const Rectangle other) const {
      const std::optional<Range> x_overlap =
          GetXRange().GetOverlapWith(other.GetXRange());
      if (!x_overlap) {
        return std::nullopt;
      }
      const std::optional<Range> y_overlap =
          GetYRange().GetOverlapWith(other.GetYRange());
      if (!y_overlap) {
        return std::nullopt;
      }

      return Rectangle({x_overlap.value().min, y_overlap.value().min},
                       {x_overlap.value().max, y_overlap.value().max});
    }

    [[nodiscard]] Range GetXRange() const {
      return {bottom_left_.x, top_right_.x};
    }
    [[nodiscard]] Range GetYRange() const {
      return {bottom_left_.y, top_right_.y};
    }

   private:
    Coordinate bottom_left_;
    Coordinate top_right_;
  };
};
// @lc code=end

int main() {
  Solution sol;
  sol.largestSquareArea({{2, 2}, {1, 3}}, {{3, 4}, {5, 5}});
}
