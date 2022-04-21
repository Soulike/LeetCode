/*
 * @lc app=leetcode id=706 lang=javascript
 *
 * [706] Design HashMap
 */

// @lc code=start
class MyHashMapLinkedListNode
{
    /** @type {number} */
    key;
    /** @type {number} */
    value;
    /** @type {MyHashMapLinkedListNode|null} */
    next;

    /** 
     * @param {number} key
     * @param {number} value 
     * */
    constructor(key,value)
    {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

class MyHashMap
{
    /** @type {MyHashMapLinkedListNode[]} */
    #container;
    static #MOD = 1009;

    constructor()
    {
        this.#container = new Array(MyHashMap.#MOD);

        for (let i = 0; i < MyHashMap.#MOD; i++)
        {
            this.#container[i] = new MyHashMapLinkedListNode(Infinity, Infinity);
        }
    }

    /**
     * @param {number} key
     * @param {number} value
     * @return {void}
     */
    put(key, value)
    {
        const keyNodeInfo = this.#getKeyNodeInfo(key);

        if (keyNodeInfo === null)
        {
            const head = this.#container[key % MyHashMap.#MOD];
            const next = head.next;

            const newNode = new MyHashMapLinkedListNode(key, value);
            head.next = newNode;
            newNode.next = next;
        }
        else
        {
            const [, keyNode] = keyNodeInfo;
            keyNode.value = value;
        }
    }

    /**
     * @param {number} key
     * @return {number}
     */
    get(key)
    {
        const keyNodeInfo = this.#getKeyNodeInfo(key);
        return keyNodeInfo === null ? -1 : keyNodeInfo[1].value;
    }

    /**
     * @param {number} key
     * @return {void}
     */
    remove(key)
    {
        const removedNodeInfo = this.#getKeyNodeInfo(key);
        if (removedNodeInfo !== null)
        {
            const [prevNode, removedNode] = removedNodeInfo;
            const next = removedNode.next;

            prevNode.next = next;
        }
    }

    /**
     * @param {number} key
     * @return {[MyHashMapLinkedListNode,MyHashMapLinkedListNode]|null} - [prev, wantedNode]
     */
    #getKeyNodeInfo(key)
    {
        const head = this.#container[key % MyHashMap.#MOD];

        let prevNode = head;
        /** @type {MyHashMapLinkedListNode|null} */
        let currentNode = head.next;
        while (currentNode !== null)
        {
            if (currentNode.key === key)
            {
                return [prevNode, currentNode];
            }
            else
            {
                prevNode = currentNode;
                currentNode = currentNode.next;
            }
        }

        return null;
    }
}




/** 
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */
// @lc code=end

