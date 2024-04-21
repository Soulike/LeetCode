/*
 * @lc app=leetcode id=307 lang=javascript
 *
 * [307] Range Sum Query - Mutable
 */

// @lc code=start
class RangeTreeNode {
  /** @type {RangeTreeNode|null} */
  left;
  /** @type {RangeTreeNode|null} */
  right;
  /** @type {number} */
  val;

  /**
   * @param {number} val
   */
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class RangeTree {
  /** @type {number} */
  #length;
  /** @type {RangeTreeNode | null} */
  #root;
  /** @type {(a:number,b:number) => number} */
  #merge;

  /**
   * @param {number[]} nums
   * @param {(a:number, b:number) => number} merge
   */
  constructor(nums, merge) {
    this.#merge = merge;
    this.#root = this.#buildTree(nums, 0, nums.length - 1);
    this.#length = nums.length;
  }

  /**
   * @param {number[]} nums
   * @param {number} start
   * @param {number} end
   * @returns {RangeTreeNode | null}
   */
  #buildTree(nums, start, end) {
    if (start > end) {
      return null;
    }

    if (start === end) {
      return new RangeTreeNode(nums[start]);
    }

    // [start, mid] [mid+1, end]
    const mid = start + Math.floor((end - start) / 2);

    const leftChild = this.#buildTree(nums, start, mid);
    const rightChild = this.#buildTree(nums, mid + 1, end);

    let mergedVal = 0;

    if (leftChild === null || rightChild === null) {
      // it's impossible for both children to be null
      // @ts-ignore
      mergedVal = leftChild?.val ?? rightChild.val;
    } else {
      mergedVal = this.#merge(leftChild.val, rightChild.val);
    }

    const root = new RangeTreeNode(mergedVal);
    root.left = leftChild;
    root.right = rightChild;

    return root;
  }

  /**
   * @param {number} index
   * @param {number} val
   * @returns {void}
   */
  update(index, val) {
    // @ts-ignore
    this.#updateHelper(this.#root, index, val, 0, this.#length - 1);
  }

  /**
   * @param {RangeTreeNode} node
   * @param {number} index
   * @param {number} val
   * @param {number} start
   * @param {number} end
   * @returns {void}
   */
  #updateHelper(node, index, val, start, end) {
    if (start === end) {
      // start === index
      node.val = val;
      return;
    }

    const mid = start + Math.floor((end - start) / 2);

    if (index <= mid) {
      // @ts-ignore
      this.#updateHelper(node.left, index, val, start, mid);
    } // index > mid
    else {
      // @ts-ignore
      this.#updateHelper(node.right, index, val, mid + 1, end);
    }

    // both sides must be existent
    // @ts-ignore
    node.val = this.#merge(node.left.val, node.right.val);
  }

  /**
   * @param {number} start
   * @param {number} end
   * @returns {number}
   */
  query(start, end) {
    // @ts-ignore
    return this.#queryHelper(this.#root, 0, this.#length - 1, start, end);
  }

  /**
   * @param {RangeTreeNode} node
   * @param {number} start
   * @param {number} end
   * @param {number} queryStart
   * @param {number} queryEnd
   * @returns {number}
   */
  #queryHelper(node, start, end, queryStart, queryEnd) {
    // [queryStart, queryEnd] is ensured to be inside [start, end]

    if (queryStart === start && queryEnd === end) {
      return node.val;
    }
    const mid = start + Math.floor((end - start) / 2);

    // left part
    if (queryEnd <= mid) {
      return this.#queryHelper(
        // @ts-ignore
        node.left,
        start,
        mid,
        queryStart,
        queryEnd,
      );
    }
    // right part
    else if (queryStart > mid) {
      return this.#queryHelper(
        // @ts-ignore
        node.right,
        mid + 1,
        end,
        queryStart,
        queryEnd,
      );
    }
    // across two parts
    else {
      return this.#merge(
        // @ts-ignore
        this.#queryHelper(node.left, start, mid, queryStart, mid),
        // @ts-ignore
        this.#queryHelper(node.right, mid + 1, end, mid + 1, queryEnd),
      );
    }
  }
}

// @ts-ignore
class NumArray {
  /** @type {RangeTree} */
  #rangeTree;
  /**
   * @param {number[]} nums
   */
  constructor(nums) {
    this.#rangeTree = new RangeTree(nums, (a, b) => a + b);
  }
  /**
   * @param {number} index
   * @param {number} val
   * @return {void}
   */
  update(index, val) {
    this.#rangeTree.update(index, val);
  }
  /**
   * @param {number} left
   * @param {number} right
   * @return {number}
   */
  sumRange(left, right) {
    return this.#rangeTree.query(left, right);
  }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * obj.update(index,val)
 * var param_2 = obj.sumRange(left,right)
 */
// @lc code=end
