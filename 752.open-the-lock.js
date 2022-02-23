/*
 * @lc app=leetcode id=752 lang=javascript
 *
 * [752] Open the Lock
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
    size;

    constructor()
    {
        this.fakeHead = new QueueNode(-1);
        this.tail = this.fakeHead;
        this.size = 0;
    }

    isEmpty()
    {
        return this.size === 0;
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
            this.size--;

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
        this.size++;
    }
}

/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
const openLock = function (deadends, target)
{
    if (target === '0000')
    {
        return 0;
    }

    const deadendSet = new Set(deadends.map(val => Number.parseInt(val)));

    if (deadendSet.has(0))
    {
        return -1;
    }

    const forwardQueue = new MyQueue();
    forwardQueue.push([0, 0]);
    const backwardQueue = new MyQueue();
    backwardQueue.push([Number.parseInt(target), 0]);

    const wheelsToForwardStep = new Map();
    const wheelsToBackwardStep = new Map();

    let queue1 = forwardQueue;
    let queue2 = backwardQueue;

    let wheelsToStep1 = wheelsToForwardStep;
    let wheelsToStep2 = wheelsToBackwardStep;

    while (!forwardQueue.isEmpty() && !backwardQueue.isEmpty())
    {
        if(queue1.size > queue2.size)
        {
            [queue1, queue2] = [queue2, queue1];
            [wheelsToStep1, wheelsToStep2] = [wheelsToStep2, wheelsToStep1];
        }

        const [wheels, step] = queue1.shift();
        wheelsToStep1.set(wheels, step);

        const connected = getConnected(wheels);
        for (const next of connected)
        {
            if (wheelsToStep2.has(next))
            {
                return 1 + step + wheelsToStep2.get(next);
            }
            if (!deadendSet.has(next)
                && !wheelsToStep1.has(next))
            {
                queue1.push([next, step + 1]);
            }
        }
    }

    return -1;
};

function getConnected(wheels)
{
    const results = [];

    let mask = 1000;
    for (let i = 0; i < 4; i++)
    {
        const bit = Math.floor(wheels / mask) % 10;
        results.push(
            wheels - bit * mask + (bit + 1) % 10 * mask,
            wheels - bit * mask + (10 + bit - 1) % 10 * mask,
        );

        mask /= 10;
    }

    return results;
}

// @lc code=end