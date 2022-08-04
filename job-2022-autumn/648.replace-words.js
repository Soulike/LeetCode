/*
 * @lc app=leetcode id=648 lang=javascript
 *
 * [648] Replace Words
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
     * @return {string | null}
     */
    getPrefix(word) {
        let currentNode = this.#root;
        /** @type {string[]} */
        const prefixArr = [];

        for (let i = 0; i < word.length; i++) {
            if (currentNode.isEnd) {
                return prefixArr.join('');
            }
            const letter = word[i];
            if (!currentNode.hasChild(letter)) {
                return null;
            }
            prefixArr.push(letter);
            currentNode = currentNode.getChild(letter);
        }

        return word;
    }
}

/**
 * @param {string[]} dictionary
 * @param {string} sentence
 * @return {string}
 */
var replaceWords = function (dictionary, sentence) {
    const trie = new Trie();
    for (const word of dictionary) {
        trie.insert(word);
    }

    const replacedSentence = [];

    for (const word of sentence.split(' ')) {
        const prefix = trie.getPrefix(word);
        replacedSentence.push(prefix ?? word);
    }

    return replacedSentence.join(' ');
};
// @lc code=end
