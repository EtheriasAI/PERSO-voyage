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
            <h2>VOYAGE LE HAVRE TO MARINA BAIE DES ANGES</h2>
            <br/>
            <p>
              
Le but de ce voyage est de rejoindre le nouveau port d'attache du voilier FATU HIVA.
Ce  voyage est également l'occasion de partager des moments sous voile et de découvrir d'autres paysages que ceux habituellement découverts depuis l'achat de FATU HIVA.
Parmis vous, j'ai eu un certain nombre d'équipiers à bord de mon bateau et ce voyage sera je l'espère l'occasion pour vous, de rembarquer à bord sur une partie de ce voyage. Difficile pour moi de prévoir où je serais à tel ou tel moment, c'est la raison de la création de ce blog, afin de pouvoir suivre l'avancement du  bateau et de convenir d'un éventuel embarquement ou débarquement pour d'éventuels coéquipiers.
Ce blog servira également de support pour  les photos et commentaires de ce voyage, et je l'espère de vos réactions.

Aujourd'hui c'est le début de l'aventure, le bateau est fin prêt dans les starting blocks, et le départ sera normalement effectué samedi 23 mars.
Nous devons démarrer ce périple à 3, José Alban et moi même.

En attendant le départ, à bientôt et bon vent.
            </p>
          </div>
          <div className="image">
            <img src="foto1.jpg" alt="Round Picture" />
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