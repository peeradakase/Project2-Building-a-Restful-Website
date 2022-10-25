//ต้องใช้prisma client คุยกับprisma
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = prisma;
