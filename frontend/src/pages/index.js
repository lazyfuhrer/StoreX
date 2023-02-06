import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
//import styles from '@/styles/Home.module.css'
import { Heading, Text } from '@chakra-ui/react'
import Store from "../artifacts/contracts/Store.sol/Store.json";
import { useState, useEffect } from 'react';
import { ethers}  from 'ethers';

//Importing the components
import FileUpload from '@/components/FileUpload';
import Modal from '@/components/Modal';
import Display from '@/components/Display';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const contract = new ethers.Contract(contractAddress, Store.abi, signer);
        //console.log(contract);
        setContract(contract);
        setProvider(provider);
      }
      else {
        console.error("MetaMask not found");
      }
    };
    provider && loadProvider();
  }, [])



  return (
    <>
      {/* <FileUpload/>
      <Modal/>
      <Display/> */}
      <Heading>StoreX - the next gen storage system</Heading>
      <Text>StoreX is a decentralized storage system that allows you to store your files on the blockchain using IPFS.</Text>
      <Text>Account: {account ? account : "Not connected"}</Text>
      <FileUpload account={account} provider={provider} contract={contract} />
      <Display contract={contract} account={account} />
    </>
  )
}