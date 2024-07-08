import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Volume2, VolumeX, Zap, DollarSign } from 'lucide-react';

// Note: In a real implementation, you'd install and import these packages
// import { SlotMachine, Reel } from 'react-slot-machine';
// import { useSound } from 'use-sound';

const SYMBOLS = [
  { id: 'wild', symbol: '🃏', value: 10, weight: 1 },
  { id: 'seven', symbol: '7️⃣', value: 7, weight: 2 },
  { id: 'diamond', symbol: '💎', value: 5, weight: 3 },
  { id: 'bell', symbol: '🔔', value: 4, weight: 4 },
  { id: 'cherry', symbol: '🍒', value: 3, weight: 5 },
  { id: 'lemon', symbol: '🍋', value: 2, weight: 6 },
];

const PAYLINES = [
  [1,1,1,1,1], // Middle row
  [0,0,0,0,0], // Top row
  [2,2,2,2,2], // Bottom row
  [0,1,2,1,0], // V shape
  [2,1,0,1,2], // Inverted V
];

const EnhancedSlotMachine = () => {
  const [reels, setReels] = useState(Array(5).fill().map(() => Array(3).fill(SYMBOLS[0])));
  const [spinning, setSpinning] = useState(false);
  const [credits, setCredits] = useState(1000);
  const [bet, setBet] = useState(10);
  const [win, setWin] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [payTable, setPayTable] = useState({});

  // Refs for sounds (in a real implementation, you'd use the useSound hook)
  const spinSound = useRef(null);
  const winSound = useRef(null);

  const generateSymbol = useCallback(() => {
    const totalWeight = SYMBOLS.reduce((sum, symbol) => sum + symbol.weight, 0);
    let random = Math.random() * totalWeight;
    for (const symbol of SYMBOLS) {
      if (random < symbol.weight) return symbol;
      random -= symbol.weight;
    }
    return SYMBOLS[SYMBOLS.length - 1];
  }, []);

  const spin = useCallback(() => {
    if (spinning || credits < bet) return;
    setSpinning(true);
    setCredits(prev => prev - bet);
    setWin(0);

    if (soundOn && spinSound.current) {
      spinSound.current.play();
    }

    const newReels = reels.map(() => 
      Array(3).fill().map(() => generateSymbol())
    );

    // Simulate the SlotMachine component's spinning
    setTimeout(() => {
      setReels(newReels);
      setSpinning(false);
      checkWin(newReels);
    }, 3000);
  }, [spinning, credits, bet, reels, generateSymbol, soundOn]);

  const checkWin = useCallback((finalReels) => {
    let totalWin = 0;
    PAYLINES.forEach(payline => {
      const line = payline.map((row, col) => finalReels[col][row]);
      const uniqueSymbols = new Set(line.map(s => s.id));
      if (uniqueSymbols.size === 1 || (uniqueSymbols.size === 2 && uniqueSymbols.has('wild'))) {
        const symbol = line.find(s => s.id !== 'wild') || line[0];
        const winAmount = bet * symbol.value * (line.filter(s => s.id === 'wild').length + 1);
        totalWin += winAmount;
      }
    });
    setWin(totalWin);
    setCredits(prev => prev + totalWin);

    if (totalWin > 0 && soundOn && winSound.current) {
      winSound.current.play();
    }
  }, [bet, soundOn]);

  useEffect(() => {
    if (autoPlay && !spinning && credits >= bet) {
      const timer = setTimeout(spin, 1000);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, spinning, credits, bet, spin]);

  useEffect(() => {
    const newPayTable = {};
    SYMBOLS.forEach(symbol => {
      newPayTable[symbol.id] = {
        3: bet * symbol.value,
        4: bet * symbol.value * 2,
        5: bet * symbol.value * 5
      };
    });
    setPayTable(newPayTable);
  }, [bet]);

  // In a real implementation, you'd use the useSound hook here
  useEffect(() => {
    spinSound.current = new Audio('/path/to/spin-sound.mp3');
    winSound.current = new Audio('/path/to/win-sound.mp3');
  }, []);

  return (
    <Card className="w-full max-w-4xl bg-gradient-to-b from-purple-900 to-blue-900 text-white shadow-2xl">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-bold text-yellow-400">Lucky Spinner Deluxe</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-1 mb-4 p-2 bg-black rounded-lg">
          {reels.map((reel, i) => (
            <div key={i} className="overflow-hidden h-48 bg-gradient-to-b from-gray-800 to-gray-900 rounded">
              <div className={`flex flex-col items-center transition-all duration-3000 ease-in-out ${spinning ? 'animate-spin-slot' : ''}`}>
                {reel.map((symbol, j) => (
                  <div key={j} className="w-full h-16 flex items-center justify-center text-4xl">
                    {symbol.symbol}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl">Credits: {credits}</div>
          <div className="text-xl">Bet: {bet}</div>
          <div className="text-xl text-yellow-400">Win: {win}</div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <Button onClick={() => setBet(prev => Math.max(1, prev - 1))} disabled={spinning}>-</Button>
          <Button onClick={spin} disabled={spinning || credits < bet} className="bg-yellow-400 hover:bg-yellow-500 text-black px-8">
            {spinning ? 'Spinning...' : 'SPIN'}
          </Button>
          <Button onClick={() => setBet(prev => Math.min(100, prev + 1))} disabled={spinning}>+</Button>
          <Button onClick={() => setAutoPlay(!autoPlay)} className={autoPlay ? 'bg-green-500' : ''}>
            <Zap size={24} />
          </Button>
          <Button onClick={() => setSoundOn(!soundOn)}>
            {soundOn ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </Button>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Pay Table</h3>
          <div className="grid grid-cols-3 gap-2 text-sm">
            {SYMBOLS.map(symbol => (
              <div key={symbol.id} className="flex items-center">
                <span className="mr-2">{symbol.symbol}</span>
                <span>x3: {payTable[symbol.id]?.['3']}</span>
                <span className="mx-1">|</span>
                <span>x4: {payTable[symbol.id]?.['4']}</span>
                <span className="mx-1">|</span>
                <span>x5: {payTable[symbol.id]?.['5']}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedSlotMachine;