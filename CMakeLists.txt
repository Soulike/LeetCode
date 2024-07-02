cmake_minimum_required(VERSION 3.13)
project(LeetCode)
set(CMAKE_CXX_STANDARD 23)

# Add main.cpp file of the project root directory as a source file
set(SOURCE_FILES
        Daily/350.intersection-of-two-arrays-ii.cpp)

# Add executable target with source files listed in SOURCE_FILES variable
add_executable(LeetCode ${SOURCE_FILES})
