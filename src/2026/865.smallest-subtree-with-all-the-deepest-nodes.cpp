/*
 * @lc app=leetcode id=865 lang=cpp
 *
 * [865] Smallest Subtree with all the Deepest Nodes
 */

#include <deque>
#include <queue>
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
  TreeNode* subtreeWithAllDeepest(TreeNode* root) {
    std::vector<TreeNode*> deepest_nodes = GetDeepestNodes(root);
    return GetClosestAncestor(root, deepest_nodes);
  }

 private:
  static std::vector<TreeNode*> GetDeepestNodes(TreeNode* root) {
    std::vector<TreeNode*> current_level_nodes;
    std::vector<TreeNode*> next_level_nodes;

    current_level_nodes.push_back(root);
    while (true) {
      for (const TreeNode* node : current_level_nodes) {
        if (node->left) {
          next_level_nodes.push_back(node->left);
        }
        if (node->right) {
          next_level_nodes.push_back(node->right);
        }
      }
      if (next_level_nodes.empty()) {
        return current_level_nodes;
      }
      current_level_nodes = std::move(next_level_nodes);
    }
  }

  static TreeNode* GetClosestAncestor(TreeNode* root,
                                      const std::vector<TreeNode*>& nodes) {
    std::queue<TreeNode*> node_queue(nodes.cbegin(), nodes.cend());
    while (node_queue.size() > 1) {
      TreeNode* node1 = node_queue.front();
      node_queue.pop();
      TreeNode* node2 = node_queue.front();
      node_queue.pop();

      TreeNode* ancestor = GetClosestAncestor(root, node1, node2);
      if (!ancestor) {
        std::abort();
      }
      node_queue.push(ancestor);
    }
    return node_queue.front();
  }

  static TreeNode* GetClosestAncestor(TreeNode* root,
                                      TreeNode* node1,
                                      TreeNode* node2) {
    if (root == nullptr) {
      return nullptr;
    }
    if (root == node1 || root == node2) {
      return root;
    }

    TreeNode* left_subtree_result =
        GetClosestAncestor(root->left, node1, node2);

    TreeNode* right_subtree_result =
        GetClosestAncestor(root->right, node1, node2);

    if (left_subtree_result == node1 && right_subtree_result == node2 ||
        left_subtree_result == node2 && right_subtree_result == node1) {
      return root;
    }
    if (left_subtree_result && !right_subtree_result) {
      return left_subtree_result;
    }
    if (!left_subtree_result && right_subtree_result) {
      return right_subtree_result;
    }
    return nullptr;
  }
};
// @lc code=end
