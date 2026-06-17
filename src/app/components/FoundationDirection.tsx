import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

export function FoundationDirection() {
  const [sliderValue, setSliderValue] = useState(1);

  const sliderStates = [
    {
      level: 'Small Change',
      description: "With small, consistent practice, the texture of your Safety begins to change. The inner voice softens slightly. Rest produces a little more recovery than it currently does. You notice you can be supported without immediately rebalancing the relationship by giving back. Your Challenge can ease its compensation by a small margin — you push from a slightly more grounded place rather than from the same urgent edge. Play begins to find small pockets of room. The overall shape stays recognisably yours, but the alignment gap in Safety narrows from significant to mild. You still appear steady to others. You start to actually feel more of what they see."
    },
    {
      level: 'Medium Change',
      description: "With sustained intentional work over several months, Safety becomes a real foundation rather than the depleted leg. You rest differently. You hold yourself with less conditionality. You let people lean on you and let yourself lean back, and the asymmetry that has marked your relationships starts to even out. Your Challenge stops carrying the weight of three domains. Your Future remains a resource, but it is no longer doing emotional work the present should be doing. The architecture becomes more harmonious — the outer circle of your shape rounds out — and you start to notice that you do not need to push as hard to feel like yourself. The relief comes not from achieving more, but from needing less compensation to feel whole."
    },
    {
      level: 'Large Change',
      description: "When Safety becomes a true resource, the whole architecture changes shape. Challenge becomes pursuit instead of compensation — the work you do is fed by foundations rather than substituting for them. Play returns, and with it the part of you that experiences pleasure as a daily presence rather than a scheduled relief. Safety holds you in a way it has not before. You sleep differently. You receive differently. The gap between what you feel and what you show closes, and the people closest to you begin to know you as you actually are, not as the steady version you have been holding.\n\nYour shape, at this point, is no longer a Sharp Peak. The three domains move closer to each other, the peak softens because it no longer needs to be the only structural element holding everything up, and the outline of your architecture becomes nearly circular. This is foresight, not promise. You could choose this, and here is what it would become."
    }
  ];

  const traps = [
    {
      title: 'Overworking Challenge as a substitute',
      text: 'Pushing harder at meaningful goals can feel like progress, and for a person with your reading, it almost always feels like the right move. Achievement does not build Safety. It hides the absence of Safety by giving the system enough momentum to keep going without it. The harder you push at Challenge, the longer Safety can remain depleted without you noticing. This is the most reliable trap for a Sharp Peak with Challenge at the apex.'
    },
    {
      title: 'Performing wellness routines',
      text: 'Meditation, breathwork, journaling, the morning practice — these can build Safety when they are a real relationship with yourself. They can also become another form of expression that widens the alignment gap rather than closing it. If the practice is performed, tracked, optimised, or quietly judged, it is doing the work of Expressed Safety. It is not reaching Felt Safety. The test is not whether you do the practice. It is whether you can do the practice imperfectly and still receive yourself afterwards.'
    },
    {
      title: 'Seeking belonging through being needed',
      text: 'Your Others dimension is the lowest of your six, and the most likely pathway you have built around it is to be the person others come to. Being needed produces a kind of connection that can feel like Others is building, and for the person who relies on it, it does provide something. It does not build Others. Being needed is a role. The dimension grows through being held without a role, and that is the harder thing to receive.'
    },
    {
      title: 'Building Future faster',
      text: 'Your Future dimension is high. A clearer plan, a sharper vision, a more articulate sense of what is next can feel like solid ground. It is not the same as Safety. Direction without foundations becomes another performance of competence — a way to know who you are by where you are going. Worth noticing that for you, the next strategic move is a familiar instrument. Reaching for it when this reading lands is its own kind of pattern.'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <p style={{ color: '#DC4C0C', fontWeight: 800, letterSpacing: '0.06em', fontSize: '14px', marginBottom: '30px' }}>08</p>
        <h1 style={{ fontFamily: '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif', fontWeight: 600, letterSpacing: '-0.03em', fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', color: '#0F0F0F', marginBottom: '30px' }}>
          Your Foundation Direction
        </h1>
        <div style={{ width: '40px', height: '3px', backgroundColor: '#DC4C0C', marginTop: '30px', marginBottom: '16px' }} />
      </div>

      <div className="bg-white rounded-xl p-8 border border-[#E5E3DD]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-4 h-4 rounded-sm bg-[#42A68E]" />
          <h2 className="text-2xl font-medium text-[#1A1614]">Safety</h2>
        </div>

        <p className="text-[#1A1614] leading-relaxed mb-6">
          Your reading points to Safety as the domain where strengthening would produce the most architectural change for you. Safety is the depleted leg of your Sharp Peak — the foundation Challenge has been quietly compensating for. Building here would shift not just Safety itself, but how the rest of your shape can finally rest.
        </p>

        <div className="bg-[#F8F6F3] rounded-lg p-6">
          <h3 className="text-lg font-medium text-[#1A1614] mb-4">Why this works — foundations, not interventions</h3>
          <p className="text-[#1A1614] leading-relaxed mb-4">
            If you have ever set out to change something — your wellbeing, your leadership, your relationships — you have been handed interventions. A hundred different techniques, habits, and tactics, each promising to fix the thing on the surface. Most do not hold, because they work above the foundation rather than on it.
          </p>
          <p className="text-[#1A1614] leading-relaxed">
            This is not an intervention. It is the foundation the interventions were trying to reach. And because this reading is precise — it shows you exactly which foundation, and exactly where it sits — building here has a higher chance of working, and of working faster, than another technique laid over the top. That is the difference between managing the surface and strengthening the base.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-8 border border-[#E5E3DD]">
        <h3 className="font-medium text-[#1A1614] mb-6" style={{ fontSize: '22px' }}>What building Safety could look like</h3>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-[#8B8682]">Small</span>
            <span className="text-sm text-[#8B8682]">Medium</span>
            <span className="text-sm text-[#8B8682]">Large</span>
          </div>
          <input
            type="range"
            min="0"
            max="2"
            step="1"
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            className="w-full h-2 bg-[#E5E3DD] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#42A68E]"
          />
        </div>

        <div className="bg-[#F8F6F3] rounded-lg p-6">
          <h4 className="text-lg font-medium text-[#1A1614] mb-4">{sliderStates[sliderValue].level}</h4>
          <div className="space-y-4">
            {sliderStates[sliderValue].description.split('\n\n').map((para, i) => (
              <p key={i} className="text-[#1A1614] leading-relaxed">{para}</p>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium text-[#1A1614] mb-6" style={{ fontSize: '22px' }}>Traps — patterns that look like building Safety but do not</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {traps.map((trap, index) => (
            <div key={index} className="bg-[#FFF4F0] rounded-lg p-6 border border-[#DC4C0C]/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#DC4C0C] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-[#1A1614] mb-3">{trap.title}</h4>
                  <p className="text-sm text-[#1A1614] leading-relaxed">{trap.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
