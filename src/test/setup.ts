import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock SpeechSynthesis for cognitive accessibility Read Aloud
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'speechSynthesis', {
    value: {
      speak: vi.fn(),
      cancel: vi.fn(),
      pause: vi.fn(),
      resume: vi.fn(),
      getVoices: vi.fn().mockReturnValue([]),
    },
    writable: true,
  });

  // Mock window.print
  window.print = vi.fn();
}
