import { useContext } from 'react';

import { SocketContext } from '../context/SocketContext';


export function useSocket() {

  const context = useContext(SocketContext);

  if (!context) {
    throw new Error(
      'useSocket deve ser usado dentro de SocketProvider'
    );
  }

  return context;
}