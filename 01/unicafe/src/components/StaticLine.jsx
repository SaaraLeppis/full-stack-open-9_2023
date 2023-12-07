const StaticLine = (props) => {
  return (
    <tr>
      <th>{props.text}</th>
      <td>{props.value}</td>
      <td>{props.sign}</td>
    </tr>
  )
}

export default StaticLine
