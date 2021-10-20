const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Trans = require("../models/Trans"); // while adding data to the database, it will follow 'Transs' schema
const { body, validationResult } = require("express-validator");

// ROUTE 1: get all the transactions using : GET "/api/trans/fetchalltrans". Login required
router.get("/fetchalltrans", fetchuser, async (req, res) => {
  try {
    const trans = await Trans.find({ user: req.user.id });
    res.json(trans);

    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error: some error occured");
  }
});

// ROUTE 2: add a new transaction using : POST "/api/trans/addtrans". Login required
router.post(
  "/addtrans",
  fetchuser,
  [
    // body("title", "Enter a valid title").isLength({ min: 3 }),
    body("title", "title must be atleast 1 character").isLength({
        min: 1}),
    body("amount", "amount must be atleast 1 character").isLength({
        min: 1}), 
  ],
  async (req, res) => {
    try {
      const { title, amount, type, date } = req.body;
      // if there are error, return bad request and the errors (array of errors)
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // if request gets rejected(contradict validations) then an array 'errors' will be get
      }
      const trans = new Trans({
        title,
        amount,
        type,
        date,
        user: req.user.id,
      });
      const savedTrans = await trans.save();

      res.json(savedTrans);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error: some error occured");
    }
  }
);

// ROUTE 3: update an existing trans using : PUT "/api/trans/updatetrans". Login required
router.put("/updatetrans/:id", fetchuser, async (req, res) => {
  const { title, amount, type } = req.body;
  //  Create a newTrans object
  const newTrans = {};
  if (title) {
    newTrans.title = title;
  }
  if (amount) {
    newTrans.amount = amount;
  }
  if (type) {
    newTrans.type = type;
  }

  try {
    //  find the trans to be updated and update it
    let trans = await Trans.findById(req.params.id);
    if (!trans) {
      return res.status(404).send("trans Not Found");
    }

    //  Allow updation only if user owns this trans
    if (trans.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed"); // if another user try to access other's trans
    }

    trans = await Trans.findByIdAndUpdate(
      req.params.id,
      { $set: newTrans },
      { new: true }
    );
    res.json({ trans });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error: some error occured");
  }
});

// ROUTE 4: delete an existing trans using : DELETE "/api/trans/deletetrans". Login required
router.delete("/deletetrans/:id", fetchuser, async (req, res) => {
  try {
    //  find the trans to be deleted and delete it
    let trans = await Trans.findById(req.params.id);
    if (!trans) {
      return res.status(404).send("trans Not Found");
    }

    // Allow deletion only if user owns this trans
    if (trans.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed"); // if another user try to access other's trans
    }

    trans = await Trans.findByIdAndDelete(req.params.id);
    res.json({ Success: "trans Has Been Deleted", trans: trans });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error: some error occured");
  }
});


// ROUTE 5: get total of all the transactions using : GET "/api/trans/balance". Login required
router.get("/balance", fetchuser, async (req, res) => {
  try {
    const trans = await Trans.find({ user: req.user.id });
    res.json(eval(trans.map((elem)=>{
      // return '+'+elem.amount
      return elem.type==='deposit'?'+'+elem.amount:'-'+elem.amount
    }).join("")));

    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error: some error occured");
  }
});


module.exports = router;
