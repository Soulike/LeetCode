/*
 * @lc app=leetcode id=3160 lang=cpp
 *
 * [3160] Find the Number of Distinct Colors Among the Balls
 */

#include <unordered_map>
#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> queryResults(int limit,
                                std::vector<std::vector<int>>& queries) {
    std::unordered_map<int, int> ballToColor;
    std::unordered_map<int, int> colorToBallNumber;
    std::vector<int> result(queries.size());
    for (int i = 0; i < queries.size(); i++) {
      const std::vector<int>& query = queries[i];
      const int ball = query[0];
      const int color = query[1];

      if (ballToColor.contains(ball)) {
        const int prevColor = ballToColor[ball];
        colorToBallNumber[prevColor]--;
        if (colorToBallNumber[prevColor] == 0) {
          colorToBallNumber.erase(prevColor);
        }
      }

      colorToBallNumber[color]++;
      ballToColor[ball] = color;
      result[i] = colorToBallNumber.size();
    }

    return result;
  }
};
// @lc code=end
