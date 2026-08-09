/*
 * @lc app=leetcode id=1140 lang=cpp
 *
 * [1140] Stone Game II
 */

#include <optional>
#include <vector>

// @lc code=start
class Solution {
 public:
  int stoneGameII(const std::vector<int>& piles) {
    std::vector<int> prefix_sum(piles.size());

    prefix_sum[0] = piles[0];
    for (int i = 1; i < piles.size(); i++) {
      prefix_sum[i] = prefix_sum[i - 1] + piles[i];
    }

    // memo[begin_index][last_opponent_pick_count]
    std::vector<std::vector<std::optional<GameResult>>> memo(
        piles.size(), std::vector<std::optional<GameResult>>(piles.size() + 1));

    const GameResult game_result = Play(piles, prefix_sum, 0, 1, memo);
    return game_result.player_stone_count;
  }

 private:
  struct GameResult {
    int player_stone_count;
    int opponent_stone_count;
  };

  static GameResult Play(
      const std::vector<int>& piles,
      const std::vector<int>& piles_prefix_sum,
      const int begin_index,
      const int last_opponent_pick_count,
      std::vector<std::vector<std::optional<GameResult>>>& memo) {
    if (begin_index >= piles.size()) {
      return {.player_stone_count = 0, .opponent_stone_count = 0};
    }

    if (memo[begin_index][last_opponent_pick_count]) {
      return memo[begin_index][last_opponent_pick_count].value();
    }

    // Player can pick 1 ~ (2 * last_opponent_pick_count) stone piles
    const int max_pick_count =
        std::min(2 * last_opponent_pick_count,
                 static_cast<int>(piles.size()) - begin_index);

    GameResult best_game_result = {.player_stone_count = -1,
                                   .opponent_stone_count = -1};

    for (int pick_count = 1; pick_count <= max_pick_count; pick_count++) {
      const int pick_end_index = begin_index + pick_count - 1;  // included
      const int pick_stone_count = piles_prefix_sum[pick_end_index] -
                                   piles_prefix_sum[begin_index] +
                                   piles[begin_index];

      const GameResult opponent_game_result =
          Play(piles, piles_prefix_sum, pick_end_index + 1,
               std::max(last_opponent_pick_count, pick_count), memo);
      if (opponent_game_result.opponent_stone_count + pick_stone_count >
          best_game_result.player_stone_count) {
        best_game_result = {
            .player_stone_count =
                opponent_game_result.opponent_stone_count + pick_stone_count,
            .opponent_stone_count = opponent_game_result.player_stone_count,
        };
      }
    }

    memo[begin_index][last_opponent_pick_count] = best_game_result;

    return best_game_result;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.stoneGameII({77, 12, 64, 35, 28, 4, 87, 21, 20});  // expect: 217
}
