import React from 'react'

export const HeaderCardLogin = () => {
  return (
    <img alt="Card" src="src/assets/login.png" onError={(e: any) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />

  )
}
