import axios from 'axios';

const url = 'http://192.168.6.196:3000';

export const getNotes = (search= '', sort= 'DESC') => {
	return{
		type: 'GET_NOTES',
		payload: axios.get(url+'/notes?search='+search+'&sort='+sort)
	}
}

export const getLoadData = (page, sort='DESC') => {
	return{
		type: 'GET_LOAD',
		payload: axios.get(url+'/notes?page='+page+'&sort='+sort)
	}
}

export const getByCategory = (id) => {
	return{
		type: 'GET_BYCATEGORY',
		payload: axios.get(url+'/categories/'+id)
	}
}

export const addNote = (title, note, category_id) => {
	return{
		type: 'ADD_NOTE',
		payload: axios.post(url+'/notes',{
			title: title,
			note: note,
			category: parseInt(category_id)
		})
	}
}

export const updateNote = (id, title, note, category_id) => {
	return{
		type: 'EDIT_NOTE',
		payload: axios.put(url+'/notes/'+id,{
			title: title,
			note: note,
			category: parseInt(category_id)
		})
	}
}

export const deleteNote = (id) => {
	return{
		type: 'DEL_NOTE',
		payload: axios.delete(url+'/notes/'+id)
	}
}