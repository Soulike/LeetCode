/*
 * @lc app=leetcode id=2326 lang=cpp
 *
 * [2326] Spiral Matrix IV
 */

#include <vector>

struct ListNode {
  int val;
  ListNode* next;
  ListNode() : val(0), next(nullptr) {}
  ListNode(int x) : val(x), next(nullptr) {}
  ListNode(int x, ListNode* next) : val(x), next(next) {}
};

// @lc code=start
enum class Direction {
  ToTop,
  ToDown,
  ToLeft,
  ToRight,
};

struct Coordinate {
  int x;
  int y;
};

class Solution {
 public:
  std::vector<std::vector<int>> spiralMatrix(int m, int n, ListNode* head) {
    std::vector<std::vector<int>> matrix(m, std::vector<int>(n, -1));
    int topBorder = 0;
    int downBorder = m - 1;
    int leftBorder = 0;
    int rightBorder = n - 1;

    Coordinate currentCoordinate = {0, 0};
    Direction currentDirection = Direction::ToRight;
    ListNode* currentNode = head;

    while (currentNode != nullptr) {
      if (currentDirection == Direction::ToTop) {
        while (currentCoordinate.x >= topBorder && currentNode != nullptr) {
          matrix[currentCoordinate.x][currentCoordinate.y] = currentNode->val;
          currentNode = currentNode->next;
          currentCoordinate.x--;
        }
        currentCoordinate.x++;
        leftBorder++;
      } else if (currentDirection == Direction::ToDown) {
        while (currentCoordinate.x <= downBorder && currentNode != nullptr) {
          matrix[currentCoordinate.x][currentCoordinate.y] = currentNode->val;
          currentNode = currentNode->next;
          currentCoordinate.x++;
        }
        currentCoordinate.x--;
        rightBorder--;
      } else if (currentDirection == Direction::ToLeft) {
        while (currentCoordinate.y >= leftBorder && currentNode != nullptr) {
          matrix[currentCoordinate.x][currentCoordinate.y] = currentNode->val;
          currentNode = currentNode->next;
          currentCoordinate.y--;
        }
        currentCoordinate.y++;
        downBorder--;
      } else if (currentDirection == Direction::ToRight) {
        while (currentCoordinate.y <= rightBorder && currentNode != nullptr) {
          matrix[currentCoordinate.x][currentCoordinate.y] = currentNode->val;
          currentNode = currentNode->next;
          currentCoordinate.y++;
        }
        currentCoordinate.y--;
        topBorder++;
      }

      currentDirection = getNextDirection(currentDirection);

      if (currentDirection == Direction::ToTop) {
        currentCoordinate.x--;
      } else if (currentDirection == Direction::ToDown) {
        currentCoordinate.x++;
      } else if (currentDirection == Direction::ToLeft) {
        currentCoordinate.y--;
      } else if (currentDirection == Direction::ToRight) {
        currentCoordinate.y++;
      }
    }

    return matrix;
  }

 private:
  static Direction getNextDirection(Direction currentDirection) {
    switch (currentDirection) {
      case Direction::ToTop:
        return Direction::ToRight;
      case Direction::ToDown:
        return Direction::ToLeft;
      case Direction::ToLeft:
        return Direction::ToTop;
      case Direction::ToRight:
        return Direction::ToDown;
    }
  }
};
// @lc code=end
