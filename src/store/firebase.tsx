import { setData } from "./store";
import { initializeApp } from 'firebase/app';
import { Comments } from "../page/Article";
import firebase from 'firebase/compat/app';
import { getFirestore , doc , setDoc , collection , getDocs } from 'firebase/firestore';
import { MixedList } from "../component/SaveNewEntry";
import { getStorage, ref as storageRefBug , uploadBytes, getDownloadURL } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyCLTqbIw4mGorqYkb92wZk8bfHIumOX94o",
    authDomain: "test-75b5f.firebaseapp.com",
    projectId: "test-75b5f",
    storageBucket: "test-75b5f.appspot.com",
    messagingSenderId: "824729232108",
    appId: "1:824729232108:web:f898ba64078f0c6e30bbc9"
};

const fetchEscaleData = async (setEscaleData: (arg0: any[]) => void) => {

    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);

    const querySnapshot = await getDocs(collection(firestore, 'escale'));
    const escaleDataArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    setEscaleData(escaleDataArray);
    setData(escaleDataArray);
};

const getAllComments = async (nom:string,setComments: (arg0: Comments[]) => void) => {
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    const querySnapshot = await getDocs(collection(firestore, 'comments'));
    const allComments = querySnapshot.docs.map(doc => ({
        ...doc.data()
    }));
    let pivot = allComments.filter(comment => comment.idArticle === nom);
    let finalComments : Comments[]= [];
    pivot.forEach(
      (e)=>{
        finalComments.push({author:e.author, idArticle:e.idArticle ,comment: e.comment});
      }
    );

    setComments(finalComments);

  }

const saveComment = async (nomArticle:string,author:string,comment:string) =>{
    const cf = initializeApp(firebaseConfig);
    firebase.initializeApp(firebaseConfig);
    const firestore = getFirestore(cf);
    const newDocumentData = {
        idArticle: nomArticle,
        author: author,
        comment: comment
    };

    try{
      await setDoc(
      doc(firestore, 'comments', author.toLowerCase().replace(/[^a-z0-9]/g, '')),newDocumentData
    );
  } catch (error) {
    console.error('Error adding new document to Firestore:', error);
  }
}

const upload = async (image:File,myList:MixedList[],nomArticle:string,nomVille:string) =>{
    const cf = initializeApp(firebaseConfig);
    firebase.initializeApp(firebaseConfig);
    const firestore = getFirestore(cf);

    let downloadURL = "";
    const imageStorage = getStorage();
    const imageStorageRef : any = storageRefBug(imageStorage, `images/${image!.name}`);
    
    try {
        await uploadBytes(imageStorageRef, image!);
        downloadURL = await getDownloadURL(imageStorageRef);
        console.log('Image uploaded successfully. Download URL:', downloadURL);
    } catch (error) {
        console.error('Error uploading image:', error);
    }

    try {
      const parList: string[] = [];
    
      for (const item of myList) {
        if (typeof item === 'string') {
          parList.push(item);
        } else if (item instanceof File) {
          try {
            const storage = getStorage();
            const storageRef = storageRefBug(storage, `images/${item.name}`);
            await uploadBytes(storageRef, item);
            const parDownloadURL = await getDownloadURL(storageRef);
            parList.push(parDownloadURL);
          } catch (error) {
            console.error('Error uploading image:', error);
          }
        }
      }
    
      const newDocumentData = {
        NomArticle: nomArticle,
        contenuArticleParagraphe: parList,
        nomVille: nomVille,
        imgPreview: downloadURL
      };
      await setDoc(
        doc(firestore, 'escale', nomVille.toLowerCase().replace(/[^a-z0-9]/g, '')),
        newDocumentData
      );
    
    } catch (error) {
      console.error('Error adding new document to Firestore:', error);
    }

}

export { getAllComments , fetchEscaleData , saveComment , upload }