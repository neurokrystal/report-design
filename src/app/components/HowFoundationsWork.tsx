export function HowFoundationsWork() {
  return (
    <div className="space-y-8">
      <div>
        <p style={{ color: '#DC4C0C', fontWeight: 800, letterSpacing: '0.06em', fontSize: '14px', marginBottom: '30px' }}>07</p>
        <h1 style={{ fontFamily: '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif', fontWeight: 600, letterSpacing: '-0.03em', fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', color: '#0F0F0F', marginBottom: '30px' }}>
          How Your Foundations Work Together
        </h1>
        <div style={{ width: '40px', height: '3px', backgroundColor: '#DC4C0C', marginTop: '30px', marginBottom: '16px' }} />
        <p className="text-lg text-[#8B8682]">The synthesis — your three domains as one interacting system</p>
      </div>

      <div className="bg-white rounded-xl p-8 border border-[#E5E3DD] space-y-6">
        <div>
          <h3 className="font-medium text-[#1A1614] mb-4" style={{ fontSize: '22px' }}>Your three, as one system</h3>

          <div className="space-y-4 text-[#1A1614] leading-relaxed">
            <p>
              Your peak is Challenge, and it sits at 78% with the felt and expressed states almost identical. This is real. You are oriented forward, you find significance in pursuit, and what you do in the world is genuinely connected to what matters to you. Your Future dimension at 82% reinforces this — you have a clear sense of direction, and that direction is yours.
            </p>

            <p>
              Beneath the peak, your Safety reads at 27% with a wide alignment gap. You feel less safe than you appear, and the difference is significant enough that you carry a quiet load others do not see. Your Play sits at 41%, neither resourced nor catastrophic, but unable to replenish what Safety drains. The result is a system where Challenge generates momentum, Safety quietly depletes, and Play does not have enough room to refill what is leaving.
            </p>

            <p>
              What this produces in your life is the experience of running well and not knowing why rest does not feel like rest. The peak is doing more than its share. Your reading does not tell you to lower the peak. It tells you the peak is currently the only thing holding the whole system up — and that is why the direction your reading points is not toward the peak, but toward the foundation beneath it.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 pt-6 border-t border-[#E5E3DD]">
          <DomainSummary
            domain="Challenge"
            score={78}
            status="Apex — carrying structural weight"
            color="#DC4C0C"
          />
          <DomainSummary
            domain="Play"
            score={41}
            status="Low — unable to replenish"
            color="#FFAB00"
          />
          <DomainSummary
            domain="Safety"
            score={27}
            status="Depleted — with alignment gap"
            color="#42A68E"
          />
        </div>
      </div>

      <div className="bg-[#F8F6F3] rounded-xl p-8 border-l-4 border-[#1A1614]">
        <p className="text-lg text-[#1A1614] leading-relaxed">
          The direction your reading points is not toward the peak, but toward the foundation beneath it.
        </p>
      </div>
    </div>
  );
}

interface DomainSummaryProps {
  domain: string;
  score: number;
  status: string;
  color: string;
}

function DomainSummary({ domain, score, status, color }: DomainSummaryProps) {
  return (
    <div className="p-4 rounded-lg bg-[#F8F6F3]">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
        <span className="font-medium text-[#1A1614]">{domain}</span>
      </div>
      <p className="text-2xl font-medium mb-1" style={{ color }}>{score}%</p>
      <p className="text-xs text-[#8B8682]">{status}</p>
    </div>
  );
}
