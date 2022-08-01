/*
 * @lc app=leetcode id=146 lang=javascript
 *
 * [146] LRU Cache
 */

// @lc code=start
class LRUCacheNode {
    /** @type {number} */
    key;
    /** @type {number} */
    val;
    /** @type {LRUCacheNode|null} */
    next;
    /** @type {LRUCacheNode|null} */
    prev;

    /**
     * @param {number} key
     * @param {number} val
     */
    constructor(key, val) {
        this.key = key;
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    /** @type {Map<number, LRUCacheNode>} */
    #keyToNode;
    /** @type {LRUCacheNode} */
    #fakeHead;
    /** @type {LRUCacheNode|null} */
    #tail;
    /** @type {number} */
    #capacity;

    /**
     * @param {number} capacity
     */
    constructor(capacity) {
        this.#capacity = capacity;
        this.#keyToNode = new Map();
        this.#fakeHead = new LRUCacheNode(-1, -1);
        this.#tail = this.#fakeHead;
    }

    /**
     * @param {number} key
     * @return {number}
     */
    get(key) {
        const node = this.#keyToNode.get(key);
        if (node !== undefined) {
            this.#moveToHead(node);
            return node.val;
        } else {
            return -1;
        }
    }

    /**
     * @param {number} key
     * @param {number} value
     * @return {void}
     */
    put(key, value) {
        const node = this.#keyToNode.get(key);
        if (node === undefined) {
            if (this.#keyToNode.size === this.#capacity) {
                this.#removeTail();
            }
            const newNode = new LRUCacheNode(key, value);
            this.#insertToHead(newNode);
        } else {
            node.val = value;
            this.#moveToHead(node);
        }
    }

    /**
     * @param {LRUCacheNode} node
     * @returns {void}
     */
    #moveToHead(node) {
        const prev = node.prev;
        const next = node.next;
        const fakeHeadNext = this.#fakeHead.next;

        if (node === fakeHeadNext) {
            return;
        }

        if (prev === null) {
            throw new Error('prev is null');
        }

        prev.next = next;
        if (next !== null) {
            next.prev = prev;
        }

        this.#fakeHead.next = node;
        node.prev = this.#fakeHead;

        node.next = fakeHeadNext;
        if (fakeHeadNext !== null) {
            fakeHeadNext.prev = node;
        }

        if (this.#tail === node) {
            this.#tail = prev;
        }
    }

    /**
     * @param {LRUCacheNode} node
     * @returns {void}
     */
    #insertToHead(node) {
        const fakeHeadNext = this.#fakeHead.next;

        node.prev = this.#fakeHead;
        this.#fakeHead.next = node;

        node.next = fakeHeadNext;
        if (fakeHeadNext !== null) {
            fakeHeadNext.prev = node;
        }

        this.#keyToNode.set(node.key, node);

        if (fakeHeadNext === null) {
            this.#tail = node;
        }
    }

    /**
     * @returns {void}
     */
    #removeTail() {
        if (this.#tail === null) {
            throw new Error('tail is null when remove tail');
        }
        const prev = this.#tail.prev;

        if (prev === null) {
            throw new Error('tail.prev is null when remove tail');
        }

        this.#keyToNode.delete(this.#tail.key);
        prev.next = null;
        this.#tail = prev;
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end
