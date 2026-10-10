"use client";

import {
  GreenApiClient,
  type Instance,
} from "@green-api/whatsapp-api-client-js-v2";
import {
  createContext,
  type FC,
  type PropsWithChildren,
  useContext,
  useState,
} from "react";

interface ApiContextValue {
  client: GreenApiClient | null;
  createClient: (instance: Instance) => void;
  clearClient: () => void;
}

const ApiContext = createContext<ApiContextValue | undefined>(undefined);

export const ApiProvider: FC<PropsWithChildren> = ({ children }) => {
  const [client, setClient] = useState<GreenApiClient | null>(null);

  const createClient = (instance: Instance) => {
    setClient(new GreenApiClient(instance));
  };

  const clearClient = () => {
    setClient(null);
  };

  const value = { client, createClient, clearClient };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApiContext = () => {
  const context = useContext(ApiContext);

  if (!context) {
    throw new Error("useApiContext must be used within an ApiProvider");
  }

  return context;
};
