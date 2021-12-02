package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	const (
		Forward = "forward"
		Down    = "down"
		Up      = "up"
	)
	file, _ := os.Open("input.txt")
	scanner := bufio.NewScanner(file)
	var input [][]string

	for scanner.Scan() {
		row := strings.Split(scanner.Text(), " ")
		input = append(input, row)
	}
	x := 0
	// y
	aim := 0
	depth := 0

	for _, row := range input {
		direction := row[0]
		value, _ := strconv.Atoi(row[1])

		if direction == Forward {
			x += value
			depth += value * aim
		} else if direction == Up {
			aim -= value
		} else if direction == Down {
			aim += value
		}
	}

	fmt.Println("final position =>", x*depth)
}
