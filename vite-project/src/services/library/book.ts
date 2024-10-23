import { ROOT_URL } from "../index";
import axios from 'axios';

export interface Book{
    isbn: String,       // International Standard Book Number (unique)
	title: String,      
	pages: Number,      // Total page numbers
	published: Number,  // Year of publication
	authors: []         // Zero, one or multiple authors,
	image: String   
}

export async function getAllBooks(): Promise<any> {
    return await axios.get(ROOT_URL + "/books")
}
export async function getOneBook(idBook: string): Promise<any> {
    return await axios.get(ROOT_URL + "/books/" + idBook)
}
export async function createOneBookAttachToAuthor(newBook: Book, idAuthor: string): Promise<any> {
    return await axios.post(ROOT_URL + "/authors/"+idAuthor+"/books/", newBook,{
		headers:{
			"Content-Type": "application/json"
		}
	})
}
export async function removeOneBook(idBook: string): Promise<any> {
    return await axios.delete(ROOT_URL + "/books/" + idBook)
}
export async function updateOneBook(idBook: string, updatedBook: Book): Promise<any> {
    return await axios.put(ROOT_URL + "/books/" + idBook, updatedBook,{
		headers:{
			"Content-Type": "application/json"
		}
	})
}