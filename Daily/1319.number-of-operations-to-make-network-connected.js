/*
 * @lc app=leetcode id=1319 lang=javascript
 *
 * [1319] Number of Operations to Make Network Connected
 */

// @lc code=start
/** @template T */
class UnionFindSetNode_1319 {
    /** @type {T} */
    value;
    /** @type {UnionFindSetNode_1319<T>} */
    parent;

    /**
     * @param {T} value
     */
    constructor(value) {
        this.value = value;
        this.parent = this;
    }
}

/** @template T */
class UnionFindSet_1319 {
    /** @type {Map<T, UnionFindSetNode_1319<T>>} */
    #valueToNode;
    /** @type {number} */
    #setNumber;

    /**
     * @param {T[]} initSetValues
     */
    constructor(initSetValues) {
        this.#valueToNode = new Map();
        this.#setNumber = initSetValues.length;
        for (const value of initSetValues) {
            const node = new UnionFindSetNode_1319(value);
            this.#valueToNode.set(value, node);
        }
    }

    /**
     * @param {T} value1
     * @param {T} value2
     * @returns {void}
     */
    union(value1, value2) {
        const value1SetNode = this.#findSetNode(value1);
        const value2SetNode = this.#findSetNode(value2);

        if (value1SetNode !== value2SetNode) {
            this.#setNumber--;
            value2SetNode.parent = value1SetNode;
        }
    }

    /**
     * @param {T} value
     * @returns {T}
     */
    find(value) {
        const setNode = this.#findSetNode(value);
        return setNode.value;
    }

    /**
     * @param {T} value
     * @returns {UnionFindSetNode_1319<T>}
     */
    #findSetNode(value) {
        let currentNode = this.#valueToNode.get(value);
        if (currentNode === undefined) throw new Error();

        while (currentNode.parent !== currentNode) {
            currentNode.parent = currentNode.parent.parent;

            currentNode = currentNode.parent;
        }

        return currentNode;
    }

    /**
     * @param {T} value1
     * @param {T} value2
     * @returns {boolean}
     */
    inOneSet(value1, value2) {
        return this.#findSetNode(value1) === this.#findSetNode(value2);
    }

    getSetNumber() {
        return this.#setNumber;
    }
}

/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var makeConnected = function (n, connections) {
    /** @type {number[]} */
    const initSetValues = [];
    for (let i = 0; i < n; i++) {
        initSetValues.push(i);
    }

    const unionFindSet = new UnionFindSet_1319(initSetValues);
    let spareCableNumber = 0;

    for (const [a, b] of connections) {
        if (!unionFindSet.inOneSet(a, b)) {
            unionFindSet.union(a, b);
        } else {
            spareCableNumber++;
        }
    }

    const cableNumberNeeded = unionFindSet.getSetNumber() - 1;
    return cableNumberNeeded <= spareCableNumber ? cableNumberNeeded : -1;
};
// @lc code=end
