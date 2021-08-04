/*
 * @lc app=leetcode id=208 lang=javascript
 *
 * [208] Implement Trie (Prefix Tree)
 */

// @lc code=start

class TrieNode
{
    /**
     * @param {string} val
     */
    constructor(val)
    {
        /**
         * @type {string}
         */
        this.val = val;
        /**
         * @type {Map<string, TrieNode>}
         */
        this.children = new Map();
        /**
         * @type {boolean}
         */
        this.isEnd = false;
    }
}

/**
 * Initialize your data structure here.
 */
class Trie
{
    constructor()
    {
        /**@type {TrieNode} */
        this.root = new TrieNode('');
    }

    /**
    * Inserts a word into the trie. 
    * @param {string} word
    * @return {void}
    */
    insert(word)
    {
        let currentNode = this.root;
        for (let i = 0; i < word.length; i++)
        {
            const char = word.charAt(i);
            let nextNode = currentNode.children.get(char);
            if (nextNode === undefined)
            {
                nextNode = new TrieNode(char);
                currentNode.children.set(char, nextNode);
            }
            if (i === word.length - 1)
            {
                nextNode.isEnd = true;
            }
            currentNode = nextNode;
        }
    };

    /**
     * Returns if the word is in the trie. 
     * @param {string} word
     * @return {boolean}
     */
    search(word)
    {
        let currentNode = this.root;
        for (let i = 0; i < word.length; i++)
        {
            const char = word.charAt(i);
            let nextNode = currentNode.children.get(char);
            if (nextNode === undefined)
            {
                return false;
            }
            if (i === word.length - 1)
            {
                return nextNode.isEnd;
            }
            currentNode = nextNode;
        }
        return false;
    };

    /**
     * Returns if there is any word in the trie that starts with the given prefix. 
     * @param {string} prefix
     * @return {boolean}
     */
    startsWith(prefix)
    {
        let currentNode = this.root;
        for (let i = 0; i < prefix.length; i++)
        {
            const char = prefix.charAt(i);
            let nextNode = currentNode.children.get(char);
            if (nextNode === undefined)
            {
                return false;
            }
            if (i === prefix.length - 1)
            {
                return true;
            }
            currentNode = nextNode;
        }
        return false;
    };
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
// @lc code=end

