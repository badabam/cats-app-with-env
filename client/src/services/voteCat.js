/**
 *
 * @param {String} id - The image_id of the cat
 * @param {('up'|'down')} direction - Vote up or down
 * @returns {Promise}
 */
export default function voteCat(id, direction) {
  return fetch(`/api/cats/${id}/vote/${direction}`).then((res) => res.json())
}
