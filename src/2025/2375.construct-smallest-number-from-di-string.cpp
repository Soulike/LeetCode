/*
 * @lc app=leetcode id=2375 lang=cpp
 *
 * [2375] Construct Smallest Number From DI String
 */

#include <stack>
#include <string>

// @lc code=start
class Solution {
 public:
  std::string smallestNumber(const std::string& pattern) {
    /**
     * Since we want the lexicographically smallest possible string, we should
     * put small numbers first.
     * Pushing numbers from 1 to 9 into a stack, and pop them out forms a
     * decreasing sequence, which can create smallest decreasing sequence
     * possible.
     * Therefore, when we meed a 'D', we should push a number into the stack,
     * Once an 'I' is encountered, we should first pop the stack until it is
     * empty, forming a valid sequence for 'DD...D', and then push a number into
     * the stack to fulfill the 'I'.
     */
    std::stack<int> numberStack;
    std::string result;
    result.reserve(pattern.size() + 1);

    numberStack.push(1);
    int nextNumber = 2;

    for (const char p : pattern) {
      if (p == kIncrease) {
        while (!numberStack.empty()) {
          result.push_back(numberStack.top() + '0');
          numberStack.pop();
        }
      }

      numberStack.push(nextNumber);
      nextNumber++;
    }

    while (!numberStack.empty()) {
      result.push_back(numberStack.top() + '0');
      numberStack.pop();
    }

    return result;
  }

 private:
  static constexpr char kIncrease = 'I';
  static constexpr char kDecrease = 'D';
};
// @lc code=end

int main() {
  Solution sol;
  sol.smallestNumber("IIIDIDDD");
}
