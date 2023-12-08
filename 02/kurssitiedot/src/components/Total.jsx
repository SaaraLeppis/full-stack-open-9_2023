const Total = ({ parts }) => {
  console.log(parts[0].exercises)
  const totalCourses = () => {
    const sum = parts.reduce((acc, curr) => acc + curr.exercises, 0)
    return sum
  }
  return <p id="total-line">total of {totalCourses()} exercises</p>
}

export default Total
