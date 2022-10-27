const handleErrors = require('../../../../helpers/handle-errors.js');
const prisma = require("../../../../helpers/prisma");

const accountDetailIndexController = async(req, res) => {
  try {
    //find user Info from DB
    const user = await prisma.user.findUnique({
      where: {
        id: req.session.user.id
      }
    });

    if (!user) {
      return res.status(404).send({ message: "Please login"})
    }

    //Return User Info
    return res.json(user);
  } catch (error) {
    return handleErrors(res, error);
  }
}

module.exports = accountDetailIndexController;
