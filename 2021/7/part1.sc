val source = scala.io.Source.fromFile("input.txt")
val lines = try source.mkString finally source.close()

val data = lines.split(',').map(_.toInt).toList
val range = 0 to data.max + 1

val smallestSum = range.foldLeft(10000000)((currentSmallestSum, positionToTest) => {
  val sum = data.foldLeft(0)((acc, position) => {
    acc + (position - positionToTest).abs
  })

  if (currentSmallestSum < sum) currentSmallestSum else sum
}
)

println(s"smallestSum = $smallestSum")