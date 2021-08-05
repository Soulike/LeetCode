/*
 * @lc app=leetcode id=763 lang=javascript
 *
 * [763] Partition Labels
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number[]}
 */
const partitionLabels = function (s) 
{
    /**
     * 在 'i' 的后面添加一个分隔符，即某一组的最后一个字母的下标
     * @type {number[]} */
    const splitIndexes = [-1];
    /**@type {Set<string>} */
    const checkedLetter = new Set();

    // 找到第一个字符
    for (let i = 0; i < s.length; i++)
    {
        const leftChar = s.charAt(i);
        if (!checkedLetter.has(leftChar))
        {
            // 找到最后一个相同字符
            for (let j = s.length - 1; j >= i; j--)
            {
                const rightChar = s.charAt(j);
                if (leftChar === rightChar)
                {
                    if (i <= splitIndexes[splitIndexes.length - 1])
                    {
                        if (j > splitIndexes[splitIndexes.length - 1])  // 超出原本范围，扩大分组
                        {
                            splitIndexes[splitIndexes.length - 1] = j;
                        }
                        break;
                    }
                    else    // 不在上一个范围内，创建新分组
                    {
                        splitIndexes.push(j);
                        break;
                    }
                }
            }
        }
    }

    const result = [];
    for (let i = 0; i < splitIndexes.length-1; i++)
    {
        result.push(splitIndexes[i + 1] - splitIndexes[i]);
    }

    return result;
};
// @lc code=end