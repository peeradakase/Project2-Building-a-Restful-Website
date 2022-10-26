const prisma = require("../../../helpers/prisma");
const newArrivalProductController = async (req, res) => {
  // new arrival product criteria
  // get lastest product by id
  const products = await prisma.product.findMany({
    orderBy: {
      id: 'desc'
    },
    take: 1,
    include: {
      images: true
    }
  });

  if (!products) {
    return res.status(404).json({ message: "Can not find Product" });
  }
  res.json(products[0]);

}

module.exports = newArrivalProductController;
