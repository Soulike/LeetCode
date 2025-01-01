/*
 * @lc app=leetcode id=208 lang=javascript
 *
 * [208] Implement Trie (Prefix Tree)
 */

// @lc code=start
class TrieNode {
  /** @type {string} */
  char;
  /** @type {Map<string, TreeNode>} */
  charToChildren;
  /** @type {boolean} */
  isEnd;

  /**
   * @param {string} char
   */
  constructor(char) {
    this.char = char;
    this.charToChildren = new Map();
    this.isEnd = false;
  }
}

class Trie {
  /** @type {TrieNode} */
  #root;

  constructor() {
    this.#root = new TrieNode('');
  }

  /**
   * @param {string} word
   * @return {void}
   */
  insert(word) {
    let node = this.#root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (node.charToChildren.has(char)) {
        node = node.charToChildren.get(char);
      } else {
        const newNode = new TrieNode(char);
        node.charToChildren.set(char, newNode);
        node = newNode;
      }
    }
    node.isEnd = true;
  }

  /**
   * @param {string} word
   * @return {boolean}
   */
  search(word) {
    let node = this.#root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (node.charToChildren.has(char)) {
        node = node.charToChildren.get(char);
      } else {
        return false;
      }
    }
    return node.isEnd;
  }

  /**
   * @param {string} prefix
   * @return {boolean}
   */
  startsWith(prefix) {
    let node = this.#root;
    for (let i = 0; i < prefix.length; i++) {
      const char = prefix[i];
      if (node.charToChildren.has(char)) {
        node = node.charToChildren.get(char);
      } else {
        return false;
      }
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
