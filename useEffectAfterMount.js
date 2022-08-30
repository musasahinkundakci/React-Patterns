/**
 *
 * @param {function}  cb
 * @param {Array}  dependencies
 * @param {Number} delay
 * @description useEffectAfterMount hook will work after the component is mounted and will not work on the first render
 */

const useEffectAfterMount = (cb, dependencies, delay = 500) => {
    const hasMounted = useRef(false);
    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
        } else {
            setTimeout(() => {}, [delay]);
        }
    }, dependencies);
};
