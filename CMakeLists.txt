cmake_minimum_required(VERSION 3.13)
project(LeetCode)
set(CMAKE_CXX_STANDARD 23)

# Add main.cpp file of the project root directory as a source file
set(SOURCE_FILES
        src/2025/1422.maximum-score-after-splitting-a-string.cpp)

# Add executable target with source files listed in SOURCE_FILES variable
add_executable(LeetCode ${SOURCE_FILES})
