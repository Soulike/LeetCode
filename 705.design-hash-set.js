/*
 * @lc app=leetcode id=705 lang=javascript
 *
 * [705] Design HashSet
 */

// @lc code=start
class LinkedListNode
{
    /** @type {number} */
    value;
    /** @type {LinkedListNode|null} */
    prev;
    /** @type {LinkedListNode|null} */
    next;

    /** @param {number} value */
    constructor(value)
    {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class MyHashSet
{
    /** @type {LinkedListNode[]} */
    #container;
    static #MOD = 1000;

    constructor()
    {
        this.#container = new Array(MyHashSet.#MOD);

        for (let i = 0; i < MyHashSet.#MOD; i++)
        {
            this.#container[i] = new LinkedListNode(Infinity);
        }
    }

    /**
     * @param {number} key
     * @return {void}
     */
    add(key)
    {
        if (!this.contains(key))
        {
            const head = this.#container[key % MyHashSet.#MOD];
            const next = head.next;

            const newNode = new LinkedListNode(key);
            head.next = newNode;
            newNode.prev = head;

            if (next !== null)
            {
                next.prev = newNode;
            }
            newNode.next = next;
        }
    }

    /**
     * @param {number} key
     * @return {void}
     */
    remove(key)
    {
        const removedNode = this.#getKeyNode(key);
        if (removedNode !== null)
        {
            const prev = removedNode.prev;
            const next = removedNode.next;

            prev.next = next;
            if (next !== null)
            {
                next.prev = prev;
            }
        }
    }

    /**
     * @param {number} key
     * @return {boolean}
     */
    contains(key)
    {
        return this.#getKeyNode(key) !== null;
    }

    /**
     * @param {number} key
     * @return {LinkedListNode|null}
     */
    #getKeyNode(key)
    {
        const head = this.#container[key % MyHashSet.#MOD];

        /** @type {LinkedListNode|null} */
        let currentNode = head;
        while (currentNode !== null)
        {
            if (currentNode.value === key)
            {
                return currentNode;
            }
            else
            {
                currentNode = currentNode.next;
            }
        }

        return null;
    }
}

/**
 * Your MyHashSet object will be instantiated and called as such:
 * var obj = new MyHashSet()
 * obj.add(key)
 * obj.remove(key)
 * var param_3 = obj.contains(key)
 */
// @lc code=end

