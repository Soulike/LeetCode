/*
 * @lc app=leetcode id=307 lang=javascript
 *
 * [307] Range Sum Query - Mutable
 */

// @lc code=start
class SegmentTreeNode
{
    /** @type {number} */
    value;
    /** @type {SegmentTreeNode|null} */
    leftChild;
    /** @type {SegmentTreeNode|null} */
    rightChild;

    /** @type {number} */
    constructor(value)
    {
        this.value = value;
        this.leftChild = null;
        this.rightChild = null;
    }
}

class SegmentTree
{
    /** @type {number[]} */
    values;
    /** @type {SegmentTreeNode} */
    root;

    /**
     * @param {number[]} values
     */
    constructor(values)
    {
        this.values = values;
        this.root = this.#build(0, values.length - 1);
    }

    /**
     * @param {number} leftIndex 
     * @param {number} rightIndex 
     * @returns {SegmentTreeNode}
     */
    #build(leftIndex, rightIndex)
    {
        if (leftIndex === rightIndex)
        {
            return new SegmentTreeNode(this.values[leftIndex]);
        }

        const mid = leftIndex + Math.floor((rightIndex - leftIndex) / 2);

        const leftChild = this.#build(leftIndex, mid);
        const rightChild = this.#build(mid + 1, rightIndex);
        const value = leftChild.value + rightChild.value;

        const root = new SegmentTreeNode(value);
        root.leftChild = leftChild;
        root.rightChild = rightChild;
        return root;
    }

    /**
     * @param {number} leftIndex 
     * @param {number} rightIndex 
     * @returns {number}
     */
    query(leftIndex, rightIndex)
    {
        return this.#queryHelper(leftIndex, rightIndex, this.root, 0, this.values.length - 1);
    }

    /**
     * @param {number} leftIndex 
     * @param {number} rightIndex 
     * @param {SegmentTreeNode} currentNode
     * @param {number} currentNodeLeftIndex 
     * @param {number} currentNodeRightIndex 
     * @returns {number}
     */
    #queryHelper(leftIndex, rightIndex,
        currentNode, currentNodeLeftIndex, currentNodeRightIndex)
    {
        if (leftIndex === currentNodeLeftIndex
            && rightIndex === currentNodeRightIndex)
        {
            return currentNode.value;
        }

        const currentNodeMidIndex = currentNodeLeftIndex + Math.floor((currentNodeRightIndex - currentNodeLeftIndex) / 2);

        // 在左半边
        if (rightIndex <= currentNodeMidIndex)
        {
            return this.#queryHelper(leftIndex, rightIndex, currentNode.leftChild, currentNodeLeftIndex, currentNodeMidIndex);
        }

        // 在右半边
        if (leftIndex > currentNodeMidIndex)
        {
            return this.#queryHelper(leftIndex, rightIndex, currentNode.rightChild, currentNodeMidIndex + 1, currentNodeRightIndex);
        }

        // 横跨两半边
        if (leftIndex <= currentNodeMidIndex
            && rightIndex > currentNodeMidIndex)
        {
            return this.#queryHelper(leftIndex, currentNodeMidIndex, currentNode.leftChild, currentNodeLeftIndex, currentNodeMidIndex)
                + this.#queryHelper(currentNodeMidIndex + 1, rightIndex, currentNode.rightChild, currentNodeMidIndex + 1, currentNodeRightIndex);
        }
    }

    /**
     * 
     * @param {number} index 
     * @param {number} value 
     */
    set(index, value)
    {
        this.#setHelper(index, value, this.root, 0, this.values.length - 1);
    }

    /**
     * 
     * @param {number} index 
     * @param {number} value 
     * @param {SegmentTreeNode} currentNode
     * @param {number} currentNodeLeftIndex 
     * @param {number} currentNodeRightIndex 
     */
    #setHelper(index, value,
        currentNode, currentNodeLeftIndex, currentNodeRightIndex)
    {
        const originalValue = this.values[index];
        if (currentNodeLeftIndex === currentNodeRightIndex)
        {
            currentNode.value = value;
            this.values[index] = value;
        }
        else
        {
            const currentNodeMidIndex = currentNodeLeftIndex + Math.floor((currentNodeRightIndex - currentNodeLeftIndex) / 2);
            if (index <= currentNodeMidIndex)
            {
                this.#setHelper(index, value, currentNode.leftChild, currentNodeLeftIndex, currentNodeMidIndex);
            }
            else
            {
                this.#setHelper(index, value, currentNode.rightChild, currentNodeMidIndex + 1, currentNodeRightIndex);
            }
            currentNode.value = currentNode.value - originalValue + value;
        }
    }
}

class NumArray
{
    /** @type {SegmentTree} */
    segmentTree;

    /**
     * @param {number[]} nums
     */
    constructor(nums)
    {
        this.segmentTree = new SegmentTree(nums);
    }

    /**
     * @param {number} index
     * @param {number} val
     * @return {void}
     */
    update(index, val)
    {
        this.segmentTree.set(index, val);
    }

    /**
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    sumRange(left, right)
    {
        return this.segmentTree.query(left, right);
    }
}



/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * obj.update(index,val)
 * var param_2 = obj.sumRange(left,right)
 */
// @lc code=end

const numArray = new NumArray([9, -8]);

numArray.update(0, 3);
console.log(numArray.sumRange(1, 1));
console.log(numArray.sumRange(0, 1));
numArray.update(1, -3);
console.log(numArray.sumRange(0, 1));