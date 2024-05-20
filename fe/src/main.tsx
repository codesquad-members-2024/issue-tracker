import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ThemeSwitch from "./components/ThemeSwitch/ThemeSwitch.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <div className="h-full my-auto transition-colors duration-500 bg-gray-100 dark:bg-darkModeBG dark:text-white">
        <QueryClientProvider client={queryClient}>
            <ThemeSwitch />
            <ReactQueryDevtools initialIsOpen={true} />
            <App />
        </QueryClientProvider>
    </div>
);
