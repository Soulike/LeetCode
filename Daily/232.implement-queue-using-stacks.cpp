/*
 * @lc app=leetcode id=232 lang=cpp
 *
 * [232] Implement Queue using Stacks
 */
#include <stack>
// @lc code=start
using std::stack;
class MyQueue {
 private:
  stack<int>* push_stack;
  stack<int>* pop_stack;

 public:
  MyQueue() {
    this->push_stack = new stack<int>();
    this->pop_stack = new stack<int>();
  }

  ~MyQueue() {
    delete this->push_stack;
    delete this->pop_stack;
  }

  void push(int x) {
    if (this->push_stack->empty()) {
      this->move_stack(*this->pop_stack, *this->push_stack);
    }
    this->push_stack->push(x);
  }

  int pop() {
    const int top = this->peek();
    this->pop_stack->pop();
    return top;
  }

  int peek() {
    if (this->pop_stack->empty()) {
      this->move_stack(*this->push_stack, *this->pop_stack);
    }
    const int top = this->pop_stack->top();
    return top;
  }

  bool empty() { return this->push_stack->empty() && this->pop_stack->empty(); }

 private:
  void move_stack(stack<int>& fromStack, stack<int>& toStack) {
    while (!fromStack.empty()) {
      toStack.push(fromStack.top());
      fromStack.pop();
    }
  }
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * MyQueue* obj = new MyQueue();
 * obj->push(x);
 * int param_2 = obj->pop();
 * int param_3 = obj->peek();
 * bool param_4 = obj->empty();
 */
// @lc code=end
