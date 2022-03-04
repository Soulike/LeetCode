/*
 * @lc app=leetcode id=1284 lang=javascript
 *
 * [1284] Minimum Number of Flips to Convert Binary Matrix to Zero Matrix
 */

// @lc code=start
/**
 * @param {(0|1)[][]} mat
 * @return {number}
 */
var minFlips = function (mat)
{
    if (isMatrixAllZero(mat))
    {
        return 0;
    }

    const m = mat.length;
    const n = mat[0].length;

    const targetMatrix = new Array(m);
    for (let i = 0; i < m; i++)
    {
        targetMatrix[i] = new Array(n);
        targetMatrix[i].fill(0);
    }

    const forwardQueue = [[mat, 0]];
    const forwardMatrixToStep = new Map();

    const backwardQueue = [[targetMatrix, 0]];
    const backwardMatrixToStep = new Map();

    while (forwardQueue.length > 0 && backwardQueue.length > 0)
    {
        const [forwardMatrix, forwardStep] = forwardQueue.shift();
        forwardMatrixToStep.set(serializeMatrix(forwardMatrix), forwardStep);

        for (let i = 0; i < m; i++)
        {
            for (let j = 0; j < n; j++)
            {
                flipSelfAndNeighbors(forwardMatrix, i, j);
                
                if (!forwardMatrixToStep.has(serializeMatrix(forwardMatrix)))
                {
                    const clonedMatrix = cloneMatrix(forwardMatrix);
                    const serializedMatrix = serializeMatrix(clonedMatrix);
                    if (backwardMatrixToStep.has(serializedMatrix))
                    {
                        const backwardStep = backwardMatrixToStep.get(serializedMatrix);
                        return forwardStep + backwardStep + 1;
                    }

                    forwardQueue.push([clonedMatrix, forwardStep + 1]);
                }
                flipSelfAndNeighbors(forwardMatrix, i, j);
            }
        }

        const [backwardMatrix, backwardStep] = backwardQueue.shift();
        backwardMatrixToStep.set(serializeMatrix(backwardMatrix), backwardStep);

        for (let i = 0; i < m; i++)
        {
            for (let j = 0; j < n; j++)
            {
                flipSelfAndNeighbors(backwardMatrix, i, j);

                if (!backwardMatrixToStep.has(serializeMatrix(backwardMatrix)))
                {
                    const clonedMatrix = cloneMatrix(backwardMatrix);
                    const serializedMatrix = serializeMatrix(clonedMatrix);
                    if (forwardMatrixToStep.has(serializedMatrix))
                    {
                        const forwardStep = forwardMatrixToStep.get(serializedMatrix);
                        return forwardStep + backwardStep + 1;
                    }

                    backwardQueue.push([clonedMatrix, backwardStep + 1]);
                }
                flipSelfAndNeighbors(backwardMatrix, i, j);
            }
        }
    }

    return -1;
};

/**
 * @param {(0|1)[][]} matrix 
 * @param {number} i 
 * @param {number} j 
 * @returns {void}
 */
function flipSelfAndNeighbors(matrix, i, j)
{
    const m = matrix.length;
    const n = matrix[0].length;

    matrix[i][j] = (matrix[i][j] + 1) % 2;
    if (i >= 1)
    {
        matrix[i - 1][j] = (matrix[i - 1][j] + 1) % 2;
    }
    if (i <= m - 2)
    {
        matrix[i + 1][j] = (matrix[i + 1][j] + 1) % 2;
    }
    if (j >= 1)
    {
        matrix[i][j - 1] = (matrix[i][j - 1] + 1) % 2;
    }
    if (j <= n - 2)
    {
        matrix[i][j + 1] = (matrix[i][j + 1] + 1) % 2;
    }
}

/**
 * @param {(0|1)[][]} matrix 
 * @returns {(0|1)[][]}
 */
function cloneMatrix(matrix)
{
    const m = matrix.length;
    const n = matrix[0].length;

    const clonedMatrix = new Array(m);
    for (let i = 0; i < m; i++)
    {
        clonedMatrix[i] = new Array(n);
        for (let j = 0; j < n; j++)
        {
            clonedMatrix[i][j] = matrix[i][j];
        }
    }

    return clonedMatrix;
}

/**
 * @param {(0|1)[][]} matrix 
 * @returns {boolean}
 */
function isMatrixAllZero(matrix)
{
    const m = matrix.length;

    for (let i = 0; i < m; i++)
    {
        if (matrix[i].some(val => val !== 0))
        {
            return false;
        }
    }

    return true;
}

function serializeMatrix(matrix)
{
    const m = matrix.length;
    const n = matrix[0].length;

    const result = [];
    for (let i = 0; i < m; i++)
    {
        for (let j = 0; j < n; j++)
        {
            result.push(matrix[i][j]);
        }
    }

    return result.join('');
}
// @lc code=end