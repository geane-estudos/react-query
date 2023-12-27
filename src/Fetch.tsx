import React from 'react'

export const Fetch = () => {
    fetch('https://viacep.com.br/ws/91260010/json/')
    .then(response => response.json())
    .then(response => console.log(response))
  return (
    <div></div>
  )
}

