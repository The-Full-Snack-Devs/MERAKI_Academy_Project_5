const express = require("express");
const router = express.Router();
const {
  createNewPart,
  getAllParts,
  getPartById,
  getPartsByServiceId,
  updatePartById,
  deletePartById,
} = require("../controllers/part");

router.post("/", createNewPart);
router.get("/", getAllParts);
router.get("/:id", getPartById);
router.get("/service/:id", getPartsByServiceId);
router.put("/:id", updatePartById);
router.delete("/:id", deletePartById);

module.exports = router;

