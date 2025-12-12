/*
 * @lc app=leetcode id=3433 lang=cpp
 *
 * [3433] Count Mentions Per User
 */

#include <algorithm>
#include <sstream>
#include <string>
#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> countMentions(
      const int numberOfUsers,
      std::vector<std::vector<std::string>>& events) {
    std::ranges::sort(events, [](const auto& event1, const auto& event2) {
      const int timestamp1 = std::stoi(event1[1]);
      const int timestamp2 = std::stoi(event2[1]);
      if (timestamp1 != timestamp2) {
        return std::stoi(event1[1]) < std::stoi(event2[1]);
      }
      // Handle Offline events first.
      if (event1[0] == event2[0]) {
        return false;
      }
      return event1[0] == "OFFLINE";
    });

    std::vector<int> mentions_count_of_user(numberOfUsers, 0);
    UserStateManager user_state_manager(numberOfUsers);
    for (const std::vector<std::string>& raw_event : events) {
      const auto [type, timestamp, mention_string] =
          ParseEvent(raw_event, user_state_manager);
      user_state_manager.AdvanceToTimestamp(timestamp);

      const std::vector<int> mentions =
          ParseMentionString(mention_string, user_state_manager);

      if (type == EventType::kMessage) {
        for (const int user : mentions) {
          mentions_count_of_user[user]++;
        }
      } else if (type == EventType::kOffline) {
        const int offline_user = mentions[0];
        user_state_manager.SetUserOfflineInNextTimestamp(offline_user);
      } else {
        std::abort();
      }
    }

    return mentions_count_of_user;
  }

 private:
  class UserStateManager {
   public:
    enum class UserState {
      kOnline,
      kOffline,
    };

    explicit UserStateManager(const int user_count)
        : user_count_(user_count),
          current_timestamp_(0),
          offline_until_timestamp_(user_count) {}

    void AdvanceToTimestamp(const int timestamp) {
      if (timestamp < current_timestamp_) {
        std::abort();
      }
      std::unordered_set<int> back_online_users;
      for (const int user : offline_users_) {
        if (timestamp >= offline_until_timestamp_[user]) {
          back_online_users.insert(user);
        }
      }

      for (const int user : back_online_users) {
        offline_users_.erase(user);
      }

      current_timestamp_ = timestamp;
    }

    void SetUserOfflineInNextTimestamp(const int user) {
      offline_users_.insert(user);
      offline_until_timestamp_[user] = current_timestamp_ + 60;
    }

    [[nodiscard]] bool IsUserNowOffline(const int user) const {
      return offline_users_.contains(user);
    }

    [[nodiscard]] std::vector<int> GetAllNowOnlineUsers() const {
      std::vector<int> online_users;
      for (int user = 0; user < user_count_; user++) {
        if (!IsUserNowOffline(user)) {
          online_users.push_back(user);
        }
      }

      return online_users;
    }

    const std::vector<int>& GetAllUsers() const {
      if (!all_users_) {
        all_users_ = std::vector<int>();
        for (int user = 0; user < user_count_; user++) {
          all_users_->push_back(user);
        }
      }
      return all_users_.value();
    }

   private:
    int user_count_;
    int current_timestamp_;
    std::unordered_set<int> offline_users_;
    std::vector<int> offline_until_timestamp_;

    mutable std::optional<std::vector<int>> all_users_;
  };

  enum class EventType {
    kMessage,
    kOffline,
  };

  struct Event {
    EventType type;
    int timestamp;
    std::string mention_string;
  };

  static std::vector<int> ParseMentionString(
      const std::string& mention_string,
      const UserStateManager& user_state_manager) {
    if (mention_string == "ALL") {
      return user_state_manager.GetAllUsers();
    } else if (mention_string == "HERE") {
      return user_state_manager.GetAllNowOnlineUsers();
    } else if (mention_string[0] != 'i') {
      return {std::stoi(mention_string)};
    } else {
      return ParseIdMentionString(mention_string);
    }
  }

  static std::vector<int> ParseIdMentionString(
      const std::string& mention_string) {
    std::vector<int> result;
    std::istringstream iss(mention_string);
    std::string token;

    while (iss >> token) {
      int num = std::stoi(token.substr(2));
      result.push_back(num);
    }

    return result;
  }

  static Event ParseEvent(const std::vector<std::string>& raw_event,
                          const UserStateManager& user_state_manager) {
    const std::string& raw_event_type = raw_event[0];
    const std::string& raw_timestamp = raw_event[1];
    const std::string& mention_string = raw_event[2];

    const EventType event_type =
        raw_event_type == "MESSAGE" ? EventType::kMessage : EventType::kOffline;
    const int timestamp = std::stoi(raw_timestamp);

    return {event_type, timestamp, mention_string};
  }
};
// @lc code=end

int main() {
  Solution sol;
  std::vector<std::vector<std::string>> events = {{"MESSAGE", "2", "HERE"},
                                                  {"OFFLINE", "2", "1"},
                                                  {"OFFLINE", "1", "0"},
                                                  {"MESSAGE", "61", "HERE"}};
  sol.countMentions(3, events);
}