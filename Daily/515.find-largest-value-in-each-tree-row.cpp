/*
 * @lc app=leetcode id=515 lang=cpp
 *
 * [515] Find Largest Value in Each Tree Row
 */

#include <memory>
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
  std::vector<int> largestValues(TreeNode* root) {
    if (root == nullptr) {
      return {};
    }
    std::vector<int> maxValuesInLevel;
    maxValuesInLevel.push_back(root->val);

    auto prevLevelNodes = std::make_unique<std::vector<TreeNode*>>();
    auto currentLevelNodes = std::make_unique<std::vector<TreeNode*>>();
    prevLevelNodes->push_back(root);
    int currentLevel = 0;

    while (!prevLevelNodes->empty()) {
      currentLevel++;
      int maxValueInLevel = INT_MIN;
      for (const TreeNode* prevLevelNode : *prevLevelNodes) {
        if (prevLevelNode->left) {
          maxValueInLevel = std::max(maxValueInLevel, prevLevelNode->left->val);
          currentLevelNodes->push_back(prevLevelNode->left);
        }
        if (prevLevelNode->right) {
          maxValueInLevel =
              std::max(maxValueInLevel, prevLevelNode->right->val);
          currentLevelNodes->push_back(prevLevelNode->right);
        }
      }

      if (!currentLevelNodes->empty()) {
        maxValuesInLevel.push_back(maxValueInLevel);
      }

      prevLevelNodes = std::move(currentLevelNodes);
      currentLevelNodes = std::make_unique<std::vector<TreeNode*>>();
    }

    return maxValuesInLevel;
  }
};
// @lc code=end
