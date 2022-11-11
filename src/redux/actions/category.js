import axios from 'axios';

const url = 'http://192.168.6.196:3000';

export const getCategory = () => {
	return{
		type: 'GET_CATEGORY',
		payload: axios.get(url+'/categories')
	}
}

export const addCategory = (name, url) => {
	return{
		type: 'ADD_CATEGORY',
		payload: axios.post(url+'/categories',{
			category:name,
			icon_image:url
		})
	}
}

export const deleteCategory = (id) => {
	return{
		type: 'DEL_CATEGORY',
		payload: axios.delete(url+'/categories/'+id)
	}
}