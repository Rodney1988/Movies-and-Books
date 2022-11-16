import { SearchObjects } from "./SearchObjects.tsx"
import { QueryClient, QueryClientProvider } from "react-query"
import { Typography } from "@mui/material"

function App() {
    // Set React-Query configurations
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { staleTime: 10 * 60 * 100, cacheTime: 200000 },
        },
    })

    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <Typography
                    variant="h3"
                    sx={{ color: "#494947", fontFamily: "Open Sans" }}
                >
                    Movies - Books Explorer
                </Typography>
                <SearchObjects />
            </QueryClientProvider>
        </div>
    )
}

export default App
