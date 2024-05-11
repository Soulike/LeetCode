/*
 * @lc app=leetcode id=857 lang=cpp
 *
 * [857] Minimum Cost to Hire K Workers
 */

#include <algorithm>
#include <cmath>
#include <limits>
#include <queue>
#include <vector>

using std::priority_queue;
using std::vector;

// @lc code=start
struct Worker {
 private:
  int quality;
  int wage;
  double wageToQualityRatio;

 public:
  Worker(int quality, int wage)
      : quality(quality),
        wage(wage),
        wageToQualityRatio(static_cast<double>(wage) / quality) {}
  auto getQuality() const { return quality; }
  auto getWage() const { return wage; }
  auto getWageToQualityRatio() const { return wageToQualityRatio; }
};

class Solution {
 public:
  double mincostToHireWorkers(vector<int>& quality, vector<int>& wage, int K) {
    vector<Worker> workers;
    for (int i = 0; i < quality.size(); i++) {
      workers.push_back(Worker(quality[i], wage[i]));
    }
    const auto comparator = [](const Worker& a, const Worker& b) {
      return a.getWageToQualityRatio() < b.getWageToQualityRatio();
    };
    // We want the ratio as low as possible
    std::sort(workers.begin(), workers.end(), comparator);

    double minCost = std::numeric_limits<double>::max();
    double qualitySum = 0;
    priority_queue<int> qualityHeap;
    for (const auto& worker : workers) {
      qualitySum += worker.getQuality();
      qualityHeap.push(worker.getQuality());
      if (qualityHeap.size() > K) {
        // Remove the worker with the highest quality
        // to reduce cost at maximum
        qualitySum -= qualityHeap.top();
        qualityHeap.pop();
      }
      if (qualityHeap.size() == K) {
        minCost =
            std::min(minCost, qualitySum * worker.getWageToQualityRatio());
      }
    }
    return minCost;
  }
};
// @lc code=end
