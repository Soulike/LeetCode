
/*
 * @lc app=leetcode id=2471 lang=cpp
 *
 * [2471] Minimum Number of Operations to Sort a Binary Tree by Level
 */

#include <algorithm>
#include <iostream>
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
  int minimumOperations(TreeNode* root) {
    int minimumOperationNumber = 0;
    auto lastLevelNodes = std::make_unique<std::vector<TreeNode*>>();
    auto currentLevelNodes = std::make_unique<std::vector<TreeNode*>>();
    lastLevelNodes->push_back(root);

    while (!lastLevelNodes->empty()) {
      for (const TreeNode* node : *lastLevelNodes) {
        if (node->left) {
          currentLevelNodes->push_back(node->left);
        }
        if (node->right) {
          currentLevelNodes->push_back(node->right);
        }
      }
      std::vector<int> currentLevelNodesValues =
          getValuesArrayForTreeNodes(*currentLevelNodes);
      minimumOperationNumber +=
          getMinimumOperationNumberForArray(currentLevelNodesValues);
      lastLevelNodes = std::move(currentLevelNodes);
      currentLevelNodes = std::make_unique<std::vector<TreeNode*>>();
    }

    return minimumOperationNumber;
  }

 public:
  class IndexToElement {
   public:
    int index;
    int element;
  };

  static int getMinimumOperationNumberForArray(const std::vector<int>& arr) {
    std::vector<IndexToElement> indexToElements;
    indexToElements.reserve(arr.size());
    for (int i = 0; i < arr.size(); i++) {
      indexToElements.emplace_back(i, arr[i]);
    }
    std::ranges::sort(
        indexToElements, [](const IndexToElement& indexToElement1,
                            const IndexToElement& indexToElement2) {
          return indexToElement1.element < indexToElement2.element;
        });

    int minimumOperationNumber = 0;

    for (int i = 0; i < indexToElements.size(); i++) {
      while (i != indexToElements[i].index) {
        std::swap(indexToElements[i],
                  indexToElements[indexToElements[i].index]);
        minimumOperationNumber++;
      }
    }

    return minimumOperationNumber;
  }

  static std::vector<int> getValuesArrayForTreeNodes(
      const std::vector<TreeNode*>& treeNodes) {
    std::vector<int> valuesArr;
    valuesArr.reserve(treeNodes.size());
    for (const TreeNode* node : treeNodes) {
      valuesArr.push_back(node->val);
    }
    return valuesArr;
  }
};
// @lc code=end
