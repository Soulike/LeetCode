/*
 * @lc app=leetcode id=513 lang=cpp
 *
 * [513] Find Bottom Left Tree Value
 */
struct TreeNode
{
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

#include <queue>
#include <cstdio>

using std::queue;

// @lc code=start
class Solution
{
public:
    int findBottomLeftValue(TreeNode *root)
    {
        queue<TreeNode *> queue;
        queue.push(root);

        TreeNode *lastLevelFirstNode = nullptr;

        while (!queue.empty())
        {
            TreeNode *node = queue.front();
            queue.pop();

            // As we traverse from right to left, the last node will be the first node in the last level
            lastLevelFirstNode = node;

            if (node->right != nullptr)
            {
                queue.push(node->right);
            }
            if (node->left != nullptr)
            {
                queue.push(node->left);
            }
        }

        return lastLevelFirstNode->val;
    }
};
// @lc code=end