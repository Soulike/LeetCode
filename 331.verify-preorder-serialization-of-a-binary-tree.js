/*
 * @lc app=leetcode id=331 lang=javascript
 *
 * [331] Verify Preorder Serialization of a Binary Tree
 */

// @lc code=start
/**
 * @param {string} preOrderString
 * @return {boolean}
 */
const isValidSerialization = function (preOrderString)
{
    let preOrder = preOrderString.split(',');
    /** @type {string[]} */

    let newPreOrder = [];
    while (true)
    {
        let hasLeafReplacement = false;
        for (let i = 0; i < preOrder.length; i++)
        {
            if (preOrder[i] !== '#' && i <= preOrder.length - 3 && preOrder[i + 1] === '#' && preOrder[i + 2] === '#')
            {
                newPreOrder.push('#');
                i += 2;
                hasLeafReplacement = true;
            }
            else
            {
                newPreOrder.push(preOrder[i]);
            }
        }

        if (newPreOrder.length === 3)
        {
            return newPreOrder[0] !== '#';
        }
        else if (newPreOrder.length === 1)
        {
            return newPreOrder[0] === '#';
        }
        else if (newPreOrder.length < 3)
        {
            return false;
        }
        else if (!hasLeafReplacement)
        {
            return false;
        }

        preOrder = newPreOrder;
        newPreOrder = [];
    }
};
// @lc code=end