export default function getRandomCat() {
  return fetch('/api/cats/random').then((res) => res.json())
}
