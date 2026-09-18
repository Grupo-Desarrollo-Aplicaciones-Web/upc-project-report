-- CREDITOR: modelo relacional propuesto para PostgreSQL.
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
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (id, business_id)
);

CREATE TABLE purchases (
  id UUID PRIMARY KEY,
  business_id UUID NOT NULL REFERENCES businesses(id),
  supplier_id UUID NOT NULL,
  currency_code CHAR(3) NOT NULL CHECK (currency_code IN ('PEN', 'USD')),
  total_amount DECIMAL(14,2) NOT NULL CHECK (total_amount > 0),
  due_date DATE NOT NULL,
  receipt_url VARCHAR(500),
  status VARCHAR(20) NOT NULL CHECK (status IN ('PENDING', 'PARTIALLY_PAID', 'SETTLED', 'OVERDUE')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (supplier_id, business_id) REFERENCES suppliers(id, business_id)
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

-- Apoyan los filtros y recorridos descritos en US-004, US-007 y US-009.
CREATE INDEX idx_purchases_business_due_status
  ON purchases (business_id, due_date, status);

CREATE INDEX idx_payments_purchase_paid_on
  ON payments (purchase_id, paid_on);

CREATE INDEX idx_loan_installments_loan_due_date
  ON loan_installments (loan_id, due_date);
