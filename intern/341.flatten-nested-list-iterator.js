/*
 * @lc app=leetcode id=341 lang=javascript
 *
 * [341] Flatten Nested List Iterator
 */

// @lc code=start
/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * function NestedInteger() {
 *
 *     Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     @return {boolean}
 *     this.isInteger = function() {
 *         ...
 *     };
 *
 *     Return the single integer that this NestedInteger holds, if it holds a single integer
 *     Return null if this NestedInteger holds a nested list
 *     @return {integer}
 *     this.getInteger = function() {
 *         ...
 *     };
 *
 *     Return the nested list that this NestedInteger holds, if it holds a nested list
 *     Return null if this NestedInteger holds a single integer
 *     @return {NestedInteger[]}
 *     this.getList = function() {
 *         ...
 *     };
 * };
 */
class NestedIterator {
    nestedList;
    /**
     * @constructor
     * @param {NestedInteger[]} nestedList
     */
    constructor(nestedList) {
        this.nestedList = Array.from(nestedList);
    }

    /**
     * @this NestedIterator
     * @returns {boolean}
     */
    hasNext() {
        if (this.nestedList.length === 0) {
            return false;
        }

        while (!this.nestedList[0].isInteger()) {
            const list = this.nestedList.shift();
            this.nestedList.unshift(...list.getList());
            if (this.nestedList.length === 0) {
                return false;
            }
        }
        return true;
    }

    /**
     * @this NestedIterator
     * @returns {integer}
     */
    next() {
        return this.nestedList.shift().getInteger();
    }
}

/**
 * Your NestedIterator will be called like this:
 * var i = new NestedIterator(nestedList), a = [];
 * while (i.hasNext()) a.push(i.next());
 */
// @lc code=end
