class OutOfStockError extends Error {
    constructor(message) {
      super(message);
      this.name = "OutOfStockError";
    }
  }
  
export { OutOfStockError };