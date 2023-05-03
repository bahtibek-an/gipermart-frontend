import {useEffect, useRef} from 'react';

const useEffectAfterMount = (effect, dependencies) => {
    const initialRef = useRef(true);

    useEffect(() => {
        if (initialRef.current) {
            initialRef.current = false;
            return;
        }
        effect();
    }, dependencies);
};

export default useEffectAfterMount;