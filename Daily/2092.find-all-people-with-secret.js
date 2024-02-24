/*
 * @lc app=leetcode id=2092 lang=javascript
 *
 * [2092] Find All People With Secret
 */

// @lc code=start
class UnionFindSet_2092 {
    /** @type {number[]} */
    #parent;
    /** @type {number} */
    #count;

    /**
     * @param {number} size
     */
    constructor(size) {
        this.#parent = new Array(size);
        for (let i = 0; i < size; i++) {
            this.#parent[i] = i;
        }
        this.#count = size;
    }

    getCount() {
        return this.#count;
    }

    /**
     * @param {number} element1
     * @param {number} element2
     * @returns {void}
     */
    union(element1, element2) {
        const root1 = this.#find(element1);
        const root2 = this.#find(element2);
        if (root1 !== root2) {
            this.#count--;
        }
        this.#parent[root2] = root1;
    }

    /**
     * @param {number} element
     * @returns {number}
     */
    #find(element) {
        let currentElement = element;
        while (this.#parent[currentElement] !== currentElement) {
            currentElement = this.#parent[currentElement];
            this.#parent[currentElement] = this.#find(
                this.#parent[currentElement],
            );
        }
        return currentElement;
    }

    /**
     * @param {number} element1
     * @param {number} element2
     * @returns {boolean}
     */
    isConnected(element1, element2) {
        return this.#find(element1) === this.#find(element2);
    }

    /**
     * @param {number} element
     */
    reset(element) {
        this.#parent[element] = element;
    }
}

/**
 * @param {number} n
 * @param {number[][]} meetings
 * @param {number} firstPerson
 * @return {number[]}
 */
var findAllPeople = function (n, meetings, firstPerson) {
    const unionFindSet = new UnionFindSet_2092(n);
    unionFindSet.union(0, firstPerson);
    meetings.sort((a, b) => a[2] - b[2]);

    let currentTime = meetings[0][2];
    /** @type {Set<number>} */
    let currentTimePeople = new Set();
    for (const [person1, person2, time] of meetings) {
        if (time !== currentTime) {
            for (const people of currentTimePeople) {
                if (!unionFindSet.isConnected(people, 0)) {
                    // We only keep the set of known people to avoid union unknown people in previous meetings
                    // For example: 4, [[0,1,1],[2,3,1],[1,2,2]], 1
                    unionFindSet.reset(people);
                }
            }
            currentTime = time;
            currentTimePeople.clear();
        }
        unionFindSet.union(person1, person2);
        currentTimePeople.add(person1);
        currentTimePeople.add(person2);
    }

    /** @type {number[]} */
    const result = [];

    for (let i = 0; i < n; i++) {
        if (unionFindSet.isConnected(0, i)) result.push(i);
    }

    return result;
};
// @lc code=end

findAllPeople(
    4,
    [
        [3, 1, 3],
        [1, 2, 2],
        [0, 3, 3],
    ],
    3,
);

/*
     [0,1,2,3]
     */
