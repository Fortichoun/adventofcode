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
//     for i in lowPoints {
//         println!("the lowPoints is: {}", i);
//     }

//     for i in 0..10 {
//         for j in 0..10 {
//             data.insert((i as isize, j as isize), lines[i].chars().nth(j).unwrap().to_digit(10).unwrap());
//         }
//     }
//
//     let mut flashes = 0;
//     for _i in 0..100 {
//         for i in 0..10 {
//             for j in 0..10 {
//                 data.insert((i, j), data.get(&(i, j)).unwrap() + 1);
//             }
//         }
//         let mut has_change = true;
//
//         while has_change {
//             has_change = false;
//             for i in 0..10 {
//                 for j in 0..10 {
//                     let i2 = (i as isize) - 1;
//                     let i3 = i + 1;
//                     let j2 = (j as isize) - 1;
//                     let j3 = j + 1;
//                     if *data.get(&(i, j)).unwrap() >= 10 {
//                         flashes += 1;
//                         has_change = true;
//                         data.insert((i, j), 0);
//                         match data.get(&((i2, j))) {
//                             None => {},
//                             Some(num) => {
//                                 if *num != 0 {
//                                     data.insert((i2, j), *num + 1);
//                                 }
//                             }
//                         };
//                         match data.get(&(i3, j)) {
//                             None => {},
//                             Some(num) => {
//                                 if *num != 0 {
//                                     data.insert((i3, j), *num + 1);
//                                 }
//                             }
//                         };
//                         match data.get(&((i, j2))) {
//                             None => {},
//                             Some(num) => {
//                                 if *num != 0 {
//                                     data.insert((i, j2), *num + 1);
//                                 }
//                             }
//                         };
//                         match data.get(&((i2, j2))) {
//                             None => {},
//                             Some(num) => {
//                                 if *num != 0 {
//                                     data.insert((i2, j2), *num + 1);
//                                 }
//                             }
//                         };
//                         match data.get(&(i3, j2)) {
//                             None => {},
//                             Some(num) => {
//                                 if *num != 0 {
//                                     data.insert((i3, j2), *num + 1);
//                                 }
//                             }
//                         };
//                         match data.get(&((i, j3))) {
//                             None => {},
//                             Some(num) => {
//                                 if *num != 0 {
//                                     data.insert((i, j3), *num + 1);
//                                 }
//                             }
//                         };
//                         match data.get(&((i2, j3))) {
//                             None => {},
//                             Some(num) => {
//                                 if *num != 0 {
//                                     data.insert((i2, j3), *num + 1);
//                                 }
//                             }
//                         };
//                         match data.get(&(i3, j3)) {
//                             None => {},
//                             Some(num) => {
//                                 if *num != 0 {
//                                     data.insert((i3, j3), *num + 1);
//                                 }
//                             }
//                         };
//                     }
//                 }
//             }
//         }
//     }
}