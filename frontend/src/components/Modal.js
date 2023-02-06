import { Box, Button, FormControl, Input, Select } from '@chakra-ui/react';
import { useEffect } from 'react'

function Modal({setModalOpen, contract}) {

  const shareing = async () => {
    
  }

  return (
    <>
      <Box className='modalBackground'>
        <Box className='modalContainer'>
          <Box className='title'>Share with</Box>
          <Box className='body'>
            <Input type={'text'} className='address' placeholder='Enter Address'/>
          </Box>  
          <FormControl id='myForm'>
            <Select id='selectNumber'>
              <option className='address'>People with Access</option>
            </Select>
          </FormControl>
          <Box className='footer'>
            <Button id='cancelBtn' onClick={ ()=>{setModalOpen(false)} }>Cancel</Button>
            <Button id='cancelBtn' onClick={ ()=>shareing }>Share</Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Modal;