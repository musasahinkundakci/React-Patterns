import { Component } from 'react';

import useAlert from 'hooks/useAlert';
import axios from 'axios';

/**
 * @author Musa
 * @description HOC for fetching data from the server
 * @param {JSX.Element} WrappedComponent
 * @returns {JSX.Element} - returns a Wrapper Component for adding loading,fetchhing,error logic
 */
export const withDataFetch = (WrappedComponent) => {
	const axiosPrivate = useAxiosPrivate();
	const { showError, showSuccess } = useAlert();

	/**
	 * @param {string} fetchURL - The URL to fetch data from
	 * @param {object} [body] - The body of the request
	 * @param {object} [filter] - The filter for the data
	 * @param {string} [successMessage] - The message to show on success
	 * @param {string} [errorMessage] - The message to show on error
	 * @param {Function} [afterFetch] - The function to run after fetching the data and it takes the data as a parameter
	 * @param {Function} [beforeFetch] - The function to run before fetching the data
	 * @param {Function} [onError] - The function to run on error
	 */
	class WithDataFetch extends Component {
		state = {
			data: null,
			loading: false,
			error: null,
			success: null
		};

		fetchData = async () => {
			const { fetchURL, body, successMessage, errorMessage, afterFetch, beforeFetch, filter } = this.props;
			try {
				beforeFetch && beforeFetch();

				this.setState({ loading: true });
				const response = await axiosPrivate.post(fetchURL, body ?? {});

				const transformedData = (afterFetch && afterFetch(response.data)) || response.data;

				this.setState({ data: transformedData, loading: false, error: null, success: successMessage });
				successMessage && showSuccess({ header: 'success', message: successMessage });
			} catch (error) {
				console.log(error);
				showError({
					header: 'error',
					message: errorMessage
				});
				this.setState({ error: errorMessage, loading: false });
			}
		};

		componentDidMount() {
			this.fetchData();
		}

		render() {
			return <WrappedComponent {...this.props} {...this.state} />;
		}
	}
	return WithDataFetch;
};
