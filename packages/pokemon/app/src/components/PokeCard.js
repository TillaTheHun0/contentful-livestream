
import Image from 'next/image'
import { Box, Flex, Text, Fade } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'
import { title } from 'case'

import { TypeBadge } from './TypeBadge'

const MotionBox = motion.custom(Box)

export const PokeCard = ({ name, types, spriteUrl, weight, hasBlogs }) => {
  return (
    <Fade in>
      <MotionBox
        p={5}
        maxW='350px'
        borderWidth='1px'
        borderRadius='xl'
        backgroundColor='white'
        {...hasBlogs ? { borderColor: 'teal.200' } : {}}
        shadow='lg'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Box width={100} m='auto'>
          <Image src={spriteUrl} height={100} width={100} />
        </Box>
        <Flex align='baseline' mt={2}>
          {
            types.map(type => <Box key={type} mr={2}><TypeBadge type={type} /></Box>)
          }
        </Flex>
        <Text mt={2} fontSize='xl' fontWeight='semibold' lineHeight='short'>
          {title(name)}
        </Text>
        <Text mt={2}>Weight: <b>{weight}</b></Text>
        <Flex mt={2} align='center'>
          <Box as={StarIcon} color='orange.400' />
          <Text ml={1} fontSize='sm' fontWeight='semibold'>
            {Math.floor(Math.random() * 5) + 1}
          </Text>
        </Flex>
      </MotionBox>
    </Fade>
  )
}
