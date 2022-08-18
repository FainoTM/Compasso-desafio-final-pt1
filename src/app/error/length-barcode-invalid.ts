class BarCodeInvalid {
  public readonly message: string;
  public readonly statusCode: number;

  constructor () {
    this.message = 'This bar code is invalid';
    this.statusCode = 400;
  }
}

export default BarCodeInvalid;
