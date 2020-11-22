
import Dataloader from 'dataloader'
import pMap from 'p-map'

import { fetchPokemon } from './client'

export const pokemonByName = () => new Dataloader(names => {
  return pMap(
    names,
    fetchPokemon,
    { concurrency: 5 }
  )
})
