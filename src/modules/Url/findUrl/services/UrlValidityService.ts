import { prisma } from "../../../../database/prisma"
import { getDate30DaysAheadFromDate } from "../../../../utils/get-date-30-days-ahead-from-date"
import { InternalError } from "../../../../errors"

export class UrlValidityService {
    private isURLPastValidDate(validThru: Date) {
        const todaysDate = new Date()
        return todaysDate > validThru
    }

    private async getUrlMetadata(urlId: string) {
        const metadata = await prisma.urlMetadata.findFirst({ where: { urlId } }) 
        if (!metadata) {
            throw new InternalError("A URL não possui metadados");
        }
        return metadata
    }

    public async isURLStillValid(urlId: string) {
        const metadata = await this.getUrlMetadata(urlId)
        return !this.isURLPastValidDate(metadata.validThru)
    }

    public async renewValidityBy30Days(urlId: string) {
        return await prisma.urlMetadata.update({
            where: {
                urlId
            },
            data: {
                validThru: getDate30DaysAheadFromDate(new Date()),
                lastClicked: new Date(),
                numberOfClicks: {
                    increment: 1
                }
            }
        })
    }

    public async deletePastValidUrl(pastValidUrlId: string) {
        return await prisma.url.delete({ where: { id: pastValidUrlId } })
    }
}