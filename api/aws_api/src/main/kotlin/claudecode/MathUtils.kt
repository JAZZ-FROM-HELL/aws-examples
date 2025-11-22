package org.example.claudecode

/**
 * Calculates the factorial of a non-negative integer.
 *
 * Edge cases handled:
 * - 0! = 1 (by definition)
 * - Negative numbers throw IllegalArgumentException
 * - Large numbers (n > 20) throw IllegalArgumentException to prevent overflow
 *
 * @param n The non-negative integer to calculate factorial for
 * @return The factorial of n
 * @throws IllegalArgumentException if n is negative or too large (> 20)
 */
fun factorial(n: Int): Long {
    require(n >= 0) { "Factorial is not defined for negative numbers. Got: $n" }
    require(n <= 20) { "Factorial of $n would overflow Long type. Maximum supported value is 20" }

    if (n == 0 || n == 1) {
        return 1
    }

    var result = 1L
    for (i in 2..n) {
        result *= i
    }

    return result
}
