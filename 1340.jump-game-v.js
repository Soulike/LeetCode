/*
 * @lc app=leetcode id=1340 lang=javascript
 *
 * [1340] Jump Game V
 */

// @lc code=start
class QueueNode
{
    val;
    next;

    constructor(val)
    {
        this.val = val;
        this.next = null;
    }
}

class MyQueue
{
    fakeHead;
    tail;

    constructor()
    {
        this.fakeHead = new QueueNode(-1);
        this.tail = this.fakeHead;
    }

    isEmpty()
    {
        return this.fakeHead.next === null;
    }

    shift()
    {
        if (!this.isEmpty())
        {
            const head = this.fakeHead.next;
            const next = head.next;
            this.fakeHead.next = next;
            if (next === null)
            {
                this.tail = this.fakeHead;
            }

            return head.val;
        }
        else
        {
            throw new RangeError();
        }
    }

    push(val)
    {
        const newNode = new QueueNode(val);
        this.tail.next = newNode;
        this.tail = newNode;
    }
}

/**
 * @param {number[]} arr
 * @param {number} d
 * @return {number}
 */
var maxJumps = function (arr, d)
{
    /**
     * 每次跳跃的最长距离是 d
     * 跳跃到的位置，中间不能有更高的“墙”
     */

    const leftJumpCache = new Map();
    function findLeftJumpIndexes(i)
    {
        if (leftJumpCache.has(i))
        {
            return leftJumpCache.get(i);
        }
        let result = [];

        if (i === 0 || arr[i - 1] >= arr[i])
        {
            return result;
        }

        let indexes = [];
        let maxVal = arr[i - 1];
        let maxValIndex = i - 1;

        for (let j = 2; j <= d; j++)
        {
            if (i - j < 0 || arr[i - j] >= arr[i])
            {
                break;
            }
            if (arr[i - j] >= maxVal)
            {
                maxVal = arr[i - j];
                maxValIndex = i - j;
            }
        }

        for (let j = i - 1; j >= maxValIndex; j--)
        {
            indexes.push(j);
        }

        result = indexes;
        leftJumpCache.set(i, result);
        return result;
    }

    const rightJumpCache = new Map();
    function findRightJumpIndexes(i)
    {
        if (rightJumpCache.has(i))
        {
            return rightJumpCache.get(i);
        }
        let result = [];

        if (i === n - 1 || arr[i + 1] >= arr[i])
        {
            return result;
        }

        let indexes = [];
        let maxVal = arr[i + 1];
        let maxValIndex = i + 1;

        for (let j = 2; j <= d; j++)
        {
            if (i + j > n-1 || arr[i + j] >= arr[i])
            {
                break;
            }
            if (arr[i + j] >= maxVal)
            {
                maxVal = arr[i + j];
                maxValIndex = i + j;
            }
        }

        for (let j = i + 1; j <= maxValIndex; j++)
        {
            indexes.push(j);
        }

        result = indexes;
        rightJumpCache.set(i, result);
        return result;
    }

    const queue = new MyQueue();
    const indexToMaxSteps = new Map();

    let maxIndexCount = -Infinity;

    const n = arr.length;
    for (let i = 0; i < n; i++)
    {
        queue.push([i, 1]);
        let currentMaxIndexCount = -Infinity;

        while (!queue.isEmpty())
        {
            const [index, step] = queue.shift();
            currentMaxIndexCount = Math.max(currentMaxIndexCount, step);

            const leftJumpIndexes = findLeftJumpIndexes(index);
            const rightJumpIndexes = findRightJumpIndexes(index);

            for (const leftJumpIndex of leftJumpIndexes)
            {
                if (indexToMaxSteps.has(leftJumpIndex))
                {
                    currentMaxIndexCount = Math.max(currentMaxIndexCount, step + indexToMaxSteps.get(leftJumpIndex));
                }
                else
                {
                    queue.push([leftJumpIndex, step + 1]);
                }
            }
            for (const rightJumpIndex of rightJumpIndexes)
            {
                if (indexToMaxSteps.has(rightJumpIndex))
                {
                    currentMaxIndexCount = Math.max(currentMaxIndexCount, step + indexToMaxSteps.get(rightJumpIndex));
                }
                else
                {
                    queue.push([rightJumpIndex, step + 1]);
                }
            }
        }

        indexToMaxSteps.set(i, currentMaxIndexCount);
        maxIndexCount = Math.max(maxIndexCount, currentMaxIndexCount);
    }

    return maxIndexCount;
};
// @lc code=end