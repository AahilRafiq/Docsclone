import { useAuth } from "@clerk/clerk-react";
import { getAllDocs } from "../utils/docApiRoutes.js";
import FullscreenSpinner from "../components/Spinner";
import { useEffect, useState } from "react";
import DocBtn from "../components/DocBtn";
import CreateNewDocBtn from "../components/CreateNewDocBtn";

export default function dashboard() {
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [docs, setDocs] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function getAndDisplayDocs() {
      try {
        const res = await getAllDocs(await getToken() , 1 , 7);
        if (res.length !== 0) setDocs(res.docs);
        setTotalPages(res.totalPages);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getAndDisplayDocs();
  }, []);

  function handlePageChange(page  , numPerPage) {
    async function getAndDisplayDocs() {
      try {
        setIsLoading(true);
        const res = await getAllDocs(await getToken() , page , numPerPage);
        if (res.length !== 0) setDocs(res.docs);
        setTotalPages(res.totalPages);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getAndDisplayDocs();
  }

  return (
    <div className=" flex flex-col justify-center items-center">
      <div className=" flex-grow-1">
        {isLoading && <FullscreenSpinner />}
        <div className="flex justify-center m-6">
          <CreateNewDocBtn />
        </div>
        {docs?.map((doc) => (
          <DocBtn key={doc._id} name={doc.name} docId={doc._id} />
        ))}
        <div className=" flex flex-col w-screen"></div>
      </div>

      <div className=" ">
        <div className="pagination pagination-compact m-4">

          {Array.from({ length: totalPages }, (_, i) => (
            <div key={i}>
              <input onClick={() => handlePageChange(i+1 , 7)} type="radio" name="pagination-2" id={`pgn-${i + 4}`} />
              <label htmlFor={`pgn-${i + 4}`} className="btn">
                {i + 1}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
