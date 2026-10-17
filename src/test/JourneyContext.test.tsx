import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { JourneyProvider, useJourney } from '../state/JourneyContext';

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <JourneyProvider>{children}</JourneyProvider>
);

describe('JourneyContext State Engine', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with default synthetic student profile', () => {
    const { result } = renderHook(() => useJourney(), { wrapper });
    expect(result.current.state.locale).toBe('en');
    expect(result.current.state.answers['q_legal_name'].value).toBe('Riya Santosh Shinde');
    expect(result.current.counts.total).toBe(6);
  });

  it('updates eligibility answers and computes ineligibility correctly', () => {
    const { result } = renderHook(() => useJourney(), { wrapper });

    act(() => {
      // Answering "no" to educational enrolment causes ineligibility per scheme rules
      result.current.setEligibilityAnswer('el_enrolment', 'no');
    });

    expect(result.current.state.eligibilityAnswers['el_enrolment']).toBe('no');
    expect(result.current.state.eligibilityStatus).toBe('ineligible');
  });

  it('marks question as uncertain with supportive note without penalty', () => {
    const { result } = renderHook(() => useJourney(), { wrapper });

    act(() => {
      result.current.markQuestionUncertain('q_bank_ifsc', 'Passbook seal smudged');
    });

    const ans = result.current.state.answers['q_bank_ifsc'];
    expect(ans.isUncertain).toBe(true);
    expect(ans.note).toBe('Passbook seal smudged');
  });

  it('creates consent-controlled handoff packet with personal identifiers unselected by default', () => {
    const { result } = renderHook(() => useJourney(), { wrapper });

    act(() => {
      const token = result.current.createHandoff(
        ['Personal Details', 'Academic Details'],
        false, // Personal identifiers off by default
        'Asha Tai'
      );
      expect(token).toMatch(/^PB-2026-[A-Z0-9]+$/);
    });

    expect(result.current.state.handoff.includePersonalIdentifiers).toBe(false);
    expect(result.current.state.handoff.recipientName).toBe('Asha Tai');
    expect(result.current.state.handoff.isRevoked).toBe(false);

    // Test revocation
    act(() => {
      result.current.revokeHandoff();
    });

    expect(result.current.state.handoff.isRevoked).toBe(true);
  });

  it('toggles cognitive accessibility preferences and applies DOM attributes', () => {
    const { result } = renderHook(() => useJourney(), { wrapper });

    act(() => {
      result.current.updateAccessibility({ readingSupport: true, highContrast: true });
    });

    expect(result.current.state.accessibility.readingSupport).toBe(true);
    expect(result.current.state.accessibility.highContrast).toBe(true);
    expect(document.documentElement.getAttribute('data-reading-support')).toBe('true');
    expect(document.documentElement.getAttribute('data-high-contrast')).toBe('true');
  });

  it('switches languages smoothly to Hindi and Marathi', () => {
    const { result } = renderHook(() => useJourney(), { wrapper });

    act(() => {
      result.current.setLocale('hi');
    });
    expect(result.current.state.locale).toBe('hi');
    expect(result.current.t.brand.tagline).toContain('सरकारी फॉर्म');

    act(() => {
      result.current.setLocale('mr');
    });
    expect(result.current.state.locale).toBe('mr');
    expect(result.current.t.brand.tagline).toContain('शासकीय अर्ज');
  });

  it('resets demo data cleanly back to defaults', () => {
    const { result } = renderHook(() => useJourney(), { wrapper });

    act(() => {
      result.current.setQuestionAnswer('q_legal_name', 'Custom Name', false);
      result.current.resetDemo();
    });

    expect(result.current.state.answers['q_legal_name'].value).toBe('Riya Santosh Shinde');
  });
});
