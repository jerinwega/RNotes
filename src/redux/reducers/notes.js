const initialState = {
	number: 0,
	data:[],
	page: 1,
	isLoading:false
}

export default notes = (state = initialState, action) => {
	switch (action.type){

		/* GET ACTION */
		case 'GET_NOTES_PENDING':
			return{
				isLoading: true
			}
		case 'GET_NOTES_REJECTED':
			return{
				isLoading: false 
			}
		case 'GET_NOTES_FULFILLED':
			return {
				isLoading: false,
				sortBy: action.payload.data.sortBy,
				page: action.payload.data.page,
				totalpage: action.payload.data.totalPage,
				data: action.payload.data.data
			}

		/* GET LOAD DATA */
		case 'GET_LOAD_PENDING':
			return{
				...state,
				Loading: true
			}
		case 'GET_LOAD_REJECTED':
			return{
				...state,
				Loading: false 
			}
		case 'GET_LOAD_FULFILLED':
			return {
				...state,
				Loading: false,
				data: [...state.data, ...action.payload.data.data]
			}

		/* GET NOTE BY CATEGORY */
		case 'GET_BYCATEGORY_PENDING':
			return{
				...state,
				isLoading: true
			}
		case 'GET_BYCATEGORY_REJECTED':
			return{
				...state,
				isLoading: false 
			}
		case 'GET_BYCATEGORY_FULFILLED':
			return {
				...state,
				isLoading: false,
				sortBy: action.payload.data.sortBy,
				page: action.payload.data.page,
				totalpage: action.payload.data.totalPage,
				data: action.payload.data.data
			}

		/* ADD ACTION */
		case 'ADD_NOTE_PENDING':
			return{
				...state,
				isLoading: true
			}
		case 'ADD_NOTE_REJECTED':
			return{
				...state,
				isLoading: false 
			}
		case 'ADD_NOTE_FULFILLED':
			return {
				...state,
				isLoading: false,
				data: [action.payload.data.status, ...state.data]
			}

		/* UPDATE ACTION */
		case 'EDIT_NOTE_PENDING':
			return{
				...state,
				isLoading: true
			}
		case 'EDIT_NOTE_REJECTED':
			return{
				...state,
				isLoading: false 
			}
		case 'EDIT_NOTE_FULFILLED':
			return {
				...state,
				isLoading: false,
				data: state.data.map( note => 
					(note.id == action.payload.data.status.id) ?
							action.payload.data.status : note )

			}
		
		/* DELETE ACTION */
		case 'DEL_NOTE_PENDING':
			return{
				...state,
				isLoading: true
			}
		case 'DEL_NOTE_REJECTED':
			return{
				...state,
				isLoading: false 
			}
		case 'DEL_NOTE_FULFILLED':
			return {
				...state,
				isLoading: false,
				data: state.data.filter(note => note.id !== action.payload.data.status)
			}

		default:
			return state;
	}
}