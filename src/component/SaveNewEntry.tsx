import { useState } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import './SaveNewEntry.css';
import 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref as storageRefBug , uploadBytes, getDownloadURL } from 'firebase/storage';
import { Box, Grid } from "@mui/material";

interface IProps {
  shown : boolean,
  close:() => void
}
type MixedList = string | File;
const NewEntry: React.FC<IProps> = (props) => {
  
    const [imagePar, setImagePar] = useState<File | null>(null);
    const [imageUrlPar, setImageUrlPar] = useState<string>('');

    const [nomVille,setNomVille] = useState<string>('');
    const [NomArticle,setNomArticle] = useState<string>('');
    const [paragraphes,setParagraphes] = useState<string[]>(['']);

    const [myList, setMyList] = useState<MixedList[]>([]);

    const addItemToFileList = (item: File | string) => {
      setMyList(prevList => [...prevList, item]);
    };

    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');

    const [paragraphs, setParagraphs] = useState<string[]>([]);
    const [newParagraph, setNewParagraph] = useState<string>('');
  
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
      console.log(myList)
        const cf = initializeApp(firebaseConfig);
        firebase.initializeApp(firebaseConfig);
        const firestore = getFirestore(cf);

        let downloadURL = "";
        const storage = getStorage();
        const storageRef : any = storageRefBug(storage, `images/${image!.name}`);
        
        try {
            await uploadBytes(storageRef, image!);
            downloadURL = await getDownloadURL(storageRef);
            console.log('Image uploaded successfully. Download URL:', downloadURL);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
        let parList : string[] = [];
        myList.forEach(
          async (item)=>{
            if (typeof item === 'string') {
              parList.push(item);
            } else if (item instanceof File) {
              try {
                await uploadBytes(storageRef, item!);
                downloadURL = await getDownloadURL(storageRef);
                parList.push(downloadURL);
              } catch (error) {
                  console.error('Error uploading image:', error);
              }
            }
          }
        );

        const newDocumentData = {
            NomArticle:NomArticle,
            contenuArticleParagraphe: parList,
            nomVille: nomVille,
            imgPreview: downloadURL
        };

        await setDoc(doc(firestore, 'escale', nomVille.toLowerCase().replace(/[^a-z0-9]/g, '')), newDocumentData)
        .then(() => {
            console.log('New document added successfully to Firestore');
        })
        .catch((error: any) => {
            console.error('Error adding new document to Firestore:', error);
        });


      }

    const firebaseConfig = {
        apiKey: "AIzaSyCLTqbIw4mGorqYkb92wZk8bfHIumOX94o",
        authDomain: "test-75b5f.firebaseapp.com",
        projectId: "test-75b5f",
        storageBucket: "test-75b5f.appspot.com",
        messagingSenderId: "824729232108",
        appId: "1:824729232108:web:f898ba64078f0c6e30bbc9"
    };
    
    return props.shown ? (
    <div
      className="modal-backdrop"
      onClick={() => {
        props.close();
      }}
    >
      <div className='newEntryModal'
           onClick={e => {
            e.stopPropagation();
          }}>
        <Grid container >
          <Grid item xs={12}>
            <label htmlFor="nomVille">Image preview:</label>
            <input type="file" onChange={handleImageChange} />
          </Grid>
          <Grid item xs={12}>
            <label htmlFor="nomVille">Nom ville:</label>
            <input type="text" value={nomVille} onChange={(e) => setNomVille(e.target.value)} />
          </Grid>
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
              <input type="text" value={item} onChange={(e) => handleInputChange(index, e.target.value)} />
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
      </Box>
      </div>
    </div>) : null;
}
export default NewEntry;

