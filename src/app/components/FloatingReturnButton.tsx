import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface FloatingReturnButtonProps {
  label: string;
  onClick: () => void;
  accent?: string;
}

export function FloatingReturnButton({ label, onClick, accent = '#DC4C0C' }: FloatingReturnButtonProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      <motion.button
        type="button"
        onClick={onClick}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        className="fixed bottom-7 right-7 z-[2147483647] inline-flex items-center gap-2 rounded-full bg-[#1A1614] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_38px_-24px_rgba(26,22,20,0.7)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2"
        style={{ isolation: 'isolate', '--tw-ring-color': `${accent}66` } as CSSProperties}
      >
        <ArrowLeft size={16} strokeWidth={2.4} />
        {label}
      </motion.button>
    </AnimatePresence>,
    document.body,
  );
}
