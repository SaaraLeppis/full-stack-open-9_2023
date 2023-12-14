const Filter = ({ value, onChange }) => {
  return (
    <div id="filter-section">
      <label htmlFor="nameFilter">filter shown with:</label>
      <input id="nameFilter" value={value} onChange={onChange} />
    </div>
  )
}
export default Filter
