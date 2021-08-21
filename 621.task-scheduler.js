/*
 * @lc app=leetcode id=621 lang=javascript
 *
 * [621] Task Scheduler
 */

// @lc code=start
/**
 * @param {string[]} tasks
 * @param {number} n
 * @return {number}
 */
const leastInterval = function (tasks, n) 
{
    /**
     * 任务与其要被执行的次数
     * @type {Map<string, number>}
     */
    const taskToExecutionCount = new Map();
    let count = 0;
    for (const task of tasks)
    {
        count = taskToExecutionCount.get(task) ?? 0;
        taskToExecutionCount.set(task, count + 1);
    }
    const taskToCountEntries = Array.from(taskToExecutionCount.entries()).sort((a, b) => b[1] - a[1]);
    /** 最多的那种任务的执行次数 */
    const biggestExecutedCount = taskToCountEntries[0][1];
    /** 有多少种任务的执行次数都是最多的 */
    let tasksWithBiggestExecutedCountAmount = 1;

    for (let i = 1; i < taskToCountEntries.length; i++)
    {
        if (taskToCountEntries[i][1] === biggestExecutedCount)
        {
            tasksWithBiggestExecutedCountAmount++;
        }
        else
        {
            break;
        }
    }
    /** 除了个数最多的任务之外，剩余任务的数量 */
    const leftTasksAmount = tasks.length - tasksWithBiggestExecutedCountAmount * biggestExecutedCount;
    const slotsAmountPerGroup = n + 1;
    const idleSlotsAmount = (slotsAmountPerGroup - tasksWithBiggestExecutedCountAmount) * (biggestExecutedCount - 1);

    if (idleSlotsAmount >= leftTasksAmount)
    {
        return slotsAmountPerGroup * (biggestExecutedCount - 1) + tasksWithBiggestExecutedCountAmount;
    }
    else
    {
        return tasks.length;

    }
};
// @lc code=end