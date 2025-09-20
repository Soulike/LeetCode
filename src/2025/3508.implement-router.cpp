/*
 * @lc app=leetcode id=3508 lang=cpp
 *
 * [3508] Implement Router
 */

#include <format>
#include <optional>
#include <queue>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <vector>

// @lc code=start
template <typename T>
class CircularQueue {
 public:
  explicit CircularQueue(const size_t capacity) : capacity_(capacity) {}

  std::optional<T> PushBack(const T& element) {
    std::optional<T> removed_element;
    if (queue_.size() == capacity_) {
      removed_element = std::move(queue_.front());
      queue_.pop();
    }
    queue_.push(element);

    return removed_element;
  }

  void PopFront() { queue_.pop(); }

  T& Front() { return queue_.front(); }

  [[nodiscard]] size_t Size() const { return queue_.size(); }

  [[nodiscard]] bool Empty() const { return queue_.empty(); }

 private:
  const size_t capacity_;
  std::queue<T> queue_;
};

class Router {
  class Packet {
   public:
    using Key = std::string;

    int source;
    int destination;
    int timestamp;

    bool operator==(const Packet& other) const {
      return source == other.source && destination == other.destination &&
             timestamp == other.timestamp;
    }

    struct Hash {
      size_t operator()(const Packet& packet) const {
        return (static_cast<size_t>(packet.source) * 1315423911u) ^
               (static_cast<size_t>(packet.destination) * 2654435761u) ^
               (static_cast<size_t>(packet.timestamp) * 97531u);
      }
    };
  };

 public:
  explicit Router(const int memory_limit) : packet_queue_(memory_limit) {}

  bool addPacket(const int source, const int destination, const int timestamp) {
    const Packet new_packet(source, destination, timestamp);
    if (packet_in_queue_.contains(new_packet)) {
      return false;
    }

    packet_in_queue_.insert(new_packet);
    const std::optional<Packet> removed_packet =
        packet_queue_.PushBack(new_packet);
    if (removed_packet) {
      destination_to_timestamps_deleted_count[removed_packet.value()
                                                  .destination]++;
      packet_in_queue_.erase(removed_packet.value());
    }
    destination_to_timestamps[destination].push_back(timestamp);
    return true;
  }

  std::vector<int> forwardPacket() {
    if (packet_queue_.Empty()) {
      return {};
    }
    const Packet removed_packet = packet_queue_.Front();
    packet_queue_.PopFront();

    destination_to_timestamps_deleted_count[removed_packet.destination]++;
    packet_in_queue_.erase(removed_packet);
    return {removed_packet.source, removed_packet.destination,
            removed_packet.timestamp};
  }

  int getCount(const int destination,
               const int start_time,
               const int end_time) {
    if (!destination_to_timestamps.contains(destination)) {
      return 0;
    }
    const std::vector<int>& timestamps =
        destination_to_timestamps.at(destination);
    const size_t start_time_lower_bound = FindTimestampLowerBound(
        timestamps, destination_to_timestamps_deleted_count[destination],
        start_time);
    const size_t end_time_upper_bound = FindTimestampUpperBound(
        timestamps, destination_to_timestamps_deleted_count[destination],
        end_time);
    return end_time_upper_bound - start_time_lower_bound;
  }

 private:
  static size_t FindTimestampUpperBound(const std::vector<int>& timestamps,
                                        const size_t begin,
                                        const int timestamp) {
    size_t left = begin;
    size_t right = timestamps.size();

    while (left < right) {
      const size_t mid = (right - left) / 2 + left;
      if (timestamps[mid] <= timestamp) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    return left;
  }

  static size_t FindTimestampLowerBound(const std::vector<int>& timestamps,
                                        const size_t begin,
                                        const int timestamp) {
    size_t left = begin;
    size_t right = timestamps.size();

    while (left < right) {
      const size_t mid = (right - left) / 2 + left;
      if (timestamps[mid] < timestamp) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    return left;
  }

  std::unordered_set<Packet, Packet::Hash> packet_in_queue_;
  CircularQueue<Packet> packet_queue_;
  std::unordered_map<int, std::vector<int>> destination_to_timestamps;

  // Since it is FIFO, the removed packet must have the smallest time stamp. So
  // just mark the first elements in `destination_to_timestamps` as deleted.
  std::unordered_map<int, int> destination_to_timestamps_deleted_count;
};

/**
 * Your Router object will be instantiated and called as such:
 * Router* obj = new Router(memoryLimit);
 * bool param_1 = obj->addPacket(source,destination,timestamp);
 * vector<int> param_2 = obj->forwardPacket();
 * int param_3 = obj->getCount(destination,startTime,endTime);
 */
// @lc code=end

int main() {
  Router router(4);
  router.addPacket(4, 2, 1);
  router.addPacket(3, 2, 1);
  router.getCount(2, 1, 1);
}
