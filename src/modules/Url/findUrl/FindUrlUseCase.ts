import { prisma } from "../../../database/prisma"
import { NotFoundError, UrlExpiredError } from "../../../errors";
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
            },
            include: {
                metadata: {
                    select: {
                        validThru: true,
                    },
                },
            },
        });
    } 

    async execute({
        code
    }: IFindUrlUseCase) {
        const foundUrl = await this.getUrlByCode(code)

        if (!foundUrl) {
            throw new NotFoundError("URL não encontrada")
        }

        const isURLStillValid = await this.urlValidityService.isURLStillValid(foundUrl.id)

        if (!isURLStillValid) {
            this.urlValidityService.deletePastValidUrl(foundUrl.id)
            throw new UrlExpiredError(undefined, { 
                urlId: foundUrl.id,
                expiredAt: foundUrl.metadata?.validThru,
            });
        }

        this.urlValidityService.renewValidityBy30Days(foundUrl.id)
        
        return foundUrl
    }
}