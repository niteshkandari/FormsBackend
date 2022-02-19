const mongoose = require("mongoose");
const Form = require("../models/form");

exports.get_all_form = (req, res, next) => {
  Form.find()
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        Form: docs.map((doc) => {
          return {
            _id: doc._id,
            name: doc.name,
            address: doc.address,
            email: doc.email,
            phoneNumber: doc.phoneNumber,
            service: doc.service,
            request: {
              type: "GET",
              url: "http://localhost:6060/form/" + doc._id,
            },
          };
        }),
      });
    })
    .catch((err) => {
      res.status(500).json({
        message_1: err.message,
        message_2: "something went wrong",
      });
    });
};

exports.create_form = (req, res, next) => {
  const form = new Form({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    service: req.body.service,
  });
  form
    .save()
    .then((result) => {
      console.log(result, "check");
      res.status(201).json({
        message: "form saved",
        formData: result,
      });
    })
    .catch((err) => {
      console.log(err, "check err");
      res.status(500).json({
        error: err,
        message: "error occurred",
      });
    });
};

exports.get_form = (req, res, next) => {
  const id = req.params.formId;
  Form.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: "not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

exports.delete_form = (req, res, next) => {
  const id = req.params.formId;
  Form.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.update_form = (req, res, next) => {
  const id = req.params.formId;
  console.log(res.body, "check patch");
  // const updateOps = {};
  // for (const item of req.body){
  //   updateOps[item.propName] = item.value;
  // }
  Form.updateOne(
    { _id: id },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
      },
    }
  )
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
