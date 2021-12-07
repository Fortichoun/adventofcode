def validate_board(board, bingoNumbers):
    colCompleted = all(first in bingoNumbers for (first, _, _, _, _) in board) or all(
        second in bingoNumbers for (_, second, _, _, _) in board) or all(
        third in bingoNumbers for (_, _, third, _, _) in board) or all(
        fourth in bingoNumbers for (_, _, _, fourth, _) in board) or all(
        fifth in bingoNumbers for (_, _, _, _, fifth) in board)
    rowCompleted = any(all(value in bingoNumbers for value in row) for row in board)

    return colCompleted or rowCompleted

with open("input.txt") as file:
    finalSum = 0
    bingoNumbers = []
    boards = []
    rowCounter = 0
    boardCounter = -1
    lines = file.readlines()
    for line in lines:
        if line.rstrip() == "":
            continue

        if len(bingoNumbers) == 0:
            bingoNumbers = line.rstrip().split(',')
            continue

        if rowCounter % 5 == 0:
            boards.append([])
            boardCounter += 1

        boardLine = line.rstrip().split()
        boards[boardCounter].append(boardLine)

        rowCounter += 1

    for index in range(5, len(bingoNumbers) - 5):
        currentBingoNumbers = bingoNumbers[:index]
        for board in boards:
            validBoard = validate_board(board, currentBingoNumbers)
            if validBoard:
                for row in board:
                    for col in row:
                        if col not in currentBingoNumbers:
                            finalSum += int(col)
                break
        else:
            continue
        break

    print("result =>", finalSum * int(currentBingoNumbers[-1]))

