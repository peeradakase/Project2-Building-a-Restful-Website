const yup = require('yup');
const handleErrors = require('../../../helpers/handle-errors');
const prisma = require('../../../helpers/prisma');

const orderDetailSchema = yup.object({
  quantity: yup.number().required(),
  size: yup.string().required(),
  color: yup.string().required(),
  productId: yup.number().required()
})

const createOrderController = async (req, res) => {
  try {
    // 1. Get order detail from body
    const { body } = req;
    // 2. Validate order detail data
    const verifiedData = await orderDetailSchema.validate(body, { abortEarly: false, stripUnknown: true })

    // 3. Create new Order
    const dataToSave = {
      quantity: verifiedData.quantity,
      size: verifiedData.size,
      color: verifiedData.color,
      productId: verifiedData.productId,
      userId: req.session.user.id
    }
    const newOrder = await prisma.order.create({
      data: dataToSave
    })

    // 4. Return new order data
    return res.status(201).json(newOrder)
  } catch (err) {
    return handleErrors(res, err);
  }
}

module.exports = createOrderController;
