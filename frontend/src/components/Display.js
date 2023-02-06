import { Box, Button, Image, Input } from '@chakra-ui/react';
import { useState } from 'react'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'

function Display({contract, account}) {

  const [data, setData] = useState("");
  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        console.log(dataArray);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("You don't have access");
    }
    const isEmpty = Object.keys(dataArray).length === 0;
    //console.log("nulla", dataArray);
    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(',');

      const images = str_array.map((item, key)=>{
        return (
          <Link as={NextLink} href={item} key={key} target='_blank' isExternal>
            <Image key={key} src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
              alt='new' className='image-list' />
          </Link>
        )
      })
      setData(images);
    }
    else {
      alert("No image to display");
    }
  }

  return (
    <>
      <Box className='image-list'>{data}</Box>
      <Input type={'text'} placeholder="Enter wallet address" className='address'/>
      <Button onClick={getdata}>Get Data</Button>
    </>
  )
}

export default Display;