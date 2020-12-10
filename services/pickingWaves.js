
import db from '../db/pickingWaves';

const pickingWaves = {
    getPickingWaves(){
        return db.getPickingWaves(); 
    },

    getAssociatedPickingWaves(picker){
        return db.getAssociatedPickingWaves(picker);
    },

    submitReport(pw, report){
        return db.submitReport(pw, report);
    }
}

export default pickingWaves;