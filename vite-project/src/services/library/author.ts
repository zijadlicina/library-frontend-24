import { ROOT_URL } from "../index"
import axios from "axios"

export interface author {
	guid: String,
	firstName: String,
	lastName: String,
	dob: Date | String,  	// date of birth
	books: []       // Zero, one or multiple books,
	image: String   // URL of image
}

export async function getAllAuthors(): Promise<any> {
    return await axios.get(ROOT_URL + "/authors")
}
export async function getOneAuthor(idAuthor: string): Promise<any> {
    return await axios.get(ROOT_URL + "/authors/" + idAuthor)
}
export async function createOneAuthorAttachToBook(newAuthor: author, idBook: string): Promise<any> {
    return await axios.post(ROOT_URL + "/books/"+ idBook +"/authors/", newAuthor,{
		headers:{
			"Content-Type": "application/json"
		}
	})
}
export async function removeOneAuthor(idAuthor: string): Promise<any> {
    return await axios.delete(ROOT_URL + "/authors/" + idAuthor)
}
export async function updateOneAuthor(idAuthor: string, updatedAuthor: author): Promise<any> {
    return await axios.put(ROOT_URL + "/authors/" + idAuthor, updatedAuthor,{
		headers:{
			"Content-Type": "application/json"
		}
	})
}