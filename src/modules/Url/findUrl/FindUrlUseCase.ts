import { prisma } from "../../../database/prisma"
import { UrlValidityService } from "./services/UrlValidityService";

interface IFindUrlUseCase {
    code: string
}

export class FindUrlUseCase {
    constructor(private readonly urlValidityService = new UrlValidityService()) {}

    private async getUrlByCode(code: string) {
        return await prisma.url.findFirst({
            where: {
                shortenedUrlCode: code,
                metadata: {
                    active: true
                }
            }
        });
    } 

    async execute({
        code
    }: IFindUrlUseCase) {
        const foundUrl = await this.getUrlByCode(code)

        if (!foundUrl) {
            throw new Error("URL não encontrada")
        }

        const isURLStillValid = await this.urlValidityService.isURLStillValid(foundUrl.id)

        if (!isURLStillValid) {
            this.urlValidityService.deletePastValidUrl(foundUrl.id)
            throw new Error("URL não encontrada")
        }

        this.urlValidityService.renewValidityBy30Days(foundUrl.id)
        
        return foundUrl
    }
}