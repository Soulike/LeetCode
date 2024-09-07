/*
 * @lc app=leetcode id=1367 lang=cpp
 *
 * [1367] Linked List in Binary Tree
 */

struct ListNode {
  int val;
  ListNode* next;
  ListNode() : val(0), next(nullptr) {}
  ListNode(int x) : val(x), next(nullptr) {}
  ListNode(int x, ListNode* next) : val(x), next(next) {}
};

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
  bool isSubPath(ListNode* head, TreeNode* root) {
    if (root == nullptr) {
      return false;
    }
    return canMatch(head, root) || isSubPath(head, root->left) ||
           isSubPath(head, root->right);
  }

 private:
  // Can we match the ListNode starts from `head`
  // with the Binary Tree whose root is `root`
  bool canMatch(ListNode* head, TreeNode* root) {
    if (head == nullptr) {
      return true;
    }
    if (root == nullptr) {
      return false;
    }

    if (head->val == root->val) {
      return canMatch(head->next, root->left) ||
             canMatch(head->next, root->right);
    }

    return false;
  }
};
// @lc code=end
