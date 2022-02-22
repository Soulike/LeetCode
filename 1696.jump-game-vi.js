/*
 * @lc app=leetcode id=1696 lang=javascript
 *
 * [1696] Jump Game VI
 */

// @lc code=start
class DequeueNode
{
    value;
    prev;
    next;

    constructor(value)
    {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class Dequeue
{
    fakeHead;
    fakeTail;

    constructor()
    {
        this.fakeHead = new DequeueNode(-1);
        this.fakeTail = new DequeueNode(-1);

        this.fakeHead.next = this.fakeTail;
        this.fakeTail.prev = this.fakeHead;
    }

    isEmpty()
    {
        return this.fakeHead.next === this.fakeTail;
    }

    pushHead(val)
    {
        const newNode = new DequeueNode(val);

        const prevNode = this.fakeHead;
        const nextNode = this.fakeHead.next;

        prevNode.next = newNode;
        newNode.prev = prevNode;
        newNode.next = nextNode;
        nextNode.prev = newNode;
    }

    pushTail(val)
    {
        const newNode = new DequeueNode(val);

        const prevNode = this.fakeTail.prev;
        const nextNode = this.fakeTail;

        prevNode.next = newNode;
        newNode.prev = prevNode;
        newNode.next = nextNode;
        nextNode.prev = newNode;
    }

    popHead()
    {
        const poppedNode = this.fakeHead.next;
        const nextNode = poppedNode.next;
        if (poppedNode !== this.fakeTail)
        {
            this.fakeHead.next = nextNode;
            nextNode.prev = this.fakeHead;
        }
        else
        {
            throw new Error('Dequeue is empty');
        }
    }

    popTail()
    {
        const poppedNode = this.fakeTail.prev;
        const prevNode = poppedNode.prev;
        if (poppedNode !== this.fakeHead)
        {
            this.fakeTail.prev = prevNode;
            prevNode.next = this.fakeTail;
        }
        else
        {
            throw new Error('Dequeue is empty');
        }
    }

    getHead()
    {
        const headNode = this.fakeHead.next;
        if (headNode !== this.fakeTail)
        {
            return headNode.value;
        }
        else
        {
            throw new Error('Dequeue is empty');
        }
    }

    getTail()
    {
        const tailNode = this.fakeTail.prev;
        if (tailNode !== this.fakeHead)
        {
            return tailNode.value;
        }
        else
        {
            throw new Error('Dequeue is empty');
        }
    }
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxResult = function (nums, k)
{
    const n = nums.length;

    /**
     * dp[i] 从 i 起跳，能获得的最大和
     * 
     * base case
     * dp[n-1] = nums[n-1]
     * 
     * dp[i] = max(dp[i+1...i+k])+nums[i]
     * 
     * return dp[0]
     * 
     * 关键是使用单调队列求 dp[i+1...i+k] 中的最大值
     */

    const dp = new Array(n);
    dp.fill(-Infinity);
    dp[n - 1] = nums[n - 1];

    // 单调队列，保持队首到队尾递减
    const monoqueue = new Dequeue();
    monoqueue.pushTail(dp[n - 1]);

    for (let i = n - 2; i >= 0; i--)
    {
        const max = monoqueue.getHead();

        dp[i] = Math.max(dp[i], max);
        dp[i] += nums[i];

        // (n-1)+1-i 是目前已经进入过队列的个数，超过 k 就需要驱逐一个
        if (n - i > k)  // 需要从队列中删除 dp[i+k]
        {
            if (monoqueue.getHead() === dp[i + k])
            {
                monoqueue.popHead();
            }
        }

        if (!monoqueue.isEmpty())
        {
            let tail = monoqueue.getTail();
            while (tail < dp[i])
            {
                monoqueue.popTail();
                if (monoqueue.isEmpty())
                {
                    break;
                }
                tail = monoqueue.getTail();
            }
        }
        monoqueue.pushTail(dp[i]);
    }

    return dp[0];
};
// @lc code=end