/*
 * @lc app=leetcode id=289 lang=javascript
 *
 * [289] Game of Life
 */

// @lc code=start
/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var gameOfLife = function (board)
{
    /**
     * 0 -> 0 0
     * 1 -> 1 1
     * 0 -> 1 2
     * 1 -> 0 3
     */

    const m = board.length;
    const n = board[0].length;
    const DEAD = 0;
    const LIVE = 1;
    const DEAD_TO_LIVE = 2;
    const LIVE_TO_DEAD = 3;

    /**
     * @param {number} i 
     * @param {number} j 
     * @returns {number}
     */
    function getLiveNeighborCount(i, j)
    {
        let hasLeft = true;
        let hasRight = true;
        let hasUp = true;
        let hasDown = true;

        let count = 0;


        if (i === 0)
        {
            hasUp = false;
        }
        if (j === 0)
        {
            hasLeft = false;
        }

        if (i === m - 1)
        {
            hasDown = false;
        }

        if (j === n - 1)
        {
            hasRight = false;
        }

        if (hasUp && (
            board[i - 1][j] === LIVE
            || board[i - 1][j] === LIVE_TO_DEAD
        ))
        {
            count++;
        }

        if (hasDown && (
            board[i + 1][j] === LIVE
            || board[i + 1][j] === LIVE_TO_DEAD
        ))
        {
            count++;
        }

        if (hasLeft && (
            board[i][j - 1] === LIVE
            || board[i][j - 1] === LIVE_TO_DEAD
        ))
        {
            count++;
        }

        if (hasRight && (
            board[i][j + 1] === LIVE
            || board[i][j + 1] === LIVE_TO_DEAD
        ))
        {
            count++;
        }

        if (hasLeft && hasUp && (
            board[i - 1][j - 1] === LIVE
            || board[i - 1][j - 1] === LIVE_TO_DEAD
        ))
        {
            count++;
        }

        if (hasLeft && hasDown && (
            board[i + 1][j - 1] === LIVE
            || board[i + 1][j - 1] === LIVE_TO_DEAD
        ))
        {
            count++;
        }

        if (hasRight && hasUp && (
            board[i - 1][j + 1] === LIVE
            || board[i - 1][j + 1] === LIVE_TO_DEAD
        ))
        {
            count++;
        }

        if (hasRight && hasDown && (
            board[i + 1][j + 1] === LIVE
            || board[i + 1][j + 1] === LIVE_TO_DEAD
        ))
        {
            count++;
        }

        return count;
    }

    for (let i = 0; i < m; i++)
    {
        for (let j = 0; j < n; j++)
        {
            const liveNeighborCount = getLiveNeighborCount(i, j);
            const isLive = board[i][j] === LIVE;

            if (isLive)
            {
                // 1 -> 0
                if (liveNeighborCount < 2
                    || liveNeighborCount > 3)
                {
                    board[i][j] = 3;
                }
            }
            else
            {
                // 0 -> 1
                if (liveNeighborCount === 3)
                {
                    board[i][j] = 2;
                }
            }
        }
    }

    for (let i = 0; i < m; i++)
    {
        for (let j = 0; j < n; j++)
        {
            if (board[i][j] === DEAD_TO_LIVE)
            {
                board[i][j] = 1;
            }
            else if (board[i][j] === LIVE_TO_DEAD)
            {
                board[i][j] = 0;
            }
        }
    }
};

// @lc code=end