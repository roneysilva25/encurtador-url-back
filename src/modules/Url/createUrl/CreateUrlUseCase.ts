import { prisma } from "../../../database/prisma"
import { getDate30DaysAheadFromDate } from "../../../utils/get-date-30-days-ahead-from-date"
import { getRandomCode } from "../../../utils/get-random-code"
import { GenerateUniqueCodeService } from "./services/GenerateUniqueCodeService"

interface ICreateUrlUseCase {
    urlToShorten: string
}

export class CreateUrlUseCase {

    constructor(private readonly generateUniqueCodeService = new GenerateUniqueCodeService()) {}

    async execute({
        urlToShorten
    }: ICreateUrlUseCase) {

        const uniqueCode = await this.generateUniqueCodeService.execute()

        const shortenedUrlCreated = await prisma.url.create({
            data: {
                shortenedUrlCode: uniqueCode,
                originalUrl: urlToShorten,
                metadata: {
                    create: {
                        validThru: getDate30DaysAheadFromDate(new Date())
                    }
                }
            }
        });

        return shortenedUrlCreated
    }
}