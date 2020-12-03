export default function OptionalRender({ show = false, children }) {
  return show ? children : null
}
