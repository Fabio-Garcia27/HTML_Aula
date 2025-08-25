export function createSlug(username: string): string {
    return username
        .normalize('NFC') //Decompõe caracteres aentuados
        .replace(/[\u0300-\u036f]/g, '') //Remove marcas diacríticas
        .replace(/[^a-zA-Z0-9\s-]/g, '') //Remove caracteres especiais
        .replace(/\s+/g, '_') //Substitui espaços por hífens
        .replace(/-+/g, '_') //Remove hífens duplicados
        .toLowerCase() //Torna tudo em minúsculo
        .trim() //Remove espaços em branco
}