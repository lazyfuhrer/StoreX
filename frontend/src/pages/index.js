import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
//import styles from '@/styles/Home.module.css'
import { Text } from '@chakra-ui/react'
import FileUpload from '@/components/FileUpload'
import Modal from '@/components/Modal'
import Display from '@/components/Display'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <FileUpload/>
      <Modal/>
      <Display/>
    </>
  )
}
