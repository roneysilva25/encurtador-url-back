export function getRandomCode() {
    return crypto.randomUUID().split("-")[0]
}