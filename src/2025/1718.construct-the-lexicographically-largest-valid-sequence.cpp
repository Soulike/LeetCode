/*
 * @lc app=leetcode id=1718 lang=cpp
 *
 * [1718] Construct the Lexicographically Largest Valid Sequence
 */

#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> constructDistancedSequence(int n) {
    const int kSequenceSize = 2 * (n - 1) + 1;
    std::vector<int> sequence(kSequenceSize, kEmpty);
    std::unordered_set<int> usedNumbers;

    canConstructSequence(sequence, 0, usedNumbers, n);
    return sequence;
  }

 private:
  static constexpr int kEmpty = 0;

  static bool canConstructSequence(std::vector<int>& sequence,
                                   int startIndex,
                                   std::unordered_set<int>& usedNumbers,
                                   const int n) {
    if (usedNumbers.size() == n && startIndex == sequence.size()) {
      return true;
    }

    if (sequence[startIndex] != kEmpty) {
      return canConstructSequence(sequence, startIndex + 1, usedNumbers, n);
    }

    for (int i = n; i >= 1; i--) {
      if (usedNumbers.contains(i)) {
        continue;
      }

      if (i > 1) {
        if (startIndex + i < sequence.size() &&
            sequence[startIndex] == kEmpty &&
            sequence[startIndex + i] == kEmpty) {
          usedNumbers.insert(i);
          sequence[startIndex] = i;
          sequence[startIndex + i] = i;
          if (canConstructSequence(sequence, startIndex + 1, usedNumbers, n)) {
            return true;
          }
          sequence[startIndex + i] = kEmpty;
          sequence[startIndex] = kEmpty;
          usedNumbers.erase(i);
        }
      } else {
        if (sequence[startIndex] == kEmpty) {
          usedNumbers.insert(1);
          sequence[startIndex] = 1;
          if (canConstructSequence(sequence, startIndex + 1, usedNumbers, n)) {
            return true;
          }
          sequence[startIndex] = kEmpty;
          usedNumbers.erase(1);
          continue;
        }
      }
    }

    return false;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.constructDistancedSequence(15);
}
