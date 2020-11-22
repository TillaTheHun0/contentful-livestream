
import got from 'got'

const BASE_URL = 'https://pokeapi.co/api/v2'

export function fetchPokemon (name) {
  return got(`${BASE_URL}/pokemon/${name}`).json()
}

export function fetchPokemons ({ offset = 0, limit = 30 } = {}) {
  return got(`${BASE_URL}/pokemon`, { searchParams: { offset, limit } }).json()
}
