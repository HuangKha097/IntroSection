import { useMutation } from "@tanstack/react-query";

const useMutationHook = (fnCallback, options = {}) => {
    return useMutation({
        mutationFn: fnCallback,
        ...options,
    });
};

export default useMutationHook;
