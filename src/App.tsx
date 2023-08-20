import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Typography } from "@mui/material";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { SearchObjects } from "./pages/SearchObjects";
import { Details } from "./pages/Details";

// Set up the React-Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 10 * 60 * 100, cacheTime: 200000 },
  },
});

function App() {
  React.useEffect(() => {
    document.body.style.backgroundColor = "#b3b3ac36";
  }, []);

  return (
    <div>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Typography
            variant="h3"
            sx={{
              color: "#494947",
              fontFamily: "Open Sans",
              marginLeft: "5px",
            }}
          >
            Movies - Books Explorer
          </Typography>
          <Routes>
            <Route path="/" element={<SearchObjects />} />
            <Route path="/movies/:searchQuery/:id" element={<Details />} />
            <Route path="/books/:searchQuery/:id" element={<Details />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
