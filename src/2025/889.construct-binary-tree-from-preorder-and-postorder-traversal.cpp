/*
 * @lc app=leetcode id=889 lang=cpp
 *
 * [889] Construct Binary Tree from Preorder and Postorder Traversal
 */

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
  TreeNode* constructFromPrePost(const std::vector<int>& preorder,
                                 const std::vector<int>& postorder) {
    TreeNode* root = constructTree(preorder, {0, preorder.size() - 1},
                                   postorder, {0, postorder.size() - 1});
    return root;
  }

 private:
  class Range {
   public:
    size_t begin;
    size_t end;

    [[nodiscard]] size_t size() const { return end - begin + 1; }
  };

  static TreeNode* constructTree(const std::vector<int>& preorder,
                                 const Range& preorderRange,
                                 const std::vector<int>& postorder,
                                 const Range& postorderRange) {
    if (preorderRange.size() <= 0) {
      return nullptr;
    }
    if (preorderRange.size() == 1) {
      return new TreeNode(preorder[preorderRange.begin]);
    }

    const int rootNodeValue = preorder[preorderRange.begin];
    TreeNode* rootNode = new TreeNode(rootNodeValue);

    const int leftChildRootNodeValue = preorder[preorderRange.begin + 1];
    int leftChildRootValueIndexInPostorder = -1;
    for (int i = static_cast<int>(postorderRange.end);
         i >= static_cast<int>(postorderRange.begin); i--) {
      if (postorder[i] == leftChildRootNodeValue) {
        leftChildRootValueIndexInPostorder = i;
      }
    }

    const Range leftChildPostorderRange(postorderRange.begin,
                                        leftChildRootValueIndexInPostorder);
    const Range leftChildPreorderRange(
        preorderRange.begin + 1,
        preorderRange.begin + leftChildPostorderRange.size());
    const Range rightChildPreorderRange(leftChildPreorderRange.end + 1,
                                        preorderRange.end);
    const Range rightChildPostorderRange(leftChildPostorderRange.end + 1,
                                         postorderRange.end - 1);

    rootNode->left = constructTree(preorder, leftChildPreorderRange, postorder,
                                   leftChildPostorderRange);
    rootNode->right = constructTree(preorder, rightChildPreorderRange,
                                    postorder, rightChildPostorderRange);

    return rootNode;
  }
};
// @lc code=end

int main() {
  std::vector<int> preorder = {1, 2, 4, 5, 3, 6, 7};
  std::vector<int> postorder = {4, 5, 2, 6, 7, 3, 1};

  Solution sol;
  sol.constructFromPrePost(preorder, postorder);
}
