import getRandomCat from './getRandomCat'

describe('getRandomCat', () => {
  beforeEach(() => {
    const fetchMock = jest.fn()
    fetchMock.mockImplementation(() => ({
      then: () => ({ then: jest.fn() }),
    }))

    Object.defineProperty(globalThis, 'fetch', { value: fetchMock })
  })

  it('fetches from /api/cats/random', () => {
    getRandomCat()
    expect(globalThis.fetch).toHaveBeenCalledWith('/api/cats/random')
  })
})
