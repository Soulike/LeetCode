/*
 * @lc app=leetcode id=146 lang=javascript
 *
 * [146] LRU Cache
 */

// @lc code=start

class ListNode
{
    key;
    before;
    next;

    constructor(key, before, next)
    {
        this.key = key;
        this.before = before;
        this.next = next;
    }
}

class List
{
    #head;
    #tail;
    #keyToNode;
    #maxSize;

    constructor(maxSize)
    {
        this.#head = new ListNode(-1, null, null);
        this.#tail = new ListNode(-2, null, null);
        this.#head.next = this.#tail;
        this.#tail.before = this.#head;
        this.#keyToNode = new Map();
        this.#maxSize = maxSize;
    }

    push(key)
    {
        const node = this.#keyToNode.get(key);
        if (node === undefined)
        {
            const newNode = new ListNode(key, null, null);
            this.#keyToNode.set(key, newNode);
            const tailBefore = this.#tail.before;
            tailBefore.next = newNode;
            newNode.before = tailBefore;

            newNode.next = this.#tail;
            this.#tail.before = newNode;

            if (this.#keyToNode.size > this.#maxSize)
            {
                const deletedNode = this.#head.next;
                const deletedNodeBefore = deletedNode.before;
                const deletedNodeNext = deletedNode.next;
                deletedNodeBefore.next = deletedNodeNext;
                deletedNodeNext.before = deletedNodeBefore;
                this.#keyToNode.delete(deletedNode.key);
                return deletedNode.key;
            }
        }
        else
        {
            this.touch(key);
        }
        return null;
    }

    touch(key)
    {
        const node = this.#keyToNode.get(key);
        if (node === undefined)
        {
            return;
        }
        else
        {
            const nodeBefore = node.before;
            const nodeNext = node.next;
            nodeBefore.next = nodeNext;
            nodeNext.before = nodeBefore;

            const tailBefore = this.#tail.before;
            tailBefore.next = node;
            node.before = tailBefore;

            node.next = this.#tail;
            this.#tail.before = node;
        }
    }
}

class LRUCache
{
    #keyList;
    #store;

    /**
     * @param {number} capacity
     */
    constructor(capacity)
    {
        this.#keyList = new List(capacity);
        this.#store = new Map();
    }
    /**
     * @param {number} key
     * @return {number}
     */
    get(key)
    {
        this.#keyList.touch(key);
        return (this.#store.get(key) ?? -1);
    }
    /**
     * @param {number} key
     * @param {number} value
     * @return {void}
     */
    put(key, value)
    {
        const removedKey = this.#keyList.push(key);
        if (removedKey !== null)
        {
            this.#store.delete(removedKey);
        }
        this.#store.set(key, value);
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end

/*
["LRUCache","put","put","get","put","get","put","get","get","get"]
[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]

*/

const lruCache = new LRUCache(1);
lruCache.put(2, 1);
lruCache.get(2);
lruCache.put(3, 2);
lruCache.get(2);