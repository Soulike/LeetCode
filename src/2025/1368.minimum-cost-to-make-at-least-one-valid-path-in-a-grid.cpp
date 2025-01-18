/*
 * @lc app=leetcode id=1368 lang=cpp
 *
 * [1368] Minimum Cost to Make at Least One Valid Path in a Grid
 */

#include <deque>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minCost(const std::vector<std::vector<int>>& grid) {
    const int kRowCount = static_cast<int>(grid.size());
    const int kColCount = static_cast<int>(grid[0].size());

    std::vector<std::vector<int>> minCostToReach(
        kRowCount, std::vector<int>(kColCount, INT_MAX - 1));
    minCostToReach[0][0] = 0;

    std::deque<Coordinate> exploreQueue;
    exploreQueue.push_front({0, 0});

    while (!exploreQueue.empty()) {
      const Coordinate coordinate = exploreQueue.front();
      exploreQueue.pop_front();

      const bool canMoveUp = coordinate.x - 1 >= 0;
      const bool canMoveDown = coordinate.x + 1 <= kRowCount - 1;
      const bool canMoveLeft = coordinate.y - 1 >= 0;
      const bool canMoveRight = coordinate.y + 1 <= kColCount - 1;
      const auto direction =
          static_cast<Direction>(grid[coordinate.x][coordinate.y]);

      if (canMoveUp) {
        const Coordinate newCoordinate(coordinate.x - 1, coordinate.y);
        if (minCostToReach[coordinate.x][coordinate.y] +
                (direction != Direction::kUp) <
            minCostToReach[newCoordinate.x][newCoordinate.y]) {
          minCostToReach[newCoordinate.x][newCoordinate.y] =
              minCostToReach[coordinate.x][coordinate.y] +
              (direction != Direction::kUp);
          direction == Direction::kUp ? exploreQueue.push_front(newCoordinate)
                                      : exploreQueue.push_back(newCoordinate);
        }
      }

      if (canMoveDown) {
        const Coordinate newCoordinate(coordinate.x + 1, coordinate.y);
        if (minCostToReach[coordinate.x][coordinate.y] +
                (direction != Direction::kDown) <
            minCostToReach[newCoordinate.x][newCoordinate.y]) {
          minCostToReach[newCoordinate.x][newCoordinate.y] =
              minCostToReach[coordinate.x][coordinate.y] +
              (direction != Direction::kDown);
          direction == Direction::kDown ? exploreQueue.push_front(newCoordinate)
                                        : exploreQueue.push_back(newCoordinate);
        }
      }

      if (canMoveLeft) {
        const Coordinate newCoordinate(coordinate.x, coordinate.y - 1);
        if (minCostToReach[coordinate.x][coordinate.y] +
                (direction != Direction::kLeft) <
            minCostToReach[newCoordinate.x][newCoordinate.y]) {
          minCostToReach[newCoordinate.x][newCoordinate.y] =
              minCostToReach[coordinate.x][coordinate.y] +
              (direction != Direction::kLeft);
          direction == Direction::kLeft ? exploreQueue.push_front(newCoordinate)
                                        : exploreQueue.push_back(newCoordinate);
        }
      }

      if (canMoveRight) {
        const Coordinate newCoordinate(coordinate.x, coordinate.y + 1);
        if (minCostToReach[coordinate.x][coordinate.y] +
                (direction != Direction::kRight) <
            minCostToReach[newCoordinate.x][newCoordinate.y]) {
          minCostToReach[newCoordinate.x][newCoordinate.y] =
              minCostToReach[coordinate.x][coordinate.y] +
              (direction != Direction::kRight);
          direction == Direction::kRight
              ? exploreQueue.push_front(newCoordinate)
              : exploreQueue.push_back(newCoordinate);
        }
      }
    }

    return minCostToReach[kRowCount - 1][kColCount - 1];
  }

 private:
  enum class Direction {
    kRight = 1,
    kLeft = 2,
    kDown = 3,
    kUp = 4,
  };

  class Coordinate {
   public:
    int x;
    int y;
  };
};
// @lc code=end

int main() {
  std::vector<std::vector<int>> grid = {
      {3, 4, 3}, {2, 2, 2}, {2, 1, 1}, {4, 3, 2}, {2, 1, 4}, {2, 4, 1},
      {3, 3, 3}, {1, 4, 2}, {2, 2, 1}, {2, 1, 1}, {3, 3, 1}, {4, 1, 4},
      {2, 1, 4}, {3, 2, 2}, {3, 3, 1}, {4, 4, 1}, {1, 2, 2}, {1, 1, 1},
      {1, 3, 4}, {1, 2, 1}, {2, 2, 4}, {2, 1, 3}, {1, 2, 1}, {4, 3, 2},
      {3, 3, 4}, {2, 2, 1}, {3, 4, 3}, {4, 2, 3}, {4, 4, 4}};
  Solution sol;
  sol.minCost(grid);
}
