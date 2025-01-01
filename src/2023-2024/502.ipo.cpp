/*
 * @lc app=leetcode id=502 lang=cpp
 *
 * [502] IPO
 */
#include <algorithm>
#include <queue>
#include <vector>

// @lc code=start
class Project {
 private:
  int profit;
  int capital;

 public:
  Project(int profit, int capital) noexcept
      : profit(profit), capital(capital) {}
  int get_profit() const { return profit; }
  int get_capital() const { return capital; }
};

class Solution {
 public:
  int findMaximizedCapital(const int max_project_count,
                           const int initial_capital,
                           const std::vector<int>& project_profits,
                           const std::vector<int>& project_capitals) {
    const auto PROJECT_NUMBER = project_profits.size();

    std::vector<Project> projects;
    projects.reserve(PROJECT_NUMBER);
    for (int i = 0; i < PROJECT_NUMBER; i++) {
      projects.emplace_back(project_profits[i], project_capitals[i]);
    }
    std::sort(projects.begin(), projects.end(),
              [](const auto& p1, const auto& p2) {
                return p1.get_capital() < p2.get_capital();
              });

    const auto project_heap_comp = [](const auto& p1, const auto& p2) {
      return p1.get_profit() < p2.get_profit();
    };
    std::priority_queue<Project, std::vector<Project>,
                        decltype(project_heap_comp)>
        project_heap(project_heap_comp);

    int project_index = 0;
    int current_capital = initial_capital;

    for (int i = 0; i < max_project_count; i++) {
      while (project_index < PROJECT_NUMBER &&
             projects[project_index].get_capital() <= current_capital) {
        project_heap.push(projects[project_index]);
        project_index++;
      }
      if (project_heap.empty()) {
        break;
      }

      const auto project_with_max_capital = project_heap.top();
      project_heap.pop();
      current_capital += project_with_max_capital.get_profit();
    }

    return current_capital;
  }
};
// @lc code=end
