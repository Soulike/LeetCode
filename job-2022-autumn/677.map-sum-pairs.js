/*
 * @lc app=leetcode id=677 lang=javascript
 *
 * [677] Map Sum Pairs
 */

// @lc code=start

class PrefixSumTrieNode {
    /**
     * @param {string} key
     */
    constructor(key) {
        /**
         * @type {string}
         */
        this.key = key;
        /**
         * @type {Map<string, PrefixSumTrieNode>}
         */
        this.children = new Map();
        /**
         * @type {boolean}
         */
        this.isEnd = false;
        /**
         * the sum of value of words passing `key`
         * @type {number}
         * */
        this.sum = 0;
        /**
         * The value of word ends with `key`
         * @type {number}
         *  */
        this.value = 0;
    }
}

class PrefixSumTrie {
    constructor() {
        /**@type {PrefixSumTrieNode} */
        this.root = new PrefixSumTrieNode('');
    }

    /**
     * Returns the value of word.
     * @param {string} word
     * @return {number}
     */
    search(word) {
        let currentNode = this.root;
        for (let i = 0; i < word.length; i++) {
            const char = word.charAt(i);
            let nextNode = currentNode.children.get(char);
            if (nextNode === undefined) {
                return 0;
            }
            if (i === word.length - 1) {
                if (nextNode.isEnd) {
                    return nextNode.value;
                } else {
                    return 0;
                }
            }
            currentNode = nextNode;
        }
        return 0;
    }

    /**
     * Inserts a word into the trie.
     * @param {string} word
     * @param {number} value
     * @return {void}
     */
    insert(word, value) {
        const originalValue = this.search(word);
        const diff = value - originalValue;

        let currentNode = this.root;
        currentNode.sum += diff;
        for (let i = 0; i < word.length; i++) {
            const char = word.charAt(i);
            let nextNode = currentNode.children.get(char);
            if (nextNode === undefined) {
                nextNode = new PrefixSumTrieNode(char);
                currentNode.children.set(char, nextNode);
            }
            if (i === word.length - 1) {
                nextNode.isEnd = true;
                nextNode.value = value;
            }
            nextNode.sum += diff;
            currentNode = nextNode;
        }
    }

    /**
     * @param {string} prefix
     * @return {number}
     */
    prefixSum(prefix) {
        let currentNode = this.root;
        for (let i = 0; i < prefix.length; i++) {
            const char = prefix.charAt(i);
            let nextNode = currentNode.children.get(char);
            if (nextNode === undefined) {
                return 0;
            }
            if (i === prefix.length - 1) {
                return nextNode.sum;
            }
            currentNode = nextNode;
        }
        return this.root.sum;
    }
}

class MapSum {
    #prefixTrie;

    constructor() {
        this.#prefixTrie = new PrefixSumTrie();
    }
    /**
     * @param {string} key
     * @param {number} val
     * @return {void}
     */
    insert(key, val) {
        this.#prefixTrie.insert(key, val);
    }
    /**
     * @param {string} prefix
     * @return {number}
     */
    sum(prefix) {
        return this.#prefixTrie.prefixSum(prefix);
    }
}

/**
 * Your MapSum object will be instantiated and called as such:
 * var obj = new MapSum()
 * obj.insert(key,val)
 * var param_2 = obj.sum(prefix)
 */
// @lc code=end
