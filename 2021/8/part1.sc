val source = scala.io.Source.fromFile("input.txt")
val lines = try source.mkString finally source.close()

val data = lines.split('\n').toList.map(value => value.split('|').toList)
val validSignals = Seq(2, 3, 4, 7)
val sum = data.foldLeft(0)((acc, row) => {
  val signals = row.last.split(' ')

  acc + signals.count(signal => validSignals.contains(signal.length))
})

println(s"sum = $sum")