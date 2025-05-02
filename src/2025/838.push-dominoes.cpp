/*
 * @lc app=leetcode id=838 lang=cpp
 *
 * [838] Push Dominoes
 */

#include <algorithm>
#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::string pushDominoes(std::string dominoes) {
    std::vector<PushedDominoesInfo> pushed_dominoes_info;
    pushed_dominoes_info.emplace_back(-1, kDominoesStateLeft);
    for (int i = 0; i < dominoes.size(); i++) {
      if (dominoes[i] == kDominoesStateNotPushed) {
        continue;
      }
      pushed_dominoes_info.emplace_back(i, dominoes[i]);
    }
    pushed_dominoes_info.emplace_back(dominoes.size(), kDominoesStateRight);

    for (int i = 0; i < pushed_dominoes_info.size() - 1; i++) {
      const PushedDominoesInfo& current_info = pushed_dominoes_info[i];
      const PushedDominoesInfo& next_info = pushed_dominoes_info[i + 1];

      if (current_info.direction_ == next_info.direction_) {
        std::fill(&dominoes[current_info.index_ + 1],
                  &dominoes[next_info.index_], current_info.direction_);
      } else if (current_info.direction_ == kDominoesStateRight &&
                 next_info.direction_ == kDominoesStateLeft) {
        for (int j = current_info.index_ + 1; j < next_info.index_; j++) {
          if (j - current_info.index_ < next_info.index_ - j) {
            // Closer to R. Pushed to R
            dominoes[j] = current_info.direction_;
          } else if (j - current_info.index_ > next_info.index_ - j) {
            // Closer to L. Pushed to L.
            dominoes[j] = next_info.direction_;
          }
        }
      }
    }

    return dominoes;
  }

 private:
  constexpr static char kDominoesStateLeft = 'L';
  constexpr static char kDominoesStateRight = 'R';
  constexpr static char kDominoesStateNotPushed = '.';

  class PushedDominoesInfo {
   public:
    int index_;
    char direction_;
  };
};
// @lc code=end

int main() {
  Solution sol;
  sol.pushDominoes(".L.R...LR..L..");
}
