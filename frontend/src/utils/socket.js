import { io } from 'socket.io-client';
const URL = import.meta.env.VITE_BACKEND_API_ENDPOINT;

export const socket = io(URL , {
    autoConnect: false
})

export function onSocketConnect(socket , params , setIsConnected , setIsLoading) {
    socket.emit("join-room", params.docId);
    setIsConnected(true);
    setIsLoading(false);
}

export function onSocketDisconnect(setIsConnected) {
    setIsConnected(false);
}

export function onSocketReceiveChanges(delta , quillRef , setValue) {
    const quillInstance = quillRef.current.getEditor();
    quillInstance.updateContents(delta);
    const newvalue = quillInstance.getContents();
    setValue(newvalue);
}