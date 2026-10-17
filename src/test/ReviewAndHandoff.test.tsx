import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { JourneyProvider } from '../state/JourneyContext';
import { Review } from '../routes/Review';
import { Handoff } from '../routes/Handoff';
import { HandoffView } from '../routes/HandoffView';

describe('Review and Safe Handoff Integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders review map with categorized complete and uncertain sections without raw identifiers', () => {
    const { container } = render(
      <JourneyProvider>
        <MemoryRouter>
          <Review />
        </MemoryRouter>
      </JourneyProvider>
    );

    expect(screen.getByText(/Review Your Prepared Answers/i)).toBeInTheDocument();
    expect(screen.getByText(/Needs Checking \(Uncertain\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Complete & Ready/i)).toBeInTheDocument();

    // Verify human-readable labels exist
    expect(screen.getByText(/Full Legal Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByText(/Annual Family Income/i)).toBeInTheDocument();
    expect(screen.getByText(/Academic Course \/ Stream/i)).toBeInTheDocument();

    // Verify formatted values exist
    expect(screen.getByText(/₹1,40,000/i)).toBeInTheDocument();
    expect(screen.getByText(/Polytechnic Diploma/i)).toBeInTheDocument();

    // STRICT CHECK: Ensure ZERO developer-facing identifiers appear in the rendered text
    const textContent = container.textContent || '';
    expect(textContent).not.toContain('legal_name');
    expect(textContent).not.toContain('date_of_birth');
    expect(textContent).not.toContain('annual_income');
    expect(textContent).not.toContain('institution_name');
    expect(textContent).not.toContain('academic_stream');
    expect(textContent).not.toContain('diploma_tech');
    expect(textContent).not.toContain('q_legal_name');
  });

  it('generates expiring handoff packet, renders scannable QR code, and allows revocation', async () => {
    render(
      <JourneyProvider>
        <MemoryRouter>
          <Handoff />
        </MemoryRouter>
      </JourneyProvider>
    );

    const generateBtn = screen.getByRole('button', { name: /Generate Expiring Handoff Packet/i });
    fireEvent.click(generateBtn);

    expect(screen.getByText(/Packet Active/i)).toBeInTheDocument();
    expect(screen.getByText(/Time-Limited Handoff Token/i)).toBeInTheDocument();

    // Verify QR code image exists with accessible alt text
    await waitFor(() => {
      const qrImg = screen.getByRole('img', { name: /Scannable demonstration QR code/i });
      expect(qrImg).toBeInTheDocument();
      expect(qrImg.getAttribute('src')).toContain('data:image/png;base64');
    });

    // Test copy token button
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });
    const copyBtn = screen.getByRole('button', { name: /Copy/i });
    expect(copyBtn).toBeInTheDocument();
    fireEvent.click(copyBtn);
    expect(screen.getByText(/^Copied$/i)).toBeInTheDocument();

    // Test print button
    const printSpy = vi.fn();
    window.print = printSpy;
    const printBtn = screen.getByRole('button', { name: /Print Physical Checklist/i });
    fireEvent.click(printBtn);
    expect(printSpy).toHaveBeenCalled();

    // Test helper redemption link
    const viewLink = screen.getByRole('link', { name: /Open Helper Redemption View/i });
    expect(viewLink).toBeInTheDocument();
    expect(viewLink.getAttribute('href')).toContain('/handoff/view#token=');

    // Test revocation
    const revokeBtn = screen.getByRole('button', { name: /Revoke Packet Access Now/i });
    fireEvent.click(revokeBtn);

    expect(screen.getByText(/Access Revoked/i)).toBeInTheDocument();
    expect(screen.getByText(/This token was revoked on this device/i)).toBeInTheDocument();
  });

  it('allows toggling consent sections and identifier inclusion', () => {
    render(
      <JourneyProvider>
        <MemoryRouter>
          <Handoff />
        </MemoryRouter>
      </JourneyProvider>
    );

    const idCheckbox = screen.getByLabelText(/Include National Photo ID \/ Personal Identifiers/i);
    expect(idCheckbox).not.toBeChecked();
    fireEvent.click(idCheckbox);
    expect(idCheckbox).toBeChecked();

    const academicCheckbox = screen.getByLabelText(/Academic Details/i);
    expect(academicCheckbox).toBeChecked();
    fireEvent.click(academicCheckbox);
    expect(academicCheckbox).not.toBeChecked();
  });

  it('redemption view decodes consented data and excludes sensitive identity info by default', () => {
    const payload = {
      v: 1,
      token: 'PB-TEST-1234',
      scheme: 'BrightSteps Student Support Grant (Demo)',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      helper: 'Asha Tai',
      sections: ['Academic Details', 'Family Financial Context'],
      includesIdentifiers: false,
      data: {
        q_annual_income: { field: 'annual_income', value: '140000', isUncertain: false },
        q_institution_name: { field: 'institution_name', value: 'Government Polytechnic College', isUncertain: false },
        q_stream_class: { field: 'academic_stream', value: 'diploma_tech', isUncertain: false },
      },
    };

    const uint8 = new TextEncoder().encode(JSON.stringify(payload));
    let bin = '';
    for (let i = 0; i < uint8.length; i++) bin += String.fromCharCode(uint8[i]);
    const encoded = encodeURIComponent(btoa(bin));

    render(
      <JourneyProvider>
        <MemoryRouter initialEntries={[`/handoff/view#token=PB-TEST-1234&p=${encoded}`]}>
          <Routes>
            <Route path="/handoff/view" element={<HandoffView />} />
          </Routes>
        </MemoryRouter>
      </JourneyProvider>
    );

    expect(screen.getByText(/Consented Preparation Packet/i)).toBeInTheDocument();
    expect(screen.getByText(/Active Consented Packet/i)).toBeInTheDocument();
    expect(screen.getByText(/Token: PB-TEST-1234/i)).toBeInTheDocument();
    expect(screen.getByText(/Personal identity and bank credentials were excluded by student consent/i)).toBeInTheDocument();
    expect(screen.getByText(/₹1,40,000/i)).toBeInTheDocument();
    expect(screen.getByText(/Government Polytechnic College/i)).toBeInTheDocument();
  });

  it('redemption view displays warning on revoked token', () => {
    const token = 'PB-REVOKED-5678';
    localStorage.setItem(
      'paperbridge_journey_v1',
      JSON.stringify({
        locale: 'en',
        eligibilityAnswers: {},
        eligibilityStatus: 'not_started',
        answers: {},
        documents: {},
        accessibility: { focusMode: false, readingSupport: false, readAloud: false, highContrast: false },
        handoff: {
          selectedSections: ['Academic Details'],
          includePersonalIdentifiers: false,
          recipientName: 'Asha Tai',
          token,
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          isRevoked: true,
        },
      })
    );

    const payload = {
      v: 1,
      token,
      scheme: 'BrightSteps Student Support Grant (Demo)',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      helper: 'Asha Tai',
      sections: ['Academic Details'],
      includesIdentifiers: false,
      data: {},
    };
    const uint8 = new TextEncoder().encode(JSON.stringify(payload));
    let bin = '';
    for (let i = 0; i < uint8.length; i++) bin += String.fromCharCode(uint8[i]);
    const encoded = encodeURIComponent(btoa(bin));

    render(
      <JourneyProvider>
        <MemoryRouter initialEntries={[`/handoff/view#token=${token}&p=${encoded}`]}>
          <Routes>
            <Route path="/handoff/view" element={<HandoffView />} />
          </Routes>
        </MemoryRouter>
      </JourneyProvider>
    );

    expect(screen.getByText(/Packet Access Revoked/i)).toBeInTheDocument();
    expect(screen.getByText(/The student has explicitly revoked access to this handoff token/i)).toBeInTheDocument();
  });

  it('rejects tampered payload that violates identifier exclusion consent', () => {
    // Malicious packet attempting to leak legal_name when includesIdentifiers is false
    const tamperedPayload = {
      v: 1,
      token: 'PB-TAMPER-9999',
      scheme: 'BrightSteps Student Support Grant (Demo)',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      helper: 'Unknown',
      sections: ['Personal Details'],
      includesIdentifiers: false,
      data: {
        q_legal_name: { field: 'legal_name', value: 'Leaked Student Name', isUncertain: false },
      },
    };
    const uint8 = new TextEncoder().encode(JSON.stringify(tamperedPayload));
    let bin = '';
    for (let i = 0; i < uint8.length; i++) bin += String.fromCharCode(uint8[i]);
    const encoded = encodeURIComponent(btoa(bin));

    render(
      <JourneyProvider>
        <MemoryRouter initialEntries={[`/handoff/view#token=PB-TAMPER-9999&p=${encoded}`]}>
          <Routes>
            <Route path="/handoff/view" element={<HandoffView />} />
          </Routes>
        </MemoryRouter>
      </JourneyProvider>
    );

    expect(screen.getByText(/Invalid Packet Token/i)).toBeInTheDocument();
    expect(screen.getByText(/Packet integrity violation/i)).toBeInTheDocument();
  });

  it('strictly rejects query-parameter payloads to enforce the privacy boundary', () => {
    const validPayload = {
      v: 1,
      token: 'PB-QUERY-1234',
      scheme: 'BrightSteps Student Support Grant (Demo)',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      helper: 'Test Helper',
      sections: ['Academic Details'],
      includesIdentifiers: false,
      data: {
        q_institution_name: { field: 'institution_name', value: 'Polytechnic', isUncertain: false },
      },
    };
    const uint8 = new TextEncoder().encode(JSON.stringify(validPayload));
    let bin = '';
    for (let i = 0; i < uint8.length; i++) bin += String.fromCharCode(uint8[i]);
    const encoded = encodeURIComponent(btoa(bin));

    render(
      <JourneyProvider>
        <MemoryRouter initialEntries={[`/handoff/view?token=PB-QUERY-1234&p=${encoded}`]}>
          <Routes>
            <Route path="/handoff/view" element={<HandoffView />} />
          </Routes>
        </MemoryRouter>
      </JourneyProvider>
    );

    expect(screen.getByText(/Invalid Packet Token/i)).toBeInTheDocument();
    expect(screen.getByText(/Privacy boundary violation: Handoff data must be passed exclusively via URL fragment/i)).toBeInTheDocument();
    expect(screen.queryByText(/Active Consented Packet/i)).not.toBeInTheDocument();
  });

  it('renders truthful privacy boundary notices without claiming encryption or remote revocation', () => {
    const payload = {
      v: 1,
      token: 'PB-HONEST-001',
      scheme: 'BrightSteps Student Support Grant (Demo)',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      helper: 'Honest Helper',
      sections: ['Academic Details'],
      includesIdentifiers: false,
      data: {
        q_institution_name: { field: 'institution_name', value: 'Rural College', isUncertain: false },
      },
    };
    const uint8 = new TextEncoder().encode(JSON.stringify(payload));
    let bin = '';
    for (let i = 0; i < uint8.length; i++) bin += String.fromCharCode(uint8[i]);
    const encoded = encodeURIComponent(btoa(bin));

    render(
      <JourneyProvider>
        <MemoryRouter initialEntries={[`/handoff/view#token=PB-HONEST-001&p=${encoded}`]}>
          <Routes>
            <Route path="/handoff/view" element={<HandoffView />} />
          </Routes>
        </MemoryRouter>
      </JourneyProvider>
    );

    expect(screen.getByText(/Local Demonstration Privacy Boundary/i)).toBeInTheDocument();
    expect(screen.getByText(/Unencrypted Bearer Fragment/i)).toBeInTheDocument();
    expect(screen.getByText(/Local Revocation Boundary/i)).toBeInTheDocument();
  });
});
