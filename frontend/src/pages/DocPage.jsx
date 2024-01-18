import ReactQuill from "react-quill";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import FullscreenSpinner from "../components/Spinner";
import { useAuth } from "@clerk/clerk-react";
import { useRef } from "react";
import {UpdateDocData,getDocById} from "../utils/docApiRoutes.js";
import {socket,onSocketConnect,onSocketReceiveChanges,onSocketDisconnect} from "../utils/socket.js";
import { useNavigate } from "react-router-dom";
import ShareDocModal from "../components/ShareDocModal.jsx";
import DeleteDocModal from "../components/DeleteDocModal.jsx";
import DownloadBtn from "../components/DownloadBtn.jsx";
import { useParams } from "react-router-dom";

export default function DocPage() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("Untitled Document");
  const [isDocPublic, setIsDocPublic] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const { getToken , userId} = useAuth();
  const quillRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const quillmodules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['clean']
    ],
  }

  const quillformats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  async function handleSaveClick() {
    try {
      setIsLoading(true);
      await UpdateDocData(await getToken(), params.docId, value);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
  // FETCH DOC DATA
  useEffect(() => {
    async function getAndDisplayDoc() {
      try {

        if(!userId || !getToken) return

        setIsLoading(true);
        const res = await getDocById(params.docId, await getToken());
        const textdata = JSON.parse(res.data);
        setValue(textdata);
        setTitle(res.name);
        setIsDocPublic(res.isPublic);
        if(res.ownerId === userId) setIsOwner(true);
        setIsLoading(false);
      } catch (err) {
        alert("You are not authorized to view this document");
        navigate("/dashboard");
        setIsLoading(false);
        console.log(err);
      }
    }
    getAndDisplayDoc();
  }, [userId , getToken ]);

  // SOCKET CONNECTION AND HANDLERS
  useEffect(() => {
    if (params.docId === undefined) return;
    if (!quillRef.current) return;
    if (!socket) return;

    socket.connect();

    socket.on("connect", () => onSocketConnect(socket, params, setIsConnected, setIsLoading));
    socket.on("disconnect", () => onSocketDisconnect(setIsConnected));
    socket.on("receive-changes", (delta) => onSocketReceiveChanges(delta, quillRef, setValue));

    return () => {
      socket.off("connect",onSocketConnect(socket, params, setIsConnected, setIsLoading));
      socket.off("disconnect", () => onSocketDisconnect(setIsConnected));
      socket.off("receive-changes", (delta) =>onSocketReceiveChanges(delta, quillRef, setValue));
    };
  }, [socket, params.docId, quillRef]);


  // EMIT CHANGES TO SOCKET
  useEffect(() => {
    if (!quillRef.current) return;
    if (!isConnected) return;

    quillRef.current.getEditor().on("text-change", (delta, value, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta, params.docId);
      const newvalue = quillRef.current.getEditor().getContents();
      setValue(newvalue);
    });

    return () => {
      socket.off("receive-changes");
    };
  }, [isConnected, quillRef]);

  // Respond to quill changes
  function handleChange(value, delta, source, editor) {
    if (source !== "user") return;
    const newvalue = editor.getContents();
    setValue(newvalue);
  }

  return (
    <>
      {isLoading && <FullscreenSpinner />}
      <div className="flex flex-row items-center justify-center flex-wrap m-2">
        <span className="badge badge-flat-primary badge-xl p-4 m-2">
          {title}
        </span>
        <button onClick={handleSaveClick} className="btn btn-primary m-2">
          Save
        </button>
        {/* Delete button */}
        {isOwner && <DeleteDocModal docId={params.docId} />}

        {/* Alter public status */}
        {isOwner && <ShareDocModal
          docId={params.docId}
          isDocPublic={isDocPublic}
          setIsDocPublic={setIsDocPublic}
          isOwner={isOwner}
        />}

        {/* Download PDF */}
        <DownloadBtn quillDelta={value} />

      </div>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={handleChange}
        modules={quillmodules}
        formats={quillformats}
        className=" min-h-screen h-full "
      />
    </>
  );
}
