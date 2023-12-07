const Button = ({ id, handle }) => {
  console.log({ id }, id, handle.name)
  return (
    <>
      <button id={id} onClick={handle}>
        {id}
      </button>
    </>
  )
}

export default Button
