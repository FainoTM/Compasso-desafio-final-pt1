export interface IUser {
    id?: String,
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
    id?: String,
    email: String,
    password?: string,
    token: String
}
