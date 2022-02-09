/*
 * @lc app=leetcode id=677 lang=javascript
 *
 * [677] Map Sum Pairs
 */

// @lc code=start
class MapNode
{
    letter;
    /** null 代表这不是一个完整的 key */
    value;
    letterToChildren;
    subValueSum;

    constructor(letter)
    {
        this.letter = letter;
        this.value = null;
        this.letterToChildren = new Map();
        this.subValueSum = 0;
    }

    addChild(letter, node)
    {
        this.letterToChildren.set(letter, node);
    }

    getChild(letter)
    {
        return this.letterToChildren.get(letter);
    }
}

class MapTree
{
    root;

    constructor()
    {
        this.root = new MapNode('');
    }

    addKey(key, value)
    {
        const path = [];
        let originValue = 0;

        let currentNode = this.root;
        for (let i = 0; i < key.length; i++)
        {
            const letter = key[i];
            const isEnd = i === key.length - 1;

            let child = currentNode.getChild(letter);
            if (child === undefined)
            {
                child = new MapNode(letter);
                currentNode.addChild(letter, child);
            }
            if (isEnd)
            {
                originValue = child.value ?? 0;
                child.value = value;
            }
            path.push(child);
            currentNode = child;
        }

        for (const node of path)
        {
            node.subValueSum = node.subValueSum - originValue + value;
        }
    }

    getPrefixValueSum(prefix)
    {
        let currentNode = this.root;

        for (let i = 0; i < prefix.length;i++)
        {
            const letter = prefix[i];
            const isEnd = i === prefix.length - 1;
            const child = currentNode.getChild(letter);
            if (child !== undefined)
            {
                if (!isEnd)
                {
                    currentNode = child;
                }
                else
                {
                    return child.subValueSum;
                }
            }
            else
            {
                return 0;
            }
        }
    }
}

class MapSum
{
    mapTree;

    constructor()
    {
        this.mapTree = new MapTree();
    }
    /**
     * @param {string} key
     * @param {number} val
     * @return {void}
     */
    insert(key, val)
    {
        this.mapTree.addKey(key, val);
    }
    /**
     * @param {string} prefix
     * @return {number}
     */
    sum(prefix)
    {
        return this.mapTree.getPrefixValueSum(prefix);
    }
}


/** 
 * Your MapSum object will be instantiated and called as such:
 * var obj = new MapSum()
 * obj.insert(key,val)
 * var param_2 = obj.sum(prefix)
 */
// @lc code=end

