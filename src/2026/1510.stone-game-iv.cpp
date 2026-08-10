/*
 * @lc app=leetcode id=1510 lang=cpp
 *
 * [1510] Stone Game IV
 */

#include <cmath>
#include <optional>
#include <vector>

// @lc code=start
class Solution {
 public:
  bool winnerSquareGame(const int n) {
    std::vector<std::optional<bool>> memo(n + 1);
    const bool can_win = CanWin(n, memo);
    return can_win;
  }

 private:
  static bool CanWin(const int n, std::vector<std::optional<bool>>& memo) {
    if (memo[n].has_value()) {
      return memo[n].value();
    }

    if (n == 0) {
      return false;
    }

    if (n == 1) {
      return true;
    }

    const int max_sqrt = static_cast<int>(std::sqrt(n));

    for (int sqrt = max_sqrt; sqrt >= 1; sqrt--) {
      const int current_pick = sqrt * sqrt;
      const bool opponent_can_win = CanWin(n - current_pick, memo);
      if (!opponent_can_win) {
        memo[n] = true;
        return true;
      }
    }

    memo[n] = false;
    return false;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.winnerSquareGame(2);
}
