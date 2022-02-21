/*
 * @lc app=leetcode id=1345 lang=javascript
 *
 * [1345] Jump Game IV
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
 * @return {number}
 */
var minJumps = function (arr)
{
    const n = arr.length;
    if (n === 1)
    {
        return 0;
    }
    const valueToIndexes = new Map();
    for (let i = 0; i < n; i++)
    {
        if (valueToIndexes.has(arr[i]))
        {
            const indexes = valueToIndexes.get(arr[i]);
            indexes.add(i);
        }
        else
        {
            const indexes = new Set([i]);
            valueToIndexes.set(arr[i], indexes);
        }
    }

    const queue = new MyQueue();
    queue.push([0, 0]);

    const visited = new Set();


    while (!queue.isEmpty())
    {
        const [index, step] = queue.shift();
        visited.add(index);

        if (index + 1 === n - 1)
        {
            return step + 1;
        }

        if (arr[index + 1] !== arr[index]
            && !visited.has(index + 1))
        {
            queue.push([index + 1, step + 1]);
        }

        if (index - 1 >= 0
            && arr[index - 1] !== arr[index]
            && !visited.has(index - 1))
        {
            queue.push([index - 1, step + 1]);
        }

        const connectedIndexes = valueToIndexes.get(arr[index]);
        
        for (const connectedIndex of connectedIndexes)
        {
            if (connectedIndex === n - 1)
            {
                return step + 1;
            }

            if (connectedIndex !== index
                && !visited.has(connectedIndex))
            {
                queue.push([connectedIndex, step + 1]);
            }
        }
        // 已经到达过了，没必要从别的地方再来一次了，因为不会更近
        connectedIndexes.clear();
    }
};
// @lc code=end