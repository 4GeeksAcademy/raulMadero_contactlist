const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [],			
		},
		actions: {
			// Use getActions to call a function within a fuction
			getContacts: async () => {
				const store = getStore()
				
			}
		}
	};
};

export default getState;
