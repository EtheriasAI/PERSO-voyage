import Entries from "../component/Entries";
import NewEntry from "../component/SaveNewEntry";
import React from "react";
import AddIcon from '@mui/icons-material/Add';
import "./Home.css";
import PwdAdd from "../component/pwdAdd";
import Map from "../component/Map";

const Home: React.FC = () => {

  const [addEntryModal, setAddEntryModal] = React.useState(false);
  const [pwdAddModal, setPwdAddModal] = React.useState(false);

  let dateTime = new Date()
  console.log(dateTime)

  return(
    <div className="App">
      <div className="screen">
        <div className="upper-half">
          <Map />
        </div>
        <div className="lower-half">
          <Entries />
          <button className="add" onClick={() => setPwdAddModal(true) } style={{ bottom:0, position:"fixed", margin: '10px', borderRadius: '50%', cursor: 'pointer', backgroundColor: '#e0e0e0', border: 'none' }} ><AddIcon style={{fontSize:"50px",color:"#fff",padding:"5px"}} /></button>
          {pwdAddModal ? <PwdAdd closeModal={() => setPwdAddModal(false)} openModal={() => setAddEntryModal(true)} /> : null}
          {addEntryModal ? <NewEntry closeModal={() => setAddEntryModal(false)} /> : null}
          
        </div>
      </div>

    </div>
  );

}
export default Home;