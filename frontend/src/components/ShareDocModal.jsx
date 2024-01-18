import { useEffect, useState } from "react";
import { useAuth } from '@clerk/clerk-react';
import { alterDocPublicStatus } from "../utils/docApiRoutes.js";
import FullscreenSpinner from "./Spinner";
import { useRef } from "react";

export default function ShareDocModal({docId , isDocPublic , setIsDocPublic , isOwner}) {

  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const switchRef = useRef();

  async function handleChangePublicStatus(e) {
    try {
      setIsDocPublic(e.target.checked);
      setIsLoading(true);
      await alterDocPublicStatus(await getToken(), docId, e.target.checked);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      alert("Something went wrong");
      console.log(err);
    }
  }

  useEffect(() => {
    console.log(isDocPublic);
    if(!switchRef) return
    switchRef.current.checked = isDocPublic
    setIsDocPublic(isDocPublic)
  }
  , [isDocPublic , switchRef])

  function handleCopyLocation() {
    const currentLocation = window.location.href;
    navigator.clipboard.writeText(currentLocation);
    alert("Current location copied to clipboard!");
  }

  return (
    <div>
      {isLoading && <FullscreenSpinner/>}
      <label className="btn btn-primary" htmlFor="modal-2">
        Share
      </label>
      <input  className="modal-state" id="modal-2" type="checkbox" />
      <div className="modal">
        <label className="modal-overlay" htmlFor="modal-2"></label>
        <div className="modal-content flex flex-col gap-5">
          <label
            htmlFor="modal-2"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="text-xl">Share Document</h2>
          <p className="text-sm">
            Share this document with other users by making it public
          </p>
          <div className="flex gap-3">
            Make public : 
            <input ref={switchRef} onChange={handleChangePublicStatus} type="checkbox" className="switch" />
          </div>
          <div className="flex gap-3">
            {isDocPublic && <button className="btn btn-block btn-outline-primary" onClick={handleCopyLocation}>Copy Link</button>}
          </div>
        </div>
      </div>
    </div>
  );
}
