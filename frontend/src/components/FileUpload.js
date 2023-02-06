import { useState } from 'react';
import  axios  from 'axios';
import { Button, FormControl, FormHelperText, FormLabel, Input, Text } from '@chakra-ui/react';
import { calcLength } from 'framer-motion';

function FileUpload({account, provider, contract}) {

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image is selected");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try{
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_KEY}`,
            pinata_secret_api_key: `${process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY}`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        contract.add(account, ImgHash);
        console.log(ImgHash);
        alert("Image uploaded to pinata successfully");
        setFileName("No image is selected");
        setFile(null);
      }
      catch(err){
        alert("Unable to upload img to pinata");
        console.log(err);
      }
    }
  }

  const retrieveFile = async (e) => {
    const data = e.target.files[0];
    //console.log(data);
    const reader = new  window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    }
    setFileName(e.target.files[0].name);
    e.preventDefault();
  }

  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
  );
}

export default FileUpload;