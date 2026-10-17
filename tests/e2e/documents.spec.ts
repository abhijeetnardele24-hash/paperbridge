import { test, expect } from '@playwright/test';

test.describe('Document Readiness Board E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.clear();
    });
    await page.goto('/documents');
  });

  test('renders truthful technical disclaimer and initial document statuses', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Document Readiness Board/i);
    await expect(page.getByLabel('Technical Scope Disclaimer')).toContainText(
      /PaperBridge verified the file’s technical format only/i
    );
    // Initial summary bar should report ready and not added documents
    await expect(page.getByText(/Current Board Status:/i)).toBeVisible();
    await expect(page.getByText(/🔒 Technical inspection runs locally in your browser/i).first()).toBeVisible();
  });

  test('inspects valid PDF and marks document as Technically Ready', async ({ page }) => {
    const validPdfBuffer = Buffer.from('%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF');
    const input = page.getByTestId('file-input-doc_income');
    await input.setInputFiles({
      name: 'income_certificate_valid.pdf',
      mimeType: 'application/pdf',
      buffer: validPdfBuffer,
    });

    await expect(page.getByText(/Valid PDF document structure confirmed/i)).toBeVisible();
    await expect(page.getByText(/income_certificate_valid\.pdf/i).first()).toBeVisible();
  });

  test('flags corrupted or non-standard PDF headers', async ({ page }) => {
    const corruptBuffer = Buffer.from('NOT_A_VALID_PDF_HEADER_CONTENT');
    const input = page.getByTestId('file-input-doc_income');
    await input.setInputFiles({
      name: 'corrupt_statement.pdf',
      mimeType: 'application/pdf',
      buffer: corruptBuffer,
    });

    await expect(page.getByText(/Corrupted or non-standard PDF header/i)).toBeVisible();
  });

  test('inspects valid high-resolution image and marks as Technically Ready', async ({ page }) => {
    const highResBase64 = await page.evaluate(() => {
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 1000;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#F4EFEA';
        ctx.fillRect(0, 0, 800, 1000);
      }
      return canvas.toDataURL('image/png').split(',')[1];
    });

    const input = page.getByTestId('file-input-doc_identity');
    await input.setInputFiles({
      name: 'student_photo_id_scan.png',
      mimeType: 'image/png',
      buffer: Buffer.from(highResBase64, 'base64'),
    });

    await expect(page.getByText(/Resolution verified/i)).toBeVisible();
    await expect(page.getByText(/800x1000px/i)).toBeVisible();
  });

  test('flags warning on low-resolution image (<600px)', async ({ page }) => {
    const lowResBase64 = await page.evaluate(() => {
      const canvas = document.createElement('canvas');
      canvas.width = 300;
      canvas.height = 200;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#CCCCCC';
        ctx.fillRect(0, 0, 300, 200);
      }
      return canvas.toDataURL('image/png').split(',')[1];
    });

    const input = page.getByTestId('file-input-doc_identity');
    await input.setInputFiles({
      name: 'low_res_thumbnail.png',
      mimeType: 'image/png',
      buffer: Buffer.from(lowResBase64, 'base64'),
    });

    await expect(page.getByText(/Low resolution \(300x200px\)/i)).toBeVisible();
  });

  test('rejects oversized files exceeding 2MB limit', async ({ page }) => {
    const oversizedBuffer = Buffer.alloc(2.2 * 1024 * 1024);
    const input = page.getByTestId('file-input-doc_bank');
    await input.setInputFiles({
      name: 'huge_bank_passbook.pdf',
      mimeType: 'application/pdf',
      buffer: oversizedBuffer,
    });

    await expect(page.getByText(/File size exceeds 2MB limit/i)).toBeVisible();
  });

  test('rejects unsupported file extensions', async ({ page }) => {
    const textBuffer = Buffer.from('Arbitrary text file content');
    const input = page.getByTestId('file-input-doc_bank');
    await input.setInputFiles({
      name: 'bank_statement.txt',
      mimeType: 'text/plain',
      buffer: textBuffer,
    });

    await expect(page.getByText(/Unsupported format/i)).toBeVisible();
  });

  test('loads safe demo specimen and supports removal and replacement', async ({ page }) => {
    // Find doc_bank card and load safe demo specimen
    const bankCard = page.locator('.paper-card').filter({ hasText: /Student Bank Account Proof/i });
    const demoBtn = bankCard.getByRole('button', { name: /Load safe demo specimen/i });
    await demoBtn.click();

    await expect(bankCard.getByText(/Safe demo specimen loaded/i)).toBeVisible();
    await expect(bankCard.getByText(/Technically Ready/i)).toBeVisible();

    // Remove the file
    const removeBtn = bankCard.getByTitle(/Remove/i);
    await removeBtn.click();

    await expect(bankCard.getByText(/Not Added/i)).toBeVisible();

    // Re-inspect with valid PDF
    const validPdfBuffer = Buffer.from('%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF');
    const input = page.getByTestId('file-input-doc_bank');
    await input.setInputFiles({
      name: 'replaced_passbook.pdf',
      mimeType: 'application/pdf',
      buffer: validPdfBuffer,
    });

    await expect(bankCard.getByText(/Valid PDF document structure confirmed/i)).toBeVisible();
    await expect(bankCard.getByText(/replaced_passbook\.pdf/i).first()).toBeVisible();
  });
});
