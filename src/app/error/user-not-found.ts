class UserNotFound {
  public readonly message: string;
  public readonly statusCode: number;

  constructor () {
    this.message = 'User was not found';
    this.statusCode = 404;
  }
}

export default UserNotFound;
