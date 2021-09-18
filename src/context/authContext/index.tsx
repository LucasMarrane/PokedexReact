import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextDto {
  nome: string;
  setNome: (value: string) => any
}
interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextContext =
  createContext<AuthContextDto>(
    {} as AuthContextDto
  );

export function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [nome, setNome] = useState<string>("lucas");
 
  
  return (
    <AuthContextContext.Provider
      value={{
        nome, setNome
      }}
    >
      {children}
    </AuthContextContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContextContext);

  return context;
}