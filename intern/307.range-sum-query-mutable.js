/*
 * @lc app=leetcode id=307 lang=javascript
 *
 * [307] Range Sum Query - Mutable
 */

// @lc code=start

class SegmentTree {
    #container;
    #numsLength;

    /**
     * @param {number[]} nums
     */
    constructor(nums) {
        const k = nums.length;
        const size = 2 ** (Math.ceil(Math.log2(k)) + 1) - 1;
        this.#container = new Array(size);
        this.#numsLength = k;

        this.#build(nums, 0, nums.length - 1, 0);
    }

    /**
     * `#container[rootIndex]` 当中的数字代表原数组 `[rootStartIndex, rootEndIndex]` 区间 merge 后的结果
     * @param {number[]} nums
     * @param {number} rootStartIndex
     * @param {number} rootEndIndex
     * @param {number} rootIndex
     */
    #build(nums, rootStartIndex, rootEndIndex, rootIndex) {
        if (rootStartIndex === rootEndIndex) {
            this.#container[rootIndex] = nums[rootStartIndex];
        } else {
            const leftChildIndex = 2 * rootIndex + 1;
            const rightChildIndex = 2 * rootIndex + 2;

            const midIndex =
                rootStartIndex +
                Math.floor((rootEndIndex - rootStartIndex) / 2);

            // 递归构造左右结点
            this.#build(nums, rootStartIndex, midIndex, leftChildIndex);
            this.#build(nums, midIndex + 1, rootEndIndex, rightChildIndex);

            // 构造当前结点
            this.#container[rootIndex] = this.#merge(
                this.#container[leftChildIndex],
                this.#container[rightChildIndex],
            );
        }
    }

    /**
     *
     * @param {number} index
     * @param {number} val
     */
    set(index, val) {
        this.#setHelper(index, val, 0, this.#numsLength - 1, 0);
    }

    /**
     * @param {number} index - 要修改的 nums 上的下标
     * @param {number} val
     * @param {number} rootStartIndex - root 结点代表的 nums 上的区间起点
     * @param {number} rootEndIndex - root 结点代表的 nums 上的区间终点
     * @param {number} rootIndex - root 结点在 container 上的下标
     */
    #setHelper(index, val, rootStartIndex, rootEndIndex, rootIndex) {
        if (rootStartIndex === rootEndIndex) {
            this.#container[rootIndex] = val;
        } else {
            const leftChildIndex = 2 * rootIndex + 1;
            const rightChildIndex = 2 * rootIndex + 2;

            const midIndex =
                rootStartIndex +
                Math.floor((rootEndIndex - rootStartIndex) / 2);

            // 被修改的下标在左半边
            if (index <= midIndex) {
                this.#setHelper(
                    index,
                    val,
                    rootStartIndex,
                    midIndex,
                    leftChildIndex,
                );
            }
            // 被修改的下标在右半边
            else {
                this.#setHelper(
                    index,
                    val,
                    midIndex + 1,
                    rootEndIndex,
                    rightChildIndex,
                );
            }

            // 更新当前结点值
            this.#container[rootIndex] = this.#merge(
                this.#container[leftChildIndex],
                this.#container[rightChildIndex],
            );
        }
    }

    /**
     * @param {number} startIndex - 要查询的在 nums 上的区间起点
     * @param {number} endIndex - 要查询的在 nums 上的区间终点
     */
    query(startIndex, endIndex) {
        return this.#queryHelper(
            0,
            this.#numsLength - 1,
            0,
            startIndex,
            endIndex,
        );
    }

    /**
     * @param {number} rootStartIndex - root 结点代表的 nums 上的区间起点
     * @param {number} rootEndIndex - root 结点代表的 nums 上的区间终点
     * @param {number} rootContainerIndex - root 结点在 container 上的下标
     * @param {number} queryStartIndex - 要查询的在 nums 上的区间起点
     * @param {number} queryEndIndex - 要查询的在 nums 上的区间终点
     * @returns {number}
     */
    #queryHelper(
        rootStartIndex,
        rootEndIndex,
        rootContainerIndex,
        queryStartIndex,
        queryEndIndex,
    ) {
        // 区间对应，当前 root 就是要找的结点
        if (
            rootStartIndex === queryStartIndex &&
            rootEndIndex === queryEndIndex
        ) {
            return this.#container[rootContainerIndex];
        } else {
            const leftChildIndex = 2 * rootContainerIndex + 1;
            const rightChildIndex = 2 * rootContainerIndex + 2;

            const midIndex =
                rootStartIndex +
                Math.floor((rootEndIndex - rootStartIndex) / 2);

            // 在左半个区间
            if (queryEndIndex <= midIndex) {
                return this.#queryHelper(
                    rootStartIndex,
                    midIndex,
                    leftChildIndex,
                    queryStartIndex,
                    queryEndIndex,
                );
            }
            // 在右半个区间
            else if (queryStartIndex > midIndex) {
                return this.#queryHelper(
                    midIndex + 1,
                    rootEndIndex,
                    rightChildIndex,
                    queryStartIndex,
                    queryEndIndex,
                );
            }
            // 横跨两个区间
            else {
                return this.#merge(
                    this.#queryHelper(
                        rootStartIndex,
                        midIndex,
                        leftChildIndex,
                        queryStartIndex,
                        midIndex,
                    ),
                    this.#queryHelper(
                        midIndex + 1,
                        rootEndIndex,
                        rightChildIndex,
                        midIndex + 1,
                        queryEndIndex,
                    ),
                );
            }
        }
    }

    /**
     * @param {number} a
     * @param {number} b
     * @returns {number}
     */
    #merge(a, b) {
        return a + b;
    }
}

class NumArray {
    /** @type {SegmentTree} */
    segmentTree;

    /**
     * @param {number[]} nums
     */
    constructor(nums) {
        this.segmentTree = new SegmentTree(nums);
    }

    /**
     * @param {number} index
     * @param {number} val
     * @return {void}
     */
    update(index, val) {
        this.segmentTree.set(index, val);
    }

    /**
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    sumRange(left, right) {
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

const numArray = new NumArray([1, 3, 5]);

console.log(numArray.sumRange(0, 2));
numArray.update(1, 2);
console.log(numArray.sumRange(0, 2));
