const prisma = require("../../../helpers/prisma");
const storeGirlsProductController = async (req, res) => {

  const products = await prisma.product.findMany({
    where: {
      isStoreGirl: true
    },
    include: {
      images: true
    }
  });

  if (!products) {
    return res.status(404).json({ message: "Can not find Product" });
  }
  res.json(products);

}

module.exports = storeGirlsProductController;
