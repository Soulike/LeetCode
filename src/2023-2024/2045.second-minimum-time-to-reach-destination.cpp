/*
 * @lc app=leetcode id=2045 lang=cpp
 *
 * [2045] Second Minimum Time to Reach Destination
 */
#include <queue>
#include <unordered_map>
#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 private:
  struct QueuedNode {
    const int index;
    const int totalTime;

    QueuedNode(int index, int totalTime) : index(index), totalTime(totalTime) {}
  };

 public:
  int secondMinimum(int n,
                    const std::vector<std::vector<int>>& edges,
                    int time,
                    int change) {
    std::unordered_map<int, std::vector<int>> nodeToNeighbors;
    for (const auto& edge : edges) {
      const int node1 = edge[0];
      const int node2 = edge[1];
      nodeToNeighbors[node1].push_back(node2);
      nodeToNeighbors[node2].push_back(node1);
    }

    std::vector<int> firstTimeVisitedNodeToTimes(n + 1, -1);
    std::vector<int> secondTimeVisitedNodeToTimes(n + 1, -1);

    std::queue<QueuedNode> bfsQueue;
    bfsQueue.emplace(1, 0);

    while (!bfsQueue.empty()) {
      const QueuedNode queuedNode = bfsQueue.front();
      bfsQueue.pop();
      const int node = queuedNode.index;
      const int totalTime = queuedNode.totalTime;

      const std::vector<int>& neighbors = nodeToNeighbors[node];
      for (const auto neighbor : neighbors) {
        int nextTotalTime = totalTime + time;  // total time if we leave now
        const int changeSequenceNumber = totalTime / change;
        // Odd sequence number, edge is now in red.
        // We can not leave now
        // Wait for signal change
        if (changeSequenceNumber % 2) {
          nextTotalTime = (changeSequenceNumber + 1) * change + time;
        }

        if (firstTimeVisitedNodeToTimes[neighbor] == -1) {
          firstTimeVisitedNodeToTimes[neighbor] = nextTotalTime;
          bfsQueue.emplace(neighbor, nextTotalTime);
        } else if (secondTimeVisitedNodeToTimes[neighbor] == -1 &&
                   // When we reach a node for the second time,
                   // We expect its time to be different
                   // to get the second minimum.
                   nextTotalTime != firstTimeVisitedNodeToTimes[neighbor]) {
          if (neighbor == n) {
            return nextTotalTime;
          }
          secondTimeVisitedNodeToTimes[neighbor] = nextTotalTime;
          bfsQueue.emplace(neighbor, nextTotalTime);
        }
      }
    }

    return 0;
  }
};
// @lc code=end

int main() {
  std::vector<std::vector<int>> edges = {
      {1, 2}, {1, 3}, {1, 4}, {3, 4}, {4, 5}};
  Solution sol;
  sol.secondMinimum(5, edges, 3, 5);
}
