export interface IBook {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  createdBy?: string;
}

export interface IUser {
  email: string;
  password: string;
}

export interface IApiResponse {
  userId: string;
  accessToken: string | null;
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    userId: string;
  };
}

export type IReview = {
  text: string;
}

export type INewUser = {
  email: string;
  password: string;
  confirmPassword: string;
}
