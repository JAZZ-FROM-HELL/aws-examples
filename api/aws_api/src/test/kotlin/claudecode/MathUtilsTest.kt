package org.example.claudecode

import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows

class MathUtilsTest {

    @Test
    fun `factorial of 0 should return 1`() {
        Assertions.assertEquals(1L, factorial(0))
    }

    @Test
    fun `factorial of 1 should return 1`() {
        Assertions.assertEquals(1L, factorial(1))
    }

    @Test
    fun `factorial of small positive numbers`() {
        Assertions.assertEquals(2L, factorial(2))
        Assertions.assertEquals(6L, factorial(3))
        Assertions.assertEquals(24L, factorial(4))
        Assertions.assertEquals(120L, factorial(5))
    }

    @Test
    fun `factorial of 10 should return correct value`() {
        Assertions.assertEquals(3628800L, factorial(10))
    }

    @Test
    fun `factorial of 15 should return correct value`() {
        Assertions.assertEquals(1307674368000L, factorial(15))
    }

    @Test
    fun `factorial of 20 should return correct value (max supported)`() {
        Assertions.assertEquals(2432902008176640000L, factorial(20))
    }

    @Test
    fun `factorial of negative number should throw IllegalArgumentException`() {
        val exception = assertThrows<IllegalArgumentException> {
            factorial(-1)
        }
        Assertions.assertTrue(exception.message?.contains("negative") == true)
    }

    @Test
    fun `factorial of large negative number should throw IllegalArgumentException`() {
        val exception = assertThrows<IllegalArgumentException> {
            factorial(-100)
        }
        Assertions.assertTrue(exception.message?.contains("negative") == true)
    }

    @Test
    fun `factorial of number greater than 20 should throw IllegalArgumentException`() {
        val exception = assertThrows<IllegalArgumentException> {
            factorial(21)
        }
        Assertions.assertTrue(exception.message?.contains("overflow") == true)
    }

    @Test
    fun `factorial of very large number should throw IllegalArgumentException`() {
        val exception = assertThrows<IllegalArgumentException> {
            factorial(100)
        }
        Assertions.assertTrue(exception.message?.contains("overflow") == true)
    }

    @Test
    fun `factorial values are sequential and increasing`() {
        for (i in 1..19) {
            val current = factorial(i)
            val next = factorial(i + 1)
            Assertions.assertEquals(current * (i + 1), next)
        }
    }
}