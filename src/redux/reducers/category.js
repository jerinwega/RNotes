const initialState = {
	number: 0,
	data:[],
	isLoading:false
}

export default category = (state = initialState, action) => {
	switch (action.type){
		case 'GET_CATEGORY_PENDING':
			return{
				isLoading: true
			}
		case 'GET_CATEGORY_REJECTED':
			return{
				isLoading: false 
			}
		case 'GET_CATEGORY_FULFILLED':
			return {
				isLoading: false,
				data: action.payload.data.data
			}

		/* POST ACTION */
		case 'ADD_CATEGORY_PENDING':
			return{
				...state,
				isLoading: true
			}
		case 'ADD_CATEGORY_REJECTED':
			return{
				...state,
				isLoading: false 
			}
		case 'ADD_CATEGORY_FULFILLED':
			return {
				...state,
				isLoading: false,
				data: state.data.concat(action.payload.data.status)
			}

		/* DELETE ACTION */
		case 'DEL_CATEGORY_PENDING':
			return{
				...state,
				isLoading: true
			}
		case 'DEL_CATEGORY_REJECTED':
			return{
				...state,
				isLoading: false 
			}
		case 'DEL_CATEGORY_FULFILLED':
			return {
				...state,
				isLoading: false,
				data: state.data.filter(note => note.id !== action.payload.data.status)
			}

		default:
			return state;
	}
}