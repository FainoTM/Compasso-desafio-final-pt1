export interface IUser {
    email: String,
    password: string
}

export interface IUserVar {
    email?: string,
    password?: string,
    page?: number,
    limit?: number
}

export interface IUserResponseToken {
    email: String,
    password?: string,
    token: String
}
