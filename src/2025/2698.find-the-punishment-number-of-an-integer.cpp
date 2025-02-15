/*
 * @lc app=leetcode id=2698 lang=cpp
 *
 * [2698] Find the Punishment Number of an Integer
 */

#include <memory>
#include <string>
#include <unordered_map>
#include <unordered_set>

// @lc code=start
class Solution {
 public:
  int punishmentNumber(int n) {
    int punishmentNumber = 0;
    for (int i = 1; i <= n; i++) {
      if (isPunishmentNumberComponent(i)) {
        punishmentNumber += (i * i);
      }
    }

    return punishmentNumber;
  }

 private:
  static bool isPunishmentNumberComponent(const int n) {
    std::unordered_map<int, std::shared_ptr<const std::unordered_set<int>>>
        memo;
    auto splitSumsOfNumber =
        allSplitSumOfNumber(std::to_string(n * n), 0, memo);
    return splitSumsOfNumber->contains(n);
  }

  static std::shared_ptr<const std::unordered_set<int>> allSplitSumOfNumber(
      const std::string& number,
      const int beginIndex,
      std::unordered_map<int, std::shared_ptr<const std::unordered_set<int>>>&
          memoForNumber) {
    auto splitSums = std::make_shared<std::unordered_set<int>>();

    // Base case: if beginIndex is at the end of the string, return an empty
    // set.
    if (beginIndex >= number.size()) {
      splitSums->insert(
          0);  // Insert 0 to handle the case where no more splits are possible.
      return splitSums;
    }

    if (memoForNumber.contains(beginIndex)) {
      return memoForNumber.at(beginIndex);
    }

    for (int i = beginIndex; i < number.size(); i++) {
      const int firstSegmentNumber =
          std::stoi(number.substr(beginIndex, i - beginIndex + 1));
      auto remainSegmentsSplitSums =
          allSplitSumOfNumber(number, i + 1, memoForNumber);
      for (const int splitSum : *remainSegmentsSplitSums) {
        splitSums->insert(firstSegmentNumber + splitSum);
      }
    }

    memoForNumber[beginIndex] = splitSums;

    return splitSums;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.punishmentNumber(45);
}
