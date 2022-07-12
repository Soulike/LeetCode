/*
 * @lc app=leetcode id=211 lang=javascript
 *
 * [211] Design Add and Search Words Data Structure
 */

// @lc code=start
class TrieNode {
    val;
    isTerminate;
    children;
    /**
     * @param {string} val
     */
    constructor(val) {
        this.val = val;
        this.isTerminate = false;
        this.children = new Map();
    }
}

class WordDictionary {
    root;

    constructor() {
        this.root = new TrieNode('');
    }

    /**
     * @param {string} word
     * @return {void}
     */
    addWord(word) {
        let currentNode = this.root;
        for (const letter of word) {
            const currentNodeChildren = currentNode.children;
            if (currentNodeChildren.has(letter)) {
                currentNode = currentNodeChildren.get(letter);
            } else {
                const newNode = new TrieNode(letter);
                currentNodeChildren.set(letter, newNode);
                currentNode = newNode;
            }
        }

        currentNode.isTerminate = true;
    }

    /**
     * @param {string} word
     * @return {boolean}
     */
    search(word) {
        function helper(word, start, root) {
            const letter = word[start];
            const {children} = root;
            if (children.size === 0) {
                return false;
            }

            if (letter === '.') {
                if (start < word.length - 1) {
                    for (const [_, childNode] of children) {
                        if (helper(word, start + 1, childNode)) {
                            return true;
                        }
                    }
                    return false;
                } else if (start === word.length - 1) {
                    for (const [_, childNode] of children) {
                        if (childNode.isTerminate) {
                            return true;
                        }
                    }
                    return false;
                }
            } else {
                if (children.has(word[start])) {
                    const childNode = children.get(word[start]);
                    if (start < word.length - 1) {
                        return helper(word, start + 1, childNode);
                    } else if (start === word.length - 1) {
                        return childNode.isTerminate;
                    }
                } else {
                    return false;
                }
            }
        }

        return helper(word, 0, this.root);
    }
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
// @lc code=end
