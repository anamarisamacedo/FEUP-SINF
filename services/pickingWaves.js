
import db from '../db/pickingWaves';

const pickingWaves = {
    getPickingWaves(){
        return db.getPickingWaves(); 
    },

    getAssociatedPickingWaves(picker){
        return db.getAssociatedPickingWaves(picker);
    },

    getPWNum(picker){
        return db.getPWNum(picker);
    },
    submitReportAndPicked(pw, report, picked, wave, pickingWave){
        return db.submitReportAndPicked(pw, report, picked, wave, pickingWave);
    }
}

export default pickingWaves;