/*
 * @lc app=leetcode id=590 lang=cpp
 *
 * [590] N-ary Tree Postorder Traversal
 */
#include <vector>

class Node {
 public:
  int val;
  std::vector<Node*> children;
  Node() {}
  Node(int _val) { val = _val; }
  Node(int _val, std::vector<Node*> _children) {
    val = _val;
    children = _children;
  }
};

// @lc code=start

class Solution {
 public:
  std::vector<int> postorder(Node* root) {
    std::vector<int> result;
    recursive(root, result);
    return result;
  }

 private:
  void recursive(const Node* root, std::vector<int>& result) const {
    if (root == nullptr) {
      return;
    }

    const std::vector<Node*> children = root->children;
    for (const auto child : children) {
      recursive(child, result);
    }
    result.push_back(root->val);
  }
};
// @lc code=end
