import React from 'react'

const Filter = ({name, handler}) => {
    return (
      <form>
        <div>
          filter shown with
            <input value={name} onChange={handler}/>
        </div>
      </form>
    )
  }

export default Filter