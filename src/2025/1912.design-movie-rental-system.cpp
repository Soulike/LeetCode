/*
 * @lc app=leetcode id=1912 lang=cpp
 *
 * [1912] Design Movie Rental System
 */

#include <set>
#include <unordered_map>
#include <vector>

// @lc code=start
class MovieRentingSystem {
  using Movie = int;
  using Shop = int;
  using Price = int;

  struct MovieCopy {
    Movie movie;
    Shop shop;
    Price price;

    MovieCopy(const Movie movie, const Shop shop, const Price price)
        : movie(movie), shop(shop), price(price) {}

    // 自定义比较运算符：先按价格，再按商店，最后按电影ID
    bool operator<(const MovieCopy& other) const {
      if (price != other.price) {
        return price < other.price;
      }
      if (shop != other.shop) {
        return shop < other.shop;
      }
      return movie < other.movie;
    }

    bool operator==(const MovieCopy& other) const {
      return movie == other.movie && shop == other.shop && price == other.price;
    }
  };

 public:
  MovieRentingSystem(const int n,
                     const std::vector<std::vector<int>>& entries) {
    shop_movie_to_price_.reserve(n);

    for (const auto& entry : entries) {
      const Shop shop = entry[0];
      const Movie movie = entry[1];
      const Price price = entry[2];

      // 存储价格查找表
      shop_movie_to_price_[shop][movie] = price;

      // 添加到未租借列表
      movie_to_unrented_copies_[movie].emplace(movie, shop, price);
    }
  }

  std::vector<Shop> search(const int movie) {
    std::vector<Shop> result;

    if (!movie_to_unrented_copies_.contains(movie)) {
      return result;
    }

    const auto& copies = movie_to_unrented_copies_.at(movie);
    for (const auto& copy : copies) {
      result.push_back(copy.shop);
      if (result.size() == 5) {
        break;
      }
    }

    return result;
  }

  void rent(const Shop shop, const Movie movie) {
    const Price price = shop_movie_to_price_.at(shop).at(movie);
    MovieCopy copy(movie, shop, price);

    // 从未租借列表移除
    movie_to_unrented_copies_.at(movie).erase(copy);

    // 添加到已租借列表
    rented_copies_.insert(copy);
  }

  void drop(const Shop shop, const Movie movie) {
    const Price price = shop_movie_to_price_.at(shop).at(movie);
    MovieCopy copy(movie, shop, price);

    // 从已租借列表移除
    rented_copies_.erase(copy);

    // 添加到未租借列表
    movie_to_unrented_copies_[movie].insert(copy);
  }

  [[nodiscard]] std::vector<std::vector<int>> report() const {
    std::vector<std::vector<int>> result;

    for (const auto& copy : rented_copies_) {
      result.push_back({copy.shop, copy.movie});
      if (result.size() == 5) {
        break;
      }
    }

    return result;
  }

 private:
  // 快速价格查找：(shop, movie) -> price
  std::unordered_map<Shop, std::unordered_map<Movie, Price>>
      shop_movie_to_price_;

  // 未租借的电影副本，按电影分组并自动排序
  std::unordered_map<Movie, std::set<MovieCopy>> movie_to_unrented_copies_;

  // 所有已租借的电影副本，自动排序
  std::set<MovieCopy> rented_copies_;
};

/**
 * Your MovieRentingSystem object will be instantiated and called as such:
 * MovieRentingSystem* obj = new MovieRentingSystem(n, entries);
 * vector<int> param_1 = obj->search(movie);
 * obj->rent(shop,movie);
 * obj->drop(shop,movie);
 * vector<vector<int>> param_4 = obj->report();
 */
// @lc code=end
