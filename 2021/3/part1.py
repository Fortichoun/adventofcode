with open("input.txt") as file:
	sumOfAllBites = []
	lines = file.readlines()
	for line in lines:
		if len(sumOfAllBites) == 0:
			for index in range(len(line.rstrip())):
				sumOfAllBites.append(0)

		for index in range(len(line.rstrip())):
			bit = line.rstrip()[index]
			modifier = 1 if bit == "1" else -1
			sumOfAllBites[index] += modifier

	gammaRate = ""
	espilonRate = ""
	for bitSum in sumOfAllBites:
		gammaRate += "1" if bitSum > 0 else "0"
		espilonRate += "0" if bitSum > 0 else "1"

	decimalGammaRate = int(gammaRate, 2)
	decimalEspilonRate = int(espilonRate, 2)
	powerConsumption = decimalGammaRate * decimalEspilonRate

	print("powerConsumption =>", powerConsumption)
