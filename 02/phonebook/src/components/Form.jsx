const Form = ({ name, number, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div id="input-section">
        <label htmlFor="newName">name:</label>
        <input id="newName" name="newName" value={name} onChange={onChange} />
        <label htmlFor="newValue">number: </label>
        <input
          id="newValue"
          name="newValue"
          value={number}
          onChange={onChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
export default Form
