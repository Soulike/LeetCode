/*
 * @lc app=leetcode id=773 lang=javascript
 *
 * [773] Sliding Puzzle
 */

// @lc code=start
class QueueNode {
    val;
    next;

    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class MyQueue {
    fakeHead;
    tail;

    constructor() {
        this.fakeHead = new QueueNode(-1);
        this.tail = this.fakeHead;
    }

    isEmpty() {
        return this.fakeHead.next === null;
    }

    shift() {
        if (!this.isEmpty()) {
            const head = this.fakeHead.next;
            const next = head.next;
            this.fakeHead.next = next;
            if (next === null) {
                this.tail = this.fakeHead;
            }

            return head.val;
        } else {
            throw new RangeError();
        }
    }

    push(val) {
        const newNode = new QueueNode(val);
        this.tail.next = newNode;
        this.tail = newNode;
    }
}

/**
 * @param {number[][]} board
 * @return {number}
 */
var slidingPuzzle = function (board) {
    if (isMatch(board)) {
        return 0;
    }

    const queue = new MyQueue();
    queue.push([board, 0]);
    const visited = new Set();

    while (!queue.isEmpty()) {
        const [board, step] = queue.shift();
        visited.add(serializeBoard(board));

        const connectedBoards = getConnected(board);
        for (const connectedBoard of connectedBoards) {
            if (isMatch(connectedBoard)) {
                return step + 1;
            } else if (!visited.has(serializeBoard(connectedBoard))) {
                queue.push([connectedBoard, step + 1]);
            }
        }
    }
    return -1;
};

function getConnected(board) {
    const boards = [];
    OUT: for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] === 0) {
                if (i > 0) {
                    const boardCopy = copyBoard(board);
                    [boardCopy[i - 1][j], boardCopy[i][j]] = [
                        boardCopy[i][j],
                        boardCopy[i - 1][j],
                    ];
                    boards.push(boardCopy);
                }
                if (i < board.length - 1) {
                    const boardCopy = copyBoard(board);
                    [boardCopy[i + 1][j], boardCopy[i][j]] = [
                        boardCopy[i][j],
                        boardCopy[i + 1][j],
                    ];
                    boards.push(boardCopy);
                }
                if (j > 0) {
                    const boardCopy = copyBoard(board);
                    [boardCopy[i][j - 1], boardCopy[i][j]] = [
                        boardCopy[i][j],
                        boardCopy[i][j - 1],
                    ];
                    boards.push(boardCopy);
                }
                if (j < board[0].length - 1) {
                    const boardCopy = copyBoard(board);
                    [boardCopy[i][j + 1], boardCopy[i][j]] = [
                        boardCopy[i][j],
                        boardCopy[i][j + 1],
                    ];
                    boards.push(boardCopy);
                }
                break OUT;
            }
        }
    }
    return boards;
}

function copyBoard(board) {
    const newBoard = new Array(board.length);
    for (let i = 0; i < board.length; i++) {
        newBoard[i] = new Array(board[0].length);
    }

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            newBoard[i][j] = board[i][j];
        }
    }

    return newBoard;
}

function isMatch(board) {
    return serializeBoard(board) === '123450';
}

function serializeBoard(board) {
    const result = [];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            result.push(board[i][j]);
        }
    }
    return result.join('');
}
// @lc code=end

slidingPuzzle([
    [1, 2, 3],
    [5, 4, 0],
]);
