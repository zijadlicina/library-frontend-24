import axios from "axios"
import { ROOT_URL } from ".."

interface authorBook {
    id: String,
    author_guid: String,
    book_isbn: String
}

export async function getAuthorsOfBook(idBook: string) {
    return await axios.get(ROOT_URL + "/books/" + idBook + "/authors")
}

export async function getBooksOfAuthor(idAuthor: string) {
    return await axios.get(ROOT_URL + "/authors/" + idAuthor + "/books")
}