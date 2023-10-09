import { 
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react';

import { ContextProviderProps, ContextType, Expense, User } from '../interfaces';

const defautState: ContextType = {
  user: undefined,
  setUser: (value: SetStateAction<User>) => { },
  setExpenses: (value: SetStateAction<Expense[]>) => { },
  expenses: [],
}

const Context = createContext<ContextType | undefined>(defautState);


export function ContextProvider({ children }: ContextProviderProps) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (!loggedUser) return;

    setUser(loggedUser);
  }, []);

  const value: ContextType = {
    user,
    setUser,
    expenses,
    setExpenses,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useContextApi() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
