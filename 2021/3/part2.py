with open("input.txt") as file:
	sumOfAllBites = []
	allLines = []
	lines = file.readlines()
	for line in lines:
		allLines.append(line.rstrip())

	oxygenFilteredLines = allLines[:]
	co2FilteredLines = allLines[:]

	for colCursor in range(len(allLines[0])):
		oxygenSumOfBites = 0
		co2SumOfBites = 0
		for index in range(len(oxygenFilteredLines)):
			currentBit = oxygenFilteredLines[index][colCursor]
			oxygenSumOfBites += 1 if currentBit == "1" else -1

		mostCommonValue = "1" if oxygenSumOfBites >= 0 else "0"
		oxygenFilteredLines = oxygenFilteredLines if(len(oxygenFilteredLines)) == 1 else list(filter(lambda line: line[colCursor] == mostCommonValue, oxygenFilteredLines))

		for index in range(len(co2FilteredLines)):
			currentBit = co2FilteredLines[index][colCursor]
			co2SumOfBites += 1 if currentBit == "1" else -1

		leastCommonValue = "0" if co2SumOfBites >= 0 else "1"
		co2FilteredLines = co2FilteredLines if(len(co2FilteredLines)) == 1 else list(filter(lambda line: line[colCursor] == leastCommonValue, co2FilteredLines))

	oxygenRate = int(oxygenFilteredLines[0], 2)
	co2Rate = int(co2FilteredLines[0], 2)

	print("lifeSupportRating =>", oxygenRate * co2Rate)

