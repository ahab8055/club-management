const express = require("express");
const router = express.Router();
const { Student, Teacher } = require("../models");

router.get("/student", async (req, res) => {
  try {
    const student = await Student.findAll({
      include: [
        {
          model: Teacher,
        },
      ],
    });
    return res.status(200).send({ ...student });
  } catch (error) {
    return res.status(500).send({ message: `Error ${error}` });
  }
});

router.post("/student", async (req, res) => {
  try {
    const student = await Student.create({ ...req.body });
    return res.status(201).send({ ...student });
  } catch (error) {
    return res.status(500).send({ message: `Error ${error}` });
  }
});

router.put("/student/:id", async (req, res) => {
  try {
    const isExist = await Student.findByPk(req.params.id);
    if (!isExist) {
      return res.status(404).send({ message: "Student Not Found" });
    }
    await Student.update(
      { ...req.body },
      { where: { id: req.params.id } }
    );
    return res.status(200).send({ message: "Student updated Successfully" });
  } catch (error) {
    return res.status(500).send({ message: `Error ${error}` });
  }
});

router.delete("/student/:id", async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    student.destroy();
    return res.status(202).send({ message: "Student Deleted Successfully" });
  } catch (error) {
    return res.status(500).send({ message: `Error ${error}` });
  }
});

module.exports = router;
