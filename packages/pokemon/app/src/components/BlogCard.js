
import { Box, Text, Fade, Link } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion.custom(Box)

export const BlogCard = ({ title, slug }) => {
  return (
    <Link href={`/blogs/${encodeURIComponent(slug)}`}>
      <Fade in>
        <MotionBox
          p={5}
          maxW='500px'
          borderWidth='1px'
          borderRadius='xl'
          backgroundColor='white'
          shadow='lg'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* <Flex align='baseline' mt={2}>
            {
              types.map(type => <Box key={type} mr={2}><TypeBadge type={type} /></Box>)
            }
          </Flex> */}
          <Text mt={2} fontSize='lg' fontWeight='semibold' lineHeight='short'>
            {title}
          </Text>
        </MotionBox>
      </Fade>
    </Link>
  )
}
