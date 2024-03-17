import { useState } from "react";
import 'firebase/auth';
import './SaveNewEntry.css';
import 'firebase/firestore';
import { Box, Grid, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { upload } from "../store/firebase";

interface NewEntryProps {
  closeModal: () => void;
}


export type MixedList = string | File;
const NewEntry: React.FC<NewEntryProps> = (props) => {
  
    const [nomVille,setNomVille] = useState<string>('');
    const [NomArticle,setNomArticle] = useState<string>('');

    const [myList, setMyList] = useState<MixedList[]>([]);


    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');

    const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
          const selectedFile = files[0];
          setMyList(prevList => [...prevList, selectedFile]);
        }
      };

    const addPar = () => {
        const newParagraph = 'New paragraph';
        setMyList(prevList => [...prevList, newParagraph]);
      };

    const handleInputChange = (index: number, value: string) => {
        setMyList(prevList => {
            const updatedList = [...prevList];
            updatedList[index] = value;
            return updatedList;
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
          const selectedImage = e.target.files[0];
          setImage(selectedImage);
          setImageUrl(URL.createObjectURL(selectedImage));
        }
      };

    const handleUpload = async () =>{
      try{
        await upload(image!,myList,NomArticle,nomVille);
        props.closeModal();
      }catch(error){}
      
    }
    
    return (
      <div className='newEntryModal'>
        <div className="content">
        <Grid container spacing={2} alignItems="center" style={{ padding: "8px" }}>
          <Grid item xs={6}>
            <TextField
                id="standard-basic"
                label="Nom Ville"
                variant="standard"
                value={nomVille}
                onChange={(e) => setNomVille(e.target.value)}
              />
          </Grid>
          <Grid item xs={6} container justifyContent="flex-end">
            <IconButton onClick={props.closeModal} edge="end">
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container >
          <Grid item xs={6}>
            <Grid item xs={6}>
             <label htmlFor="image preview">Image preview:</label>
            </Grid>
            <Grid item xs={6}>
            <input
              accept="image/*"
              id="contained-button-file"
              type="file"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <label htmlFor="contained-button-file">
              <IconButton component="span">
                <CloudUploadIcon fontSize="large" />
              </IconButton>
            </label>
            </Grid>
          </Grid>            
          {image && (
            <Grid item xs={6}>
              <img src={URL.createObjectURL(image)} alt="" style={{ width: '15vw', height: '8vh' }} />
            </Grid>
          )}
          <Grid item xs={12}>
            <label htmlFor="NomArticle">Nom article:</label>
            <input type="text" value={NomArticle} onChange={(e) => setNomArticle(e.target.value)} />
          </Grid>
        </Grid>
        <input type="file" onChange={addImage} />
        <button onClick={addPar}>Add Paragraph</button>

        <div className="inputArticle">
        {myList.map((item, index) => (
          <div key={index}>
            {typeof item === 'string' ? (
              
              <TextField
                id={`outlined-basic-${index}`} 
                variant="outlined"
                value={item}
                onChange={(e) => handleInputChange(index, e.target.value)}
                style={{ width: '100%' }} // Set input width to 100% of its container
              />
              
            ) : (
              <img src={URL.createObjectURL(item)} alt={`Image ${index}`} style={{ width: '15vw', height: '8vh' }} />
            )}
          </div>
        ))}
      </div>
      <Box>
        <Grid container justifyContent="center">
          <button className="upload" onClick={handleUpload}>
            Upload article
          </button>
        </Grid>
      </Box></div>
    </div>
    );
}
export default NewEntry;
