import { prisma } from "../../../../database/prisma"
import { getRandomCode } from "../../../../utils/get-random-code"

export class GenerateUniqueCodeService {
    private generateCode() {
        return getRandomCode()
    }

    private async generatedCodeExists(generatedCode: string) {
        return !!await prisma.url.findFirst({ where: { shortenedUrlCode: generatedCode } })
    }

    private async generateUniqueCode() {
        let codeExists = false
        let code = ''

        do {
            code = this.generateCode()
            codeExists = await this.generatedCodeExists(code)
        } while (codeExists)
        
        if (code === '') {
            throw new Error("Não foi possível gerar um código único")
        }

        return code
    }
    
    async execute() {
        return await this.generateUniqueCode()
    }
}