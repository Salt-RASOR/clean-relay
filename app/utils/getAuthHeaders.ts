import { AuthData } from "../common/interfaces";

const getAuthHeaders = (authData: AuthData) => {
  return {
    headers: {
      userId: authData.userId,
      email: authData.email,
      Authorization: `${authData.jwtToken}`,
    },
  };
};

export default getAuthHeaders;
