/*
 * @lc app=leetcode id=1405 lang=cpp
 *
 * [1405] Longest Happy String
 */

#include <memory>
#include <queue>
#include <string>
#include <vector>

// @lc code=start
struct Letter {
 public:
  char letter;
  int leftNumber;
};

class Solution {
 public:
  std::string longestDiverseString(int a, int b, int c) {
    const auto comparator = [](const Letter& letter1, const Letter& letter2) {
      return letter1.leftNumber < letter2.leftNumber;
    };
    std::priority_queue<Letter, std::vector<Letter>, decltype(comparator)> pq(
        comparator);
    pq.push({'a', a});
    pq.push({'b', b});
    pq.push({'c', c});

    std::string result;
    while (true) {
      std::vector<Letter> poppedLetters;

      while (!pq.empty() && !canAppend(result, pq.top())) {
        poppedLetters.push_back(pq.top());
        pq.pop();
      }

      if (pq.empty()) {
        break;
      }

      Letter currentLetter = pq.top();
      pq.pop();
      result.push_back(currentLetter.letter);
      currentLetter.leftNumber--;
      poppedLetters.push_back(currentLetter);

      for (const auto poppedLetter : poppedLetters) {
        pq.push(poppedLetter);
      }
    }

    return result;
  }

  static bool canAppend(const std::string& str, const Letter& letter) {
    if (letter.leftNumber == 0) {
      return false;
    }
    const int N = static_cast<int>(str.size());
    if (N < 2) {
      return true;
    }
    for (int i = N - 1; i >= N - 2; i--) {
      if (str[i] != letter.letter) {
        return true;
      }
    }

    return false;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.longestDiverseString(1, 1, 7);
}
