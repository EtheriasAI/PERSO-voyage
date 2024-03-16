import { useState } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref as storageRefBug , uploadBytes, getDownloadURL } from 'firebase/storage';

const NewEntry: React.FC = () => {

    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
          const selectedImage = e.target.files[0];
          setImage(selectedImage);
          setImageUrl(URL.createObjectURL(selectedImage));
        }
      };

      const handleUpload = async () =>{
        const cf = initializeApp(firebaseConfig);
        firebase.initializeApp(firebaseConfig);
        const firestore = getFirestore(cf);

        let downloadURL = "";
        //Save image
        const storage = getStorage();
        const storageRef : any = storageRefBug(storage, `images/${image!.name}`);
         
        try {
            await uploadBytes(storageRef, image!);
            downloadURL = await getDownloadURL(storageRef);
            console.log('Image uploaded successfully. Download URL:', downloadURL);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
        const newDocumentData = {
            NomArticle: "Premiere etape",
            contenuArticleParagraphe: ["C'est ici que tout commence", "A la prochaine"],
            nomVille: "Deauville",
            urlImage: [downloadURL]
        };

        setDoc(doc(firestore, 'escale', 'NewDocumentID'), newDocumentData)
        .then(() => {
            console.log('New document added successfully to Firestore');
        })
        .catch((error: any) => {
            console.error('Error adding new document to Firestore:', error);
        });


      }

// Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyCLTqbIw4mGorqYkb92wZk8bfHIumOX94o",
        authDomain: "test-75b5f.firebaseapp.com",
        projectId: "test-75b5f",
        storageBucket: "test-75b5f.appspot.com",
        messagingSenderId: "824729232108",
        appId: "1:824729232108:web:f898ba64078f0c6e30bbc9"
    };
    
    return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>
        Upload Image
      </button>
    </div>);
}
export default NewEntry;

