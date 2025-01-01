/*
 * @lc app=leetcode id=552 lang=cpp
 *
 * [552] Student Attendance Record II
 */

#include <algorithm>
#include <cmath>
#include <iostream>
#include <vector>

using std::vector;

// @lc code=start
class Solution {
 public:
  int checkRecord(int n) {
    memo = vector<vector<vector<int>>>(
        n + 1, vector<vector<int>>(2, vector<int>(3, INVALID_MEMO)));

    int result = getPossibleAttendanceRecordCount(n, 0, 0);
    return result;
  }

 private:
  const int INVALID_MEMO = -1;
  const int MOD = std::pow(10, 9) + 7;
  vector<vector<vector<int>>> memo;

  int getPossibleAttendanceRecordCount(int n,
                                       int absentTime,
                                       int consecutiveLateTime) {
    if (absentTime >= 2 || consecutiveLateTime >= 3) {
      return 0;
    }
    if (n == 0) {
      return 1;
    }

    if (memo[n][absentTime][consecutiveLateTime] != INVALID_MEMO) {
      return memo[n][absentTime][consecutiveLateTime];
    }

    int ifAbsent = getPossibleAttendanceRecordCount(n - 1, absentTime + 1, 0);
    int ifLate = getPossibleAttendanceRecordCount(n - 1, absentTime,
                                                  consecutiveLateTime + 1);
    int ifPresent = getPossibleAttendanceRecordCount(n - 1, absentTime, 0);

    int result = ((ifAbsent + ifLate) % MOD + ifPresent) % MOD;

    memo[n][absentTime][consecutiveLateTime] = result;

    return result;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.checkRecord(10101);
}