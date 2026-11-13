# Frontend integration review — 13 November 2026

The review uses fictional businesses and isolated local API databases. It verifies the connected Vue workspace independently from the browser-only practice demo. No remote publication is part of these checks.

## Results

| Check | Result |
| --- | --- |
| Vue unit tests, including financial rules and loan schedule input | 71 passed |
| Production build | Passed |
| Browser regression of the existing practice workspace, navigation and responsive layout | 22 passed |
| Connected browser scenarios against PostgreSQL | 4 passed |
| Connected browser scenarios against MySQL | 4 passed |

The connected suite executes the same four workflows for each provider; these are not eight distinct workflows. Local JUnit evidence is kept under the ignored artifacts directory. Unit/build: npm run check. Demo: npm run test:e2e. Connected: set CREDITOR_E2E_API and CREDITOR_E2E_WEB_PORT, then npm run test:e2e:connected.

## Connected workflows

1. **Accounts payable:** create supplier and purchase, register successive payments, upload/download a private receipt, sign in again and verify server values. The purchase of PEN 125.75 receives abonos of 25.50 and 10.25, leaving 90.00. Supplier, currency, status and due-date filters produce matching rows, summary and CSV. Paying the remaining 90.00 removes the purchase from the filtered pending list and CSV while preserving its selected detail and history with zero balance. A summary request failure prevents exporting stale data until a successful refresh.
2. **Loans:** reject a schedule below the principal; register USD 900.01 with agreed installments of 450.01 and 460.00. Verify stored dates 2030-01-31 and 2030-02-28 and the informational 8.5% rate through the API and UI. Reload, sign in and read the persisted schedule. Check mobile overflow and capture both layouts.
3. **Treasury:** create holder and economic owner separately, register an account and movement, classify part of its funds and verify account/owner/unassigned balances and the connected report.
4. **Access boundaries:** a Viewer can read its purchases and loan schedules but has no write controls; a different business cannot see those records. The backend separately tests enforcement of permissions for direct HTTP calls.

## Capability audit

| Capability | Connected implementation |
| --- | --- |
| Business registration and sign-in | JWT session in memory; API registration/login; sign-in required after browser reload. |
| Suppliers, purchases and abonos | Persistent API, exact balances and payment history; no automatic Treasury posting. |
| Private purchase receipts and payment vouchers | Authenticated upload/download through the API. |
| Obligations list, totals and CSV | Same applied filters; currencies remain separate. |
| Loans and monthly schedules | Persistent registration/list/detail; agreed amounts and dates. No installment settlement or amortization calculation. |
| Parties, accounts, projects, movements and allocations | Persistent Treasury API; owner and holder have separate meanings. |
| Account statements | Client-side report built from authenticated Treasury data; filters, CSV and print reuse the established report design. |
| User administration and external exchange-rate reference | Backend endpoints; no dedicated frontend screen. |
| Receivables, invoices, payment promises, transfers, reconciliation and reversals | Practice demo only; not represented as backend-backed features. |

The original application shell, navigation, palette and CSS remain in place. Loan screens reuse the existing form, card, table and button styles. These automated checks provide technical evidence for the covered scenarios; they do not establish that every possible production workflow is implemented or free of defects.
