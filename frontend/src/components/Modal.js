import { Box, Button, FormControl, Input, Select } from '@chakra-ui/react';
import { useEffect } from 'react'

function Modal({setModalOpen, contract}) {

  const sharing = async () => {
    const address = document.querySelector('.address').value;
    await contract.allow(address);
    console.log('shared');
    setModalOpen(false);
  };

  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);

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
            <Button id='cancelBtn' onClick={ ()=>sharing() }>Share</Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Modal;