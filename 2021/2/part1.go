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
	y := 0

	for _, row := range input {
		direction := row[0]
		value, _ := strconv.Atoi(row[1])

		if direction == Forward {
			x += value
		} else if direction == Up {
			y -= value
		} else if direction == Down {
			y += value
		}
	}

	fmt.Println("final depth =>", x*y)
}
