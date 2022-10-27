const yup = require('yup');
const _ = require('lodash');
const handleErrors = require('../../../../helpers/handle-errors.js');
const prisma = require("../../../../helpers/prisma");

const accountDetailSchema = yup.object({
  name: yup.string().required(),
  address:yup.string(),
  phoneNumber: yup.string()
})


const accountDetailUpdateController = async (req, res) => {
  try {
    const { body } = req;
    const verifiedData =await accountDetailSchema.validate(body, {
      abortEarly: false, stripUnknown: true
    })
    const dataToSave = {
      name: verifiedData.name,
      address: verifiedData.address,
      phoneNumber: verifiedData.phoneNumber
    }

    console.log(req.session.user, ' :req.session.user');
    const updateAccount = await prisma.user.update({
      where: {
        id: req.session.user.id
      },
      data: dataToSave
    })
    return res.status(201).json(_.omit(updateAccount, ['password']))
  } catch (err) {
    return handleErrors(res, err)
  }
}

module.exports = accountDetailUpdateController;
