/*
 * @lc app=leetcode id=6 lang=javascript
 *
 * [6] ZigZag Conversion
 */

/*
中间的阶梯可以合并为一列，称为“中间列”，其余的列称为“主列”。
假设有 n 行，那么下标矩阵如下：

0n+0        2n-2        4n-4  ...
0n+1  2n-3  2n-1  4n-5  4n-3  ...
0n+2  2n-4   2n   4n-6  4n-2  ...
...   ...   ...   ...   ...   ...
n-3   n+1   3n-5  3n-1  5n-7  ...
n-2    n    3n-4  3n-2  5n-6  ...
n-1         3n-3        5n-5  ...

可以看到，对于首尾两行，就是 2n-2 的递增。
对于其他行，从主列到中间列，是 当前下标+2*n-2*(行号+1)
*/

// @lc code=start
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
const convert = function (s, numRows)
{
    if (numRows === 1)
    {
        return s;
    }
    /**
     * @type {string[]}
     */
    const result = [];
    for (let rowNumber = 0; rowNumber < numRows; rowNumber++)
    {
        if (rowNumber === 0 || rowNumber === numRows - 1)
        {
            let currentIndex = rowNumber;
            while (currentIndex < s.length)
            {
                result.push(s[currentIndex]);
                currentIndex += (2 * numRows - 2);
            }
        }
        else
        {
            let currentIndex = rowNumber;
            let isCurrentColumnMain = true;
            while (currentIndex < s.length)
            {
                result.push(s[currentIndex]);
                if (isCurrentColumnMain)
                {
                    currentIndex = getZigZagMidIndexFromMainIndex(currentIndex, rowNumber, numRows);
                }
                else
                {
                    currentIndex = getZigZagMainIndexFromMidIndex(currentIndex, rowNumber);
                }
                isCurrentColumnMain = !isCurrentColumnMain;
            }
        }
    }
    return result.join('');
};

/**
 * 从从下到上中间列字母下标得到下一个从上到下主列的字母下标
 * @param {number} midIndex 
 * @param {number} rowNumber
 * @returns {number}
 */
function getZigZagMainIndexFromMidIndex(midIndex, rowNumber)
{
    return midIndex + 2 * rowNumber;
}

/**
 * 从从上到下主列的字母下标得到下一个从下到上中间列字母下标
 * @param {number} mainIndex
 * @param {number} rowNumber
 * @param {number} numRows
 * @returns {number}
 */
function getZigZagMidIndexFromMainIndex(mainIndex, rowNumber, numRows)
{
    return mainIndex + 2 * numRows - 2 * (rowNumber + 1);
}
// @lc code=end