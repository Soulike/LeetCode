/*
 * @lc app=leetcode id=2872 lang=cpp
 *
 * [2872] Maximum Number of K-Divisible Components
 */

#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maxKDivisibleComponents(const int n,
                              const std::vector<std::vector<int>>& edges,
                              const std::vector<int>& values,
                              const int k) {
    TreeNode* tree = BuildTree(n, edges, values);
    const int component_count = PostOrderTraversal(tree, k);
    TearDownTree(tree);
    return component_count;
  }

 private:
  struct TreeNode {
    int index_;
    int value_;
    std::vector<TreeNode*> children_;

    explicit TreeNode(const int index, const int value)
        : index_(index), value_(value) {}
  };

  static int PostOrderTraversal(TreeNode* root, const int k) {
    int component_count = 0;
    for (TreeNode* child : root->children_) {
      component_count += PostOrderTraversal(child, k);
    }
    int component_value = root->value_ % k;
    for (TreeNode* child : root->children_) {
      component_value += child->value_;
      component_value %= k;
    }
    if (component_value == 0) {
      component_count++;
    }
    root->value_ = component_value;
    return component_count;
  }

  static TreeNode* BuildTree(const int n,
                             const std::vector<std::vector<int>>& edges,
                             const std::vector<int>& values) {
    const std::vector<std::unordered_set<int>> adjacent_table =
        BuildAdjacentTable(n, edges);
    return BuildTreeHelper(adjacent_table, values, 0, -1);
  }

  static TreeNode* BuildTreeHelper(
      const std::vector<std::unordered_set<int>>& adjacent_table,
      const std::vector<int>& values,
      const int root_index,
      const int parent_node_index) {
    auto* root = new TreeNode(root_index, values[root_index]);
    const std::unordered_set<int>& adjacent_nodes_indexes =
        adjacent_table[root_index];
    for (const int node_index : adjacent_nodes_indexes) {
      if (node_index == parent_node_index) {
        continue;
      }
      auto* child_tree =
          BuildTreeHelper(adjacent_table, values, node_index, root_index);
      root->children_.push_back(child_tree);
    }
    return root;
  }

  static std::vector<std::unordered_set<int>> BuildAdjacentTable(
      const int n,
      const std::vector<std::vector<int>>& edges) {
    std::vector<std::unordered_set<int>> adjacent_table(n);
    for (const std::vector<int>& edge : edges) {
      adjacent_table[edge[0]].insert(edge[1]);
      adjacent_table[edge[1]].insert(edge[0]);
    }
    return adjacent_table;
  }

  static void TearDownTree(const TreeNode* root) {
    for (const TreeNode* child : root->children_) {
      delete child;
    }
    delete root;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.maxKDivisibleComponents(5, {{0, 2}, {1, 2}, {1, 3}, {2, 4}},
                              {1, 8, 1, 4, 4}, 6);
}