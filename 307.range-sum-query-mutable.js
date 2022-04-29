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

    /** @param {number} value */
    constructor(value)
    {
        this.value = value;
        this.leftChild = null;
        this.rightChild = null;
    }
}

class SegmentTree
{
    /** @type {SegmentTreeNode} */
    #root;
    /** @type {number} */
    #size;

    /**
     * @param {number[]} values
     */
    constructor(values)
    {
        this.#root = this.#build(values, 0, values.length - 1);
        this.#size = values.length;
    }

    /**
     * @param {number} leftIndex 
     * @param {number} rightIndex 
     * @returns {number}
     */
    query(leftIndex, rightIndex)
    {
        return this.#queryHelper(leftIndex, rightIndex, this.#root, 0, this.#size - 1);
    }

    /**
     * 
     * @param {number} index 
     * @param {number} value 
     */
    set(index, value)
    {
        this.#setHelper(index, value, this.#root, 0, this.#size - 1);
    }

    /**
     * 构造 values 在 [leftIndex, rightIndex] 区间内的线段树，并返回根节点
     * @param {number[]} values;
     * @param {number} leftIndex 
     * @param {number} rightIndex 
     * @returns {SegmentTreeNode}
     */
    #build(values, leftIndex, rightIndex)
    {
        if (leftIndex === rightIndex)
        {
            return new SegmentTreeNode(values[leftIndex]);
        }

        const midIndex = leftIndex + Math.floor((rightIndex - leftIndex) / 2);

        // 左子树包含 [leftIndex, midIndex]，右子树包含 [midIndex+1, rightIndex]
        const leftChild = this.#build(values, leftIndex, midIndex);
        const rightChild = this.#build(values, midIndex + 1, rightIndex);

        const value = this.#merge(leftChild.value, rightChild.value);

        const root = new SegmentTreeNode(value);
        root.leftChild = leftChild;
        root.rightChild = rightChild;
        return root;
    }

    /**
     * 决定父结点的值如何由子结点得到
     * @param {number} leftChildValue 
     * @param {number} rightChildValue 
     * @returns {number}
     */
    #merge(leftChildValue, rightChildValue)
    {
        return leftChildValue + rightChildValue;
    }

    /**
     * @param {number} leftIndex - 要查找的区间左边界
     * @param {number} rightIndex - 要查找的区间右边界
     * @param {SegmentTreeNode} currentNode - 要查找的区间所在结点
     * @param {number} currentNodeLeftIndex - 区间所在结点包含区间的左边界
     * @param {number} currentNodeRightIndex - 区间所在结点包含区间的右边界
     * @returns {number}
     */
    #queryHelper(leftIndex, rightIndex,
        currentNode, currentNodeLeftIndex, currentNodeRightIndex)
    {
        if (currentNodeLeftIndex > leftIndex
            || currentNodeRightIndex < rightIndex)
        {
            throw new RangeError();
        }

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
     * @param {SegmentTreeNode} currentNode - `index` 所在区间所在结点
     * @param {number} currentNodeLeftIndex - `index` 所在区间所在结点的左边界
     * @param {number} currentNodeRightIndex - `index` 所在区间所在结点的右边界
     * @returns {number} - 设置之前的原始值
     */
    #setHelper(index, value,
        currentNode, currentNodeLeftIndex, currentNodeRightIndex)
    {
        let originalValue;
        if (currentNodeLeftIndex === currentNodeRightIndex)
        {
            originalValue = currentNode.value;
            currentNode.value = value;
        }
        else
        {
            const currentNodeMidIndex = currentNodeLeftIndex + Math.floor((currentNodeRightIndex - currentNodeLeftIndex) / 2);

            if (index <= currentNodeMidIndex)   // 在左子结点
            {
                originalValue = this.#setHelper(index, value, currentNode.leftChild, currentNodeLeftIndex, currentNodeMidIndex);
            }
            else    // 在右子结点
            {
                originalValue = this.#setHelper(index, value, currentNode.rightChild, currentNodeMidIndex + 1, currentNodeRightIndex);
            }
            // 计算当前结点的新值，根据需要替换
            currentNode.value = this.#merge(currentNode.leftChild.value, currentNode.rightChild.value);
        }
        return originalValue;
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