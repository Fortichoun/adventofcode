val source = scala.io.Source.fromFile("input.txt")
val lines = try source.mkString finally source.close()

val data = lines.split(',').map(_.toInt).toList
val range = 0 to data.max + 1

val smallestSum = range.foldLeft(999999999)((currentSmallestSum, positionToTest) => {
  val sum = data.foldLeft(0)((acc, position) => {
    val delta = (position - positionToTest).abs
    val fuelCost = (0 to delta).sum
    acc + fuelCost
  })

  if (currentSmallestSum < sum) currentSmallestSum else sum
}
)

println(s"smallestSum = $smallestSum")