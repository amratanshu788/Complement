import { useState, useEffect, useRef } from 'react';
import { Coffee, Heart, Sparkles, Music, VolumeX } from 'lucide-react';

const compliments = [
  "You have the warmest smile 😊",
  "Your chai-making skills deserve an award ☕",
  "The world feels lighter when you talk 🌸",
  "Even your tired version is adorable 💛",
  "You handle everything with such grace ✨",
  "Your presence makes everything better 🌟",
  "You're stronger than you know 💪",
  "You deserve all the good things coming your way 🌈",
];

function App() {
  const [currentCompliment, setCurrentCompliment] = useState('');
  const [showCompliment, setShowCompliment] = useState(false);
  const [confetti, setConfetti] = useState<number[]>([]);
  const [chaiBreakActive, setChaiBreakActive] = useState(false);
  const [reminderMessage, setReminderMessage] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioFile, setAudioFile] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const generateCompliment = () => {
    const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
    setCurrentCompliment(randomCompliment);
    setShowCompliment(false);

    setTimeout(() => {
      setShowCompliment(true);
      triggerConfetti();
    }, 50);
  };

  const triggerConfetti = () => {
    const newConfetti = Array.from({ length: 20 }, (_, i) => i);
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 3000);
  };

  const startChaiBreak = () => {
    setChaiBreakActive(true);
    setReminderMessage("Step away from the Work… even superheroes need chai 💪");

    setTimeout(() => {
      setReminderMessage("Your chai must be missing you already 😅");
    }, 15000);

    setTimeout(() => {
      setChaiBreakActive(false);
      setReminderMessage('');
    }, 30000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      const url = URL.createObjectURL(file);
      setAudioFile(url);
      if (audioRef.current) {
        audioRef.current.src = url;
      }
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }
  }, [audioFile]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-50 via-cream-50 to-rose-50 flex items-center justify-center p-6 relative">
      <audio ref={audioRef} />
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      <div className="absolute top-6 right-6 flex gap-2">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 text-amber-700"
          title="Upload music"
        >
          <Music className="w-6 h-6" />
        </button>

        {audioFile && (
          <button
            onClick={toggleMusic}
            className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 text-amber-700"
            title={isPlaying ? 'Pause music' : 'Play music'}
          >
            {isPlaying ? <VolumeX className="w-6 h-6" /> : <Music className="w-6 h-6" />}
          </button>
        )}
      </div>
      <div className="max-w-2xl w-full relative z-10">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Coffee className="w-10 h-10 text-amber-700" />
            <h1 className="text-5xl font-bold text-amber-800 font-comfortaa">
              Chai & Compliments
            </h1>
            <Heart className="w-10 h-10 text-rose-400" />
          </div>
          <p className="text-amber-700 text-lg">
            A little warmth for your stressful day ☕💛
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-6 relative overflow-hidden">
          {confetti.map((id) => (
            <div
              key={id}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${2 + Math.random()}s`
              }}
            >
              {['💛', '✨', '🌸', '💕', '☕'][Math.floor(Math.random() * 5)]}
            </div>
          ))}

          <div className="min-h-[200px] flex items-center justify-center mb-6">
            {currentCompliment ? (
              <p className={`text-2xl md:text-3xl text-amber-900 font-medium text-center transition-all duration-700 ${showCompliment ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                {currentCompliment}
              </p>
            ) : (
              <p className="text-xl text-amber-600/60 text-center">
                Click below for a dose of kindness 💌
              </p>
            )}
          </div>

          <button
            onClick={generateCompliment}
            className="w-full bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 text-lg"
          >
            <Sparkles className="w-6 h-6" />
            Show Compliment 💌
          </button>
        </div>

        <div className="bg-amber-100/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 relative overflow-hidden">
          <button
            onClick={startChaiBreak}
            disabled={chaiBreakActive}
            className={`w-full bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transform transition-all duration-300 flex items-center justify-center gap-2 text-lg ${
              chaiBreakActive ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-xl'
            }`}
          >
            <Coffee className="w-6 h-6" />
            {chaiBreakActive ? 'Break in Progress...' : 'Take a Chai Break ☕'}
          </button>

          {reminderMessage && (
            <div className="mt-6 p-4 bg-white/70 rounded-xl animate-bounce-gentle">
              <p className="text-amber-900 text-center text-lg font-medium">
                {reminderMessage}
              </p>
            </div>
          )}
        </div>

        <div className="text-center mt-8 text-amber-700/60 text-sm">
          Made with 💛 to brighten your day
        </div>
      </div>
    </div>
  );
}

export default App;
