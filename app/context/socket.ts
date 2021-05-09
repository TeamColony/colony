import React from 'react';
import {io} from 'socket.io-client';

export const socket =  io();
export const SocketCtx = React.createContext({});