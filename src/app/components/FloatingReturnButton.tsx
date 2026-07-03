import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import type { CSSProperties } from 'react';
import { useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';

interface FloatingReturnButtonProps {
  label: string;
  onClick: () => void;
  accent?: string;
}

let activeFloatingReturnButtons: string[] = [];
const FLOATING_RETURN_BUTTON_EVENT = 'floating-return-buttons-change';

function emitFloatingReturnButtonChange() {
  window.dispatchEvent(new CustomEvent(FLOATING_RETURN_BUTTON_EVENT, { detail: activeFloatingReturnButtons }));
}

export function FloatingReturnButton({ label, onClick, accent = '#DC4C0C' }: FloatingReturnButtonProps) {
  const buttonId = useId();
  const [mounted, setMounted] = useState(false);
  const [stack, setStack] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
    activeFloatingReturnButtons = [buttonId, ...activeFloatingReturnButtons.filter(id => id !== buttonId)];
    setStack([...activeFloatingReturnButtons]);
    emitFloatingReturnButtonChange();

    const onStackChange = (event: Event) => {
      const customEvent = event as CustomEvent<string[]>;
      setStack([...(customEvent.detail || activeFloatingReturnButtons)]);
    };

    window.addEventListener(FLOATING_RETURN_BUTTON_EVENT, onStackChange);

    return () => {
      activeFloatingReturnButtons = activeFloatingReturnButtons.filter(id => id !== buttonId);
      emitFloatingReturnButtonChange();
      window.removeEventListener(FLOATING_RETURN_BUTTON_EVENT, onStackChange);
    };
  }, [buttonId]);

  const stackIndex = Math.max(0, stack.indexOf(buttonId));

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      <motion.button
        type="button"
        onClick={onClick}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        className="fixed right-7 inline-flex items-center gap-2 rounded-full bg-[#1A1614] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_38px_-24px_rgba(26,22,20,0.7)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2"
        style={{
          bottom: `calc(1.75rem + ${stackIndex * 3.75}rem)`,
          isolation: 'isolate',
          zIndex: 2147483647 - stackIndex,
          '--tw-ring-color': `${accent}66`,
        } as CSSProperties}
      >
        <ArrowLeft size={16} strokeWidth={2.4} />
        {label}
      </motion.button>
    </AnimatePresence>,
    document.body,
  );
}
