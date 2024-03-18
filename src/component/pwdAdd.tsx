import 'firebase/auth';
import './SaveNewEntry.css';
import 'firebase/firestore';
import {  IconButton } from "@mui/material";
import './pwdAdd.css';
import { useState } from 'react';
import CloseIcon from "@mui/icons-material/Close";

interface PwdAddProps {
    closeModal: () => void;
    openModal: () => void;
  }

const PwdAdd: React.FC<PwdAddProps> = (props) => {

    const [password, setPassword] = useState('');
    let pwd = '1234';

    const handleSubmit = () => {
        if (password === pwd) {
          props.closeModal();
          props.openModal();
        } else {
          console.log('Incorrect password!');
        }
      };
    
    return (
      <div className='pwdAddModal'>
        <div className="content">
          <IconButton onClick={props.closeModal} style={{float:'right'}} edge="end">
            <CloseIcon />
          </IconButton>
          <h2>Entrer le mot de passe admin</h2> {/* New text */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='submit' onClick={handleSubmit}>Valider</button>
         
        </div>
    </div>
    );
}
export default PwdAdd;
