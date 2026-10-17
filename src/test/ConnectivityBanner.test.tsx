import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ConnectivityBanner } from '../components/ConnectivityBanner';
import { JourneyProvider } from '../state/JourneyContext';

describe('ConnectivityBanner Component', () => {
  it('displays ready for offline preparation by default when online', () => {
    render(
      <JourneyProvider>
        <ConnectivityBanner />
      </JourneyProvider>
    );

    expect(screen.getByText(/Ready for offline preparation/i)).toBeInTheDocument();
  });

  it('switches to currently offline banner when browser loses connection', () => {
    render(
      <JourneyProvider>
        <ConnectivityBanner />
      </JourneyProvider>
    );

    act(() => {
      window.dispatchEvent(new Event('offline'));
    });

    expect(screen.getByText(/Currently offline/i)).toBeInTheDocument();

    act(() => {
      window.dispatchEvent(new Event('online'));
    });

    expect(screen.getByText(/Ready for offline preparation/i)).toBeInTheDocument();
  });

  it('toggles official portal notice disclosure', () => {
    render(
      <JourneyProvider>
        <ConnectivityBanner />
      </JourneyProvider>
    );

    const toggleBtn = screen.getByRole('button', { name: /Official Portal Notice/i });
    fireEvent.click(toggleBtn);

    expect(screen.getByText(/Official submission portal requires active internet connectivity/i)).toBeInTheDocument();

    fireEvent.click(toggleBtn);
    expect(screen.queryByText(/Official submission portal requires active internet connectivity/i)).not.toBeInTheDocument();
  });
});
