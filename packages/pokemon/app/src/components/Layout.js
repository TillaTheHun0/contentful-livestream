
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { Box, Flex } from '@chakra-ui/react'

export const Layout = ({ children }) => (
  <>
    <Head>
      <title>Pokemon Lover</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <Flex flexDirection='column' id='container'>
      <Box backgroundColor='teal.300' py={2} px={8} flexShrink={0}>
        <Box mt={4} cursor='pointer'>
          <Link href='/'>
            <Image src='/pokeApi.png' width={104} height={42} />
          </Link>
        </Box>
      </Box>
      <Box backgroundColor='teal.300'>
        {children}
      </Box>
    </Flex>
    <footer>
      <a
        href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
        target='_blank'
        rel='noopener noreferrer'
      >
        Powered by{' '}
        <img src='/vercel.svg' alt='Vercel Logo' className='logo' />
      </a>
    </footer>
    <style jsx>
      {`
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .logo {
          height: 1em;
        }
      `}
    </style>
  </>
)
