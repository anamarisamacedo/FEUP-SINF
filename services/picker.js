
import db from '../db/pickers';

const picker = {
    getPickers(){
        return db.getPickingWaves();
    },

    submitPicker(picker, pw){
        return db.submitPicker(picker, pw);
    }
}

export default picker;