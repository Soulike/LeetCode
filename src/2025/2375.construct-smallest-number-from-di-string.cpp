/*
 * @lc app=leetcode id=2375 lang=cpp
 *
 * [2375] Construct Smallest Number From DI String
 */

#include <algorithm>
#include <array>
#include <memory>
#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::string smallestNumber(const std::string& pattern) {
    std::array<int, 10> numberIsAvailable;
    numberIsAvailable.fill(true);
    numberIsAvailable[0] = false;

    std::vector<int> currentResult;
    std::shared_ptr<std::vector<int>> smallestResultPtr;

    backtrack(pattern, numberIsAvailable, currentResult, smallestResultPtr);

    return intVectorToString(*smallestResultPtr);
  }

 private:
  static constexpr char kIncrease = 'I';
  static constexpr char kDecrease = 'D';

  static void backtrack(const std::string& pattern,
                        std::array<int, 10>& numberIsAvailable,
                        std::vector<int>& currentResult,
                        std::shared_ptr<std::vector<int>>& smallestResultPtr) {
    const int patternIndex = currentResult.size() - 1;
    if (patternIndex == pattern.size()) {
      if (!smallestResultPtr || currentResult < *smallestResultPtr) {
        smallestResultPtr = std::make_shared<std::vector<int>>(
            currentResult.cbegin(), currentResult.cend());
      }
      return;
    }

    if (currentResult.empty()) {
      for (int i = 1; i <= 9; i++) {
        if (!numberIsAvailable[i]) {
          continue;
        }

        numberIsAvailable[i] = false;
        currentResult.push_back(i);
        backtrack(pattern, numberIsAvailable, currentResult, smallestResultPtr);
        currentResult.pop_back();
        numberIsAvailable[i] = true;
      }
      return;
    }

    if (pattern[patternIndex] == kIncrease) {
      for (int i = currentResult.back(); i <= 9; i++) {
        if (!numberIsAvailable[i]) {
          continue;
        }

        numberIsAvailable[i] = false;
        currentResult.push_back(i);
        backtrack(pattern, numberIsAvailable, currentResult, smallestResultPtr);
        currentResult.pop_back();
        numberIsAvailable[i] = true;
      }
    } else {
      for (int i = currentResult.back(); i >= 1; i--) {
        if (!numberIsAvailable[i]) {
          continue;
        }

        numberIsAvailable[i] = false;
        currentResult.push_back(i);
        backtrack(pattern, numberIsAvailable, currentResult, smallestResultPtr);
        currentResult.pop_back();
        numberIsAvailable[i] = true;
      }
    }
  }

  static std::string intVectorToString(const std::vector<int>& nums) {
    std::string s;
    s.reserve(nums.size());
    for (const int num : nums) {
      s.push_back('0' + num);
    }

    return s;
  }
};
// @lc code=end
