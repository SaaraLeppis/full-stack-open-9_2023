const StaticLine = (props) => {
  console.log("Line", props)
  return (
    <tr>
      <th>{props.text}</th>
      <td>
        {props.value}
        {props.sign}
      </td>
    </tr>
  )
}

export default StaticLine
