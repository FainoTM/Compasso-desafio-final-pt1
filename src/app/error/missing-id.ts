class MissingId {
  public readonly message: string;
  public readonly statusCode: number;

  constructor () {
    this.message = 'ID not found';
    this.statusCode = 404;
  }
}
export default MissingId;
