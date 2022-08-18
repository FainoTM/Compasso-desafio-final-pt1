class FullStock {
  public readonly message: string;
  public readonly statusCode: number;

  constructor () {
    this.message = 'This product cannot be added due stock size';
    this.statusCode = 507;
  }
}

export default FullStock;
