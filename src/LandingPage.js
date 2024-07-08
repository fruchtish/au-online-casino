import React from 'react';
import EnhancedSlotMachine from './EnhancedSlotMachine';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-blue-900 text-white">
      <header className="p-5 bg-black bg-opacity-50">
        <h1 className="text-3xl font-bold">AU Online Casino</h1>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to AU Online Casino</h2>
          <p className="text-xl">Experience the thrill of our Lucky Spinner Deluxe!</p>
        </section>
        
        <section className="mb-12">
          <EnhancedSlotMachine />
        </section>
        
        <section className="text-center">
          <h3 className="text-2xl font-bold mb-4">More Games Coming Soon!</h3>
          <p>Stay tuned for our expanding collection of exciting casino games.</p>
        </section>
      </main>
      
      <footer className="p-5 bg-black bg-opacity-50 text-center">
        <p>&copy; 2024 AU Online Casino. Play responsibly.</p>
      </footer>
    </div>
  );
};

export default LandingPage;