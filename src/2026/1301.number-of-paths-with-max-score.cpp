/*
 * @lc app=leetcode id=1301 lang=cpp
 *
 * [1301] Number of Paths with Max Score
 */

#include <algorithm>
#include <array>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> pathsWithMaxScore(const std::vector<std::string>& board) {
    const int kRowCount = board.size();
    const int kColCount = board[0].size();
    static constexpr std::array<MoveDiff, 3> kMoveDiffs = {
        MoveDiff{0, 1},  // Right
        MoveDiff{1, 1},  // Down right
        MoveDiff{1, 0},  // down
    };

    // max_score_of_cell[i][j] - The max score from S to board[i][j]. -1 means
    // no path available.
    std::vector<std::vector<int>> max_score_of_cell(
        2, std::vector<int>(kColCount, 0));
    // cell_path_with_max_score[i][j] - The path to reach board[i][j] with its
    // max score from S. -1 means no path available.
    std::vector<std::vector<int>> cell_path_count_with_max_score(
        2, std::vector<int>(kColCount, 0));

    for (int i = kRowCount - 1; i >= 0; i--) {
      std::ranges::fill(max_score_of_cell[i % 2], 0);
      std::ranges::fill(cell_path_count_with_max_score[i % 2], 0);

      for (int j = kColCount - 1; j >= 0; j--) {
        if (board[i][j] == kStart) {
          max_score_of_cell[i % 2][j] = 0;
          cell_path_count_with_max_score[i % 2][j] = 1;
          continue;
        }

        if (board[i][j] == kObstacle) {
          max_score_of_cell[i % 2][j] = -1;
          cell_path_count_with_max_score[i % 2][j] = -1;
          continue;
        }

        int max_adjacent_score = -1;
        int path_count_with_max_score = 0;

        for (const auto [row_diff, col_diff] : kMoveDiffs) {
          const int adjacent_i = i + row_diff;
          const int adjacent_j = j + col_diff;

          if (!IsValidCoordinate(board, adjacent_i, adjacent_j) ||
              max_score_of_cell[i % 2][j] == -1) {
            continue;
          }

          if (max_score_of_cell[(adjacent_i + 2) % 2][adjacent_j] >
              max_adjacent_score) {
            max_adjacent_score =
                max_score_of_cell[(adjacent_i + 2) % 2][adjacent_j];
            path_count_with_max_score = 0;
          }
          path_count_with_max_score +=
              max_adjacent_score ==
                      max_score_of_cell[(adjacent_i + 2) % 2][adjacent_j]
                  ? cell_path_count_with_max_score[(adjacent_i + 2) % 2]
                                                  [adjacent_j]
                  : 0;
          path_count_with_max_score %= kMod;
        }

        if (max_adjacent_score == -1) {
          // No path is available to reach board[i][j]
          max_score_of_cell[i % 2][j] = -1;
          cell_path_count_with_max_score[i % 2][j] = -1;
        } else {
          max_score_of_cell[i % 2][j] =
              ToScore(board[i][j]) + max_adjacent_score;
          cell_path_count_with_max_score[i % 2][j] = path_count_with_max_score;
        }
      }
    }

    // max_score can be -1, means no path is available.
    const int max_score = max_score_of_cell[0][0];
    const int path_count =
        max_score == -1 ? 0 : cell_path_count_with_max_score[0][0];
    return {std::max(max_score, 0), path_count};
  }

 private:
  static constexpr char kStart = 'S';
  static constexpr char kEnd = 'E';
  static constexpr char kObstacle = 'X';
  static constexpr int kMod = 1e9 + 7;

  struct MoveDiff {
    int row_diff;
    int col_diff;
  };

  static bool IsValidCoordinate(const std::vector<std::string>& board,
                                const int x,
                                const int y) {
    const int kRowCount = board.size();
    const int kColCount = board[0].size();

    return 0 <= x && x < kRowCount && 0 <= y && y < kColCount;
  }

  static int ToScore(const char cell_value) {
    if (cell_value == kStart || cell_value == kEnd) {
      return 0;
    }
    return cell_value - '0';
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.pathsWithMaxScore({"E23", "2X2", "12S"});
}
