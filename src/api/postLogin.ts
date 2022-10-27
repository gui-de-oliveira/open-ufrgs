import axios from "axios";
import { BASE_URL } from "../config";

type LoginResult =
  | { tag: "SUCCESS"; sessionId: string }
  | {
      tag: "FAIL";
      error: LoginError;
    };

export type LoginError = "INVALID_LOGIN" | "LOCKED_USER" | "UNKNOWN_RESPONSE";

export async function postLogin({
  user,
  password,
}: {
  user: string;
  password: string;
}): Promise<LoginResult> {
  const response = await axios.post<LoginResult>(`${BASE_URL}/login`, {
    user,
    password,
  });

  return response.data;
}
