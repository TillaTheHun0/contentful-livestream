
import { Box, Flex, Fade, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion.custom(Box)

export const SkeletonPokeCard = () => {
  return (
    <Fade in>
      <MotionBox
        p={5}
        maxW='350px'
        borderWidth='1px'
        borderRadius='xl'
        backgroundColor='white'
        shadow='lg'
      >
        <Box width={100} m='auto'>
          <SkeletonCircle height={100} width={100} />
        </Box>
        <Flex align='baseline' mt={2}>
          <Skeleton />
          <Skeleton />
        </Flex>
        <SkeletonText mt={2} fontSize='xl' fontWeight='semibold' />
        <SkeletonText mt={2} />
        <Flex mt={2} align='center'>
          <SkeletonText ml={1} fontSize='sm' fontWeight='semibold' />
        </Flex>
      </MotionBox>
    </Fade>
  )
}
