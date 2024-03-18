import { useState } from "react";
import 'firebase/auth';
import './SaveNewEntry.css';
import 'firebase/firestore';
import { Box, Button, Grid, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { upload } from "../store/firebase";
import ImageIcon from '@mui/icons-material/Image';
import { TextareaAutosize } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface NewEntryProps {
  closeModal: () => void;
  refresh: () => void;
}


export type MixedList = string | File;
const NewEntry: React.FC<NewEntryProps> = (props) => {
  
    const [nomVille,setNomVille] = useState<string>('');
    const [nameArticle,setNameArticle] = useState<string>('');

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
        const newParagraph = '';
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
      let emptyFields = "";
      if (!image) {
        emptyFields += "image preview, ";
      }
      if (!myList || myList.length === 0) {
        emptyFields += "contenu de la page, ";
      }
      if (!nameArticle) {
        emptyFields += "nom de l'article, ";
      }
      if (!nomVille) {
        emptyFields += "nom de la ville, ";
      }
      emptyFields = emptyFields.replace(/, $/, "");
      if(emptyFields.length>1){
        alert("Les champs suivants ne doivent pas être vide: "+emptyFields)
      }else{
        try{
          await upload(image!,myList,nameArticle,nomVille);
          props.closeModal();
          props.refresh();
        }catch(error:any){}
      }
    }

    const handleDelete = (index2delete:any)=>{
      setMyList(prevList => prevList.filter((_, index) => index !== index2delete));
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
          <TextField
                id="standard-basic"
                label="Nom article"
                variant="standard"
                value={nameArticle}
                onChange={(e) => setNameArticle(e.target.value)}
              />
          </Grid>
        </Grid>
        <br />
        <label>Insérer image : 
          <input type="file" style={{ display: 'none' }} onChange={addImage} />
          <IconButton component="span">
                <ImageIcon fontSize="large" />
              </IconButton>
        </label>
        <label>Insérer paragraphe : 
          <Button onClick={addPar} className="addPar" component="span">
                <EditIcon fontSize="large" />
          </Button>
        </label>
        
        <div className="inputArticle">
        {myList.map((item, index) => (
          <div key={index}>
                          <Grid container >
                <Grid item xs={11}>
            {typeof item === 'string' ? (

                  <TextareaAutosize
                  id={`outlined-basic-${index}`}
                  placeholder="Nouveau texte"
                  value={item}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  style={{ height: "auto", overflowY: "hidden", resize: "vertical", width: '100%', border: "none", outline: "none", backgroundColor: "transparent" }} // Set input width to 100% of its container
                />


            
            ) : (
              <img src={URL.createObjectURL(item)} alt={`Image ${index}`} style={{ width: '15vw', height: '8vh' }} />
            )}                </Grid>
                <Grid item xs={1}><IconButton style={{ position: 'relative', top: 0, right: 0 }} onClick={() => handleDelete(index)}>
                  <CloseIcon />
                </IconButton>
                </Grid>
              </Grid>
          </div>
        ))}
      </div>
      <Box>
        <Grid container justifyContent="center">
          <button className="upload" onClick={handleUpload}>
            Publier l'article
          </button>
        </Grid>
      </Box>
        </div>
      </div>
    );
}
export default NewEntry;
