# Invoice Generator – Modern PDF Generation System

## 🎨 Overview

A modern, minimal, and colorful invoice generator built with **TypeScript** and **Next.js**, featuring a modular PDF generation system that converts Word templates to PDF with customizable data binding. The application follows MVC/repository patterns and provides a clean, intuitive user experience.

---

## ✨ Features

### 🎯 Core Features
- **Multi-step Invoice Creation** - Intuitive 4-step process
- **Real-time Validation** - Form validation with visual feedback
- **Responsive Design** - Works seamlessly on all devices
- **Modern UI/UX** - Glass morphism effects and smooth animations

### 📄 PDF Generation System
- **Word Template Support** - Use custom Word templates with placeholders
- **Data Binding** - Automatic field mapping and data insertion
- **Multiple Conversion Methods** - LibreOffice, Pandoc, Node.js modules, Puppeteer
- **Template Management** - Create, clone, and manage custom templates
- **Batch Processing** - Generate multiple invoices at once
- **Custom Fields** - Add custom data and formatting

### 🎨 Design Features
- **Glass Morphism** - Modern backdrop blur effects
- **Gradient Accents** - Vibrant color schemes
- **Smooth Animations** - Hover effects and transitions
- **Colorful Indicators** - Visual progress tracking
- **Minimal Layout** - Clean, uncluttered interface

---

## 🏗️ Architecture & Structure

### Framework & Technology
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom animations
- **UI Components:** Shadcn/ui with custom enhancements

### Module Structure
```
lib/
├── pdf-generator.ts      # Main PDF generation logic
├── word-processor.ts     # Word template processing
├── pdf-converter.ts      # PDF conversion utilities
└── template-manager.ts   # Template management system

components/
├── InvoiceGenerator.tsx  # Main application component
├── Step1PartyInfo.tsx    # Party information form
├── Step2InvoiceItems.tsx # Items and services form
├── Step3Summary.tsx      # Invoice summary and review
└── Step4Confirmation.tsx # PDF generation and export

examples/
└── pdf-generator-usage.ts # Comprehensive usage examples
```

---

## 📄 PDF Generation Module

### Core Components

#### 1. PDF Generator (`lib/pdf-generator.ts`)
```typescript
import { generateInvoicePDF, createPDFGenerator } from '@/lib/pdf-generator';

// Basic usage
const pdfPath = await generateInvoicePDF(invoiceData);

// Advanced usage with custom configuration
const generator = createPDFGenerator(
  invoiceData,
  './templates/custom-template.docx',
  './output/invoice.pdf',
  customFields
);
const pdfPath = await generator.generatePDF();
```

#### 2. Template Manager (`lib/template-manager.ts`)
```typescript
import { TemplateManager } from '@/lib/template-manager';

const templateManager = new TemplateManager();

// Create custom template
const template = templateManager.createCustomTemplate(
  'premium-invoice',
  'Premium invoice template',
  fields,
  styles
);

// Validate data against template
const validation = templateManager.validateTemplateData('template-name', data);
```

#### 3. Word Processor (`lib/word-processor.ts`)
```typescript
import { AdvancedWordProcessor } from '@/lib/word-processor';

const processor = new AdvancedWordProcessor('./template.docx');

// Add custom processors
processor.addCustomProcessor('invoice_date', (value) => {
  return new Date(value).toLocaleDateString();
});

const processedBuffer = await processor.processWithCustomProcessors(data);
```

#### 4. PDF Converter (`lib/pdf-converter.ts`)
```typescript
import { AdvancedPDFConverter } from '@/lib/pdf-converter';

const converter = new AdvancedPDFConverter({
  format: 'A4',
  orientation: 'portrait',
  margins: { top: 0.5, right: 0.5, bottom: 0.5, left: 0.5 }
});

const pdfPath = await converter.convert(docxBuffer, outputPath);
```

### Template System

#### Supported Template Fields
- **Company Information:** `company_name`, `company_address`, `company_phone`, `company_email`
- **Client Information:** `client_name`, `client_address`, `client_phone`, `client_email`
- **Invoice Details:** `invoice_number`, `invoice_date`, `due_date`
- **Financial Data:** `subtotal`, `discount_amount`, `net_total`, `grand_total`
- **Items Table:** `items_table` (automatically formatted HTML table)
- **Custom Fields:** Any additional fields you define

#### Template Types
- **Modern Invoice** - Clean, gradient-based design
- **Classic Invoice** - Traditional, professional layout
- **Minimal Invoice** - Simple, clean design
- **Custom Templates** - User-defined templates

---

## 🚀 Usage Examples

### Basic PDF Generation
```typescript
import { generateInvoicePDF } from '@/lib/pdf-generator';

const pdfPath = await generateInvoicePDF(invoiceData);
console.log('PDF generated:', pdfPath);
```

### Advanced Configuration
```typescript
import { createPDFGenerator } from '@/lib/pdf-generator';

const customFields = {
  'payment_terms': 'Net 30',
  'project_reference': 'PRJ-2024-001',
  'special_notes': 'Rush delivery requested'
};

const generator = createPDFGenerator(
  invoiceData,
  './templates/custom-template.docx',
  './output/invoice.pdf',
  customFields
);

const pdfPath = await generator.generatePDF();
```

### Template Management
```typescript
import { TemplateManager } from '@/lib/template-manager';

const templateManager = new TemplateManager();

// Create custom template
const template = templateManager.createCustomTemplate(
  'premium-invoice',
  'Premium invoice template',
  [
    { key: 'company_name', label: 'Company Name', type: 'text', required: true },
    { key: 'client_name', label: 'Client Name', type: 'text', required: true },
    // ... more fields
  ],
  {
    fontFamily: 'Georgia, serif',
    fontSize: 11,
    colors: { primary: '#2c3e50', secondary: '#34495e', accent: '#3498db' },
    layout: 'professional'
  }
);
```

### Batch Processing
```typescript
import { batchProcessing } from '@/examples/pdf-generator-usage';

const results = await batchProcessing(invoices);
console.log('Batch processing results:', results);
```

---

## 🎨 Design System

### Color Palette
- **Primary:** Violet/Purple gradients (`#6366f1` to `#8b5cf6`)
- **Secondary:** Green/Emerald gradients (`#10b981` to `#059669`)
- **Accent:** Blue/Indigo gradients (`#3b82f6` to `#1d4ed8`)
- **Success:** Green gradients (`#22c55e` to `#16a34a`)
- **Error:** Red gradients (`#ef4444` to `#dc2626`)

### Animation Classes
- `.hover-lift` - Scale and shadow on hover
- `.pulse-glow` - Pulsing glow effect
- `.float-animation` - Floating animation
- `.glass-effect` - Backdrop blur with transparency

### Component Styling
- **Glass Morphism:** `backdrop-blur-md bg-white/80`
- **Gradient Text:** `bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent`
- **Rounded Corners:** `rounded-2xl` for modern look
- **Shadows:** `shadow-xl` for depth

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- LibreOffice (optional, for PDF conversion)
- Pandoc (optional, for alternative conversion)

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd invoice-generator

# Install dependencies
npm install

# Install PDF conversion dependencies (optional)
npm install docxtemplater pizzip puppeteer

# Start development server
npm run dev
```

### Environment Setup
```bash
# Create .env.local file
cp .env.example .env.local

# Configure PDF generation settings
PDF_TEMPLATE_DIR=./templates
PDF_OUTPUT_DIR=./invoices
PDF_CONVERSION_METHOD=libreoffice
```

---

## 🔧 Configuration

### PDF Generation Settings
```typescript
// lib/config/pdf-config.ts
export const PDF_CONFIG = {
  defaultTemplate: 'modern-invoice',
  outputDirectory: './invoices',
  conversionMethods: ['libreoffice', 'pandoc', 'puppeteer'],
  defaultFormat: 'A4',
  defaultOrientation: 'portrait',
  margins: { top: 0.5, right: 0.5, bottom: 0.5, left: 0.5 }
};
```

### Template Configuration
```json
{
  "name": "custom-invoice",
  "description": "Custom invoice template",
  "category": "invoice",
  "fields": [
    {
      "key": "company_name",
      "label": "Company Name",
      "type": "text",
      "required": true
    }
  ],
  "styles": {
    "fontFamily": "Inter, sans-serif",
    "fontSize": 12,
    "colors": {
      "primary": "#6366f1",
      "secondary": "#8b5cf6",
      "accent": "#06b6d4"
    },
    "layout": "modern"
  }
}
```

---

## 🧪 Testing

### Unit Tests
```bash
# Run unit tests
npm run test

# Run tests with coverage
npm run test:coverage
```

### Integration Tests
```bash
# Test PDF generation
npm run test:pdf

# Test template management
npm run test:templates
```

---

## 📚 API Reference

### PDF Generator API
```typescript
interface PDFGeneratorConfig {
  templatePath: string;
  outputPath: string;
  data: InvoiceData;
  customFields?: Record<string, any>;
}

class PDFGenerator {
  constructor(config: PDFGeneratorConfig);
  generatePDF(): Promise<string>;
  getTemplateFields(): TemplateField[];
}
```

### Template Manager API
```typescript
class TemplateManager {
  constructor(templatesDir?: string);
  createCustomTemplate(name: string, description: string, fields: TemplateField[], styles?: TemplateStyles): TemplateConfig;
  getTemplate(name: string): TemplateConfig | undefined;
  getAllTemplates(): TemplateConfig[];
  validateTemplateData(templateName: string, data: Record<string, any>): ValidationResult;
}
```

---

## 🤝 Contributing

### Development Guidelines
1. Follow TypeScript best practices
2. Use meaningful variable and function names
3. Add comprehensive error handling
4. Include JSDoc comments for complex functions
5. Write unit tests for new features

### Code Style
- Use camelCase for variables and functions
- Use PascalCase for components and classes
- Use kebab-case for file names
- Follow ESLint and Prettier configurations

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the [documentation](docs/)
- Review the [examples](examples/)

---

## 🎯 Roadmap

### Planned Features
- [ ] Email integration for invoice delivery
- [ ] Cloud storage integration (AWS S3, Google Cloud)
- [ ] Multi-language support
- [ ] Advanced template editor
- [ ] Invoice analytics and reporting
- [ ] Payment gateway integration
- [ ] Mobile app version

### Performance Improvements
- [ ] PDF generation optimization
- [ ] Template caching system
- [ ] Batch processing improvements
- [ ] Memory usage optimization

---

## 🙏 Acknowledgments

- **Shadcn/ui** for the excellent component library
- **Tailwind CSS** for the utility-first CSS framework
- **Next.js** for the React framework
- **Docxtemplater** for Word template processing
- **Puppeteer** for PDF conversion capabilities
