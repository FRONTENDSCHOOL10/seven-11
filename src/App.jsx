import router from '@/router';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
function App() {
  return (
    <HelmetProvider>
      <div className="App min-h-[698px] h-screen relative w-[320px] overflow-auto no-scrollbar mx-auto border border-gray-100">
        <RouterProvider router={router} />
      </div>
    </HelmetProvider>
  );
}

export default App;
