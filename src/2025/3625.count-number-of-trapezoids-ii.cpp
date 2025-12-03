/*
 * @lc app=leetcode id=3625 lang=cpp
 *
 * [3625] Count Number of Trapezoids II
 */

#include <format>
#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  int countTrapezoids(const std::vector<std::vector<int>>& points) {
    std::unordered_map<std::string, std::vector<Line>> slope_to_lines;
    for (int i = 0; i < points.size(); i++) {
      for (int j = i + 1; j < points.size(); j++) {
        Point point1 = {points[i][0], points[i][1]};
        Point point2 = {points[j][0], points[j][1]};
        const Slope slope = GetSlope(point1, point2);
        Line line(point1, point2, slope);
        slope_to_lines[slope.ToMapKey()].push_back(line);
      }
    }

    int trapezoid_count = 0;

    for (const auto& [slope_key, lines] : slope_to_lines) {
      std::uint64_t combination_2_n = GetCombination2N(lines.size());
      for (int i = 0; i < lines.size(); i++) {
        for (int j = i + 1; j < lines.size(); j++) {
          if (!CanFormTrapezoid(lines[i], lines[j])) {
            combination_2_n--;
          }
        }
      }
      trapezoid_count += combination_2_n;
    }

    return trapezoid_count;
  }

 private:
  struct Slope {
    int dx;
    int dy;

    bool operator==(const Slope& other) const {
      return dx == other.dx && dy == other.dy;
    }

    [[nodiscard]] std::string ToMapKey() const {
      return std::format("{},{}", dx, dy);
    }
  };

  struct Point {
    int x;
    int y;

    bool operator==(const Point& other) const {
      return other.x == x && other.y == y;
    }
  };

  struct Line {
    Point point1;
    Point point2;
    Slope slope;
  };

  static bool CanFormTrapezoid(const Line& line1, const Line& line2) {
    // If we have 3 points can form one line, then it is impossible to form
    // trapezoid.
    Point points[4] = {line1.point1, line1.point2, line2.point1, line2.point2};

    // Check all combinations of 3 points for collinearity
    for (int i = 0; i < 4; i++) {
      for (int j = i + 1; j < 4; j++) {
        for (int k = j + 1; k < 4; k++) {
          // Check for duplicate points
          if (points[i] == points[j] || points[i] == points[k] ||
              points[j] == points[k]) {
            return false;
          }
          // Check if these 3 points are collinear
          if (GetSlope(points[i], points[j]) ==
              GetSlope(points[i], points[k])) {
            return false;
          }
        }
      }
    }
    return true;
  }

  static Slope GetSlope(const Point& point1, const Point& point2) {
    const int dx = point1.x - point2.x;
    const int dy = point1.y - point2.y;
    if (dx == 0 && dy == 0) {
      std::abort();
    }
    if (dx == 0) {
      return {0, 1};
    }
    if (dy == 0) {
      return {1, 0};
    }
    const int gcd = GetGCD(dx, dy);
    return {dx / gcd, dy / gcd};
  }

  static int GetGCD(int num1, int num2) {
    num1 = std::abs(num1);
    num2 = std::abs(num2);
    if (num2 > num1) {
      std::swap(num1, num2);
    }
    int remainder = num1 % num2;
    num1 = num2;
    num2 = remainder;
    while (remainder > 0) {
      remainder = num1 % num2;
      num1 = num2;
      num2 = remainder;
    }
    return num1;
  }

  static std::uint64_t GetCombination2N(const std::uint64_t n) {
    return n % 2 == 0 ? (n / 2) * (n - 1) : (n - 1) / 2 * n;
  }
};
// @lc code=end

int main() {
  Solution sol;
  auto result = sol.countTrapezoids({{71, -89},
                                     {-75, -89},
                                     {-9, 11},
                                     {-24, -89},
                                     {-51, -89},
                                     {-77, -89},
                                     {42, 11}});
  std::printf("Result: %d\n", result);
}