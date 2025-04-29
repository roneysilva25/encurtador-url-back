import { prisma } from "../../../database/prisma"

interface IFindUrlUseCase {
    code: string
}

export class FindUrlUseCase {
    async execute({
        code
    }: IFindUrlUseCase) {
        const foundUrl = await prisma.url.findFirst({
            where: {
                shortenedUrlCode: code
            }
        });

        if (!foundUrl) {
            throw new Error("URL não encontrada")
        }

        return foundUrl
    }
}