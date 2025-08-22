E-Commerce Sample Project – E2E Tests

This repository contains end-to-end (E2E) tests for a sample e-commerce application.
Included files:  
- **TestCases.xlsx** – contains the test cases  
- **Defect_Report.docx** – contains defects found  

Setup
1. Clone the repository
git clone https://github.com/vbksaran/Ecommerce.git
cd Ecommerce

2. Install dependencies
npm install

3. Running Tests
Run all tests
npx playwright test

Run specific tests

Shopper flow:
npx playwright test tests/Shoper/shoper-flow.spec.ts


Supplier flow:
npx playwright test tests/supplier/supplier-flow.spec.ts

4. View HTML Report
npx playwright show-report
