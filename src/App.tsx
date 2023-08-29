import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { SearchObjects } from './pages/SearchObjects/SearchObjects';
import { Details } from './pages/Details/Details';
import { NavBar } from './templates/NavBar/Navbar';

// Set up the React-Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 10 * 60 * 100, cacheTime: 200000 },
  },
});

function App() {
  React.useEffect(() => {
    document.body.style.backgroundColor = '#b3b3ac36';
  }, []);

  return (
    <div>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <NavBar />
          <Routes>
            <Route path="/" element={<SearchObjects />} />
            <Route
              path="/movies/:searchMoviesQuery/:id"
              element={<Details />}
            />
            <Route path="/books/:searchBooksQuery/:id" element={<Details />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
