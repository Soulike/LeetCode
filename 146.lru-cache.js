/*
 * @lc app=leetcode id=146 lang=javascript
 *
 * [146] LRU Cache
 */

// @lc code=start
class ListNode
{
    key;
    value;
    prev;
    next;

    constructor(key, value)
    {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}
class LinkedHashMap
{
    /**
     * 越靠近链表尾部越新
     */

    fakeHead;
    tail;
    capacity;
    keyToListNode;

    constructor(capacity)
    {
        this.capacity = capacity;

        this.fakeHead = new ListNode(-1, -1);
        this.tail = this.fakeHead;
        this.keyToListNode = new Map();
    }

    size()
    {
        return this.keyToListNode.size;
    }

    removeOldest()
    {
        if (this.size() !== 0)
        {
            const removedNode = this.fakeHead.next;
            const prevNode = removedNode.prev;
            const nextNode = removedNode.next;

            prevNode.next = nextNode;
            if (nextNode !== null)
            {
                nextNode.prev = prevNode;
            }

            if (removedNode === this.tail)
            {
                this.tail = prevNode;
            }

            this.keyToListNode.delete(removedNode.key);
        }
    }

    add(key, value)
    {
        if (this.keyToListNode.has(key))
        {
            this.touch(key);
            this.keyToListNode.get(key).value = value;
        }
        else
        {
            if (this.size() === this.capacity)
            {
                this.removeOldest();
            }
            const newNode = new ListNode(key, value);
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
            this.keyToListNode.set(key, newNode);
        }
    }

    getValue(key)
    {
        if (this.keyToListNode.has(key))
        {
            this.touch(key);
            return this.keyToListNode.get(key).value;
        }
        else
        {
            return -1;
        }
    }

    touch(key)
    {
        const touchedNode = this.keyToListNode.get(key);
        if (touchedNode !== undefined)
        {
            // 已经是 tail 则无需调整
            if (this.tail !== touchedNode)
            {
                const prevNode = touchedNode.prev;
                const nextNode = touchedNode.next;

                prevNode.next = nextNode;
                if (nextNode !== null)
                {
                    nextNode.prev = prevNode;
                }

                this.tail.next = touchedNode;
                touchedNode.prev = this.tail;
                touchedNode.next = null;
                this.tail = touchedNode;
            }
        }
    }
}

class LRUCache
{
    linkedHashMap;

    constructor(capacity)
    {
        this.linkedHashMap = new LinkedHashMap(capacity);
    }

    /**
     * @param {number} key
     * @return {number}
     */
    get(key)
    {
        return this.linkedHashMap.getValue(key);
    }
    /**
     * @param {number} key
     * @param {number} value
     * @return {void}
     */
    put(key, value)
    {
        return this.linkedHashMap.add(key, value);
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