/*
 * @lc app=leetcode id=909 lang=cpp
 *
 * [909] Snakes and Ladders
 */

#include <queue>
#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  int snakesAndLadders(const std::vector<std::vector<int>>& board) {
    const size_t N = board.size();

    std::unordered_set<Label> visited;
    visited.insert(1);

    std::queue<LabelInfo> queue;
    queue.push({1, 0});

    while (!queue.empty()) {
      const auto [label, steps] = queue.front();
      queue.pop();

      for (int i = 1; i <= 6; i++) {
        const Label next_label = label + i;
        if (next_label > N * N) {
          break;
        }
        const Coordinate next_label_coordinate =
            ConvertLabelToCoordinate(next_label, N);
        const Label target_label =
            board[next_label_coordinate.x][next_label_coordinate.y] == -1
                ? next_label
                : board[next_label_coordinate.x][next_label_coordinate.y];

        if (target_label == N * N) {
          return steps + 1;
        }

        if (!visited.contains(target_label)) {
          visited.insert(target_label);
          queue.push({target_label, steps + 1});
        }
      }
    }

    return -1;
  }

 private:
  using Label = int;
  using TeleportId = int;
  struct Coordinate {
    size_t x;
    size_t y;
  };
  struct LabelInfo {
    Label label;
    int steps;
  };

  static Coordinate ConvertLabelToCoordinate(const Label label,
                                             const size_t N) {
    const size_t row = (N - 1) - (label - 1) / N;
    size_t col = ((label - 1) % N);
    if (((N - 1) - row) % 2 == 1) {
      col = (N - 1) - col;
    }

    return {row, col};
  }
};
// @lc code=end
