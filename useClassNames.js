/**
 * @author Musa
 * @description This hook is used to create class names for the components
 * @returns {Function} function to create class names
 */
const useClassNames = () => {
	/**
	 * @param {Array} classNames - class names
	 * @returns {String} - String of class names
	 */
	function cn(...classNames) {
		return classNames.reduce((acc, curr) => {
			const object = typeof curr === 'object' ? curr : { curr: curr };
			if (typeof curr === 'string') acc += ` ${curr}`;
			else if (typeof curr === 'boolean') acc += ` ${Object.keys(object)[0]}`;
			else if (typeof curr === 'object') {
				Object.keys(curr).forEach((key) => {
					if (curr[key]) acc += ` ${key}`;
				});
			}
			return acc?.trim();
		}, '');
	}
	return cn;
};

export default useClassNames;
