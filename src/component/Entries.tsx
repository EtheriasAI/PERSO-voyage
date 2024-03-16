import { useEffect, useState } from "react";
import 'firebase/auth';
import 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { setData } from '../store/store';
import { Grid } from "@mui/material";
import './Entries.css';

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
            setData(escaleDataArray);
        };

        fetchEscaleData();
    }, []); 
    return (
        <div>
          <h2>Documents</h2>
          <Grid container spacing={3} justifyContent="space-evenly" style={{padding:"1vw"}}>
            {escaleData.map((data, index) => (
              <Grid item key={index} xs={3}>
                <Link to={`/article?index=${index}`} style={{ textDecoration: 'none' }}>
                  <Card sx={{ maxWidth: 345, m: 2 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={data.imgPreview}
                      alt="Nicola Sturgeon on a TED talk stage"
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary" component="p">
                        {data.nomVille}
                        {data.NomArticle}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </div>
      );
}
export default Entries;