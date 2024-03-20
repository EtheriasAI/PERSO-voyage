import { setData } from "./store";
import { initializeApp } from 'firebase/app';
import Article, { Comments } from "../page/Article";
import firebase from 'firebase/compat/app';
import { getFirestore , doc , setDoc , collection , getDocs, Timestamp } from 'firebase/firestore';
import { MixedList } from "../component/SaveNewEntry";
import { getStorage, ref as storageRefBug , uploadBytes, getDownloadURL } from 'firebase/storage';
// @ts-ignore
import CryptoJS from 'crypto-js';

const firebaseConfig : {
  apiKey: string,
  authDomain: string,
  projectId: string,
  storageBucket: string,
  messagingSenderId: string,
  appId: string,
  measurementId: string
} = decryptData("U2FsdGVkX1+Z7f2pC5KYPFCISetpC6T/GXuoLJ0h71GxF45+87XKusyXUBrWYtaZT4xfdtbg7EEqmKeOWkwSQq4p426m+ZdiMNhu/3G97nCGdGAivDhPJxtfsuxnKnINBPndIbsiXjJhH+Gf/vM6keG2K2bLvDP8puIWx4ICtPssT1wkbwrebOWEn6sZQ4POTS9dAxH0jsOxSa5+xCXB5QOD5sxI2Wo71bbiCAOj2iT7J3a/3Py/w/LPvjjkmd01YpZHp3kFjaGrLNgZXiu0skmXFproI1kWl/987jmrdyLQCT4ykfEkecBVYSkMexTJtGny5kSyfmQYVReCDRmeKCVS/txrA4Kt2I92A5zwkUPeZtEAhK8+sisn1m3uD9er+0LbK7z4+x7xiVStHULNasWUR6XCltoUz7E5mriaDRWhSjVZ4tFYkdOUy48sZ8Sa");



function decryptData(encryptedData:string) {
  const key ="7699a511088eb50804596981684ab8bb";
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, key);
  const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedData);
}

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

export { getAllComments , decryptData , fetchEscaleData , saveComment , upload }