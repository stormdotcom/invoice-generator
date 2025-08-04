import { InvoiceData } from '@/components/InvoiceGenerator';

export interface PDFGeneratorConfig {
  templatePath: string;
  outputPath: string;
  data: InvoiceData;
  customFields?: Record<string, any>;
}

export interface TemplateField {
  key: string;
  value: string | number;
  type: 'text' | 'number' | 'date' | 'currency';
}

/**
 * Pure function to format a date string to 'Month Day, Year' (en-IN).
 * Returns empty string if invalid.
 */
export function formatDate(dateString: string | undefined | null): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Pure function to calculate due date (30 days from invoice date).
 * Returns ISO string (yyyy-mm-dd) or empty string if invalid.
 */
export function calculateDueDate(invoiceDate: string | undefined | null): string {
  if (!invoiceDate) return '';
  const date = new Date(invoiceDate);
  if (isNaN(date.getTime())) return '';
  date.setDate(date.getDate() + 30);
  return date.toISOString().split('T')[0];
}

/**
 * Pure function to format currency as INR.
 * Returns formatted string or '₹0.00' if invalid.
 */
export function formatCurrency(amount: number | undefined | null): string {
  if (typeof amount !== 'number' || isNaN(amount)) return '₹0.00';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
}

/**
 * Pure function to generate items table HTML.
 */
export function generateItemsTable(items: any[] = []): string {
  if (!Array.isArray(items) || items.length === 0) return '';

  const tableRows = items.map((item, index) => `
    <tr>
      <td style="border: 1px solid #dee2e6; padding: 12px;">${item?.itemNumber ?? index + 1}</td>
      <td style="border: 1px solid #dee2e6; padding: 12px;">${item?.description ?? ''}</td>
      <td style="border: 1px solid #dee2e6; padding: 12px;">${item?.hsnNumber ?? ''}</td>
      <td style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">${formatCurrency(item?.rate)}</td>
      <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">${item?.quantity ?? ''}</td>
      <td style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">${formatCurrency(item?.total)}</td>
    </tr>
  `).join('');

  return `
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <thead>
        <tr style="background-color: #f8f9fa;">
          <th style="border: 1px solid #dee2e6; padding: 12px; text-align: left;">Item #</th>
          <th style="border: 1px solid #dee2e6; padding: 12px; text-align: left;">Description</th>
          <th style="border: 1px solid #dee2e6; padding: 12px; text-align: left;">HSN</th>
          <th style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">Rate</th>
          <th style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">Qty</th>
          <th style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `;
}

/**
 * Pure function to prepare template data for binding.
 */
export function prepareTemplateData(
  data: InvoiceData,
  customFields: Record<string, any> = {}
): Record<string, any> {
  const from = data?.partyInfo?.from ?? {};
  const to = data?.partyInfo?.to ?? {};
  const invoiceNumber = data?.partyInfo?.invoiceNumber ?? '';
  const invoiceDate = data?.partyInfo?.date ?? '';
  const items = Array.isArray(data?.items) ? data.items : [];

  return {
    // Company Information
    company_name: from.name ?? '',
    company_address: from.address ?? '',
    company_city: from.city ?? '',
    company_state: from.state ?? '',
    company_zip: from.zipCode ?? '',
    company_phone: from.phone ?? '',
    company_email: from.email ?? '',

    // Client Information
    client_name: to.name ?? '',
    client_address: to.address ?? '',
    client_city: to.city ?? '',
    client_state: to.state ?? '',
    client_zip: to.zipCode ?? '',
    client_phone: to.phone ?? '',
    client_email: to.email ?? '',

    // Invoice Details
    invoice_number: invoiceNumber,
    invoice_date: formatDate(invoiceDate),
    due_date: formatDate(calculateDueDate(invoiceDate)),

    // Financial Information
    subtotal: formatCurrency(data?.subtotal),
    discount_amount: formatCurrency(data?.discountAmount),
    discount_percentage: typeof data?.discount === 'number' ? `${data.discount}%` : '',
    net_total: formatCurrency(data?.netTotal),
    tax_amount: formatCurrency(0), // Add tax calculation if needed
    grand_total: formatCurrency(data?.netTotal),

    // Items Table
    items_table: generateItemsTable(items),
    items_count: items.length,

    // Custom fields
    ...customFields
  };
}

/**
 * PDFGenerator class orchestrates the PDF generation process.
 * All helpers are pure and stateless.
 */
export class PDFGenerator {
  private readonly config: PDFGeneratorConfig;

  constructor(config: PDFGeneratorConfig) {
    this.config = { ...config };
  }

  /**
   * Generate PDF from Word template with data binding.
   * Returns the path to the generated PDF.
   */
  async generatePDF(): Promise<string> {
    try {
      const templateData = prepareTemplateData(
        this.config.data,
        this.config.customFields
      );

      const processedDocx = await this.processWordTemplate(templateData);
      const pdfPath = await this.convertToPDF(processedDocx);

      return pdfPath;
    } catch (error: any) {
      // Log and rethrow with more context
      console.error('PDF generation failed:', error);
      throw new Error(`PDF generation failed: ${error?.message || error}`);
    }
  }

  /**
   * Process Word template with data binding.
   */
  private async processWordTemplate(data: Record<string, any>): Promise<Buffer> {
    try {
      const { processWordTemplate } = await import('./word-processor');
      return await processWordTemplate(this.config.templatePath, data);
    } catch (error: any) {
      throw new Error(`Word template processing failed: ${error?.message || error}`);
    }
  }

  /**
   * Convert processed Word document to PDF.
   */
  private async convertToPDF(docxBuffer: Buffer): Promise<string> {
    try {
      const { convertToPDF } = await import('./pdf-converter');
      return await convertToPDF(docxBuffer, this.config.outputPath);
    } catch (error: any) {
      throw new Error(`PDF conversion failed: ${error?.message || error}`);
    }
  }

  /**
   * Get template field mapping.
   */
  getTemplateFields(): TemplateField[] {
    return [
      { key: 'company_name', value: '', type: 'text' },
      { key: 'company_address', value: '', type: 'text' },
      { key: 'client_name', value: '', type: 'text' },
      { key: 'client_address', value: '', type: 'text' },
      { key: 'invoice_number', value: '', type: 'text' },
      { key: 'invoice_date', value: '', type: 'date' },
      { key: 'subtotal', value: 0, type: 'currency' },
      { key: 'net_total', value: 0, type: 'currency' },
      { key: 'items_table', value: '', type: 'text' }
    ];
  }
}

/**
 * Factory function to create PDF generator with default configuration.
 */
export function createPDFGenerator(
  data: InvoiceData,
  templatePath: string,
  outputPath: string,
  customFields?: Record<string, any>
): PDFGenerator {
  return new PDFGenerator({
    templatePath,
    outputPath,
    data,
    customFields
  });
}

/**
 * Utility function to generate PDF with minimal configuration.
 */
export async function generateInvoicePDF(
  data: InvoiceData,
  templatePath: string = './templates/invoice-template.docx',
  outputPath?: string
): Promise<string> {
  const defaultOutputPath = outputPath || `./invoices/invoice-${data?.partyInfo?.invoiceNumber ?? 'unknown'}.pdf`;
  const generator = createPDFGenerator(data, templatePath, defaultOutputPath);
  return await generator.generatePDF();
}
