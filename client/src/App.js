import { useEffect, useState } from 'react'
import OptionalRender from './OptionalRender'
import getRandomCat from './services/getRandomCat'
import voteCat from './services/voteCat'

function App() {
  const [cat, setCat] = useState({})
  const [votedCats, setVotedCats] = useState({ liked: [], disliked: [] })
  const [error, setError] = useState()

  useEffect(updateRandomCat, [])

  return (
    <div>
      <OptionalRender show={error}>Error: {error?.message}</OptionalRender>
      <h1>This app renders a random cat. You like it?</h1>
      <img src={cat.url} style={{ width: 200 }} alt="" />
      <div>
        <button onClick={() => likeCat(cat)}>I like</button>
        <button onClick={() => dislikeCat(cat)}>Don&apos;t like it</button>
      </div>

      <OptionalRender show={votedCats.liked.length}>
        <h2>Your liked cats:</h2>
        {votedCats.liked.map((url) => (
          <img key={url} src={url} style={{ width: 200 }} alt="" />
        ))}
      </OptionalRender>

      <OptionalRender show={votedCats.disliked.length}>
        <h2>Your disliked cats:</h2>
        {votedCats.disliked.map((url) => (
          <img key={url} src={url} style={{ width: 200 }} alt="" />
        ))}
      </OptionalRender>
    </div>
  )

  function likeCat({ id, url }) {
    voteCat(id, 'up')
      .then(() =>
        setVotedCats({ ...votedCats, liked: [...votedCats.liked, url] })
      )
      .catch(setError)
    updateRandomCat()
  }

  function dislikeCat({ id, url }) {
    voteCat(id, 'down')
      .then(() =>
        setVotedCats({ ...votedCats, disliked: [...votedCats.disliked, url] })
      )
      .catch(setError)
    updateRandomCat()
  }

  function updateRandomCat() {
    getRandomCat()
      .then((data) => setCat(data[0]))
      .catch(setError)
  }
}

export default App
