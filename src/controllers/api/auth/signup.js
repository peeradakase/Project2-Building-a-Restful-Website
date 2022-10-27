const yup = require('yup');
const bcrypt = require('bcrypt');
const _ = require('lodash');

const prisma = require("../../../helpers/prisma");
const handleErrors = require('../../../helpers/handle-errors.js');

//Criteria Use for Validate by using yup
const signupSchema = yup.object({
  name: yup.string().required(),
  address: yup.string(),
  phoneNumber: yup.string(),
  email: yup.string().email().required().test({
    message: () => 'Email already exists',
    //logic for testing if the email is already existed
    test: async(value) => {
      try {
        await prisma.user.findUnique({ where: { email: value }, rejectOnNotFound: true})
        return false
      } catch (err) {
        return true
      }
    }
  }),
  password: yup.string().min(4).required(),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Password must match').required()

})

const authSignupController = async (req, res) => {
  try {
    const { body } = req
    const verifiedData = await signupSchema.validate(body, { abortEarly: false, stripUnknown: true})
    const dataToSave = {
      email: verifiedData.email,
      name: verifiedData.name,
      address: verifiedData.address,
      phoneNumber: verifiedData.phoneNumber,
      password: await bcrypt.hash(verifiedData.password, 10)
    }
    const newUser = await prisma.user.create({ data: dataToSave })

    req.session.user = { id: newUser.id }
    await req.session.save()

    return res.status(201).json(_.omit(newUser, ['password']))
  } catch (err) {
    return handleErrors(res, err)
  }
}

module.exports =  authSignupController;
