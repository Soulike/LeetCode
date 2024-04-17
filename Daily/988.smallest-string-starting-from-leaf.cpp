/*
 * @lc app=leetcode id=988 lang=cpp
 *
 * [988] Smallest String Starting From Leaf
 */
struct TreeNode {
  int val;
  TreeNode* left;
  TreeNode* right;
  TreeNode() : val(0), left(nullptr), right(nullptr) {}
  TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
  TreeNode(int x, TreeNode* left, TreeNode* right)
      : val(x), left(left), right(right) {}
};

#include <forward_list>
#include <numeric>

using std::forward_list;
using std::string;

// @lc code=start
class Solution {
 public:
  string smallestFromLeaf(TreeNode* root) {
    forward_list<int> currentStringList;
    forward_list<int> currentMinStringList;
    backtrack(root, currentStringList, currentMinStringList);
    return std::accumulate(
        currentMinStringList.begin(), currentMinStringList.end(), string(),
        [](const string& prev, int curr) { return prev + (char)(curr + 'a'); });
  }

  void backtrack(TreeNode* root,
                 forward_list<int>& currentStringList,
                 forward_list<int>& currentMinStringList) {
    if (root == nullptr) {
      return;
    }

    currentStringList.push_front(root->val);
    if (root->left == nullptr && root->right == nullptr) {
      if (currentMinStringList.empty() ||
          currentStringList < currentMinStringList) {
        currentMinStringList = currentStringList;
      }
    } else {
      backtrack(root->left, currentStringList, currentMinStringList);
      backtrack(root->right, currentStringList, currentMinStringList);
    }

    currentStringList.pop_front();
  }
};
// @lc code=end
