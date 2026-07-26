'use client';

const MAIN_SERVICES = [
  'Transportation (Road)',
  'Clearing & Forwarding Agent',
  'Logistics Solutions',
  'Custom Clearing Agent',
  'Marine Insurance',
  'Warehousing / Dock Stuffing',
  'International Freight Forwarders',
  'Sea Freight Forwarding',
  'Air Freight Forwarding',
  'Door to Door Services',
  'Cargo Handling Services',
];

const ADDITIONAL_SERVICES = [
  'Fumigation, Phytosanitary Certificate',
  'Palletisation / Fumigation',
  'Export Import Consultancy',
  'Certificate of Origin & Legalisation of Documents through Consulates',
];

const BG_IMAGE = 'https://sfile.chatglm.cn/images-ppt/d99f28f1a307.jpg';

export default function Services() {
  return (
    <section id="services" className="relative py-28 md:py-40 noise-bg overflow-hidden">
      {/* Subtle background image */}
      <div
        className="absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage: `url('${BG_IMAGE}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-[3] max-w-[1400px] mx-auto px-5 md:px-8">
        {/* Oversized section heading — partially cropped */}
        <div className="mb-14 md:mb-20 overflow-hidden">
          <h2 className="text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[8rem] font-bold leading-[0.9] tracking-[-0.04em] text-ink/10">
            Services
          </h2>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint mt-2">
            What we handle
          </p>
        </div>

        {/* Main services — manifest rows */}
        <div className="mb-16 md:mb-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-6">
            Core operations
          </p>
          <div className="border-t border-[rgba(245,240,232,0.08)]">
            {MAIN_SERVICES.map((service, i) => (
              <ServiceRow
                key={service}
                number={String(i + 1).padStart(2, '0')}
                name={service}
                isLast={i === MAIN_SERVICES.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Additional services — different treatment */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint mb-6">
            Also available
          </p>
          <div className="border-t border-[rgba(245,240,232,0.06)]">
            {ADDITIONAL_SERVICES.map((service, i) => (
              <ServiceRow
                key={service}
                number={String(MAIN_SERVICES.length + i + 1).padStart(2, '0')}
                name={service}
                isAdditional
                isLast={i === ADDITIONAL_SERVICES.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceRow({
  number,
  name,
  isAdditional = false,
  isLast = false,
}: {
  number: string;
  name: string;
  isAdditional?: boolean;
  isLast?: boolean;
}) {
  return (
    <div
      className={`group flex items-baseline gap-4 md:gap-8 py-4 md:py-5 pl-0 md:pl-0 border-b transition-all duration-200 cursor-default ${
        isLast ? 'border-b-0' : 'border-[rgba(245,240,232,0.06)]'
      } hover:pl-3 md:hover:pl-4 hover:border-l-accent hover:border-l-[2px]`}
    >
      <span
        className={`font-mono text-[11px] tabular-nums shrink-0 transition-colors duration-200 ${
          isAdditional ? 'text-ink-faint/40' : 'text-ink-faint'
        } group-hover:text-accent`}
      >
        {number}
      </span>
      <span
        className={`transition-colors duration-200 ${
          isAdditional
            ? 'text-ink-dim/60 text-[14px] md:text-[15px]'
            : 'text-ink text-[15px] md:text-[17px] font-medium'
        } group-hover:text-ink`}
      >
        {name}
      </span>
    </div>
  );
}