/*
 * @lc app=leetcode id=621 lang=cpp
 *
 * [621] Task Scheduler
 */
#include <algorithm>
#include <map>
#include <vector>

using std::map;
using std::vector;

// @lc code=start
bool comparator(int a, int b) {
  return b < a;
}

class Solution {
 public:
  int leastInterval(vector<char>& tasks, int n) {
    const int TASK_COUNT = tasks.size();

    vector<int> taskFrequency(26, 0);
    int maxTaskFrequency = 0;
    for (char task : tasks) {
      taskFrequency[task - 'A']++;
      maxTaskFrequency = std::max(maxTaskFrequency, taskFrequency[task - 'A']);
    }

    int taskWithMaxFrequencyCount = 0;
    for (auto& frequency : taskFrequency) {
      if (frequency == maxTaskFrequency) {
        taskWithMaxFrequencyCount++;
      }
    }

    return std::max(TASK_COUNT, (maxTaskFrequency - 1) * (n + 1) +
                                    taskWithMaxFrequencyCount);
  }
};
// @lc code=end

int main() {
  Solution sol;
  vector<char> tasks = {'A', 'A', 'A', 'B', 'B', 'B'};
  sol.leastInterval(tasks, 2);
}