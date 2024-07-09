const express = require("express");
const router = express.Router();
const Notice = require("../models/Other/Notice");

// router.post("/getNotice", async (req, res) => {
//   try {
//     let notice = await Notice.find(req.body);
//     if (notice) {
//       res.json({ success: true, message: "Notice Get Successfully", notice });
//     } else {
//       res.status(404).json({ success: false, message: "No Notice Available!" });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// });


router.post("/getNotice", async (req, res) => {
  try {
    const { type } = req.body;
    const userId = req.session.userId;  // Example: Get logged-in user ID from session
    
    // Fetch student's language from database based on userId
    const student = await Student.findById(userId);  // Example: Replace with your actual user model and method
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    const studentLanguage = student.language;  // Assuming `language` is a field in your user model

    const notices = await Notice.find({ type: studentLanguage });

    if (notices.length > 0) {
      res.json({ success: true, message: "Notices Retrieved Successfully", notices });
    } else {
      res.status(404).json({ success: false, message: "No Notices Available for this language!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/addNotice", async (req, res) => {
  let { link, description, title, type } = req.body;
  try {
    let notice = await Notice.findOne({ link, description, title, type });
    if (notice) {
      return res
        .status(400)
        .json({ success: false, message: "Notice Already Exists!" });
    }
    await Notice.create({
      link,
      description,
      title,
      type,
    });
    const data = {
      success: true,
      message: "Notice Added Successfully",
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/updateNotice/:id", async (req, res) => {
  let { link, description, title, type } = req.body;
  try {
    let notice = await Notice.findByIdAndUpdate(req.params.id, {
      link,
      description,
      title,
      type,
    });
    if (!notice) {
      return res
        .status(400)
        .json({ success: false, message: "No Notice Available!" });
    }
    res.json({
      success: true,
      message: "Notice Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.delete("/deleteNotice/:id", async (req, res) => {
  try {
    let notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) {
      return res
        .status(400)
        .json({ success: false, message: "No Notice Available!" });
    }
    res.json({
      success: true,
      message: "Notice Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
