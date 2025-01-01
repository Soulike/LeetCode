/*
 * @lc app=leetcode id=241 lang=cpp
 *
 * [241] Different Ways to Add Parentheses
 */

#include <string>
#include <string_view>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> diffWaysToCompute(const std::string& expression) {
    return helper(expression);
  }

 private:
  std::vector<int> helper(std::string_view expression) {
    std::vector<int> results;
    if (expression.empty()) {
      return results;
    }
    if (expression.size() <= 2) {
      // Must be a digit
      results.push_back(std::stoi(std::string(expression)));
      return results;
    }

    for (int i = 0; i < expression.size(); i++) {
      if (isOperator(expression[i])) {
        const char currentOperator = expression[i];
        const std::vector<int> leftResults = helper(expression.substr(0, i));
        const std::vector<int> rightResults = helper(expression.substr(i + 1));

        for (const int leftResult : leftResults) {
          for (const int rightResult : rightResults) {
            switch (currentOperator) {
              case '+':
                results.push_back(leftResult + rightResult);
                break;
              case '-':
                results.push_back(leftResult - rightResult);
                break;
              case '*':
                results.push_back(leftResult * rightResult);
                break;
            }
          }
        }
      }
    }

    return results;
  }

  static bool isOperator(char c) { return c == '+' || c == '-' || c == '*'; }
};
// @lc code=end

int main() {
  Solution sol;
  sol.diffWaysToCompute("2-1-1");
}
