'use client';

import Cookies from 'js-cookie';
import { createContext, useReducer, ReactNode, Dispatch } from 'react';

interface AdminState {
  adminInfo: any; // You can replace 'any' with a more specific type if available
}

interface AdminAction {
  type: 'USER_LOGIN' | 'USER_LOGOUT';
  payload?: any; // You can replace 'any' with a more specific type if available
}

interface AdminContextType {
  state: AdminState;
  dispatch: Dispatch<AdminAction>;
}

export const AdminContext = createContext<AdminContextType | undefined>(undefined);

const initialState: AdminState = {
  adminInfo: Cookies.get('adminInfo')
    ? JSON.parse(Cookies.get('adminInfo') as string)
    : null,
};

function reducer(state: AdminState, action: AdminAction): AdminState {
  switch (action.type) {
    case 'USER_LOGIN':
      return { ...state, adminInfo: action.payload };
    case 'USER_LOGOUT':
      return { ...state, adminInfo: null };
    default:
      return state;
  }
}

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
