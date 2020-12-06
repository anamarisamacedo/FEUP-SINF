
import db from '../db/pickingWaves';

const pickingWaves = {
    getPickingWaves(){
        return db.getPickingWaves(); 
    }
}

export default pickingWaves;