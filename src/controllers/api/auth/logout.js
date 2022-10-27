const handleErrors = require("../../../helpers/handle-errors");

const logoutController = async (req, res) => {
  try {
    await req.session.destroy();

    return res.status(201).json('Successfully Logged Out!')
  } catch (err) {
    return handleErrors(res, err)
  }
}

module.exports = logoutController;
