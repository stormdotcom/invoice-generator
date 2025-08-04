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

export class PDFGenerator {
  private config: PDFGeneratorConfig;

  constructor(config: PDFGeneratorConfig) {
    this.config = config;
  }

  /**
   * Generate PDF from Word template with data binding
   */
  async generatePDF(): Promise<string> {
    try {
      // Step 1: Prepare template data
      const templateData = this.prepareTemplateData();
      
      // Step 2: Process Word template
      const processedDocx = await this.processWordTemplate(templateData);
      
      // Step 3: Convert to PDF
      const pdfPath = await this.convertToPDF(processedDocx);
      
      return pdfPath;
    } catch (error) {
      console.error('PDF generation failed:', error);
      throw new Error(`PDF generation failed: ${error}`);
    }
  }

  /**
   * Prepare data for template binding
   */
  private prepareTemplateData(): Record<string, any> {
    const { data, customFields } = this.config;
    
    const templateData = {
      // Company Information
      'company_name': data.partyInfo.from.name,
      'company_address': data.partyInfo.from.address,
      'company_city': data.partyInfo.from.city,
      'company_state': data.partyInfo.from.state,
      'company_zip': data.partyInfo.from.zipCode,
      'company_phone': data.partyInfo.from.phone,
      'company_email': data.partyInfo.from.email,
      
      // Client Information
      'client_name': data.partyInfo.to.name,
      'client_address': data.partyInfo.to.address,
      'client_city': data.partyInfo.to.city,
      'client_state': data.partyInfo.to.state,
      'client_zip': data.partyInfo.to.zipCode,
      'client_phone': data.partyInfo.to.phone,
      'client_email': data.partyInfo.to.email,
      
      // Invoice Details
      'invoice_number': data.partyInfo.invoiceNumber,
      'invoice_date': this.formatDate(data.partyInfo.date),
      'due_date': this.formatDate(this.calculateDueDate(data.partyInfo.date)),
      
      // Financial Information
      'subtotal': this.formatCurrency(data.subtotal),
      'discount_amount': this.formatCurrency(data.discountAmount),
      'discount_percentage': `${data.discount}%`,
      'net_total': this.formatCurrency(data.netTotal),
      'tax_amount': this.formatCurrency(0), // Add tax calculation if needed
      'grand_total': this.formatCurrency(data.netTotal),
      
      // Items Table
      'items_table': this.generateItemsTable(data.items),
      'items_count': data.items.length,
      
      // Custom fields
      ...customFields
    };

    return templateData;
  }

  /**
   * Process Word template with data binding
   */
  private async processWordTemplate(data: Record<string, any>): Promise<Buffer> {
    // This would integrate with a Word processing library
    // For now, we'll use a placeholder implementation
    const { processWordTemplate } = await import('./word-processor');
    return await processWordTemplate(this.config.templatePath, data);
  }

  /**
   * Convert processed Word document to PDF
   */
  private async convertToPDF(docxBuffer: Buffer): Promise<string> {
    // This would integrate with a PDF conversion library
    // For now, we'll use a placeholder implementation
    const { convertToPDF } = await import('./pdf-converter');
    return await convertToPDF(docxBuffer, this.config.outputPath);
  }

  /**
   * Generate items table for template
   */
  private generateItemsTable(items: any[]): string {
    let tableHTML = `
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
    `;

    items.forEach((item, index) => {
      tableHTML += `
        <tr>
          <td style="border: 1px solid #dee2e6; padding: 12px;">${item.itemNumber}</td>
          <td style="border: 1px solid #dee2e6; padding: 12px;">${item.description}</td>
          <td style="border: 1px solid #dee2e6; padding: 12px;">${item.hsnNumber}</td>
          <td style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">₹${item.rate.toFixed(2)}</td>
          <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">${item.quantity}</td>
          <td style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">₹${item.total.toFixed(2)}</td>
        </tr>
      `;
    });

    tableHTML += `
        </tbody>
      </table>
    `;

    return tableHTML;
  }

  /**
   * Format date for template
   */
  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Calculate due date (30 days from invoice date)
   */
  private calculateDueDate(invoiceDate: string): string {
    const date = new Date(invoiceDate);
    date.setDate(date.getDate() + 30);
    return date.toISOString().split('T')[0];
  }

  /**
   * Format currency for template
   */
  private formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  }

  /**
   * Get template field mapping
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
 * Factory function to create PDF generator with default configuration
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
 * Utility function to generate PDF with minimal configuration
 */
export async function generateInvoicePDF(
  data: InvoiceData,
  templatePath: string = './templates/invoice-template.docx',
  outputPath?: string
): Promise<string> {
  const defaultOutputPath = outputPath || `./invoices/invoice-${data.partyInfo.invoiceNumber}.pdf`;
  
  const generator = createPDFGenerator(data, templatePath, defaultOutputPath);
  return await generator.generatePDF();
} 
