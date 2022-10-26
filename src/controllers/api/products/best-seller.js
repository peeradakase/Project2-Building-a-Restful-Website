const prisma = require("../../../helpers/prisma");
const productBestSellerController = async (req, res) => {
  // Best Seller product criteria
  // Product which has isBestSeller === true
  const products = await prisma.product.findMany({
    where: {
      isBestSeller: true
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

module.exports = productBestSellerController;
