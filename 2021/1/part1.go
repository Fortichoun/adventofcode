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
	precedentValue := input[0]
	count := 0

	for _, value := range input[1:] {
		if value > precedentValue {
			count++
		}
		precedentValue = value
	}

	fmt.Println("count =>", count)
}
