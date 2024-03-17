import { Link, useSearchParams } from "react-router-dom";
import { getData } from '../store/store';
import { useEffect, useState } from "react";
import { Box, Grid, TextField } from "@mui/material";
import 'firebase/auth';
import 'firebase/firestore';
import SendIcon from '@mui/icons-material/Send';
import './Article.css';
import HomeIcon from '@mui/icons-material/Home';
import { getAllComments, saveComment } from "../store/firebase";

interface Comments{
  author : string,
  comment: string,
  idArticle: string
}

const Article: React.FC = () => {
    
  const [comment,setComment] = useState<string>('');
  const [author,setAuthor] = useState<string>('');

  
  const [data, setData] = useState<{
    NomArticle: any; 
    ontenuArticleParagraphe:any;
    imgPreview:any;
    nomVille:any;
  }>({
    NomArticle: "",
    ontenuArticleParagraphe: null,
    imgPreview: null,
    nomVille: ""
}); 
    const [searchParams] = useSearchParams();
    const index = searchParams.get("index");
    const [name,setName] = useState<string>('');
    const [par, setPar] = useState<string[]>();
    const [comments, setComments] = useState<Comments[]>();
              
    useEffect(() => {
        let datas : any[]= getData();
        setData(datas[parseInt(index!)]);
        
    }, [index]);

    useEffect(()=>{
      display(data);
      getAllComments(data.NomArticle, setComments);
    },[data]);
      


    const display = (data:any) =>{
        setName(data.NomArticle);
        setPar(data.contenuArticleParagraphe);
    }

    const getHTML = (paragraphe: string) => {
        if (paragraphe.startsWith("http")) {
          return <img src={paragraphe} alt="Image" style={{display: "block", margin: "0 auto", width:"40vw"}}/>;
        } else {
          return <p style={{paddingRight:"5vw",paddingLeft:"5vw"}}>{paragraphe}</p>;
        }
    };
    

    const handleComment = async () => {
      let nom = data.NomArticle || "";
      saveComment(nom,author,comment);
  
    };

    return (

        <Grid container style={{ overflow: 'hidden' }}>
            <Grid item xs={0} style={{position:"fixed",margin: '10px'}}>
              <Link to="/">
                <button style={{ borderRadius: '50%', cursor: 'pointer', backgroundColor: '#e0e0e0', border: 'none' }}><HomeIcon style={{fontSize:"50px",color:"#fff",padding:"5px"}} /></button>
              </Link>
            </Grid>
            <Grid item xs={8} style={{ overflow: 'auto', maxHeight: '100vh'  }}>
            <h1 style={{fontSize:"3rem", textAlign:"center", padding:"1vw"}}>{name}</h1>
            <br />
            {par &&
                        par.map((paragraphe, index) => (
                          <><br /><div key={index}>{getHTML(paragraphe)}</div></>
                        ))}
            </Grid>
            <Grid item xs={4} style={{ maxHeight: '100vh', overflow: 'hidden', position: "relative" , display: "flex", flexDirection: "column"}}>
                    <Box className='comments' height="100vh">
                          <div style={{overflow:"auto", maxHeight:"80vh"}}>
                          {comments &&
                                    comments.map((comment, index) => (
                                      <div className="comment">
                                        <p style={{fontSize:"1.2rem"}}>{comment.author} :</p>
                                        <p>{comment.comment}</p>
                                      </div>
                                    ))}
                          </div>
                      <Grid style={{ position: "absolute", bottom: 0, right:0, left:0}}>
                        <div className="sendComment">
                          <Grid item xs={12}>
                            <label>Name : </label>
                            <TextField id="standard-basic" variant="standard" onChange={(e) => setAuthor(e.target.value)} value={author} />
                          </Grid>
                          <Grid item xs={12}>
                            <label>Comment : </label>
                          </Grid>
                          <Grid container spacing={6} alignItems="center" >
                            <Grid item xs={10}>
                              <textarea onChange={(e) => setComment(e.target.value)} value={comment} style={{ borderRadius:'10px' ,width:'100%',border: 'none', outline: 'none' , height: '5vh', padding: '0.75vw', resize:'none' }} ></textarea>
                            </Grid>
                            <Grid item xs={2}>
                              <SendIcon onClick={handleComment} style={{ cursor: 'pointer' }} />
                            </Grid>
                          </Grid>
                        </div>
                      </Grid>
                    </Box>
            </Grid>
          </Grid>
          );
}
export default Article;
export type { Comments };
