import { setData } from "./store";
import { initializeApp } from 'firebase/app';
import Article, { Comments } from "../page/Article";
import firebase from 'firebase/compat/app';
import { getFirestore , doc , setDoc , collection , getDocs, Timestamp } from 'firebase/firestore';
import { MixedList } from "../component/SaveNewEntry";
import { getStorage, ref as storageRefBug , uploadBytes, getDownloadURL } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyAfEo-YYE3ubRQtYKXdrga-6dVEcfQ28DA",
  authDomain: "lehavrebaiedesanges.firebaseapp.com",
  projectId: "lehavrebaiedesanges",
  storageBucket: "lehavrebaiedesanges.appspot.com",
  messagingSenderId: "595254873813",
  appId: "1:595254873813:web:59895e20dd23ff7ca75c5c",
  measurementId: "G-K9CZ82377L"
};

const fetchEscaleData = async (setEscaleData: (arg0: Article[]) => void) => {

    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);

    const querySnapshot = await getDocs(collection(firestore, 'escale'));
    const escaleDataArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    console.log(escaleDataArray)
    const arrayOfArticles: Article[] = escaleDataArray.map((item: any) => {
      return {
        nameArticle: item.nameArticle,
        contenuArticleParagraphe: item.contenuArticleParagraphe,
        imgPreview: item.imgPreview,
        nomVille: item.nomVille,
        date:(item.date as Timestamp).toDate()
      };
    });
    const filteredArticles = arrayOfArticles.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
  });
    setEscaleData(filteredArticles);
    setData(filteredArticles);
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
        const date = (e.date as Timestamp).toDate();
        finalComments.push({author:e.author, idArticle:e.idArticle ,comment: e.comment,date:date});
      }
    );

    //finalComments.sort((a: Comments, b: Comments) => a.date.getTime() - b.date.getTime());
    const filteredDates = finalComments.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
    });
    setComments(finalComments);

  }

const saveComment = async (nomArticle:string,author:string,comment:string,date:Date) =>{
    const cf = initializeApp(firebaseConfig);
    firebase.initializeApp(firebaseConfig);
    const firestore = getFirestore(cf);
    const newDocumentData = {
        idArticle: nomArticle,
        author: author,
        comment: comment,
        date:date
    };

    try{
      await setDoc(
      doc(firestore, 'comments', (author.toLowerCase().replace(/[^a-z0-9]/g, '')+date)),newDocumentData
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
        nameArticle: nomArticle,
        contenuArticleParagraphe: parList,
        nomVille: nomVille,
        imgPreview: downloadURL,
        date: new Date()
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