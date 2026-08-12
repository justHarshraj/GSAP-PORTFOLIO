import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, CornerDownLeft } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface LogEntry {
  type: 'input' | 'output' | 'error';
  text: string;
}

export const TerminalSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [history, setHistory] = useState<LogEntry[]>([
    { type: 'output', text: 'AI-ML Terminal Core v2.4 initialized.' },
    { type: 'output', text: 'Welcome Harsh Raj. Type "help" to start.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [history]);

  // GSAP ScrollTrigger entrance
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.terminal-header', {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.terminal-header',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.terminal-box', {
        opacity: 0,
        scale: 0.95,
        duration: 0.5,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.terminal-box',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const command = inputValue.trim().toLowerCase();
    if (!command) return;

    const newHistory = [...history, { type: 'input' as const, text: `$ ${inputValue}` }];

    switch (command) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: 'Available commands:\n  about    – View summary about Harsh Raj\n  skills   – List technical core stack\n  projects – Show portfolio projects highlights\n  contact  – View contact details & socials\n  clear    – Clear console history'
        });
        break;
      case 'about':
        newHistory.push({
          type: 'output',
          text: "I'm a passionate web developer who thrives on creating visually bold, interactive, and technically robust digital experiences. I enjoy turning ideas into real-world applications using modern technologies. My expertise lies in blending cutting-edge technology with elegant design principles.\n\nBeyond coding, I serve as a Google Student Ambassador, helping students learn, connect, and grow within the tech community. I'm constantly exploring new technologies, building innovative projects, and striving to create solutions that solve real-world problems."
        });
        break;
      case 'skills':
        newHistory.push({
          type: 'output',
          text: 'Core Technical Stack:\n  [Frontend]   HTML5, CSS3, JavaScript, TypeScript, React, Next.js, Redux, Tailwind, Bootstrap\n  [Backend]    Node.js, Express, Python, Django, PHP, Java, C\n  [Database]   MongoDB, MySQL, Firebase, Supabase\n  [DevOps/Cloud] Git, GitHub, Docker, Vercel, Netlify, Google Cloud\n  [Design/Tools] VS Code, Postman, Figma, Canva, UI/UX'
        });
        break;
      case 'projects':
        newHistory.push({
          type: 'output',
          text: 'Key Projects:\n  1. GitCV - Developer resume builder from GitHub profile (React, TS, Tailwind)\n  2. Project Hyperlink - Clean developer workspace Chrome extension\n  3. TaskMaster Pro - High-performance Native DOM task manager\n  4. Project Umbrella - Green AI router and prompt minifier (Node.js)\n  5. TCS Traffic Congestion System - Computer vision AI traffic monitor (YOLOv8, Python)\n  6. Core Inventory System - Scalable warehouse management dashboard (Python, React)'
        });
        break;
      case 'contact':
        newHistory.push({
          type: 'output',
          text: 'Connection Protocols:\n  Email:    harshrajs1k@gmail.com\n  Phone:    +91 8799687791\n  GitHub:   github.com/justHarshraj\n  LinkedIn: linkedin.com/in/harsh-raj-533826287'
        });
        break;
      case 'clear':
        setHistory([]);
        setInputValue('');
        return;
      default:
        newHistory.push({
          type: 'error',
          text: `Command not recognized: "${command}". Type "help" for valid commands.`
        });
    }

    setHistory(newHistory);
    setInputValue('');

    // GSAP: Animate the new terminal entries
    requestAnimationFrame(() => {
      if (scrollContainerRef.current) {
        const entries = scrollContainerRef.current.querySelectorAll('.terminal-entry');
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          gsap.fromTo(lastEntry, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' });
        }
      }
    });
  };

  return (
    <section
      id="terminal"
      ref={sectionRef}
      className="min-h-screen flex flex-col pt-24 md:pt-32 pb-16 relative"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="terminal-header text-center mb-10 md:mb-14">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 bg-clip-text text-transparent"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            COMMAND CENTER
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto">
            Interact with the portfolio directly using our diagnostic CLI shell.
          </p>
        </div>

        {/* Console Box */}
        <div
          className="terminal-box backdrop-blur-md bg-[rgba(15,15,18,0.85)] border border-[rgba(192,192,192,0.15)] rounded-xl sm:rounded-2xl overflow-hidden flex flex-col h-[350px] sm:h-[400px] md:h-[500px]"
          style={{ boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(129, 138, 248, 0.05)' }}
        >
          {/* Header */}
          <div className="bg-[#141416] px-4 py-3 flex items-center justify-between border-b border-gray-800">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span className="text-xs text-gray-500 font-mono">harsh_raj@ml-shell: ~</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/25 border border-red-500/40" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/25 border border-yellow-500/40" />
              <span className="w-3 h-3 rounded-full bg-green-500/25 border border-green-500/40" />
            </div>
          </div>

          {/* Outputs */}
          <div
            ref={scrollContainerRef}
            className="flex-1 p-3 sm:p-4 md:p-6 overflow-y-auto font-mono text-[11px] sm:text-xs md:text-sm space-y-2 sm:space-y-3 scrollbar-thin"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {history.map((entry, index) => (
              <div
                key={index}
                className={`terminal-entry whitespace-pre-wrap leading-relaxed ${
                  entry.type === 'input'
                    ? 'text-indigo-400'
                    : entry.type === 'error'
                    ? 'text-red-400'
                    : 'text-gray-300'
                }`}
              >
                {entry.text}
              </div>
            ))}
          </div>

          {/* Form Input */}
          <form
            onSubmit={handleCommand}
            className="border-t border-gray-800 bg-[#101012] px-4 py-3 flex items-center gap-3"
          >
            <span className="text-indigo-400 font-mono text-sm sm:text-base">$</span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder='Type "help" to start...'
              className="flex-1 bg-transparent border-none outline-none font-mono text-gray-300 text-xs md:text-sm focus:ring-0 focus:outline-none placeholder-gray-600 min-w-0"
            />
            <button
              type="submit"
              className="text-gray-500 hover:text-indigo-400 transition-colors"
            >
              <CornerDownLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
