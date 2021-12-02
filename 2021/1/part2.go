package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	file, _ := os.Open("input.txt")
	scanner := bufio.NewScanner(file)
	var input []int

	for scanner.Scan() {
		parsedRow, _ := strconv.Atoi(scanner.Text())
		input = append(input, parsedRow)
	}
	previousSum := input[0] + input[1] + input[2]
	count := 0

	for index := range input[1 : len(input) - 1] {
		currentSum := input[index] + input[index+1] + input[index+2]
		if currentSum > previousSum {
			count++
		}

		previousSum = currentSum
	}

	fmt.Println("count =>", count)
}
