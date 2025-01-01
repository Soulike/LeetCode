/*
 * @lc app=leetcode id=150 lang=cpp
 *
 * [150] Evaluate Reverse Polish Notation
 */
#include <forward_list>
#include <stack>
#include <string>
#include <vector>
// @lc code=start
using std::stack;
using std::string;
using std::vector;
class Solution {
 public:
  int evalRPN(vector<string>& tokens) {
    stack<int> num_stack;

    for (string& token : tokens) {
      if (this->is_operator(token)) {
        int num2 = num_stack.top();
        num_stack.pop();
        int num1 = num_stack.top();
        num_stack.pop();
        int result = this->calculate(num1, token, num2);
        num_stack.push(result);
      } else {
        int num = std::stoi(token);
        num_stack.push(num);
      }
    }

    return num_stack.top();
  }

 private:
  bool is_operator(string& str) {
    return str == "+" || str == "-" || str == "*" || str == "/";
  }

  int calculate(int num1, string& op, int num2) {
    if (op == "+")
      return num1 + num2;
    if (op == "-")
      return num1 - num2;
    if (op == "*")
      return num1 * num2;
    if (op == "/")
      return num1 / num2;
    return 0;
  }
};
// @lc code=end