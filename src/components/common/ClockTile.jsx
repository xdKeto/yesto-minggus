import { useEffect, useState } from 'react';
import Tile from './Tile';

function getTime() {
  return new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date());
}

export default function ClockTile() {
  const [time, setTime] = useState(getTime);
  useEffect(() => {
    const timer = window.setInterval(() => setTime(getTime()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return <Tile color="#FD8451" className="home-clock flex flex-col items-center justify-center text-paper"><span className="font-mono text-5xl tracking-tight md:text-6xl">{time}</span><span className="font-mono text-lg tracking-[0.3em]">WIB</span></Tile>;
}
