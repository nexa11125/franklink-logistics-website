'use client';

const CLIENTS = [
  'Pulsotronic India Technology LLP',
  'Lifeline Technologies',
  'Nichem Solutions',
  'Roto Leaner Technology Pvt Ltd',
  'Broad Bizz',
  'Sal S Marine Products',
  'EMU Lines Pvt Ltd',
  'Total Transport Systems Ltd',
  'Virya Logistics Technologies',
  'HEM Clearing Agency',
  'Champs Corporation',
];

const DESTINATIONS = [
  'Germany', 'China', 'USA', 'Colombo', 'Hamburg', 'Mersin',
  'Dubai', 'Singapore',
];

export default function Clients() {
  return (
    <section id="clients" className="relative py-28 md:py-40 border-t border-[rgba(245,240,232,0.06)]">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        {/* Section label */}
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint mb-12">
          Trusted by
        </p>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden mb-20 md:mb-28">
        <MarqueeRow clients={CLIENTS} direction="left" speed={35} />
        <MarqueeRow clients={CLIENTS} direction="right" speed={40} />
      </div>

      {/* Destinations */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint mb-5">
          Key destinations
        </p>
        <p className="text-ink-dim text-[15px] md:text-[17px] leading-relaxed">
          {DESTINATIONS.map((d, i) => (
            <span key={d}>
              {d}
              {i < DESTINATIONS.length - 1 && (
                <span className="inline-block mx-2.5 text-ink-faint text-[8px] align-middle">●</span>
              )}
            </span>
          ))}
          <span className="text-ink-faint ml-1">& 40+ more countries</span>
        </p>
      </div>
    </section>
  );
}

function MarqueeRow({ clients, direction, speed }: { clients: string[]; direction: 'left' | 'right'; speed: number }) {
  const items = [...clients, ...clients, ...clients];
  return (
    <div className="overflow-hidden mb-3">
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        {items.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="font-mono text-[12px] md:text-[13px] uppercase tracking-[0.12em] text-ink-faint/60 px-6 md:px-10 shrink-0"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}