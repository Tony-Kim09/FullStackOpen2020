import React from 'react'

const Persons = ({arr, filteredName, deleteContact}) => {
    return(
      <div>
        {
        arr.filter(x => x.name.includes(filteredName))
           .map(x =>
          <p> 
            {x.name}: {x.number}
            <button onClick={() => deleteContact(x.id)}>delete</button>
          </p>
        )}

      </div>
    )
  }

export default Persons