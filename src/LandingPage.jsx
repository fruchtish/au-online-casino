import React from 'react';
import EnhancedSlotMachine from './components/EnhancedSlotMachine';
import './styles/index.css'; // Ensure you import the CSS file

const LandingPage = () => {
  return (
    <div className="min-h-screen text-white background">
      <header className="p-5 bg-black bg-opacity-50 shadow-lg">
        <h1 className="text-3xl font-bold tracking-wide">AU Online Casino</h1>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to AU Online Casino</h2>
          <p className="text-xl mb-6">Experience the thrill of our Lucky Spinner Deluxe!</p>
          <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded shadow-lg">
            Play Now
          </button>
        </section>
        
        <section className="mb-12 flex justify-center">
          <EnhancedSlotMachine />
        </section>
        
        <section className="text-center">
          <h3 className="text-2xl font-bold mb-4">More Games Coming Soon!</h3>
          <p>Stay tuned for our expanding collection of exciting casino games.</p>
        </section>
      </main>
      
      <footer className="p-5 bg-black bg-opacity-50 text-center shadow-lg">
        <p>&copy; 2024 AU Online Casino. Play responsibly.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
