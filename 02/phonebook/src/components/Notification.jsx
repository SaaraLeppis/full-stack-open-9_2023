const Notification = ({ message }) => {
  console.log(message)
  return (
    <div className="notification-container">{message && <p>{message}</p>}</div>
  )
}

export default Notification
