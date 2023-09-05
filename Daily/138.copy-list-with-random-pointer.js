/*
 * @lc app=leetcode id=138 lang=javascript
 *
 * [138] Copy List with Random Pointer
 */
function Node(val, next, random) {
    this.val = val;
    this.next = next;
    this.random = random;
}

// @lc code=start
/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function (head) {
    /** @type {Map<Node, Node>} */
    const nodeToCopy = new Map();

    /**
     * @param {Node} node
     * @returns {Node}
     */
    const getNodeCopy = (node) => {
        if (node === null) return null;
        if (nodeToCopy.has(node)) return nodeToCopy.get(node);

        const {val, next, random} = node;

        const nodeCopy = new Node(val, null, null);
        nodeToCopy.set(node, nodeCopy);

        const nextCopy = getNodeCopy(next);
        const randomCopy = getNodeCopy(random);

        nodeCopy.next = nextCopy;
        nodeCopy.random = randomCopy;

        return nodeCopy;
    };

    const headCopy = getNodeCopy(head);
    return headCopy;
};
// @lc code=end
