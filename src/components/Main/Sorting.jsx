import React from 'react'

function Sorting({ onSortingChange }) {
  return (
    <div>
      <label htmlFor="sorting" className="font-semibold">Sıralama:</label>
      <select
        name="sorting"
        id="sorting"
        onChange={(e) => onSortingChange(e.target.value)}
        className="ml-2 p-1 rounded border"
      >
        <option value="latest">Son Məhsullar</option>
        <option value="high-to-low">Bahadan Ucuza</option>
        <option value="low-to-high">Ucuzdan Bahaya</option>
      </select>
    </div>
  )
}

export default Sorting