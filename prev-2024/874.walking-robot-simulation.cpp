/*
 * @lc app=leetcode id=874 lang=cpp
 *
 * [874] Walking Robot Simulation
 */
#include <unordered_set>
#include <vector>

// @lc code=start
enum class Direction { North = 0, East = 1, South = 2, West = 3, Total = 4 };

enum class DirectionCommand {
  TurnLeft = -2,
  TurnRight = -1,
};

class Solution {
 public:
  int robotSim(std::vector<int>& commands,
               std::vector<std::vector<int>>& obstacles) {
    setupObstacles(obstacles);

    int maxDistance = 0;

    for (const auto command : commands) {
      handleCommand(command);
      maxDistance =
          std::max(maxDistance, getEuclideanDistance(currentX, currentY));
    }

    return maxDistance;
  }

 private:
  int currentX = 0;
  int currentY = 0;
  Direction currentDirection = Direction::North;
  std::unordered_set<std::string> obstacleSet;

  void setupObstacles(std::vector<std::vector<int>>& obstacles) {
    for (const auto& obstacle : obstacles) {
      obstacleSet.insert(getObstacleSetKey(obstacle[0], obstacle[1]));
    }
  }

  bool hasObstacle(int x, int y) {
    return obstacleSet.contains(getObstacleSetKey(x, y));
  }

  static std::string getObstacleSetKey(int x, int y) {
    return std::to_string(x) + "," + std::to_string(y);
  }

  static int getEuclideanDistance(int x, int y) { return x * x + y * y; }

  void handleCommand(const int command) {
    if (command == static_cast<int>(DirectionCommand::TurnLeft) ||
        command == static_cast<int>(DirectionCommand::TurnRight)) {
      handleDirectionCommand(static_cast<DirectionCommand>(command));
    } else {
      handleMoveCommand(command);
    }
  }

  void handleDirectionCommand(const DirectionCommand command) {
    const int kTotalDirectionNumber = static_cast<int>(Direction::Total);
    if (command == DirectionCommand::TurnRight) {
      currentDirection = static_cast<Direction>(
          (static_cast<int>(currentDirection) + 1) % kTotalDirectionNumber);
    } else {
      currentDirection = static_cast<Direction>(
          ((static_cast<int>(currentDirection) - 1) + kTotalDirectionNumber) %
          kTotalDirectionNumber);
    }
  }

  void handleMoveCommand(const int command) {
    if (currentDirection == Direction::North) {
      for (int i = 1; i <= command; i++) {
        if (hasObstacle(currentX, currentY + i)) {
          currentY += (i - 1);
          return;
        }
      }
      currentY += command;
    } else if (currentDirection == Direction::South) {
      for (int i = 1; i <= command; i++) {
        if (hasObstacle(currentX, currentY - i)) {
          currentY -= (i - 1);
          return;
        }
      }
      currentY -= command;
    } else if (currentDirection == Direction::East) {
      for (int i = 1; i <= command; i++) {
        if (hasObstacle(currentX + i, currentY)) {
          currentX += (i - 1);
          return;
        }
      }
      currentX += command;
    } else if (currentDirection == Direction::West) {
      for (int i = 1; i <= command; i++) {
        if (hasObstacle(currentX - i, currentY)) {
          currentX -= (i - 1);
          return;
        }
      }
      currentX -= command;
    }
  }
};
// @lc code=end
