    import { useParams, useSearchParams } from "react-router-dom";
    import { useLocation } from 'react-router-dom';
    import { getData } from '../store/store';
    import { useEffect } from "react";

    const Article: React.FC = () => {
    

        const [searchParams] = useSearchParams();
        const index = searchParams.get("index");
      
        useEffect(() => {
          console.log("Index:", index);
        }, [index]);
      
        return(
            <h2>hello</h2>
        );
    }
    export default Article;