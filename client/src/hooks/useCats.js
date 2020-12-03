import { useEffect, useState } from 'react'
import getRandomCat from '../services/getRandomCat'
import voteCat from '../services/voteCat'

export default (autostart = true) => {
  const [cat, setCat] = useState({})
  const [votedCats, setVotedCats] = useState({ liked: [], disliked: [] })
  const [status, setStatus] = useState('idle') // idle | loading | error
  const [error, setError] = useState()

  autostart && useEffect(getCat, [])

  useEffect(() => {
    ;['idle', 'loading'].includes(status) && setError(null)
  }, [status])

  function likeCat() {
    const { id, url } = cat
    voteCat(id, 'up')
      .then(() =>
        setVotedCats({ ...votedCats, liked: [...votedCats.liked, url] })
      )
      .then(() => setStatus('idle'))
      .catch(onError)
    getCat()
  }

  function dislikeCat() {
    const { id, url } = cat
    voteCat(id, 'down')
      .then(() =>
        setVotedCats({ ...votedCats, disliked: [...votedCats.disliked, url] })
      )
      .then(() => setStatus('idle'))
      .catch(onError)
    getCat()
  }

  function getCat() {
    setStatus('loading')
    getRandomCat()
      .then((data) => setCat(data[0]))
      .then(() => setStatus('idle'))
      .catch(onError)
  }

  function onError(error) {
    setError(error)
    setStatus('error')
  }

  return {
    cat,
    votedCats,
    error,
    status,
    likeCat,
    dislikeCat,
  }
}
