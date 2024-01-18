


async function getAllDocs(usertoken, page, numPerPage) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_API_ENDPOINT}/api/docs?page=${page}&numPerPage=${numPerPage}`,
      {
        headers: { Authorization: `Bearer ${usertoken}` },
      }
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function getDocById(docId, usertoken) {
  try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API_ENDPOINT}/api/docs/${docId}`, {
      headers: { Authorization: `Bearer ${usertoken}` },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function createNewDoc(usertoken , docName) {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_API_ENDPOINT}/api/docs/createdoc`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${usertoken}`,
      },
      body: JSON.stringify({ name: docName }),
    });
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err);
  }
}

async function UpdateDocData(usertoken, docId, newData) {
  try {
    await fetch(`${import.meta.env.VITE_BACKEND_API_ENDPOINT}/api/docs/${docId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${usertoken}`,
      },
      body: JSON.stringify({ data: JSON.stringify(newData) }),
    });
  } catch (err) {
    console.log(err);
  }
}

async function deleteDocById(usertoken, docId) {
  try {
    await fetch(`${import.meta.env.VITE_BACKEND_API_ENDPOINT}/api/docs/${docId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${usertoken}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

async function alterDocPublicStatus(usertoken, docId, isPublic) {
  try {
    await fetch(`${import.meta.env.VITE_BACKEND_API_ENDPOINT}/api/docs/${docId}?isPublic=${isPublic}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${usertoken}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
}


export { getDocById, createNewDoc ,getAllDocs , UpdateDocData , deleteDocById , alterDocPublicStatus};
