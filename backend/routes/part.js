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

const authentication = require("../middlewares/authentication");

router.post("/", createNewPart);
router.get("/", getAllParts);
router.get("/:id", getPartById);
router.get("/service/:id", authentication, getPartsByServiceId);
router.put("/:id", updatePartById);
router.delete("/:id", deletePartById);

module.exports = router;

