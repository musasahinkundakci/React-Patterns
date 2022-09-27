import { useEffect, useState } from 'react';

import FirebaseAuthService from 'utils/FirebaseAuthService';

/**
 *
 * @author Musa
 */
const useFirebaseSubscriber = () => {
	const [user, setUser] = useState();

	//Firebase Authentication control
	useEffect(() => {
		//subscribe function returns Unscribe function
		const unsubscribe = FirebaseAuthService.subscribeToAuthChanges((userAuth) => {
			if (userAuth) {
				setUser(userAuth);
			} else {
				setUser(null);
			}
		});

		//when we unmount the dom we should unssubscribe
		return () => {
			unsubscribe && unsubscribe();
		};
	}, []);
	return user;
};

export default useFirebaseSubscriber;
