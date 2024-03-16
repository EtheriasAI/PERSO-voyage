import { ref } from "firebase/storage";
import Entries from "../component/Entries";
import NewEntry from "../component/SaveNewEntry";
import React from "react";

const Home: React.FC = () => {

  const [addEntryModal, setAddEntryModal] = React.useState(false);
  

  return(
    <div className="App">
      <button onClick={() => setAddEntryModal(!addEntryModal)}>open/close</button>
      <Entries />
      {addEntryModal ? <NewEntry shown={addEntryModal}
        close={() => {
          setAddEntryModal(false);
        }} /> : null}
      
    </div>
  );

}
export default Home;