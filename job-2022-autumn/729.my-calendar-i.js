/*
 * @lc app=leetcode id=729 lang=javascript
 *
 * [729] My Calendar I
 */

// @lc code=start

class MyCalendar {
    /** @type {[value: number, type: boolean][]} */
    #arr;

    constructor() {
        this.#arr = [];
    }
    /**
     * @param {number} start
     * @param {number} end
     * @return {boolean}
     */
    book(start, end) {
        end--;

        const startUpperBoundIndex = this.#getUpperBoundIndex(start);
        if (startUpperBoundIndex !== -1) {
            const startUpperBoundType = this.#arr[startUpperBoundIndex][1];
            if (startUpperBoundType === true) {
                if (end >= this.#arr[startUpperBoundIndex][0]) {
                    return false;
                }
            } else {
                return false;
            }
        }

        const endLowerBoundIndex = this.#getLowerBoundIndex(end);

        if (endLowerBoundIndex !== -1) {
            const endUpperBoundType = this.#arr[endLowerBoundIndex][1];
            if (endUpperBoundType === true) {
                return false;
            } else {
                if (start <= this.#arr[endLowerBoundIndex][0]) {
                    return false;
                }
            }
        }

        this.#insert(start, true);
        this.#insert(end, false);

        return true;
    }

    /**
     * @param {number} target
     * @returns {number} - -1 if not exist
     */
    #getUpperBoundIndex(target) {
        if (this.#arr.length === 0) {
            return -1;
        }
        if (target > this.#arr[this.#arr.length - 1][0]) {
            return -1;
        }
        if (target < this.#arr[0][0]) {
            return 0;
        }

        let left = 0;
        let right = this.#arr.length - 1;

        while (left <= right) {
            const mid = left + Math.floor((right - left) / 2);

            if (this.#arr[mid][0] > target) {
                if (this.#arr[mid - 1][0] < target) {
                    return mid;
                } else {
                    right = mid - 1;
                }
            } else if (this.#arr[mid][0] < target) {
                left = mid + 1;
            } else {
                return mid;
            }
        }

        return -1;
    }

    /**
     * @param {number} target
     * @returns {number}
     */
    #getLowerBoundIndex(target) {
        if (this.#arr.length === 0) {
            return -1;
        }
        if (target < this.#arr[0][0]) {
            return -1;
        }
        if (target > this.#arr[this.#arr.length - 1][0]) {
            return this.#arr.length - 1;
        }

        let left = 0;
        let right = this.#arr.length - 1;

        while (left <= right) {
            const mid = left + Math.floor((right - left) / 2);

            if (this.#arr[mid][0] > target) {
                right = mid - 1;
            } else if (this.#arr[mid][0] < target) {
                if (this.#arr[mid + 1][0] > target) {
                    return mid;
                } else {
                    left = mid + 1;
                }
            } else {
                return mid;
            }
        }

        return -1;
    }

    /**
     * @param {number} value
     * @param {boolean} type
     */
    #insert(value, type) {
        if (this.#arr.length === 0 || this.#arr[0][0] > value) {
            this.#arr.unshift([value, type]);
            return;
        }

        this.#arr.push([value, type]);
        for (let i = this.#arr.length - 2; i >= 0; i--) {
            if (this.#arr[i][0] > value) {
                this.#arr[i + 1] = this.#arr[i];
            } else {
                this.#arr[i + 1] = [value, type];
                break;
            }
        }
    }
}

/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(start,end)
 */
// @lc code=end

// ["MyCalendar","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book"]\n[[],[99,100],[45,57],[79,94],[53,72],[88,99],[70,82],[51,69],[84,97],[80,98],[26,44],[73,87],[92,100],[56,74],[50,67],[71,85],[26,41],[96,100],[78,91],[50,61],[27,41],[56,66],[70,80],[82,92],[64,80],[57,76],[13,27],[39,57],[87,100],[92,100],[9,22],[99,100],[31,47],[93,100],[52,65],[53,67],[8,19],[14,26],[42,52],[93,100],[86,100]]
