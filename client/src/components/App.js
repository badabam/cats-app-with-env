import useCats from '../hooks/useCats'
import OptionalRender from './OptionalRender'

function App() {
  const { cat, votedCats, error, dislikeCat, likeCat } = useCats()

  return (
    <div>
      <OptionalRender show={error}>Error: {error?.message}</OptionalRender>
      <h1>This app renders a random cat. You like it?</h1>
      <img src={cat.url} style={{ width: 200 }} alt="" />
      <div>
        <button onClick={likeCat}>Like</button>
        <button onClick={dislikeCat}>Dislike</button>
      </div>

      <OptionalRender show={votedCats.liked.length}>
        <h2>Your liked cats:</h2>
        {votedCats.liked.map((url) => (
          <img key={url} src={url} style={{ width: 200 }} alt="" />
        ))}
      </OptionalRender>
    </div>
  )
}

export default App
