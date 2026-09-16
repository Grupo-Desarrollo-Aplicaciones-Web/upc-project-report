-- CREDITOR: modelo relacional inicial para discusión de diseño.
-- Este archivo no representa una base de datos desplegada ni contiene datos personales.

CREATE TABLE businesses (
  id UUID PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE suppliers (
  id UUID PRIMARY KEY,
  business_id UUID NOT NULL REFERENCES businesses(id),
  name VARCHAR(160) NOT NULL,
  tax_identifier VARCHAR(32),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE purchases (
  id UUID PRIMARY KEY,
  business_id UUID NOT NULL REFERENCES businesses(id),
  supplier_id UUID NOT NULL REFERENCES suppliers(id),
  currency_code CHAR(3) NOT NULL CHECK (currency_code IN ('PEN', 'USD')),
  total_amount DECIMAL(14,2) NOT NULL CHECK (total_amount > 0),
  due_date DATE NOT NULL,
  receipt_url VARCHAR(500),
  status VARCHAR(20) NOT NULL CHECK (status IN ('PENDING', 'PARTIALLY_PAID', 'SETTLED', 'OVERDUE')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payments (
  id UUID PRIMARY KEY,
  purchase_id UUID NOT NULL REFERENCES purchases(id),
  amount DECIMAL(14,2) NOT NULL CHECK (amount > 0),
  paid_on DATE NOT NULL,
  voucher_url VARCHAR(500),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE loans (
  id UUID PRIMARY KEY,
  business_id UUID NOT NULL REFERENCES businesses(id),
  principal DECIMAL(14,2) NOT NULL CHECK (principal > 0),
  currency_code CHAR(3) NOT NULL CHECK (currency_code IN ('PEN', 'USD')),
  annual_rate DECIMAL(7,4) NOT NULL CHECK (annual_rate >= 0),
  installment_count INTEGER NOT NULL CHECK (installment_count > 0),
  first_due_date DATE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE loan_installments (
  id UUID PRIMARY KEY,
  loan_id UUID NOT NULL REFERENCES loans(id),
  installment_number INTEGER NOT NULL CHECK (installment_number > 0),
  due_date DATE NOT NULL,
  amount DECIMAL(14,2) NOT NULL CHECK (amount > 0),
  status VARCHAR(20) NOT NULL CHECK (status IN ('PENDING', 'PAID', 'OVERDUE')),
  UNIQUE (loan_id, installment_number)
);
