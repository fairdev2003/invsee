import {QueryClient, QueryClientProvider, useMutation} from "@tanstack/react-query";
import {ReactNode} from "react";

const ApiProvider = ({ children }: {children: ReactNode}) => {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            { children }
        </QueryClientProvider>
    )
}

export default ApiProvider