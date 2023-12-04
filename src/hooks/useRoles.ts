import { useEffect, useState } from "react";
import token from "../utils/axiosAuth";
import { useAppSelector } from "../hooks/useAppSelector";
import { AppState } from "../redux/store";
import { Role } from "../types/Role";
import baseURL from "../utils/axiosInstance";
import { AxiosError } from "axios";

const useRoles = (selectedCategory: string) => {
  const authToken = useAppSelector((state: AppState) => state.userSlice.token);
  const [roles, setRoles] = useState<Role[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedCategory === "users") {
      const fetchData = async () => {
        try {
          token.set(authToken);
          const { data } = await baseURL.get<Role[]>("/roles");
          setRoles(data);
        } catch (e) {
          const error = e as AxiosError;
          setError(error.message);
        }
      };
      fetchData();
    }
  }, [authToken, selectedCategory]);

  return { roles, error };
};

export default useRoles;
