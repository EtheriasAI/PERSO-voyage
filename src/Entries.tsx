import { useEffect, useState } from "react";
import 'firebase/auth';
import 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import React from 'react';

const Entries: React.FC = () => {
    const [escaleData, setEscaleData] = useState<any[]>([]);

    useEffect(() => {
        const fetchEscaleData = async () => {
            const firebaseConfig = {
                apiKey: "AIzaSyCLTqbIw4mGorqYkb92wZk8bfHIumOX94o",
                authDomain: "test-75b5f.firebaseapp.com",
                projectId: "test-75b5f",
                storageBucket: "test-75b5f.appspot.com",
                messagingSenderId: "824729232108",
                appId: "1:824729232108:web:f898ba64078f0c6e30bbc9"
            };

            const app = initializeApp(firebaseConfig);
            const firestore = getFirestore(app);

            const querySnapshot = await getDocs(collection(firestore, 'escale'));
            const escaleDataArray = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            console.log(escaleDataArray);
            setEscaleData(escaleDataArray);
        };

        fetchEscaleData();
    }, []); // Run only once on component mount
    /*<div key={index}>
                    <h2>{data.NomArticle}</h2>
                    <p>{data.contenuArticleParagraphe.join(", ")}</p>
                    <p>{data.nomVille}</p>
                    <img src={data.urlImage} alt="Escale Image" />
                </div>*/
                
    return(
        <div>
            <h2>Documents</h2>
            {escaleData.map((data, index) => (
                <IonCard>
                    <img alt="Silhouette of mountains" src={data.urlImage} />
                    <IonCardHeader>
                        <IonCardTitle>{data.nomVille}</IonCardTitle>
                        <IonCardSubtitle>{data.NomArticle}</IonCardSubtitle>
                    </IonCardHeader>
                
                </IonCard>
            ))}
        </div>
    );
}
export default Entries;