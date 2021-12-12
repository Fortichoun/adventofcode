val source = scala.io.Source.fromFile("input.txt")
val lines = try source.mkString finally source.close()

val data = lines.split('\n').toList.map(value => value.split('|').toList).toList
val sum = data.foldLeft[Int](0) { (acc, row) =>
  val codeToFind = row.last.split(' ')
  val signals = row.head.split(' ')

  val knownNumbers = signals.foldLeft[Seq[String]](Seq.empty) { (acc, signal) =>
    val one = if (signal.length == 2) Seq(signal) else Seq.empty
    val four = if (signal.length == 4) Seq(signal) else Seq.empty
    val seven = if (signal.length == 3) Seq(signal) else Seq.empty
    val eight = if (signal.length == 7) Seq(signal) else Seq.empty

    acc ++ one ++ four ++ seven ++ eight
  }.sortBy(_.length)
  val one = knownNumbers.head
  val seven = knownNumbers(1)
  val four = knownNumbers(2)
  //  val eight = knownNumbers.last

  //  val topLetter = seven.filter(!one.contains(_))

  val twoThreeFive = signals.filter(_.length == 5)
  val middleLetter = twoThreeFive.foldLeft[String](four) { (acc, signal) =>
    val commonLetters = signal.filter(acc.contains(_))

    commonLetters
  }

  val zeroSixNine = signals.filter(_.length == 6)
  val bottomRight = zeroSixNine.foldLeft[String](one) { (acc, signal) =>
    val commonLetters = signal.filter(acc.contains(_))

    commonLetters
  }
  val topRight = one.filter(_.toString != bottomRight)
  val topLeft = four.filter(!(middleLetter + topRight + bottomRight).contains(_))

  val (tempZero, sixNine) = zeroSixNine.partition(!_.contains(middleLetter))
  val (tempNine, tempSix) = sixNine.partition(_.contains(topRight))
  val zero = tempZero.head
  val nine = tempNine.head
  val six = tempSix.head
  //  val bottom = nine.filter(!(topLetter + middleLetter + topLeft + topRight + bottomRight).contains(_))
  //  val bottomLeft = eight.filter(!(topLetter + middleLetter + topLeft + topRight + bottomRight + bottom).contains(_))

  val (tempFive, twoThree) = twoThreeFive.partition(_.contains(topLeft))
  val (tempThree, tempTwo) = twoThree.partition(_.contains(bottomRight))
  val five = tempFive.head
  val three = tempThree.head
  val two = tempTwo.head

  val decoded = codeToFind.drop(1).foldLeft[String]("") { (acc, value) =>
    if (value.forall(one.contains(_))) acc + "1"
    else if (value.forall(seven.contains(_))) acc + "7"
    else if (value.forall(four.contains(_))) acc + "4"
    else if (value.forall(two.contains(_))) acc + "2"
    else if (value.forall(three.contains(_))) acc + "3"
    else if (value.forall(five.contains(_))) acc + "5"
    else if (value.forall(zero.contains(_))) acc + "0"
    else if (value.forall(nine.contains(_))) acc + "9"
    else if (value.forall(six.contains(_))) acc + "6"
    else acc + "8"
  }.toInt

  acc + decoded
}

println(sum)
