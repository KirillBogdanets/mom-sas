export function message(content: string): Buffer {
    return Buffer.from(content.toString())
}
