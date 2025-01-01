/*
 * @lc app=leetcode id=773 lang=cpp
 *
 * [773] Sliding Puzzle
 */
#include <cinttypes>
#include <queue>
#include <unordered_set>
#include <vector>

// @lc code=start
constexpr std::uint_fast8_t kBoardRowNumber = 2;
constexpr std::uint_fast8_t kBoardColNumber = 3;

class Coordinate {
 public:
  int x;
  int y;
};

class BoardState {
 public:
  using Board = std::array<std::array<std::uint_fast8_t, kBoardColNumber>,
                           kBoardRowNumber>;

  explicit BoardState(const Board& board) : board_(board) {}

  [[nodiscard]] Board getBoard() const { return board_; }

  [[nodiscard]] std::vector<BoardState> getPossibleNextBoardStates() const {
    Coordinate zeroCoordinate{};
    for (int i = 0; i < kBoardRowNumber; i++) {
      for (int j = 0; j < kBoardColNumber; j++) {
        if (board_[i][j] == 0) {
          zeroCoordinate.x = i;
          zeroCoordinate.y = j;
          break;
        }
      }
    }

    std::vector<BoardState> nextBoardStates;
    if (zeroCoordinate.x - 1 >= 0) {
      Board nextBoard = board_;
      std::swap(nextBoard[zeroCoordinate.x][zeroCoordinate.y],
                nextBoard[zeroCoordinate.x - 1][zeroCoordinate.y]);
      nextBoardStates.emplace_back(nextBoard);
    }
    if (zeroCoordinate.x + 1 <= kBoardRowNumber - 1) {
      Board nextBoard = board_;
      std::swap(nextBoard[zeroCoordinate.x][zeroCoordinate.y],
                nextBoard[zeroCoordinate.x + 1][zeroCoordinate.y]);
      nextBoardStates.emplace_back(nextBoard);
    }
    if (zeroCoordinate.y - 1 >= 0) {
      Board nextBoard = board_;
      std::swap(nextBoard[zeroCoordinate.x][zeroCoordinate.y],
                nextBoard[zeroCoordinate.x][zeroCoordinate.y - 1]);
      nextBoardStates.emplace_back(nextBoard);
    }
    if (zeroCoordinate.y + 1 <= kBoardColNumber - 1) {
      Board nextBoard = board_;
      std::swap(nextBoard[zeroCoordinate.x][zeroCoordinate.y],
                nextBoard[zeroCoordinate.x][zeroCoordinate.y + 1]);
      nextBoardStates.emplace_back(nextBoard);
    }

    return nextBoardStates;
  }

  bool operator==(const BoardState& other) const {
    return board_ == other.board_;
  }

 private:
  Board board_;
};

class BoardStateHash {
 public:
  std::size_t operator()(const BoardState& boardState) const {
    BoardState::Board board = boardState.getBoard();
    std::size_t hashValue = 0;

    for (int i = 0; i < kBoardRowNumber; i++) {
      for (int j = 0; j < kBoardColNumber; j++) {
        hashValue ^= std::hash<int>()(board[i][j]) + 0x9e3779b9 +
                     (hashValue << 6) + (hashValue >> 2);
      }
    }
    return hashValue;
  }
};

class BoardStateWithMoveSteps {
 public:
  BoardState boardState;
  int moveSteps;
};

class Solution {
 public:
  int slidingPuzzle(const std::vector<std::vector<int> >& board) {
    BoardState::Board boardStateBoard{};
    for (int i = 0; i < kBoardRowNumber; i++) {
      for (int j = 0; j < kBoardColNumber; j++) {
        boardStateBoard[i][j] = board[i][j];
      }
    }

    const BoardState targetBoardState(
        BoardState::Board({{1, 2, 3}, {4, 5, 0}}));

    std::unordered_set<BoardState, BoardStateHash> visitedBoardStates;
    std::queue<BoardStateWithMoveSteps> boardStateWithMoveStepsQueue;
    visitedBoardStates.insert(BoardState(boardStateBoard));
    boardStateWithMoveStepsQueue.push({BoardState(boardStateBoard), 0});

    while (!boardStateWithMoveStepsQueue.empty()) {
      const BoardStateWithMoveSteps frontBoardStateWithMoveSteps =
          boardStateWithMoveStepsQueue.front();
      boardStateWithMoveStepsQueue.pop();
      if (frontBoardStateWithMoveSteps.boardState == targetBoardState) {
        return frontBoardStateWithMoveSteps.moveSteps;
      }

      const std::vector<BoardState> nextBoardStates =
          frontBoardStateWithMoveSteps.boardState.getPossibleNextBoardStates();
      for (const auto& nextBoardState : nextBoardStates) {
        if (!visitedBoardStates.contains(nextBoardState)) {
          visitedBoardStates.insert(nextBoardState);
          boardStateWithMoveStepsQueue.push(
              {nextBoardState, frontBoardStateWithMoveSteps.moveSteps + 1});
        }
      }
    }

    return -1;
  }
};

// @lc code=end

int main() {
  Solution sol;
  std::vector<std::vector<int> > board = {{1, 2, 3}, {4, 0, 5}};
  sol.slidingPuzzle(board);
}
