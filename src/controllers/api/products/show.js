const prisma = require("../../../helpers/prisma");

const productsController = async (req, res) => {
  //req.param (url param)
  // {
  //    id: 2,
  //    name: Mo
  // }

  //เราใช้url param จะได้รู้ว่า แต่ละหน้าเป็น productตัวไหน
  const { id } = req.params;

  //เราขอข้อมูลจากdb แบยasync แล้วมาจัดการเองให้เป็นแบบsync โดยใช้ promiseช่วย
  const product = await prisma.product.findUnique({
    where: {
      //แปลงstr ให้เป็นตัวเลขด้วยparseInt แล้วเอาไปหาด้วยId
      id: parseInt(id)
    }
  });

  if (!product) {
    return res.status(404).json({ message: "Can not find Product"})
  }
  res.json(product);

}
module.exports = productsController;
