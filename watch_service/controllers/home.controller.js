import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function allVids() {
  const allVids = await prisma.videoData.findMany();
  return allVids;
}

const getAllVideos = async (req, res) => {
  allVids()
    .then(async (allData) => {
      await prisma.$disconnect();
      console.log(allData)
      return res.status(200).send(allData);
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      console.log(allData)
      return res.status(400).send();
    });
};

export default getAllVideos;
