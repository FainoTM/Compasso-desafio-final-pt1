class IncorrectPassword {
  public readonly message: string;
  public readonly statusCode: number;

  constructor () {
    this.message = 'The password is incorrect';
    this.statusCode = 404;
  }
}

export default IncorrectPassword;
