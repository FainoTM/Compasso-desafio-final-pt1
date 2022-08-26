class NotFound {
  public readonly message: string;
  public readonly statusCode: number;

  constructor () {
    this.message = 'CSV not found';
    this.statusCode = 500;
  }
}
export default NotFound;
