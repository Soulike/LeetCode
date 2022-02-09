/*
 * @lc app=leetcode id=648 lang=javascript
 *
 * [648] Replace Words
 */

// @lc code=start
class TrieNode
{
    letter;
    isEnd;
    letterToChildren;

    constructor(letter, isEnd)
    {
        this.letter = letter;
        this.isEnd = isEnd;
        this.letterToChildren = new Map();
    }

    getChildByLetter(letter)
    {
        return this.letterToChildren.get(letter);
    }

    addChild(letter, childNode)
    {
        this.letterToChildren.set(letter, childNode);
    }
}

class Trie
{
    root;

    constructor()
    {
        this.root = new TrieNode('', false);
    }

    addWord(word)
    {
        let currentNode = this.root;
        for (let i = 0; i < word.length; i++)
        {
            const letter = word[i];
            const isEnd = i === word.length - 1;
            let childNode = currentNode.getChildByLetter(letter);
            if (childNode === undefined)
            {
                childNode = new TrieNode(letter, isEnd);
                currentNode.addChild(letter, childNode);
            }
            else
            {
                childNode.isEnd = childNode.isEnd || isEnd;
            }
            currentNode = childNode;
        }
    }

    /**
     * @returns {string|null} - 匹配返回前缀，不匹配返回 null
     */
    matchPrefix(word)
    {
        let currentNode = this.root;
        for (let i = 0; i < word.length; i++)
        {
            const letter = word[i];
            let childNode = currentNode.getChildByLetter(letter);
            if (childNode === undefined)
            {
                return null;
            }
            else if (childNode.isEnd)
            {
                return word.slice(0, i + 1);
            }
            currentNode = childNode;
        }
        return null;
    }
}

/**
 * @param {string[]} dictionary
 * @param {string} sentence
 * @return {string}
 */
var replaceWords = function (dictionary, sentence)
{
    const trie = new Trie();
    for (const word of dictionary)
    {
        trie.addWord(word);
    }

    const wordsInSentence = sentence.split(' ');

    for (let i = 0; i < wordsInSentence.length;i++)
    {
        const word = wordsInSentence[i];

        const prefix = trie.matchPrefix(word);
        if (prefix !== null)
        {
            wordsInSentence[i] = prefix;
        }
    }

    return wordsInSentence.join(' ');
};
// @lc code=end