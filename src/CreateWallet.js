import AddIcon from '@material-ui/icons/Add';
import {TextField, Button} from '@material-ui/core';
const CreateWallet = () => {

    
    const handleAdd = (e) => {
        e.preventDefault();
    }


    
    return ( 
        <div className="create-wallet-container">
            <h1 className="title">Aktywa w portfelu modelowym</h1>
            <form >
                <div className="wallet-form">
                    <p className="label">Nazwa aktywa</p>
                    <p className="label">%</p>
                    <div></div>
                    <TextField className="test" id="standard-basic" margin="normal"  />
                    <TextField id="standard-basic" margin="normal" />
                    <Button className="action-btn add-btn"  onClick={handleAdd}><AddIcon fontSize="large"/></Button>
                </div>
                
                <div className="bottom-buttons">
                    <Button>Anuluj</Button>
                    <Button >Zapisz</Button>
                </div>
            </form>
        </div>
     );
}
 
export default CreateWallet;