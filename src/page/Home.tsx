import Entries from "../component/Entries";
import NewEntry from "../component/SaveNewEntry";
import React from "react";
import "./Home.css";

const Home: React.FC = () => {

  const [addEntryModal, setAddEntryModal] = React.useState(false);
  

  return(
    <div className="App">
      <button onClick={() => setAddEntryModal(true)}>open/close</button>
      <Entries />
      {addEntryModal ? <NewEntry closeModal={() => setAddEntryModal(false)} /> : null}
      
    </div>
  );

}
export default Home;