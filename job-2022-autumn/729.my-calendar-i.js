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

        this.#arr.push([start, true], [end, false]);

        this.#arr.sort((a, b) => a[0] - b[0]);

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
}

/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(start,end)
 */
// @lc code=end
