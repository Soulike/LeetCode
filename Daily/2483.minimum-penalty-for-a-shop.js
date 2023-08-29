/*
 * @lc app=leetcode id=2483 lang=javascript
 *
 * [2483] Minimum Penalty for a Shop
 */

// @lc code=start
/**
 * @param {string} customers
 * @return {number}
 */
var bestClosingTime = function (customers) {
    const CUSTOMERS = 'Y';
    const NO_CUSTOMERS = 'N';

    /** @type {number[]} */
    const customersHoursBeforeHour = [];
    /** @type {number[]} */
    const noCustomerHoursBeforeHour = [];

    if (customers[0] === CUSTOMERS) {
        customersHoursBeforeHour[0] = 1;
        noCustomerHoursBeforeHour[0] = 0;
    } else if (customers[0] === NO_CUSTOMERS) {
        customersHoursBeforeHour[0] = 0;
        noCustomerHoursBeforeHour[0] = 1;
    }

    for (let i = 1; i < customers.length; i++) {
        if (customers[i] === CUSTOMERS) {
            customersHoursBeforeHour[i] = customersHoursBeforeHour[i - 1] + 1;
            noCustomerHoursBeforeHour[i] = noCustomerHoursBeforeHour[i - 1];
        } else if (customers[i] === NO_CUSTOMERS) {
            customersHoursBeforeHour[i] = customersHoursBeforeHour[i - 1];
            noCustomerHoursBeforeHour[i] = noCustomerHoursBeforeHour[i - 1] + 1;
        }
    }

    customersHoursBeforeHour[customers.length] =
        customersHoursBeforeHour[customers.length - 1];
    noCustomerHoursBeforeHour[customers.length] =
        noCustomerHoursBeforeHour[customers.length - 1];

    let minPenalty = Infinity;
    let minPenaltyHour = -1;

    for (let i = 0; i <= customers.length; i++) {
        const penalty = getPenaltyAtHour(
            i,
            customersHoursBeforeHour,
            noCustomerHoursBeforeHour,
        );
        if (penalty < minPenalty) {
            minPenalty = penalty;
            minPenaltyHour = i;
        }
    }

    return minPenaltyHour;
};

/**
 * @param {number} hour
 * @param {number[]} customersHoursBeforeHour
 * @param {number[]} noCustomerHoursBeforeHour
 * @returns {number}
 */
function getPenaltyAtHour(
    hour,
    customersHoursBeforeHour,
    noCustomerHoursBeforeHour,
) {
    const customersHoursBeforeTheHour =
        hour === 0 ? 0 : customersHoursBeforeHour[hour - 1];
    const customersHoursAfterTheHour =
        customersHoursBeforeHour[customersHoursBeforeHour.length - 1] -
        customersHoursBeforeTheHour;

    const noCustomerHoursBeforeTheHour =
        hour === 0 ? 0 : noCustomerHoursBeforeHour[hour - 1];

    return noCustomerHoursBeforeTheHour + customersHoursAfterTheHour;
}
// @lc code=end

bestClosingTime('NNNN');
