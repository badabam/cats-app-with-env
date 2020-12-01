import { useEffect, useState } from 'react'

function App() {
  const [catImage, setCatImage] = useState('')
  const [error, setError] = useState()

  useEffect(() => {
    fetch('/api/cats/random')
      .then((res) => res.json())
      .then((data) => setCatImage(data[0].url))
      .catch(setError)

    fetch('/cats/random')
      .then((res) => res.json())
      .then((data) => setCatImage(data[0].url))
      .catch(setError)
  }, [])

  return (
    <div>
      <img src={catImage} alt="" />
      {error.message}
    </div>
  )
}

export default App
