const StaticLine = (props) => {
  console.log("Line", props)
  return (
    <div>
      <p>
        {props.text}: {props.value} {props.sign}
      </p>
    </div>
  )
}

export default StaticLine
