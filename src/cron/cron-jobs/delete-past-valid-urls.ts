import { prisma } from "../../database/prisma";

export async function deletePastValidUrls() {
    const now = new Date()
    return await prisma.url.deleteMany({
        where: {
            metadata: {
                validThru: {
                    lte: now
                }
            }
        }
    })
}