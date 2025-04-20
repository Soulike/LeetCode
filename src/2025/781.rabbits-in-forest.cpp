/*
 * @lc app=leetcode id=781 lang=cpp
 *
 * [781] Rabbits in Forest
 */

#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  int numRabbits(const std::vector<int>& answers) {
    std::unordered_map<int, int> answerToNumbers;
    for (const int answer : answers) {
      answerToNumbers[answer]++;
    }

    int rabbitNumber = 0;
    for (const auto& answerToNumber : answerToNumbers) {
      const int answer = answerToNumber.first;
      const int number = answerToNumber.second;
      // Answer + 1 rabbits can have the same answer.
      const int colorNumber =
          std::max(1,
                   // Ceil
                   number / (answer + 1) + (number % (answer + 1) != 0));
      rabbitNumber += (answer + 1) * colorNumber;
    }

    return rabbitNumber;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.numRabbits({1, 1, 1, 1, 1, 1, 1, 5});
}
