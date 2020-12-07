
import db from '../db/pickingWaves';

const pickingWaves = {
    getPickingWaves(){
        return db.getPickingWaves(); 
    },

    submitReport(pw, report){
        return db.submitReport(pw, report);
    }
}

export default pickingWaves;