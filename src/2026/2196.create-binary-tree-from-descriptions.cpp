/*
 * @lc app=leetcode id=2196 lang=cpp
 *
 * [2196] Create Binary Tree From Descriptions
 */

#include <unordered_map>
#include <vector>

struct TreeNode {
  int val;
  TreeNode* left;
  TreeNode* right;
  TreeNode() : val(0), left(nullptr), right(nullptr) {}
  TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
  TreeNode(int x, TreeNode* left, TreeNode* right)
      : val(x), left(left), right(right) {}
};

// @lc code=start
class Solution {
 public:
  TreeNode* createBinaryTree(
      const std::vector<std::vector<int>>& descriptions) {
    std::unordered_map<int, TreeNode*> value_to_node;
    std::unordered_map<int, bool> value_to_is_child;

    for (const std::vector<int>& description : descriptions) {
      const int parent_value = description[0];
      const int child_value = description[1];
      const bool is_left = !!description[2];

      if (!value_to_node.contains(parent_value)) {
        value_to_node[parent_value] = new TreeNode(parent_value);
        value_to_is_child[parent_value] = false;
      }
      if (!value_to_node.contains(child_value)) {
        value_to_node[child_value] = new TreeNode(child_value);
        value_to_is_child[child_value] = true;
      }

      value_to_is_child[child_value] = true;

      TreeNode* parent_node = value_to_node.at(parent_value);
      TreeNode* child_node = value_to_node.at(child_value);
      if (is_left) {
        parent_node->left = child_node;
      } else {
        parent_node->right = child_node;
      }
    }

    // Find root
    TreeNode* root = nullptr;
    for (const auto& [value, is_child] : value_to_is_child) {
      if (is_child) {
        continue;
      }
      root = value_to_node.at(value);
      break;
    }

    return root;
  }
};
// @lc code=end
