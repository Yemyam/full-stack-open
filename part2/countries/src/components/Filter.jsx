import React from 'react'

const Filter = ({value, onChange}) => {
    return(
      <div>
        find countries <input onChange={onChange} value={value}></input>
      </div>
    )
  }

export default Filter