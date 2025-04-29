import { UrlMetadata } from "@prisma/client"
import { prisma } from "../../../../database/prisma"
import { thirtyDaysInMs } from "../../../../utils/thirty-days-in-ms"

interface IIsUrlStillValid {
    id: string
}

export class UrlValidityService {
    private hasUrlAnyMetadata(urlMetadata: UrlMetadata | null | undefined) {
        return !!urlMetadata
    }

    private hasLastClickBeenMoreThan30DaysAgo(lastClicked: Date) {
        const todaysDateInMs = new Date().getTime()
        const lastClickedInMs = lastClicked.getTime()
        return (todaysDateInMs - lastClickedInMs) > thirtyDaysInMs
    }

    private hasUrlEverBeenClicked(urlMetadata: UrlMetadata) {
        return !!urlMetadata.lastClicked
    }

    private isUrlPastValidDate(urlMetadata: UrlMetadata) {
        const todaysDate = new Date()
        return todaysDate > urlMetadata.validThru 
    }

    async isUrlStillValid({
        id
    }: IIsUrlStillValid) {
        const url = await prisma.url.findFirst({
            where: {
                id
            },
            include: {
                metadata: true
            }
        })

        const metadata = this.hasUrlAnyMetadata(url.metadata)

    }
}