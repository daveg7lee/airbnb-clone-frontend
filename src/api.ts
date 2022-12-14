import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { formatDate } from "./lib/utils";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:8000/api/v1/"
      : "https://airbnbclone-w622.onrender.com/api/v1/",
  withCredentials: true,
});

export const getRooms = () =>
  instance.get("rooms/").then((response) => response.data);

export const getRoom = ({ queryKey }: QueryFunctionContext) =>
  instance.get(`rooms/${queryKey[1]}`).then((response) => response.data);

export const getRoomReviews = ({ queryKey }: QueryFunctionContext) =>
  instance
    .get(`rooms/${queryKey[1]}/reviews`)
    .then((response) => response.data);

export const getMe = () =>
  instance.get(`users/me`).then((response) => response.data);

export const logOut = () =>
  instance
    .post(`users/log-out`, null, {
      headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" },
    })
    .then((response) => response.data);

export const githubLogIn = (code: string) =>
  instance
    .post(
      `users/github`,
      { code },
      {
        headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" },
      }
    )
    .then((response) => response.status);

export const kakaoLogIn = (code: string) =>
  instance
    .post(
      `users/kakao`,
      { code },
      {
        headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" },
      }
    )
    .then((response) => response.status);

export interface IUsernameLogInVariables {
  username: string;
  password: string;
}

export interface IUsernameLoginSuccess {
  ok: string;
}

export interface IUsernameLoginError {
  error: string;
}

export const usernameLogIn = ({
  username,
  password,
}: IUsernameLogInVariables) =>
  instance
    .post(
      `users/log-in`,
      { username, password },
      {
        headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" },
      }
    )
    .then((response) => response.data);

interface ISignUpVariables {
  name: string;
  email: string;
  username: string;
  password: string;
  currency: string;
  gender: string;
  language: string;
}

export const SignUp = ({
  username,
  password,
  email,
  name,
  currency,
  gender,
  language,
}: ISignUpVariables) =>
  instance
    .post(
      `users/`,
      { username, password, email, name, currency, gender, language },
      {
        headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" },
      }
    )
    .then((response) => response.data);

export const getAmenities = () =>
  instance.get(`rooms/amenities`).then((response) => response.data);

export const getCategories = () =>
  instance.get(`categories/`).then((response) => response.data);

export interface IUploadRoomVariables {
  name: string;
  country: string;
  city: string;
  price: number;
  rooms: number;
  toilets: number;
  description: string;
  address: string;
  pet_friendly: boolean;
  kind: string;
  amenities: number[];
  category: number;
}

export const uploadRoom = (data: IUploadRoomVariables) =>
  instance
    .post(`rooms/`, data, {
      headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" },
    })
    .then((response) => response.data);

export const getUploadURL = () =>
  instance
    .post(`medias/photos/get-url`, null, {
      headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" },
    })
    .then((response) => response.data);

export interface IUploadImageVariables {
  file: FileList;
  uploadURL: string;
}

export const uploadImage = ({ file, uploadURL }: IUploadImageVariables) => {
  const form = new FormData();
  form.append("file", file[0]);

  return axios
    .post(uploadURL, form, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => response.data);
};

export interface ICreatePhotoVariables {
  roomId: string;
  file: string;
  description: string;
}

export const createPhoto = ({
  roomId,
  description,
  file,
}: ICreatePhotoVariables) =>
  instance
    .post(
      `rooms/${roomId}/photos`,
      { description, file },
      { headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" } }
    )
    .then((response) => response.data);

type CheckBookingQueryKey = [string, string?, Date[]?];

export const checkBooking = ({
  queryKey,
}: QueryFunctionContext<CheckBookingQueryKey>) => {
  const [_, roomId, dates] = queryKey;
  if (dates) {
    const [firstDate, secondDate] = dates;
    const checkIn = formatDate(firstDate);
    const checkOut = formatDate(secondDate);

    return instance
      .get(
        `rooms/${roomId}/bookings/check?check_in=${checkIn}&check_out=${checkOut}`
      )
      .then((response) => response.data);
  }
};
