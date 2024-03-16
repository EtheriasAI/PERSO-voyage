import { useParams, useSearchParams } from "react-router-dom";
import { getData } from '../store/store';
import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";

const Article: React.FC = () => {
    

    const [searchParams] = useSearchParams();
    const index = searchParams.get("index");
    const [name,setName] = useState<string>('');
    const [par, setPar] = useState<string[]>();
    const [gallery, setGallery] = useState<string[]>();
              
    useEffect(() => {
        console.log("Index:", index);
        let datas : any[]= getData();
        let data = datas[parseInt(index!)];
        display(data);
    }, [index]);
      
    const display = (data:any) =>{
        setName(data.NomArticle);
        setPar(data.contenuArticleParagraphe)
    }

    const getHTML = (paragraphe: string) => {
        if (paragraphe.startsWith("http")) {
          return <img src={paragraphe} alt="Image" />;
        } else {
          return <p>{paragraphe}</p>;
        }
      };

    return (

        <Grid container>
            <Grid item xs={8}>
            <h2>{name}</h2>
            {par &&
                        par.map((paragraphe, index) => (
                        <div key={index}>{getHTML(paragraphe)}</div>
                        ))}
            </Grid>
                <Grid item xs={4}>
                    <Box bgcolor="secondary.main" height="100vh">
                        {gallery &&
                                    gallery.map((img, index) => (
                                    <img src={img} alt="Image" />
                                    ))}
                    </Box>
                </Grid>
            </Grid>
          );
}
export default Article;