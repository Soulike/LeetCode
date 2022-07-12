/*
 * @lc app=leetcode id=1138 lang=javascript
 *
 * [1138] Alphabet Board Path
 */

// @lc code=start
/**
 * @param {string} target
 * @return {string}
 */
const alphabetBoardPath = function (target) {
    /**@type {('U'|'D'|'L'|'R'|'!')[]} */
    const path = [];
    const letters = ['a', ...target.split('')];
    for (let i = 1; i < letters.length; i++) {
        const fromLetter = letters[i - 1];
        const toLetter = letters[i];
        if (fromLetter !== 'z' && toLetter !== 'z') {
            const {x: fromX, y: fromY} = calculateLetterPosition(fromLetter);
            const {x: toX, y: toY} = calculateLetterPosition(toLetter);
            const {right, down} = calculateMove(fromX, fromY, toX, toY);
            const encodedMove = encodeMove(right, down);
            path.push(...encodedMove, '!');
        } else if (fromLetter === 'z' && toLetter === 'z') {
            path.push('!');
        } else if (fromLetter === 'z') {
            const {x: fromX, y: fromY} = calculateLetterPosition('u');
            const {x: toX, y: toY} = calculateLetterPosition(toLetter);
            const {right, down} = calculateMove(fromX, fromY, toX, toY);
            const encodedMove = encodeMove(right, down);
            path.push('U', ...encodedMove, '!');
        } // toLetter === 'z'
        else {
            const {x: fromX, y: fromY} = calculateLetterPosition(fromLetter);
            const {x: toX, y: toY} = calculateLetterPosition('u');
            const {right, down} = calculateMove(fromX, fromY, toX, toY);
            const encodedMove = encodeMove(right, down);
            path.push(...encodedMove, 'D', '!');
        }
    }
    return path.join('');
};

/**
 *
 * @param {number} fromX
 * @param {number} fromY
 * @param {number} toX
 * @param {number} toY
 * @returns {{right: number, down: number}}
 */
function calculateMove(fromX, fromY, toX, toY) {
    const right = toY - fromY;
    const down = toX - fromX;
    return {right, down};
}

/**
 *
 * @param {number} right
 * @param {number} down
 * @returns {('U'|'D'|'L'|'R')[]}
 */
function encodeMove(right, down) {
    /**
     * @type {('U'|'D'|'L'|'R')[]}
     */
    const result = [];

    if (down < 0) {
        for (let i = 0; i < -down; i++) {
            result.push('U');
        }
    } else {
        for (let i = 0; i < down; i++) {
            result.push('D');
        }
    }

    if (right < 0) {
        for (let i = 0; i < -right; i++) {
            result.push('L');
        }
    } else {
        for (let i = 0; i < right; i++) {
            result.push('R');
        }
    }

    return result;
}

/** @type {Map<string, {x: number, y: number}>} */
const letterPositionCache = new Map();
/**
 *
 * @param {string} letter
 * @returns {{x: number, y: number}}
 */
function calculateLetterPosition(letter) {
    const cache = letterPositionCache.get(letter);
    if (cache !== undefined) {
        return cache;
    }
    const charCodeStart = 'a'.charCodeAt(0);
    const charCode = letter.charCodeAt(0) - charCodeStart;
    const x = Math.floor(charCode / 5);
    const y = charCode - x * 5;
    const result = {x, y};
    letterPositionCache.set(letter, result);
    return result;
}
// @lc code=end
