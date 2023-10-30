export function tokenize(text: string){
    const words = text.split(' ')
    const tokens = words.map(word => word.split(''))
    return tokens
}