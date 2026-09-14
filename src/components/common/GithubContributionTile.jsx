import { useEffect, useState } from 'react';
import Tile from './Tile';

const levels = ['#1E333A', '#0E4429', '#006D32', '#26A641', '#39D353'];
const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'short' });

function EmptyState() { return <div className="flex h-full items-center justify-center p-5 text-center text-paper"><span className="font-mono text-sm">Contribution data is unavailable right now.</span></div>; }

function ContributionGrid({ days }) {
  const weeks = [];
  for (let index = 0; index < days.length; index += 7) weeks.push(days.slice(index, index + 7));
  const months = weeks.map((week) => monthFormatter.format(new Date(week[0]?.date))).filter((month, index, values) => month !== values[index - 1]);
  return <div className="flex min-w-0 flex-1 flex-col gap-2"><div className="flex justify-between px-1 font-mono text-xs text-paper/70">{months.map((month, index) => <span key={`${month}-${index}`}>{month}</span>)}</div><div className="flex gap-1 overflow-hidden"><div className="grid grid-rows-7 gap-1 pt-0 font-mono text-[9px] text-paper/60"><span>Mon</span><span /><span>Wed</span><span /><span>Fri</span><span /><span /></div><div className="grid grid-flow-col grid-rows-7 gap-1 overflow-hidden">{days.map((day) => <i key={day.date} title={`${day.date}: ${day.count} contributions`} className="h-3 w-3 rounded-[2px]" style={{ backgroundColor: levels[Math.min(day.level || 0, 4)] }} />)}</div></div><div className="flex items-center justify-end gap-1 font-mono text-[10px] text-paper/70"><span>Less</span>{levels.map((level) => <i key={level} className="h-3 w-3 rounded-[2px]" style={{ backgroundColor: level }} />)}<span>More</span></div></div>;
}

export default function GithubContributionTile() {
  const [days, setDays] = useState(null);
  useEffect(() => {
    let active = true;
    fetch('https://github-contributions-api.jogruber.de/v4/xdKeto').then((response) => response.ok ? response.json() : Promise.reject(new Error('Contribution request failed'))).then((data) => { if (active) setDays(data.contributions?.slice(-365) || []); }).catch(() => { if (active) setDays([]); });
    return () => { active = false; };
  }, []);
  return <Tile color="#16262B" className="home-contributions"><div className="flex h-full flex-col justify-center gap-4 p-5 text-paper"><div className="flex items-center justify-between border-b border-paper/20 pb-3 font-mono text-xs opacity-75"><span>Contributions in the last year</span><span>xdKeto</span></div>{days === null ? <div className="h-24 animate-pulse rounded bg-charcoal/70" /> : days.length === 0 ? <EmptyState /> : <ContributionGrid days={days} />}</div></Tile>;
}
