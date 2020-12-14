import stockDb from '../db/stock';

const stockService = {
  getItemLoc(itemRef){
    return stockDb.getItemLoc(itemRef);
  },

  getItems(){
    return stockDb.getItems();
  },

  updateStock(items){
    for(var item in items){
      stockDb.updateItem(item);
    }
  }

  
}

export default stockService;