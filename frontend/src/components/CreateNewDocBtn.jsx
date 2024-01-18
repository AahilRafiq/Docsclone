import { useAuth } from '@clerk/clerk-react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { createNewDoc } from "../utils/docApiRoutes.js";

export default function CreateNewDocBtn() {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [docName, setDocName] = useState("");

  async function handleNewDoc() {
    try {
      const res = await createNewDoc(await getToken(), docName);
      const docId = res.docId;
      navigate(`/docs/${docId}`);
    } catch (err) {
      alert("Error occured");
      console.log(err);
    }
  }

  return (
    <>
      <div>
        <label className="btn-rounded btn btn-primary" htmlFor="modal-1">
          New Document
        </label>
        <input className="modal-state" id="modal-1" type="checkbox" />
        <div className="modal">
          <label className="modal-overlay" htmlFor="modal-1"></label>
          <div className="modal-content flex flex-col gap-5">
            <label
              htmlFor="modal-1"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </label>
            <h2 className="text-xl">Enter Name Of Document</h2>
            <input
              onChange={(e) => setDocName(e.target.value)}
              className="input-block input"
              placeholder="Block"
            />
            <div className="flex gap-3 mx-auto">
              <button onClick={handleNewDoc} className="btn btn-solid-primary">
                Okay
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
