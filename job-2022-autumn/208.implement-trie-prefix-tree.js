/*
 * @lc app=leetcode id=208 lang=javascript
 *
 * [208] Implement Trie (Prefix Tree)
 */

// @lc code=start

class TrieNode {
    /** @type {string} */
    letter;
    /** @type {boolean} */
    isEnd;
    /** @type {Map<string, TrieNode>} */
    #children;

    /**
     * @param {string} letter
     */
    constructor(letter) {
        this.letter = letter;
        this.isEnd = false;
        this.#children = new Map();
    }

    /**
     * @param {string} letter
     * @returns {boolean}
     */
    hasChild(letter) {
        return this.#children.has(letter);
    }

    /**
     * @param {string} letter
     * @returns {TrieNode|undefined}
     */
    getChild(letter) {
        return this.#children.get(letter);
    }

    /**
     * @param {string} letter
     * @returns {void}
     */
    addChild(letter) {
        this.#children.set(letter, new TrieNode(letter));
    }
}

class Trie {
    #root;

    constructor() {
        this.#root = new TrieNode('');
    }
    /**
     * @param {string} word
     * @return {void}
     */
    insert(word) {
        let currentNode = this.#root;
        for (let i = 0; i < word.length - 1; i++) {
            const letter = word[i];
            if (!currentNode.hasChild(letter)) {
                currentNode.addChild(letter);
            }
            currentNode = currentNode.getChild(letter);
        }

        const lastLetter = word[word.length - 1];
        if (!currentNode.hasChild(lastLetter)) {
            currentNode.addChild(lastLetter);
        }
        currentNode.getChild(lastLetter).isEnd = true;
    }
    /**
     * @param {string} word
     * @return {boolean}
     */
    search(word) {
        let currentNode = this.#root;

        for (let i = 0; i < word.length - 1; i++) {
            const letter = word[i];
            if (!currentNode.hasChild(letter)) {
                return false;
            }
            currentNode = currentNode.getChild(letter);
        }

        const letter = word[word.length - 1];
        if (!currentNode.hasChild(letter)) {
            return false;
        }
        return currentNode.getChild(letter).isEnd;
    }
    /**
     * @param {string} prefix
     * @return {boolean}
     */
    startsWith(prefix) {
        let currentNode = this.#root;

        for (let i = 0; i < prefix.length; i++) {
            const letter = prefix[i];
            if (!currentNode.hasChild(letter)) {
                return false;
            }
            currentNode = currentNode.getChild(letter);
        }

        return true;
    }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
// @lc code=end
