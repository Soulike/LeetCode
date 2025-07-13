/*
 * @lc app=leetcode id=2410 lang=cpp
 *
 * [2410] Maximum Matching of Players With Trainers
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  int matchPlayersAndTrainers(std::vector<int>& players,
                              std::vector<int>& trainers) {
    std::ranges::sort(players);
    std::ranges::sort(trainers);
    int trainer_index = 0;
    int max_match_count = 0;
    for (const int player_ability : players) {
      if (trainer_index == trainers.size()) {
        break;
      }
      while (trainer_index < trainers.size() &&
             trainers[trainer_index] < player_ability) {
        trainer_index++;
      }
      if (trainer_index == trainers.size()) {
        break;
      }
      max_match_count++;
      trainer_index++;
    }
    return max_match_count;
  }
};
// @lc code=end
