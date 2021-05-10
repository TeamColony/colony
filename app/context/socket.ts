import React from 'react';
import {Socket} from 'socket.io-client';

export const SocketCtx = React.createContext({} as Socket);