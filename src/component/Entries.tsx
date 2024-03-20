import { useEffect, useState } from "react";
import 'firebase/auth';
import 'firebase/firestore';
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Grid } from "@mui/material";
import './Entries.css';
import { fetchEscaleData } from "../store/firebase";

interface EntryProps {
  refresh: () => void;
  rValue: boolean;
}

const Entries: React.FC<EntryProps> = (props) => {
    const [escaleData, setEscaleData] = useState<any[]>([]);

    useEffect(() => {
      fetchEscaleData(setEscaleData);
    }, []); 

    useEffect(() => {
      fetchEscaleData(setEscaleData);
      props.refresh();
    }, [props.rValue]); 

    return (
        <div>
          <h1 style={{ textAlign: "center", margin:"1vw" }}>Consulter les étapes :</h1>
          <Grid container spacing={3} justifyContent="space-evenly" style={{padding:"1vw"}}>
            {escaleData.map((data, index) => (
              <Grid item key={index} xs={3} className="cardsLink" sx={{ animation: 'fadeInFromBottom 1s ease forwards',}}>
                <Link to={`/article?index=${index}`} style={{ textDecoration: 'none' }}>
                  <Card className="cards"
                  sx={{ maxWidth: 345, m: 2,
                    transition: 'transform 0.4s ease', 
                    '&:hover': { 
                      transform: 'scale(1.05)', 
                      transitionDelay: '0s', 
                    } }}>
                    <CardMedia
                      component="img"
                      sx={{ height:'100%' }}
                      image={data.imgPreview}
                      alt="Nicola Sturgeon on a TED talk stage"
                    />
                    <CardContent sx={{ height:'100%' }}>
                      <Typography variant="body2" color="text.secondary" component="p">
                        {data.nomVille}
                        {data.nameArticle || ""}
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