import React from 'react';
import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'http://localhost:7000';

export const socket = io(URL);
export const SocketContext = React.createContext();