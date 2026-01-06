/*
 * @lc app=leetcode id=1161 lang=cpp
 *
 * [1161] Maximum Level Sum of a Binary Tree
 */

#include <queue>

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
  int maxLevelSum(TreeNode* root) {
    std::queue<TreeNode*> current_level_queue;
    std::queue<TreeNode*> next_level_queue;

    int current_level_sum = 0;
    int max_level_sum = INT_MIN;
    int current_level = 1;
    int max_sum_level = -1;
    current_level_queue.push(root);

    while (!current_level_queue.empty()) {
      const TreeNode* node = current_level_queue.front();
      current_level_queue.pop();
      current_level_sum += node->val;
      if (node->left) {
        next_level_queue.push(node->left);
      }
      if (node->right) {
        next_level_queue.push(node->right);
      }

      if (current_level_queue.empty()) {
        if (current_level_sum > max_level_sum) {
          max_sum_level = current_level;
          max_level_sum = current_level_sum;
        }
        current_level_queue = std::move(next_level_queue);
        next_level_queue = std::queue<TreeNode*>();
        current_level_sum = 0;
        current_level++;
      }
    }

    return max_sum_level;
  }
};
// @lc code=end
