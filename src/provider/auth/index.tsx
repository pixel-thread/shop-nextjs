"use client";
import { AuthContext } from "@/context/auth";
import { Prisma } from "@/generated/prisma";
import { AUTH_ENDPOINT } from "@/lib/constants/endpoints/auth";
import { AuthContextT } from "@/types/auth/context";
import http from "@/utils/http";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import axiosInstance from "@/utils/api";

type AuthProviderProps = { children: Readonly<Required<React.ReactNode>> };

type UserT = Required<
  Prisma.UserGetPayload<{ include: { auth: true; address: true; cart: true } }>
>;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { isSignedIn, getToken } = useAuth();
  const [isTokenSet, setIsTokenSet] = React.useState(false);

  const {
    data: user,
    isFetching: isLoadingMe,
    refetch: mutate,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => http.get<UserT>(AUTH_ENDPOINT.GET_ME),
    select: (data) => data?.data,
    enabled: isTokenSet,
  });

  const verifyUser = useCallback(async () => {
    if (isSignedIn) {
      const token = await getToken({ template: "jwt" });
      if (token) {
        axiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${token}`;
        setIsTokenSet(true);
      }
    }
  }, [isSignedIn, getToken]);

  useEffect(() => {
    if (!isSignedIn) {
      axiosInstance.defaults.headers.common["Authorization"] = "";
    }
  }, [isSignedIn]);

  useEffect(() => {
    if (isSignedIn) {
      verifyUser();
    }
  }, [isSignedIn]);

  const value: AuthContextT = {
    user: user,
    isAuthLoading: isLoadingMe,
    isSuperAdmin: user?.role === "SUPER_ADMIN" || false,
    refresh: () => mutate(),
  } satisfies AuthContextT;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
