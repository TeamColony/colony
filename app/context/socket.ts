import React from 'react';
import {io, Socket} from 'socket.io-client';

export const socket = io();
export const SocketCtx = React.createContext({} as Socket);