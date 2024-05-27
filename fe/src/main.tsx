import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import ThemeSwitch from "./components/ThemeSwitch/ThemeSwitch.tsx";
import ErrorFallBack from "./common/ErrorFallBack.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60,
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <div className="h-full my-auto transition-colors duration-500 bg-gray-100 dark:bg-darkModeBG dark:text-white">
        <QueryClientProvider client={queryClient}>
            <ErrorBoundary FallbackComponent={ErrorFallBack}>
                <ThemeSwitch />
                <ReactQueryDevtools initialIsOpen={true} />
                <App />
            </ErrorBoundary>
        </QueryClientProvider>
    </div>
);
