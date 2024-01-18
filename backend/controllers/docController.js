import Doc from "../models/docModel.js";

// GET /api/docs
async function getAllDocs(req, res) {
  try {
    const page = parseInt(req.query.page);
    const numPerPage = parseInt(req.query.numPerPage);
    let docs = await Doc.find({ ownerId: req.auth.userId })
    const totalPages = Math.ceil(docs.length / numPerPage);
   
    docs = docs.slice((page - 1) * numPerPage, page * numPerPage);
    
    res.status(200).json({ docs, totalPages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

// POST /api/docs/createdoc
async function createDoc(req, res) {
  try {
    const doc = new Doc({
      name: req.body.name,
      ownerId: req.auth.userId,
      isPublic: false,
      data: null,
    });
    await doc.save();
    res.status(201).json({ docId: doc._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

// GET /api/docs/:id
async function getDocById(req, res) {
  try {
    const doc = await Doc.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Doc not found" });
    if (!doc.isPublic && doc.ownerId !== req.auth.userId)
      return res.status(403).json({ message: "Unauthorized" });
    res.status(200).json(doc);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

// POST /api/docs/:id
async function updateDocById(req, res) {
  try {
    let doc = await Doc.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Doc not found" });
    doc.data = req.body.data;
    await doc.save();
    res.status(200).json({ message: "Doc updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

// PATCH /api/docs/:id
async function patchPublicStatusDocById(req, res) {
  try {
    const docId = req.params.id;
    if (!docId) return res.status(400).json({ message: "Invalid document ID" });

    let doc = await Doc.findById(docId);
    if (req.auth.userId !== doc.ownerId)
      return res.status(403).json({ message: "Unauthorized" });
    if (!doc) return res.status(404).json({ message: "Doc not found" });

    console.log(req.query.isPublic);
    doc.isPublic = req.query.isPublic;
    await doc.save();

    res.status(200).json({ message: "Doc updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

// DELETE /api/docs/:id
async function deleteDocById(req, res) {
  try {
    let doc = await Doc.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Doc not found" });
    await Doc.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Doc deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

export {
  getAllDocs,
  createDoc,
  getDocById,
  updateDocById,
  patchPublicStatusDocById,
  deleteDocById,
};

