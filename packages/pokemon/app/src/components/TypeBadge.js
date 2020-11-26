
import { Badge } from '@chakra-ui/react'

function getTypeColor (type) {
  switch (type) {
    case 'bug':
      return 'green'
    case 'dark':
      return 'gray'
    case 'dragon':
      return 'purple'
    case 'electric':
      return 'yellow'
    case 'fairy':
      return 'pink'
    case 'fighting':
      return 'yellow'
    case 'fire':
      return 'red'
    case 'flying':
      return 'cyan'
    case 'ghost':
      return 'cyan'
    case 'grass':
      return 'green'
    case 'ground':
      return 'yellow'
    case 'ice':
      return 'blue'
    case 'normal':
      return 'orange'
    case 'poison':
      return 'purple'
    case 'psychic':
      return 'pink'
    case 'rock':
      return 'yellow'
    case 'steel':
      return 'gray'
    case 'water':
      return 'blue'
    default:
      return 'gray'
  }
}

export const TypeBadge = ({ type, children }) => {
  const color = getTypeColor(type)
  return <Badge colorScheme={color}>{children || type}</Badge>
}
