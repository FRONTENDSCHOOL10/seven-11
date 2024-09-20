import router from '@/router';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
function App() {
  return (
    <HelmetProvider>
      <div className="App relative min-h-screen w-[320px] mx-auto border box-border border-gray-100  no-scrollbar">
        <RouterProvider router={router} />
      </div>
    </HelmetProvider>
  );
}

export default App;
