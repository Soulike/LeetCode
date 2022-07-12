/*
 * @lc app=leetcode id=79 lang=javascript
 *
 * [79] Word Search
 */

// @lc code=start
/**
 * @param {string[][]} board
 * @param {string} word
 * @return {boolean}
 */
const exist = function (board, word) {
    const ROW_AMOUNT = board.length;
    const COL_AMOUNT = board[0].length;
    const VISITED_MATRIX_LENGTH = ROW_AMOUNT * COL_AMOUNT;
    /**@type {boolean[]} */
    const visitedMatrix = new Array(VISITED_MATRIX_LENGTH);
    for (let i = 0; i < VISITED_MATRIX_LENGTH; i++) {
        visitedMatrix[i] = false;
    }
    const FIRST_CHAR = word.charAt(0);
    for (let x = 0; x < ROW_AMOUNT; x++) {
        for (let y = 0; y < COL_AMOUNT; y++) {
            if (
                board[x][y] === FIRST_CHAR &&
                helper(
                    board,
                    word,
                    0,
                    visitedMatrix,
                    x,
                    y,
                    ROW_AMOUNT,
                    COL_AMOUNT,
                )
            ) {
                return true;
            }
        }
    }
    return false;
};

/**
 * @param {string[][]} board
 * @param {string} word
 * @param {number} wordIndex 当前要看的字符在 word 中的位置
 * @param {boolean[]} visitedMatrix 访问标记
 * @param {number} currentX 当前要看的字符在 board 中的 x
 * @param {number} currentY 当前要看的字符在 board 中的 y
 * @param {number} ROW_AMOUNT board 的行数
 * @param {number} COL_AMOUNT board 的列数
 * @return {boolean}
 */
function helper(
    board,
    word,
    wordIndex,
    visitedMatrix,
    currentX,
    currentY,
    ROW_AMOUNT,
    COL_AMOUNT,
) {
    const CURRENT_CHAR = word.charAt(wordIndex);
    if (CURRENT_CHAR !== board[currentX][currentY]) {
        return false;
    }
    const VISITED_MATRIX_INDEX = currentX * COL_AMOUNT + currentY;
    if (visitedMatrix[VISITED_MATRIX_INDEX]) {
        return false;
    }
    if (
        wordIndex === word.length - 1 &&
        CURRENT_CHAR === board[currentX][currentY]
    ) {
        return true;
    }
    const nextWordIndex = wordIndex + 1;
    visitedMatrix[VISITED_MATRIX_INDEX] = true;
    if (currentX > 0) {
        // up
        if (
            helper(
                board,
                word,
                nextWordIndex,
                visitedMatrix,
                currentX - 1,
                currentY,
                ROW_AMOUNT,
                COL_AMOUNT,
            )
        ) {
            return true;
        }
    }
    if (currentX < ROW_AMOUNT - 1) {
        // down
        if (
            helper(
                board,
                word,
                nextWordIndex,
                visitedMatrix,
                currentX + 1,
                currentY,
                ROW_AMOUNT,
                COL_AMOUNT,
            )
        ) {
            return true;
        }
    }
    if (currentY > 0) {
        // left
        if (
            helper(
                board,
                word,
                nextWordIndex,
                visitedMatrix,
                currentX,
                currentY - 1,
                ROW_AMOUNT,
                COL_AMOUNT,
            )
        ) {
            return true;
        }
    }
    if (currentY < COL_AMOUNT - 1) {
        // right
        if (
            helper(
                board,
                word,
                nextWordIndex,
                visitedMatrix,
                currentX,
                currentY + 1,
                ROW_AMOUNT,
                COL_AMOUNT,
            )
        ) {
            return true;
        }
    }
    visitedMatrix[VISITED_MATRIX_INDEX] = false;
    return false;
}
// @lc code=end
