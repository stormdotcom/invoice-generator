import { InvoiceData } from '@/components/InvoiceGenerator';
import { 
  PDFGenerator, 
  createPDFGenerator, 
  generateInvoicePDF 
} from '@/lib/pdf-generator';
import { TemplateManager } from '@/lib/template-manager';
import { AdvancedWordProcessor } from '@/lib/word-processor';
import { AdvancedPDFConverter } from '@/lib/pdf-converter';

/**
 * Example 1: Basic PDF Generation
 */
export async function basicPDFGeneration() {
  // Sample invoice data
  const invoiceData: InvoiceData = {
    partyInfo: {
      from: {
        name: 'Tech Solutions Inc.',
        address: '123 Business Street, Tech City',
        city: 'Tech City',
        state: 'California',
        zipCode: '90210',
        phone: '+1 (555) 123-4567',
        email: 'info@techsolutions.com',
      },
      to: {
        name: 'Client Company Ltd.',
        address: '456 Client Avenue, Client City',
        city: 'Client City',
        state: 'New York',
        zipCode: '10001',
        phone: '+1 (555) 987-6543',
        email: 'accounts@clientcompany.com',
      },
      date: '2024-01-15',
      invoiceNumber: 'INV-2024-001',
    },
    items: [
      {
        id: '1',
        itemNumber: '1',
        description: 'Web Development Services',
        hsnNumber: '998314',
        rate: 150,
        quantity: 40,
        total: 6000,
      },
      {
        id: '2',
        itemNumber: '2',
        description: 'UI/UX Design',
        hsnNumber: '998314',
        rate: 100,
        quantity: 20,
        total: 2000,
      }
    ],
    discount: 10,
    discountType: 'percentage',
    subtotal: 8000,
    discountAmount: 800,
    netTotal: 7200,
  };

  try {
    // Generate PDF using default template
    const pdfPath = await generateInvoicePDF(invoiceData);
    console.log('PDF generated successfully:', pdfPath);
    return pdfPath;
  } catch (error) {
    console.error('PDF generation failed:', error);
    throw error;
  }
}

/**
 * Example 2: Custom PDF Generator with Advanced Configuration
 */
export async function advancedPDFGeneration() {
  const invoiceData: InvoiceData = {
    // ... your invoice data
    partyInfo: {
      from: {
        name: 'Creative Agency',
        address: '789 Creative Lane, Design District',
        city: 'Design City',
        state: 'California',
        zipCode: '90211',
        phone: '+1 (555) 456-7890',
        email: 'hello@creativeagency.com',
      },
      to: {
        name: 'Marketing Corp',
        address: '321 Marketing Blvd, Business District',
        city: 'Business City',
        state: 'Texas',
        zipCode: '75001',
        phone: '+1 (555) 789-0123',
        email: 'procurement@marketingcorp.com',
      },
      date: '2024-01-20',
      invoiceNumber: 'INV-2024-002',
    },
    items: [
      {
        id: '1',
        itemNumber: '1',
        description: 'Brand Identity Design',
        hsnNumber: '998314',
        rate: 200,
        quantity: 1,
        total: 200,
      },
      {
        id: '2',
        itemNumber: '2',
        description: 'Marketing Campaign',
        hsnNumber: '998314',
        rate: 500,
        quantity: 1,
        total: 500,
      }
    ],
    discount: 5,
    discountType: 'percentage',
    subtotal: 700,
    discountAmount: 35,
    netTotal: 665,
  };

  // Custom fields for additional data
  const customFields = {
    'payment_terms': 'Net 30',
    'project_reference': 'PRJ-2024-001',
    'special_notes': 'Rush delivery requested',
    'contact_person': 'John Smith',
    'tax_id': '12-3456789',
    'currency': 'USD',
    'exchange_rate': '1.00',
    'generated_by': 'Invoice Generator v2.0',
    'generated_at': new Date().toISOString(),
  };

  try {
    // Create PDF generator with custom configuration
    const generator = createPDFGenerator(
      invoiceData,
      './templates/custom-invoice.docx',
      './invoices/custom-invoice.pdf',
      customFields
    );

    // Generate PDF
    const pdfPath = await generator.generatePDF();
    console.log('Custom PDF generated:', pdfPath);
    return pdfPath;
  } catch (error) {
    console.error('Custom PDF generation failed:', error);
    throw error;
  }
}

/**
 * Example 3: Template Management
 */
export async function templateManagementExample() {
  const templateManager = new TemplateManager('./custom-templates');

  // Create a custom template
  const customTemplate = templateManager.createCustomTemplate(
    'premium-invoice',
    'Premium invoice template with advanced styling',
    [
      { key: 'company_name', label: 'Company Name', type: 'text', required: true },
      { key: 'company_logo', label: 'Company Logo', type: 'text', required: false },
      { key: 'client_name', label: 'Client Name', type: 'text', required: true },
      { key: 'invoice_number', label: 'Invoice Number', type: 'text', required: true },
      { key: 'invoice_date', label: 'Invoice Date', type: 'date', required: true },
      { key: 'due_date', label: 'Due Date', type: 'date', required: true },
      { key: 'items_table', label: 'Items Table', type: 'table', required: true },
      { key: 'subtotal', label: 'Subtotal', type: 'currency', required: true },
      { key: 'tax_amount', label: 'Tax Amount', type: 'currency', required: false },
      { key: 'grand_total', label: 'Grand Total', type: 'currency', required: true },
      { key: 'payment_instructions', label: 'Payment Instructions', type: 'text', required: false },
      { key: 'terms_conditions', label: 'Terms & Conditions', type: 'text', required: false },
    ],
    {
      fontFamily: 'Georgia, serif',
      fontSize: 11,
      colors: {
        primary: '#2c3e50',
        secondary: '#34495e',
        accent: '#3498db'
      },
      layout: 'professional'
    }
  );

  console.log('Custom template created:', customTemplate.name);

  // Get all available templates
  const allTemplates = templateManager.getAllTemplates();
  console.log('Available templates:', allTemplates.map(t => t.name));

  // Clone an existing template
  const clonedTemplate = templateManager.cloneTemplate(
    'modern-invoice',
    'modern-invoice-v2',
    'Updated modern invoice template'
  );

  if (clonedTemplate) {
    console.log('Template cloned:', clonedTemplate.name);
  }

  return customTemplate;
}

/**
 * Example 4: Advanced Word Processing
 */
export async function advancedWordProcessing() {
  const processor = new AdvancedWordProcessor('./templates/advanced-template.docx');

  // Add custom processors for specific fields
  processor.addCustomProcessor('invoice_date', (value) => {
    const date = new Date(value);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  processor.addCustomProcessor('grand_total', (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  });

  processor.addCustomProcessor('items_table', (items) => {
    // Custom table formatting
    return items.map((item: any) => ({
      ...item,
      formatted_rate: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(item.rate),
      formatted_total: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(item.total)
    }));
  });

  const data = {
    company_name: 'Advanced Solutions',
    invoice_date: '2024-01-25',
    grand_total: 1500.00,
    items_table: [
      { description: 'Consulting Services', rate: 150, quantity: 10, total: 1500 }
    ]
  };

  try {
    const processedBuffer = await processor.processWithCustomProcessors(data);
    console.log('Word document processed with custom processors');
    return processedBuffer;
  } catch (error) {
    console.error('Word processing failed:', error);
    throw error;
  }
}

/**
 * Example 5: Advanced PDF Conversion
 */
export async function advancedPDFConversion() {
  const converter = new AdvancedPDFConverter({
    format: 'A4',
    orientation: 'portrait',
    margins: { top: 0.5, right: 0.5, bottom: 0.5, left: 0.5 },
    header: 'Invoice Generated by Invoice Generator',
    footer: 'Page {page} of {total}'
  });

  // Sample Word document buffer (you would get this from word processing)
  const docxBuffer = Buffer.from('sample word document content');

  try {
    // Convert to PDF with custom options
    const pdfPath = await converter.convert(
      docxBuffer,
      './outputs/custom-invoice.pdf',
      {
        format: 'Letter',
        orientation: 'landscape'
      }
    );

    console.log('PDF converted with custom options:', pdfPath);

    // Convert to multiple formats
    const multiFormatResults = await converter.convertToMultipleFormats(
      docxBuffer,
      './outputs',
      ['pdf', 'html', 'txt']
    );

    console.log('Multiple format conversion results:', multiFormatResults);
    return { pdfPath, multiFormatResults };
  } catch (error) {
    console.error('PDF conversion failed:', error);
    throw error;
  }
}

/**
 * Example 6: Complete Workflow
 */
export async function completeWorkflow() {
  try {
    // 1. Set up template manager
    const templateManager = new TemplateManager();
    
    // 2. Validate template
    const template = templateManager.getTemplate('modern-invoice');
    if (!template) {
      throw new Error('Template not found');
    }

    // 3. Prepare invoice data
    const invoiceData: InvoiceData = {
      // ... your invoice data
      partyInfo: {
        from: {
          name: 'Complete Solutions',
          address: '123 Complete Street',
          city: 'Complete City',
          state: 'Complete State',
          zipCode: '12345',
          phone: '+1 (555) 123-4567',
          email: 'info@completesolutions.com',
        },
        to: {
          name: 'End Client',
          address: '456 End Street',
          city: 'End City',
          state: 'End State',
          zipCode: '67890',
          phone: '+1 (555) 987-6543',
          email: 'accounts@endclient.com',
        },
        date: '2024-01-30',
        invoiceNumber: 'INV-2024-003',
      },
      items: [
        {
          id: '1',
          itemNumber: '1',
          description: 'Complete Service Package',
          hsnNumber: '998314',
          rate: 1000,
          quantity: 1,
          total: 1000,
        }
      ],
      discount: 0,
      discountType: 'percentage',
      subtotal: 1000,
      discountAmount: 0,
      netTotal: 1000,
    };

    // 4. Validate data against template
    const validation = templateManager.validateTemplateData('modern-invoice', {
      company_name: invoiceData.partyInfo.from.name,
      client_name: invoiceData.partyInfo.to.name,
      invoice_number: invoiceData.partyInfo.invoiceNumber,
      // ... other fields
    });

    if (!validation.valid) {
      console.error('Template validation failed:', validation.errors);
      throw new Error('Template validation failed');
    }

    // 5. Generate PDF
    const pdfPath = await generateInvoicePDF(invoiceData);
    
    console.log('Complete workflow successful:', pdfPath);
    return pdfPath;
  } catch (error) {
    console.error('Complete workflow failed:', error);
    throw error;
  }
}

/**
 * Example 7: Batch Processing
 */
export async function batchProcessing(invoices: InvoiceData[]) {
  const results = [];

  for (let index = 0; index < invoices.length; index++) {
    const invoice = invoices[index];
    try {
      console.log(`Processing invoice ${index + 1}/${invoices.length}`);
      
      const pdfPath = await generateInvoicePDF(
        invoice,
        `./templates/batch-template.docx`,
        `./batch-output/invoice-${invoice.partyInfo.invoiceNumber}.pdf`
      );

      results.push({
        invoiceNumber: invoice.partyInfo.invoiceNumber,
        status: 'success',
        path: pdfPath
      });
    } catch (error) {
      results.push({
        invoiceNumber: invoice.partyInfo.invoiceNumber,
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  console.log('Batch processing completed:', results);
  return results;
}

// Export all examples for easy access
export const PDFGeneratorExamples = {
  basicPDFGeneration,
  advancedPDFGeneration,
  templateManagementExample,
  advancedWordProcessing,
  advancedPDFConversion,
  completeWorkflow,
  batchProcessing
}; 
