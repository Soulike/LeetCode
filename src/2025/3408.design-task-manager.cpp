/*
 * @lc app=leetcode id=3408 lang=cpp
 *
 * [3408] Design Task Manager
 */

#include <queue>
#include <unordered_map>
#include <vector>

// @lc code=start
class TaskManager {
 private:
  using UserId = int;
  using TaskId = int;
  using Priority = int;

 public:
  explicit TaskManager(const std::vector<std::vector<int>>& tasks)
      : task_max_heap_(kTaskHeapComp) {
    for (const std::vector<int>& task : tasks) {
      const UserId user_id = task[0];
      const TaskId task_id = task[1];
      const Priority priority = task[2];
      add(user_id, task_id, priority);
    }
  }

  void add(const UserId userId, const TaskId taskId, const Priority priority) {
    task_max_heap_.emplace(userId, taskId, priority);
    task_id_to_task_info_[taskId].priority = priority;
    task_id_to_task_info_[taskId].user_id = userId;
  }

  void edit(const TaskId taskId, const Priority newPriority) {
    TaskInfo& task_info = task_id_to_task_info_.at(taskId);
    task_max_heap_.emplace(task_info.user_id, taskId, newPriority);
    task_info.priority = newPriority;
  }

  void rmv(const TaskId taskId) { task_id_to_task_info_.erase(taskId); }

  UserId execTop() {
    if (task_max_heap_.empty()) {
      return -1;
    }
    while (!task_max_heap_.empty() && !IsTaskValid(task_max_heap_.top())) {
      task_max_heap_.pop();
    }
    if (task_max_heap_.empty()) {
      return -1;
    }
    const Task top_task = task_max_heap_.top();
    task_max_heap_.pop();

    task_id_to_task_info_.erase(top_task.task_id);
    return top_task.user_id;
  }

 private:
  struct Task {
    UserId user_id;
    TaskId task_id;
    Priority priority;
  };

  struct TaskInfo {
    UserId user_id;
    Priority priority;
  };

  static constexpr Priority kInvalidPriority = -1;
  static constexpr UserId kInvalidUserId = -1;

  static constexpr auto kTaskHeapComp = [](const Task& task1,
                                           const Task& task2) {
    if (task1.priority != task2.priority) {
      return task1.priority < task2.priority;
    }
    return task1.task_id < task2.task_id;
  };

  bool IsTaskValid(const Task& task) const {
    if (!task_id_to_task_info_.contains(task.task_id)) {
      return false;
    }
    const auto& [user_id, priority] = task_id_to_task_info_.at(task.task_id);
    return priority == task.priority && user_id == task.user_id;
  }

  std::unordered_map<TaskId, TaskInfo> task_id_to_task_info_;
  std::priority_queue<Task, std::vector<Task>, decltype(kTaskHeapComp)>
      task_max_heap_;
};

/**
 * Your TaskManager object will be instantiated and called as such:
 * TaskManager* obj = new TaskManager(tasks);
 * obj->add(userId,taskId,priority);
 * obj->edit(taskId,newPriority);
 * obj->rmv(taskId);
 * int param_4 = obj->execTop();
 */
// @lc code=end
