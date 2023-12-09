use std::fs;

fn getNbrInRow(row: &str, col: usize) -> i32 {
    row.chars().nth(col).unwrap().to_string().parse::<i32>().unwrap()
}

fn main() {
    let filename = "input.txt";

    let contents = fs::read_to_string(filename)
        .expect("Something went wrong reading the file");

    let data: Vec<&str> = contents.lines().collect();
    let mut lowPoints: Vec<i32> =  Vec::new();
    let rowNumber: usize = data.len();
    let colNumber: usize = data[0].chars().count();
    let mut countRow = 0;

    for row in data.clone() {
        let mut countCol = 0;
        for col in row.chars() {
            let intCol: i32 = col.to_string().parse::<i32>().unwrap();

            let isXRightSmaller: bool = if countCol != (colNumber - 1) { intCol < getNbrInRow(row, countCol + 1) } else { true };
            let isXLeftSmaller: bool = if countCol != 0 { intCol < getNbrInRow(row, countCol - 1) } else { true };
            let isYBottomSmaller: bool = if countRow != (rowNumber - 1) { intCol < getNbrInRow(data[countRow + 1], countCol) } else { true };
            let isYTopSmaller: bool = if countRow != 0 { intCol < getNbrInRow(data[countRow - 1], countCol) } else { true };

            if isXRightSmaller && isXLeftSmaller && isYBottomSmaller && isYTopSmaller {
                lowPoints.push(intCol + 1)
            }

            countCol += 1
        }
        countRow += 1;
    }

    let sum: i32 = lowPoints.iter().sum();
    println!("the lowPoints sum is: {}", sum)
}