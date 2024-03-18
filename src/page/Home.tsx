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
  const [refresh,setRefresh] = React.useState(false);

  return(
    <div className="App">
      <div className="screen">
        <div className="upper-half">
          <Map />
        </div>
        <div className="lower-half">
          <div className="presentation">
          <div className="text">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam convallis nibh eu convallis posuere.
              Integer sit amet tempor nulla. Quisque gravida vehicula orci, nec commodo elit placerat at.
            </p>
          </div>
          <div className="image">
            <img src="foto1.jpeg" alt="Round Picture" />
          </div>
          </div>
          <Entries refresh={() => setRefresh(false)} rValue={refresh} />
          <button className="add" onClick={() => setPwdAddModal(true) } style={{ bottom:0, position:"fixed", margin: '10px', borderRadius: '50%', cursor: 'pointer', backgroundColor: '#e0e0e0', border: 'none' }} ><AddIcon style={{fontSize:"50px",color:"#fff",padding:"5px"}} /></button>
          {pwdAddModal ? <PwdAdd closeModal={() => setPwdAddModal(false)} openModal={() => setAddEntryModal(true)} /> : null}
          {addEntryModal ? <NewEntry closeModal={() => setAddEntryModal(false)} refresh={() => setRefresh(true)} /> : null}
          
        </div>
      </div>

    </div>
  );

}
export default Home;