// ========================================
// STATE MANAGEMENT - ENHANCED
// ========================================

const state = {
  // Auth & User
  currentUser: null,
  isLoggedIn: false,
  currentPage: 'login',
  language: localStorage.getItem('language') || 'en',
  
  // Data Arrays
  transactions: [],
  accounts: [],
  reports: {},
  predictions: [],
  ledger: [],
  uploads: [],
  categories: [],
  
  // Filters
  filters: {
    dateFrom: null,
    dateTo: null,
    category: null,
    type: 'all',
    amountMin: 0,
    amountMax: 1000000,
    search: '',
    accountId: null
  },
  
  // Pagination
  pagination: {
    transactions: { currentPage: 1, itemsPerPage: 10, totalItems: 0 },
    accounts: { currentPage: 1, itemsPerPage: 10, totalItems: 0 },
    ledger: { currentPage: 1, itemsPerPage: 10, totalItems: 0 },
    predictions: { currentPage: 1, itemsPerPage: 10, totalItems: 0 },
    uploads: { currentPage: 1, itemsPerPage: 10, totalItems: 0 }
  },
  
  // UI State
  editingTransaction: null,
  selectedAccount: 'acc_default_001'
};

// ========================================
// API ENDPOINTS
// ========================================

// const API_BASE = 'http://localhost:5001/api';
// const API_BASE = 'http://127.0.0.1:5001/api';
const API_BASE = '/api';

const endpoints = {
  // Reports
  dashboard: `${API_BASE}/reports/dashboard`,
  incomeExpenses: `${API_BASE}/reports/income-expenses`,
  cashFlow: `${API_BASE}/reports/cash-flow`,
  categoryAnalysis: `${API_BASE}/reports/category-analysis`,
  topTransactions: `${API_BASE}/reports/top-transactions`,
  reconciliation: `${API_BASE}/reports/reconciliation-status`,
  monthlyComparison: `${API_BASE}/reports/monthly-comparison`,
  dateRange: `${API_BASE}/reports/date-range`, // NEW: Add this line

  // Predictions
  recurring: `${API_BASE}/reports/recurring`,
  forecast: `${API_BASE}/reports/forecast/cash-flow`,
  
  // Accounts
  accounts: `${API_BASE}/accounts`,
  accountLedger: (id) => `${API_BASE}/accounts/${id}/ledger`,
  accountSummary: (id) => `${API_BASE}/accounts/${id}/summary`,
  accountBalance: (id) => `${API_BASE}/accounts/${id}/balance`,
  
  // Transactions
  transactions: `${API_BASE}/transactions`,
  upload: `${API_BASE}/files/upload`,
  uploads: `${API_BASE}/files`, // NEW - list uploads
  uploadsList: `${API_BASE}/uploads`, // List of uploads


  categories: `${API_BASE}/categories`

};

// ========================================
// TRANSLATIONS - ENHANCED
// ========================================

const translations = {
  en: {
    common: { save: 'Save', cancel: 'Cancel', close: 'Close', delete: 'Delete', edit: 'Edit', logout: 'Logout', login: 'Login', loading: 'Loading...', error: 'Error', success: 'Success', language: 'EN / EL', back: 'Back', create: 'Create', update: 'Update' },
    nav: { dashboard: 'Dashboard', transactions: 'Transactions', upload: 'Upload', reports: 'Reports', accounts: 'Accounts', ledger: 'Ledger', predictions: 'Predictions', reconciliation: 'Reconciliation' },
    dashboard: { 
      welcome: 'Welcome', 
      totalBalance: 'Total Balance', 
      totalIncome: 'Total Income', 
      totalExpenses: 'Total Expenses', 
      transactionCount: 'Transactions',
      activeAccounts: 'Active Accounts',
      netCashFlow: 'Net Cash Flow',
      reconciled: 'Reconciled',
      recentTransactions: 'Recent Transactions'
    },
    reports: {
      summary: 'Summary',
      cashFlow: 'Cash Flow Report',
      categoryAnalysis: 'Category Analysis',
      monthlyComparison: 'Monthly Comparison',
      recurring: 'Recurring Transactions',
      topTransactions: 'Top Transactions',
      reconciliation: 'Reconciliation Status'
    },
    predictions: {
      title: 'Predictions & Forecasts',
      cashFlowForecast: 'Cash Flow Forecast (3 Months)',
      nextTransactions: 'Next Expected Transactions',
      recurringPatterns: 'Recurring Patterns'
    },
    accounts: {
      title: 'Account Management',
      createNew: 'Create New Account',
      accountName: 'Account Name',
      accountNumber: 'Account Number',
      accountType: 'Account Type',
      currency: 'Currency',
      openingBalance: 'Opening Balance',
      currentBalance: 'Current Balance',
      ledgerHistory: 'Ledger History'
    },
    ledger: {
      title: 'Accounting Ledger',
      date: 'Date',
      description: 'Description',
      debit: 'Debit',
      credit: 'Credit',
      balance: 'Balance',
      reconciled: 'Reconciled'
    }
  },
  el: {
    common: { save: 'Αποθήκευση', cancel: 'Ακύρωση', close: 'Κλείσιμο', delete: 'Διώχνω', edit: 'Επεξεργασία', logout: 'Αποσύνδεση', login: 'Σύνδεση', loading: 'Φόρτωση...', error: 'Σφάλμα', success: 'Επιτυχία', language: 'EN / EL', back: 'Πίσω', create: 'Δημιουργία', update: 'Ενημέρωση' },
    nav: { dashboard: 'Πίνακας Ελέγχου', transactions: 'Συναλλαγές', upload: 'Ανέβασμα', reports: 'Αναφορές', accounts: 'Λογαριασμοί', ledger: 'Λογιστικό Καθολικό', predictions: 'Προβλέψεις', reconciliation: 'Συμφωνία' },
    dashboard: { 
      welcome: 'Καλώς ήρθατε', 
      totalBalance: 'Συνολό Υπόλοιπο', 
      totalIncome: 'Συνολό Εισόδημα', 
      totalExpenses: 'Συνολά Έξοδα', 
      transactionCount: 'Συναλλαγές',
      activeAccounts: 'Ενεργοί Λογαριασμοί',
      netCashFlow: 'Καθαρή Ταμειακή Ροή',
      reconciled: 'Συμφωνημένες',
      recentTransactions: 'Πρόσφατες Συναλλαγές'
    },
    reports: {
      summary: 'Περίληψη',
      cashFlow: 'Έκθεση Ταμειακής Ροής',
      categoryAnalysis: 'Ανάλυση Κατηγοριών',
      monthlyComparison: 'Μηνιαία Σύγκριση',
      recurring: 'Επαναλαμβανόμενες Συναλλαγές',
      topTransactions: 'Κορυφαίες Συναλλαγές',
      reconciliation: 'Κατάσταση Συμφωνίας'
    },
    predictions: {
      title: 'Προβλέψεις & Προβολές',
      cashFlowForecast: 'Πρόβλεψη Ταμειακής Ροής (3 Μήνες)',
      nextTransactions: 'Αναμενόμενες Επόμενες Συναλλαγές',
      recurringPatterns: 'Επαναλαμβανόμενα Μοτίβα'
    },
    accounts: {
      title: 'Διαχείριση Λογαριασμών',
      createNew: 'Δημιουργία Νέου Λογαριασμού',
      accountName: 'Όνομα Λογαριασμού',
      accountNumber: 'Αριθμός Λογαριασμού',
      accountType: 'Τύπος Λογαριασμού',
      currency: 'Νόμισμα',
      openingBalance: 'Αρχικό Υπόλοιπο',
      currentBalance: 'Τρέχον Υπόλοιπο',
      ledgerHistory: 'Ιστορικό Καθολικού'
    },
    ledger: {
      title: 'Λογιστικό Καθολικό',
      date: 'Ημερομηνία',
      description: 'Περιγραφή',
      debit: 'Χρέωση',
      credit: 'Πίστωση',
      balance: 'Υπόλοιπο',
      reconciled: 'Συμφωνημένο'
    }
  }
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

function t(path) {
  const keys = path.split('.');
  let result = translations[state.language] || translations.en;
  for (let key of keys) {
    result = result[key] || path;
  }
  return result;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat(state.language === 'el' ? 'el-GR' : 'en-US', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString(state.language === 'el' ? 'el-GR' : 'en-US', options);
}

// ========================================
// API FUNCTIONS - ENHANCED
// ========================================

function setLanguage(lang) {
  state.language = lang;
  localStorage.setItem('language', lang);
  console.log('🌍 Language changed to:', lang);
  render();
}

function changeLanguage(lang) {
  setLanguage(lang);
}



// ========================================
// PAGINATION & FILTERING UTILITIES
// ========================================

function filterData(data, filters) {
  return data.filter(item => {
    // Date filter
    if (filters.dateFrom && item.date < filters.dateFrom) return false;
    if (filters.dateTo && item.date > filters.dateTo) return false;
    
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const description = (item.description || '').toLowerCase();
      const counterparty = (item.counterparty || '').toLowerCase();
      if (!description.includes(searchLower) && !counterparty.includes(searchLower)) {
        return false;
      }
    }
    
    // Type filter
    if (filters.type && filters.type !== 'all') {
      if (item.type !== filters.type) return false;
    }
    
    // Category filter
    if (filters.category && filters.category !== 'all') {
      if (item.categoryCode !== filters.category) return false;
    }
    
    // Amount filter
    if (filters.amountMin && Math.abs(item.amount) < filters.amountMin) return false;
    if (filters.amountMax && Math.abs(item.amount) > filters.amountMax) return false;
    
    // Account filter
    if (filters.accountId && filters.accountId !== 'all') {
      if (item.account_id !== filters.accountId) return false;
    }
    
    return true;
  });
}

function paginateData(data, page, itemsPerPage) {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return data.slice(start, end);
}

function getTotalPages(totalItems, itemsPerPage) {
  return Math.ceil(totalItems / itemsPerPage);
}

function renderPagination(tableType, totalItems) {
  const pagination = state.pagination[tableType];
  const totalPages = getTotalPages(totalItems, pagination.itemsPerPage);
  
  if (totalPages <= 1) return '';
  
  return `
    <div class="pagination" style="display: flex; justify-content: center; align-items: center; gap: 10px; margin-top: 20px; padding: 15px; background-color: var(--bg-card); border-radius: 8px;">
      
      <button 
        onclick="changePaginationPage('${tableType}', ${pagination.currentPage - 1})" 
        ${pagination.currentPage === 1 ? 'disabled' : ''}
        style="padding: 8px 12px; background-color: var(--bg-hover); border: 1px solid var(--border-color); border-radius: 4px; color: var(--text-primary); cursor: pointer;">
        ← Previous
      </button>
      
      <span style="color: var(--text-secondary); font-size: 14px;">
        Page ${pagination.currentPage} of ${totalPages}
      </span>
      
      <select 
        onchange="changeItemsPerPage('${tableType}', this.value)"
        style="padding: 8px; background-color: var(--bg-hover); border: 1px solid var(--border-color); border-radius: 4px; color: var(--text-primary);">
        <option value="10" ${pagination.itemsPerPage === 10 ? 'selected' : ''}>10 per page</option>
        <option value="25" ${pagination.itemsPerPage === 25 ? 'selected' : ''}>25 per page</option>
        <option value="50" ${pagination.itemsPerPage === 50 ? 'selected' : ''}>50 per page</option>
        <option value="100" ${pagination.itemsPerPage === 100 ? 'selected' : ''}>100 per page</option>
      </select>
      
      <button 
        onclick="changePaginationPage('${tableType}', ${pagination.currentPage + 1})" 
        ${pagination.currentPage === totalPages ? 'disabled' : ''}
        style="padding: 8px 12px; background-color: var(--bg-hover); border: 1px solid var(--border-color); border-radius: 4px; color: var(--text-primary); cursor: pointer;">
        Next →
      </button>
      
      <span style="color: var(--text-secondary); font-size: 12px;">
        (${totalItems} total items)
      </span>
    </div>
  `;
}

function changePaginationPage(tableType, newPage) {
  const pagination = state.pagination[tableType];
  const totalPages = getTotalPages(pagination.totalItems, pagination.itemsPerPage);
  
  if (newPage < 1 || newPage > totalPages) return;
  
  pagination.currentPage = newPage;
  
  // Re-render the appropriate table
  switch(tableType) {
    case 'transactions':
      renderTransactionsTable();
      break;
    case 'accounts':
      renderAccountsTable();
      break;
    case 'ledger':
      renderLedgerTable();
      break;
    case 'predictions':
      renderPredictionsTable();
      break;
    case 'uploads':
      loadRecentUploads();
      break;
  }
}

function changeItemsPerPage(tableType, newItemsPerPage) {
  state.pagination[tableType].itemsPerPage = parseInt(newItemsPerPage);
  state.pagination[tableType].currentPage = 1; // Reset to first page
  changePaginationPage(tableType, 1);
}

function applyFilters() {
  // Get filter values
  state.filters.dateFrom = document.getElementById('filterDateFrom')?.value || null;
  state.filters.dateTo = document.getElementById('filterDateTo')?.value || null;
  state.filters.search = document.getElementById('filterSearch')?.value || '';
  state.filters.type = document.getElementById('filterType')?.value || 'all';
  state.filters.category = document.getElementById('filterCategory')?.value || 'all';
  state.filters.accountId = document.getElementById('filterAccount')?.value || 'all';
  
  // Reset to page 1
  state.pagination.transactions.currentPage = 1;
  
  // Re-render table
  renderTransactionsTable();
}

function clearFilters() {
  // Reset filters
  state.filters = {
    dateFrom: null,
    dateTo: null,
    category: null,
    type: 'all',
    amountMin: 0,
    amountMax: 1000000,
    search: '',
    accountId: null
  };
  
  // Clear UI
  if (document.getElementById('filterDateFrom')) document.getElementById('filterDateFrom').value = '';
  if (document.getElementById('filterDateTo')) document.getElementById('filterDateTo').value = '';
  if (document.getElementById('filterSearch')) document.getElementById('filterSearch').value = '';
  if (document.getElementById('filterType')) document.getElementById('filterType').value = 'all';
  if (document.getElementById('filterCategory')) document.getElementById('filterCategory').value = 'all';
  if (document.getElementById('filterAccount')) document.getElementById('filterAccount').value = 'all';
  
  // Reset pagination
  state.pagination.transactions.currentPage = 1;
  
  // Re-render
  renderTransactionsTable();
}

// Update summary cards without re-rendering entire page
function updateSummaryCards(summary) {
  console.log('💳 Updating summary cards:', summary);
  // Cards are rendered in HTML, we could update them here if needed
  // For now, they update on full render
}

// Update category table
function updateCategoryTable(categoryData) {
  const categoryBody = document.getElementById('categoryBody');
  if (!categoryBody) return;
  
  if (categoryData.length === 0) {
    categoryBody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 40px;">
          <div style="font-size: 48px; margin-bottom: 15px;">📂</div>
          <p style="color: #9CA3AF;">No categories found</p>
        </td>
      </tr>
    `;
    return;
  }
  
  const creditCategories = categoryData.filter(c => c.category_type === 'CREDIT');
  const debitCategories = categoryData.filter(c => c.category_type === 'DEBIT');
  
  const creditGrandTotal = creditCategories.reduce((sum, c) => sum + Math.abs(c.total_amount || 0), 0);
  const debitGrandTotal = debitCategories.reduce((sum, c) => sum + Math.abs(c.total_amount || 0), 0);
  
  let tableHTML = '';
  
  // Render Credit Categories
  if (creditCategories.length > 0) {
    tableHTML += `
      <tr style="background-color: rgba(16, 185, 129, 0.1);">
        <td colspan="7" style="font-weight: 700; padding: 12px; color: #10b981;">
          💰 ${state.language === 'en' ? 'INCOME CATEGORIES' : 'ΚΑΤΗΓΟΡΙΕΣ ΕΙΣΟΔΗΜΑΤΟΣ'}
        </td>
      </tr>
    `;
    
    creditCategories.forEach((c, index) => {
      const amount = Math.abs(c.total_amount || 0);
      const percentage = creditGrandTotal > 0 ? (amount / creditGrandTotal * 100) : 0;
      
      tableHTML += `
        <tr style="border-left: 3px solid #10b981;">
          <td>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 18px;">${index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '📌'}</span>
              <div>
                <div style="font-weight: 600;">${state.language === 'en' ? c.name_en : c.name_el}</div>
                <div style="font-size: 11px; color: #6B7280;">${c.code}</div>
              </div>
            </div>
          </td>
          <td><span style="padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 600; background-color: rgba(16, 185, 129, 0.2); color: #10b981;">💰 CREDIT</span></td>
          <td style="text-align: right;"><span style="padding: 4px 8px; background-color: rgba(255, 184, 0, 0.1); border-radius: 4px; color: #FFB800; font-weight: 600;">${c.transaction_count || 0}</span></td>
          <td style="text-align: right;">
            <div style="font-weight: 700; font-size: 15px; color: #10b981;">${formatCurrency(amount)}</div>
            <div style="font-size: 11px; color: #6B7280; margin-top: 2px;">${percentage.toFixed(1)}% of income</div>
          </td>
          <td style="text-align: right; color: #9CA3AF;">${formatCurrency(c.average_amount || 0)}</td>
          <td style="text-align: right; color: #6B7280; font-size: 12px;">${formatCurrency(c.min_amount || 0)}</td>
          <td style="text-align: right; color: #6B7280; font-size: 12px;">${formatCurrency(c.max_amount || 0)}</td>
        </tr>
      `;
    });
  }
  
  // Render Debit Categories
  if (debitCategories.length > 0) {
    tableHTML += `
      <tr style="background-color: rgba(239, 68, 68, 0.1);">
        <td colspan="7" style="font-weight: 700; padding: 12px; color: #ef4444;">
          💸 ${state.language === 'en' ? 'EXPENSE CATEGORIES' : 'ΚΑΤΗΓΟΡΙΕΣ ΕΞΟΔΩΝ'}
        </td>
      </tr>
    `;
    
    debitCategories.forEach((c, index) => {
      const amount = Math.abs(c.total_amount || 0);
      const percentage = debitGrandTotal > 0 ? (amount / debitGrandTotal * 100) : 0;
      
      tableHTML += `
        <tr style="border-left: 3px solid #ef4444;">
          <td>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 18px;">${index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '📌'}</span>
              <div>
                <div style="font-weight: 600;">${state.language === 'en' ? c.name_en : c.name_el}</div>
                <div style="font-size: 11px; color: #6B7280;">${c.code}</div>
              </div>
            </div>
          </td>
          <td><span style="padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 600; background-color: rgba(239, 68, 68, 0.2); color: #ef4444;">💸 DEBIT</span></td>
          <td style="text-align: right;"><span style="padding: 4px 8px; background-color: rgba(255, 184, 0, 0.1); border-radius: 4px; color: #FFB800; font-weight: 600;">${c.transaction_count || 0}</span></td>
          <td style="text-align: right;">
            <div style="font-weight: 700; font-size: 15px; color: #ef4444;">${formatCurrency(amount)}</div>
            <div style="font-size: 11px; color: #6B7280; margin-top: 2px;">${percentage.toFixed(1)}% of expenses</div>
          </td>
          <td style="text-align: right; color: #9CA3AF;">${formatCurrency(c.average_amount || 0)}</td>
          <td style="text-align: right; color: #6B7280; font-size: 12px;">${formatCurrency(c.min_amount || 0)}</td>
          <td style="text-align: right; color: #6B7280; font-size: 12px;">${formatCurrency(c.max_amount || 0)}</td>
        </tr>
      `;
    });
  }
  
  categoryBody.innerHTML = tableHTML;
}

// Update transaction summary table
function updateTransactionSummaryTable(categoryData) {
  const summaryBody = document.getElementById('transactionSummaryBody');
  if (!summaryBody) return;
  
  if (categoryData.length === 0) {
    summaryBody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 40px;">
          <div style="font-size: 48px; margin-bottom: 15px;">📊</div>
          <p style="color: #9CA3AF;">No transaction data available</p>
        </td>
      </tr>
    `;
    return;
  }
  
  const creditData = categoryData.filter(c => c.category_type === 'CREDIT');
  const debitData = categoryData.filter(c => c.category_type === 'DEBIT');
  
  const creditCount = creditData.reduce((sum, c) => sum + (c.transaction_count || 0), 0);
  const debitCount = debitData.reduce((sum, c) => sum + (c.transaction_count || 0), 0);
  
  const creditTotal = creditData.reduce((sum, c) => sum + Math.abs(c.total_amount || 0), 0);
  const debitTotal = debitData.reduce((sum, c) => sum + Math.abs(c.total_amount || 0), 0);
  
  const totalCount = creditCount + debitCount;
  const totalAmount = creditTotal + debitTotal;
  
  summaryBody.innerHTML = `
    <tr style="background-color: rgba(16, 185, 129, 0.05);">
      <td><span style="padding: 6px 12px; border-radius: 6px; font-weight: 600; background-color: rgba(16, 185, 129, 0.2); color: #10b981;">💰 ${state.language === 'en' ? 'Income (CREDIT)' : 'Εισόδημα (ΠΙΣΤΩΣΗ)'}</span></td>
      <td style="text-align: right; font-weight: 600;">${creditCount}</td>
      <td style="text-align: right; font-weight: 700; font-size: 15px; color: #10b981;">${formatCurrency(creditTotal)}</td>
      <td style="text-align: right; color: #9CA3AF;">${creditCount > 0 ? formatCurrency(creditTotal / creditCount) : '€0.00'}</td>
      <td style="text-align: right;"><span style="padding: 4px 10px; border-radius: 4px; background-color: rgba(16, 185, 129, 0.1); color: #10b981; font-weight: 600;">${totalCount > 0 ? ((creditCount / totalCount) * 100).toFixed(1) : 0}%</span></td>
    </tr>
    <tr style="background-color: rgba(239, 68, 68, 0.05);">
      <td><span style="padding: 6px 12px; border-radius: 6px; font-weight: 600; background-color: rgba(239, 68, 68, 0.2); color: #ef4444;">💸 ${state.language === 'en' ? 'Expenses (DEBIT)' : 'Έξοδα (ΧΡΕΩΣΗ)'}</span></td>
      <td style="text-align: right; font-weight: 600;">${debitCount}</td>
      <td style="text-align: right; font-weight: 700; font-size: 15px; color: #ef4444;">${formatCurrency(debitTotal)}</td>
      <td style="text-align: right; color: #9CA3AF;">${debitCount > 0 ? formatCurrency(debitTotal / debitCount) : '€0.00'}</td>
      <td style="text-align: right;"><span style="padding: 4px 10px; border-radius: 4px; background-color: rgba(239, 68, 68, 0.1); color: #ef4444; font-weight: 600;">${totalCount > 0 ? ((debitCount / totalCount) * 100).toFixed(1) : 0}%</span></td>
    </tr>
    <tr style="background-color: rgba(255, 184, 0, 0.05); border-top: 2px solid #FFB800;">
      <td><span style="padding: 6px 12px; border-radius: 6px; font-weight: 700; background-color: rgba(255, 184, 0, 0.2); color: #FFB800;">📈 ${state.language === 'en' ? 'NET BALANCE' : 'ΚΑΘΑΡΟ ΥΠΟΛΟΙΠΟ'}</span></td>
      <td style="text-align: right; font-weight: 700;">${totalCount}</td>
      <td style="text-align: right; font-weight: 700; font-size: 16px; color: ${(creditTotal - debitTotal) >= 0 ? '#10b981' : '#ef4444'};">${formatCurrency(creditTotal - debitTotal)}</td>
      <td style="text-align: right; color: #9CA3AF;">${totalCount > 0 ? formatCurrency(totalAmount / totalCount) : '€0.00'}</td>
      <td style="text-align: right; font-weight: 600; color: #FFB800;">100%</td>
    </tr>
  `;
}

async function loadReportsData() {
  try {
    console.log('📊 Loading reports data...');
    
    const dateFromInput = document.getElementById('reportDateFrom');
    const dateToInput = document.getElementById('reportDateTo');

    // SMART DEFAULT: Get last month with data from database
    if (dateFromInput && dateToInput && !dateFromInput.value && !dateToInput.value) {
      console.log('📅 No dates set, fetching available date range...');
      
      try {
        const dateRangeResponse = await fetch(endpoints.dateRange);
        const dateRange = await dateRangeResponse.json();
        
        console.log('📅 Date range from database:', dateRange);
        
        if (dateRange.hasData && dateRange.suggested_start && dateRange.suggested_end) {
          // Use the suggested range (last month with data)
          dateFromInput.value = dateRange.suggested_start;
          dateToInput.value = dateRange.suggested_end;
          
          console.log('✅ Set date range to last month with data:', {
            from: dateRange.suggested_start,
            to: dateRange.suggested_end,
            transactions: dateRange.total_transactions
          });
        } else {
          // Fallback to current month if no data
          const today = new Date();
          const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
          const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
          
          dateFromInput.value = firstDay.toISOString().split('T')[0];
          dateToInput.value = lastDay.toISOString().split('T')[0];
          
          console.log('⚠️ No data in database, using current month as fallback');
        }
      } catch (error) {
        console.error('❌ Error fetching date range:', error);
        
        // Fallback to current month on error
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        
        dateFromInput.value = firstDay.toISOString().split('T')[0];
        dateToInput.value = lastDay.toISOString().split('T')[0];
      }
    }

    const dateFrom = dateFromInput?.value;
    const dateTo = dateToInput?.value;

    const filters = {};
    if (dateFrom) filters.dateFrom = dateFrom;
    if (dateTo) filters.dateTo = dateTo;

    const queryString = new URLSearchParams(filters).toString();

    console.log('📥 Fetching reports with filters:', filters);

    // Fetch fresh data
    const [summary, categoryData, cashFlowData] = await Promise.all([
      fetch(`${endpoints.dashboard}${queryString ? '?' + queryString : ''}`)
        .then(r => r.json())
        .catch(e => { console.error('Summary error:', e); return {}; }),
      fetch(`${endpoints.categoryAnalysis}${queryString ? '?' + queryString : ''}`)
        .then(r => r.json())
        .catch(e => { console.error('Category error:', e); return []; }),
      fetch(`${endpoints.cashFlow}${queryString ? '?' + queryString : ''}`)
        .then(r => r.json())
        .catch(e => { console.error('Cash flow error:', e); return []; })
    ]);

    console.log('✅ Fresh data received:', {
      summary: !!summary,
      categoryCount: categoryData.length,
      cashFlowCount: cashFlowData.length
    });

    // Update summary cards in DOM directly
    updateSummaryCards(summary);
    
    // Update tables
    updateCategoryTable(categoryData);
    updateTransactionSummaryTable(categoryData);
    
    // Draw charts with FRESH data
    setTimeout(() => {
      drawReportsCharts(categoryData, cashFlowData);
      updateChartDateRangeLabels();
      showDataRangeInfo(); 

    }, 100);
    
    console.log('✅ Reports rendered successfully');
  } catch (error) {
    console.error('❌ Error loading reports:', error);
    alert('Failed to load reports: ' + error.message);
  }
}
// NEW: Update date range labels on all charts
function updateChartDateRangeLabels() {
  const dateFrom = document.getElementById('reportDateFrom')?.value;
  const dateTo = document.getElementById('reportDateTo')?.value;
  
  let dateRangeText = '';
  if (dateFrom && dateTo) {
    const start = new Date(dateFrom);
    const end = new Date(dateTo);
    
    const startFormatted = start.toLocaleDateString(state.language === 'el' ? 'el-GR' : 'en-US', {
      month: 'short',
      day: 'numeric',
      year: start.getFullYear() !== end.getFullYear() ? 'numeric' : undefined
    });
    
    const endFormatted = end.toLocaleDateString(state.language === 'el' ? 'el-GR' : 'en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    
    dateRangeText = `${startFormatted} - ${endFormatted}`;
  } else if (!dateFrom && !dateTo) {
    dateRangeText = state.language === 'en' ? 'All Time' : 'Όλος ο Χρόνος';
  }
  
  // Update all chart labels
  ['cashFlowDateRange', 'categoryDateRange', 'monthlyDateRange', 'topCatDateRange'].forEach(id => {
    const elem = document.getElementById(id);
    if (elem) elem.textContent = dateRangeText;
  });
}


// NEW: Populate month selector with available months
function populateMonthSelector(cashFlowData) {
  const select = document.getElementById('cashFlowMonthSelect');
  if (!select || !cashFlowData || cashFlowData.length === 0) return;
  
  // Extract unique months from cash flow data
  const months = [...new Set(cashFlowData.map(d => {
    // Extract YYYY-MM from period (handles different formats)
    if (d.period.length === 10) {
      // Daily format: YYYY-MM-DD
      return d.period.substring(0, 7);
    } else if (d.period.includes('W')) {
      // Weekly format: YYYY-W##
      return d.period.split('-W')[0] + '-01'; // Approximate to first month
    } else {
      // Monthly format: YYYY-MM
      return d.period;
    }
  }))].sort().reverse(); // Most recent first
  
  console.log('📅 Available months:', months);
  
  // Keep existing options and add months
  const latestOption = select.querySelector('option[value="latest"]');
  const allOption = select.querySelector('option[value="all"]');
  
  // Remove old month options
  const oldOptions = select.querySelectorAll('option[data-month]');
  oldOptions.forEach(opt => opt.remove());
  
  // Add month options
  months.forEach(month => {
    const option = document.createElement('option');
    option.value = month;
    option.setAttribute('data-month', 'true');
    
    // Format display: "November 2024"
    const [year, monthNum] = month.split('-');
    const date = new Date(year, parseInt(monthNum) - 1);
    option.textContent = date.toLocaleDateString(state.language === 'el' ? 'el-GR' : 'en-US', {
      year: 'numeric',
      month: 'long'
    });
    
    select.appendChild(option);
  });
  
  // Set to latest month by default
  if (months.length > 0) {
    select.value = 'latest';
  }
}

// NEW: Update cash flow chart based on selected month
async function updateCashFlowChart() {
  const select = document.getElementById('cashFlowMonthSelect');
  if (!select) return;
  
  const selectedMonth = select.value;
  console.log('📊 Updating cash flow chart for:', selectedMonth);
  
  let filteredData = state.reports.cashFlowData || [];
  
  if (selectedMonth === 'latest') {
    // Get the latest month with data
    const latestPeriod = filteredData[filteredData.length - 1]?.period || '';
    const latestMonth = latestPeriod.substring(0, 7);
    
    // Filter to show only that month's daily data
    filteredData = filteredData.filter(d => d.period.startsWith(latestMonth));
    
    console.log('📅 Latest month:', latestMonth, 'Data points:', filteredData.length);
    
  } else if (selectedMonth !== 'all') {
    // Filter to specific month
    filteredData = filteredData.filter(d => d.period.startsWith(selectedMonth));
    
    console.log('📅 Selected month:', selectedMonth, 'Data points:', filteredData.length);
  }
  // If 'all', use all data (no filtering)
  
  // Re-draw the cash flow chart with filtered data
}

// NEW: Draw cash flow chart with specific data
function drawCashFlowChart(cashFlowData) {
  const cashFlowLineCtx = document.getElementById('cashFlowLineChart');
  if (!cashFlowLineCtx) return;
  
  // Destroy existing chart
  if (window.cashFlowLineChartInstance) {
    window.cashFlowLineChartInstance.destroy();
  }

  if (!cashFlowData || cashFlowData.length === 0) {
    cashFlowLineCtx.parentElement.innerHTML = `
      <div style="text-align: center; padding: 60px 20px;">
        <div style="font-size: 48px; margin-bottom: 15px;">📊</div>
        <p style="color: #9CA3AF; margin-bottom: 10px;">
          ${state.language === 'en' ? 'No cash flow data for selected period' : 'Δεν υπάρχουν δεδομένα για την επιλεγμένη περίοδο'}
        </p>
      </div>
    `;
    return;
  }

  try {
    // Format labels based on period type
    const labels = cashFlowData.map(d => {
      if (d.period.length === 10) {
        // Daily format: show "Nov 15" or "15"
        const date = new Date(d.period);
        return date.getDate().toString(); // Just show day number
      } else if (d.period.includes('W')) {
        // Weekly format
        const weekNum = d.period.split('W')[1];
        return 'W' + weekNum;
      } else {
        // Monthly format
        const [year, month] = d.period.split('-');
        const date = new Date(year, parseInt(month) - 1);
        return date.toLocaleDateString(state.language === 'el' ? 'el-GR' : 'en-US', { 
          month: 'short' 
        });
      }
    });

    console.log('📊 Drawing chart with', cashFlowData.length, 'data points');

    window.cashFlowLineChartInstance = new Chart(cashFlowLineCtx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: state.language === 'en' ? 'Income' : 'Εισόδημα',
            data: cashFlowData.map(d => Math.abs(d.total_income || 0)),
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.3,
            fill: true,
            borderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 5,
            pointBackgroundColor: '#10b981',
            pointBorderColor: '#fff',
            pointBorderWidth: 2
          },
          {
            label: state.language === 'en' ? 'Expenses' : 'Έξοδα',
            data: cashFlowData.map(d => Math.abs(d.total_expenses || 0)),
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            tension: 0.3,
            fill: true,
            borderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 5,
            pointBackgroundColor: '#ef4444',
            pointBorderColor: '#fff',
            pointBorderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: { 
              color: '#E5E7EB', 
              padding: 10,
              font: { size: 12 }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            callbacks: {
              title: function(tooltipItems) {
                const index = tooltipItems[0].dataIndex;
                const fullDate = cashFlowData[index].period;
                // Show full date in tooltip
                if (fullDate.length === 10) {
                  const date = new Date(fullDate);
                  return date.toLocaleDateString(state.language === 'el' ? 'el-GR' : 'en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  });
                }
                return fullDate;
              },
              label: function(context) {
                return context.dataset.label + ': €' + context.parsed.y.toFixed(2);
              },
              footer: function(tooltipItems) {
                const income = tooltipItems[0]?.parsed.y || 0;
                const expense = tooltipItems[1]?.parsed.y || 0;
                const net = income - expense;
                return '\n' + (state.language === 'en' ? 'Net: ' : 'Καθαρό: ') + 
                       '€' + net.toFixed(2);
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { 
              color: '#9CA3AF',
              callback: value => '€' + value.toLocaleString()
            },
            grid: { 
              color: '#1F2937',
              drawBorder: false
            }
          },
          x: {
            ticks: { 
              color: '#9CA3AF',
              maxRotation: 45,
              minRotation: 0,
              autoSkip: true,
              maxTicksLimit: 31
            },
            grid: { 
              color: '#1F2937',
              drawBorder: false
            }
          }
        }
      }
    });
    
    console.log('✅ Cash flow chart created');
    
  } catch (error) {
    console.error('❌ Cash flow chart error:', error);
  }
}




function renderReportsSummary(summary) {
  // This updates the summary cards when filters change
  // The cards are already in the HTML, we just need to update values
  console.log('📊 Updating summary cards:', summary);
  
  // If you want to dynamically update the cards after filter
  // you can select them and update innerHTML
  // For now, re-render the page
  render();
  
  // Then re-load charts
  setTimeout(() => {
    if (state.reports.categoryData && state.reports.cashFlowData) {
      drawReportsCharts(state.reports.categoryData, state.reports.cashFlowData);
    }
  }, 300);
}



function drawReportsCharts(categoryData, cashFlowData) {
  setTimeout(() => {
    console.log('🎨 Drawing all report charts...');
    console.log('📊 Received data:', {
      categoryCount: categoryData?.length || 0,
      cashFlowCount: cashFlowData?.length || 0
    });
    
    // Check Chart.js
    if (typeof Chart === 'undefined') {
      console.error('❌ Chart.js not loaded!');
      return;
    }

    // ========================================
    // 1. CASH FLOW LINE CHART
    // ========================================
    const cashFlowLineCtx = document.getElementById('cashFlowLineChart');
    if (cashFlowLineCtx) {
      // Destroy old chart
      if (window.cashFlowLineChartInstance) {
        window.cashFlowLineChartInstance.destroy();
      }

      if (cashFlowData && cashFlowData.length > 0) {
        try {
          const dataPointCount = cashFlowData.length;
          let showEveryNth = 1;
          
          if (dataPointCount > 31) {
            showEveryNth = Math.ceil(dataPointCount / 20);
          }
          
          const labels = cashFlowData.map((d, index) => {
            if (index % showEveryNth !== 0) return '';
            
            if (d.period.length === 10) {
              const date = new Date(d.period);
              return date.getDate().toString();
            } else if (d.period.includes('W')) {
              const weekNum = d.period.split('W')[1];
              return 'W' + weekNum;
            } else {
              const [year, month] = d.period.split('-');
              const date = new Date(year, parseInt(month) - 1);
              return date.toLocaleDateString(state.language === 'el' ? 'el-GR' : 'en-US', { month: 'short' });
            }
          });

          window.cashFlowLineChartInstance = new Chart(cashFlowLineCtx, {
            type: 'line',
            data: {
              labels: labels,
              datasets: [
                {
                  label: state.language === 'en' ? 'Income' : 'Εισόδημα',
                  data: cashFlowData.map(d => Math.abs(d.total_income || 0)),
                  borderColor: '#10b981',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  tension: 0.3,
                  fill: true,
                  borderWidth: 2,
                  pointRadius: dataPointCount > 31 ? 2 : 3,
                  pointHoverRadius: 5,
                  pointBackgroundColor: '#10b981',
                  pointBorderColor: '#fff',
                  pointBorderWidth: 2
                },
                {
                  label: state.language === 'en' ? 'Expenses' : 'Έξοδα',
                  data: cashFlowData.map(d => Math.abs(d.total_expenses || 0)),
                  borderColor: '#ef4444',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  tension: 0.3,
                  fill: true,
                  borderWidth: 2,
                  pointRadius: dataPointCount > 31 ? 2 : 3,
                  pointHoverRadius: 5,
                  pointBackgroundColor: '#ef4444',
                  pointBorderColor: '#fff',
                  pointBorderWidth: 2
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              interaction: {
                mode: 'index',
                intersect: false
              },
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: { color: '#E5E7EB', padding: 10, font: { size: 12 } }
                },
                tooltip: {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  padding: 12,
                  callbacks: {
                    title: function(tooltipItems) {
                      const index = tooltipItems[0].dataIndex;
                      const fullDate = cashFlowData[index].period;
                      if (fullDate.length === 10) {
                        const date = new Date(fullDate);
                        return date.toLocaleDateString(state.language === 'el' ? 'el-GR' : 'en-US', {
                          weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
                        });
                      }
                      return fullDate;
                    },
                    label: function(context) {
                      return context.dataset.label + ': €' + context.parsed.y.toFixed(2);
                    },
                    footer: function(tooltipItems) {
                      const income = tooltipItems[0]?.parsed.y || 0;
                      const expense = tooltipItems[1]?.parsed.y || 0;
                      const net = income - expense;
                      return '\n' + (state.language === 'en' ? 'Net: ' : 'Καθαρό: ') + '€' + net.toFixed(2);
                    }
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: { color: '#9CA3AF', callback: value => '€' + value.toLocaleString() },
                  grid: { color: '#1F2937', drawBorder: false }
                },
                x: {
                  ticks: { color: '#9CA3AF', maxRotation: 45, minRotation: 0, autoSkip: false },
                  grid: { color: '#1F2937', drawBorder: false }
                }
              }
            }
          });
          
          console.log('✅ Cash flow line chart created');
          
        } catch (error) {
          console.error('❌ Cash flow line chart error:', error);
          cashFlowLineCtx.parentElement.innerHTML = '<p style="text-align: center; padding: 40px; color: #ef4444;">Error: ' + error.message + '</p>';
        }
      } else {
        cashFlowLineCtx.parentElement.innerHTML = `
          <div style="text-align: center; padding: 60px 20px;">
            <div style="font-size: 48px; margin-bottom: 15px;">📊</div>
            <p style="color: #9CA3AF; margin-bottom: 10px;">
              ${state.language === 'en' ? 'No cash flow data for selected period' : 'Δεν υπάρχουν δεδομένα ταμειακής ροής'}
            </p>
          </div>
        `;
      }
    }

    // ========================================
    // 2. CATEGORY PIE CHART (Income vs Expenses)
    // ========================================
    const categoryCtx = document.getElementById('categoryChart');
    if (categoryCtx) {
      // Destroy old chart
      if (window.categoryChartInstance) {
        window.categoryChartInstance.destroy();
      }

      if (categoryData && categoryData.length > 0) {
        // Calculate totals
        const creditTotal = categoryData.reduce((sum, c) => sum + Math.abs(parseFloat(c.credit_total) || 0), 0);
        const debitTotal = categoryData.reduce((sum, c) => sum + Math.abs(parseFloat(c.debit_total) || 0), 0);

        console.log('💰 Pie chart totals:', { creditTotal, debitTotal });

        if (creditTotal === 0 && debitTotal === 0) {
          categoryCtx.parentElement.innerHTML = '<p style="text-align: center; padding: 40px; color: #9CA3AF;">No data</p>';
        } else {
          try {
            window.categoryChartInstance = new Chart(categoryCtx, {
              type: 'doughnut',
              data: {
                labels: [
                  state.language === 'en' ? 'Income' : 'Εισόδημα',
                  state.language === 'en' ? 'Expenses' : 'Έξοδα'
                ],
                datasets: [{
                  data: [creditTotal, debitTotal],
                  backgroundColor: ['#10b981', '#ef4444'],
                  borderColor: '#0F1419',
                  borderWidth: 3,
                  hoverOffset: 10
                }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: { 
                      color: '#E5E7EB', 
                      padding: 15,
                      font: { size: 13 },
                      generateLabels: function(chart) {
                        const data = chart.data;
                        const total = creditTotal + debitTotal;
                        return data.labels.map((label, i) => {
                          const value = data.datasets[0].data[i];
                          const percentage = ((value / total) * 100).toFixed(1);
                          return {
                            text: `${label}: €${value.toFixed(2)} (${percentage}%)`,
                            fillStyle: data.datasets[0].backgroundColor[i],
                            hidden: false,
                            index: i
                          };
                        });
                      }
                    }
                  },
                  tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    callbacks: {
                      label: function(context) {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        const total = creditTotal + debitTotal;
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}: €${value.toFixed(2)} (${percentage}%)`;
                      }
                    }
                  }
                }
              }
            });
            console.log('✅ Category pie chart created');
          } catch (error) {
            console.error('❌ Category chart error:', error);
          }
        }
      } else {
        categoryCtx.parentElement.innerHTML = '<p style="text-align: center; padding: 40px; color: #9CA3AF;">No category data</p>';
      }
    }

    // ========================================
    // 3. MONTHLY COMPARISON BAR CHART
    // ========================================
    const monthlyCtx = document.getElementById('monthlyChart');
    if (monthlyCtx) {
      // Destroy old chart
      if (window.monthlyChartInstance) {
        window.monthlyChartInstance.destroy();
      }

      if (cashFlowData && cashFlowData.length > 0) {
        try {
          window.monthlyChartInstance = new Chart(monthlyCtx, {
            type: 'bar',
            data: {
              labels: cashFlowData.map(m => m.period),
              datasets: [
                {
                  label: state.language === 'en' ? 'Income' : 'Εισόδημα',
                  data: cashFlowData.map(m => m.total_income || 0),
                  backgroundColor: '#10b981'
                },
                {
                  label: state.language === 'en' ? 'Expenses' : 'Έξοδα',
                  data: cashFlowData.map(m => Math.abs(m.total_expenses || 0)),
                  backgroundColor: '#ef4444'
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { labels: { color: '#E5E7EB' } }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: { color: '#9CA3AF' },
                  grid: { color: '#1F2937' }
                },
                x: {
                  ticks: { color: '#9CA3AF' },
                  grid: { color: '#1F2937' }
                }
              }
            }
          });
          console.log('✅ Monthly bar chart created');
        } catch (error) {
          console.error('❌ Monthly chart error:', error);
        }
      } else {
        monthlyCtx.parentElement.innerHTML = '<p style="text-align: center; padding: 40px; color: #9CA3AF;">No monthly data</p>';
      }
    }

    // ========================================
    // 4. TOP CATEGORIES BAR CHART
    // ========================================
    const topCategoriesCtx = document.getElementById('topCategoriesChart');
    if (topCategoriesCtx) {
      // Destroy old chart
      if (window.topCategoriesChartInstance) {
        window.topCategoriesChartInstance.destroy();
      }

      if (categoryData && categoryData.length > 0) {
        // Get top 5 from each type
        const topCredits = categoryData
          .filter(c => c.category_type === 'CREDIT' && c.transaction_count > 0)
          .sort((a, b) => Math.abs(b.total_amount || 0) - Math.abs(a.total_amount || 0))
          .slice(0, 5);
        
        const topDebits = categoryData
          .filter(c => c.category_type === 'DEBIT' && c.transaction_count > 0)
          .sort((a, b) => Math.abs(b.total_amount || 0) - Math.abs(a.total_amount || 0))
          .slice(0, 5);
        
        const topCategories = [...topCredits, ...topDebits]
          .sort((a, b) => Math.abs(b.total_amount || 0) - Math.abs(a.total_amount || 0))
          .slice(0, 10);

        console.log('🏆 Top categories:', topCategories.length);

        if (topCategories.length === 0) {
          topCategoriesCtx.parentElement.innerHTML = '<p style="text-align: center; padding: 40px; color: #9CA3AF;">No category data</p>';
        } else {
          try {
            window.topCategoriesChartInstance = new Chart(topCategoriesCtx, {
              type: 'bar',
              data: {
                labels: topCategories.map(c => state.language === 'en' ? c.name_en : c.name_el),
                datasets: [{
                  label: state.language === 'en' ? 'Amount' : 'Ποσό',
                  data: topCategories.map(c => Math.abs(c.total_amount || 0)),
                  backgroundColor: topCategories.map(c => c.category_type === 'CREDIT' ? '#10b981' : '#ef4444'),
                  borderColor: topCategories.map(c => c.category_type === 'CREDIT' ? '#059669' : '#dc2626'),
                  borderWidth: 1
                }]
              },
              options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    callbacks: {
                      label: function(context) {
                        const category = topCategories[context.dataIndex];
                        return [
                          (state.language === 'en' ? 'Amount: ' : 'Ποσό: ') + '€' + context.parsed.x.toFixed(2),
                          (state.language === 'en' ? 'Transactions: ' : 'Συναλλαγές: ') + category.transaction_count,
                          (state.language === 'en' ? 'Type: ' : 'Τύπος: ') + category.category_type
                        ];
                      }
                    }
                  }
                },
                scales: {
                  x: {
                    beginAtZero: true,
                    ticks: { color: '#9CA3AF', callback: value => '€' + value.toLocaleString() },
                    grid: { color: '#1F2937' }
                  },
                  y: {
                    ticks: { color: '#9CA3AF', font: { size: 11 } },
                    grid: { color: '#1F2937' }
                  }
                }
              }
            });
            console.log('✅ Top categories chart created');
          } catch (error) {
            console.error('❌ Top categories chart error:', error);
          }
        }
      } else {
        topCategoriesCtx.parentElement.innerHTML = '<p style="text-align: center; padding: 40px; color: #9CA3AF;">No category data</p>';
      }
    }

    // ========================================
    // 5. CATEGORY BREAKDOWN STACKED BAR
    // ========================================
    const categoryBreakdownCtx = document.getElementById('categoryBreakdownChart');
    if (categoryBreakdownCtx) {
      // Destroy old chart
      if (window.categoryBreakdownChartInstance) {
        window.categoryBreakdownChartInstance.destroy();
      }

      if (categoryData && categoryData.length > 0) {
        const creditCats = categoryData
          .filter(c => c.category_type === 'CREDIT' && c.transaction_count > 0)
          .sort((a, b) => Math.abs(b.total_amount) - Math.abs(a.total_amount))
          .slice(0, 8);
          
        const debitCats = categoryData
          .filter(c => c.category_type === 'DEBIT' && c.transaction_count > 0)
          .sort((a, b) => Math.abs(b.total_amount) - Math.abs(a.total_amount))
          .slice(0, 8);
        
        if (creditCats.length === 0 && debitCats.length === 0) {
          categoryBreakdownCtx.parentElement.innerHTML = '<p style="text-align: center; padding: 40px; color: #9CA3AF;">No category data</p>';
        } else {
          try {
            window.categoryBreakdownChartInstance = new Chart(categoryBreakdownCtx, {
              type: 'bar',
              data: {
                labels: ['Income Categories', 'Expense Categories'],
                datasets: [
                  ...creditCats.map((cat, idx) => ({
                    label: state.language === 'en' ? cat.name_en : cat.name_el,
                    data: [Math.abs(cat.credit_total || cat.total_amount || 0), 0],
                    backgroundColor: `hsl(${120 + idx * 20}, 70%, ${50 - idx * 3}%)`,
                    stack: 'Stack 0'
                  })),
                  ...debitCats.map((cat, idx) => ({
                    label: state.language === 'en' ? cat.name_en : cat.name_el,
                    data: [0, Math.abs(cat.debit_total || cat.total_amount || 0)],
                    backgroundColor: `hsl(${0 + idx * 20}, 70%, ${50 - idx * 3}%)`,
                    stack: 'Stack 1'
                  }))
                ]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                    labels: { color: '#E5E7EB', padding: 8, font: { size: 10 } }
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return context.dataset.label + ': €' + context.parsed.y.toFixed(2);
                      }
                    }
                  }
                },
                scales: {
                  x: {
                    stacked: true,
                    ticks: { color: '#9CA3AF' },
                    grid: { color: '#1F2937' }
                  },
                  y: {
                    stacked: true,
                    beginAtZero: true,
                    ticks: { color: '#9CA3AF', callback: value => '€' + value.toFixed(0) },
                    grid: { color: '#1F2937' }
                  }
                }
              }
            });
            console.log('✅ Category breakdown chart created');
          } catch (error) {
            console.error('❌ Category breakdown chart error:', error);
          }
        }
      } else {
        categoryBreakdownCtx.parentElement.innerHTML = '<p style="text-align: center; padding: 40px; color: #9CA3AF;">No category data</p>';
      }
    }

    console.log('✅ All report charts rendered');
  }, 200);
}

function exportReports() {
  alert(state.language === 'en' 
    ? 'Export functionality coming soon! This will generate a PDF report.' 
    : 'Η λειτουργία εξαγωγής έρχεται σύντομα! Αυτό θα δημιουργήσει μια αναφορά PDF.');
  
  // Future: Implement PDF generation
  // You can use libraries like jsPDF or pdfmake
}



async function loadDashboard() {
  try {
    console.log('📊 Loading dashboard data...');
    
    // Step 1: Load transactions
    console.log('📥 Fetching transactions...');
    const transactionsResponse = await fetch(`${API_BASE}/transactions?limit=100`);
    const transactions = await transactionsResponse.json();
    state.transactions = transactions;
    console.log('✅ Loaded', transactions.length, 'transactions');
    
    // Step 2: Load all dashboard data
    console.log('📥 Fetching dashboard data...');
    const [summary, cashFlow, topTxns, recurring] = await Promise.all([
      fetch(endpoints.dashboard).then(r => r.json()),
      fetch(endpoints.cashFlow).then(r => r.json()),
      fetch(`${endpoints.topTransactions}?limit=5`).then(r => r.json()),
      fetch(`${endpoints.recurring}?minOccurrences=3`).then(r => r.json())
    ]);

    // Step 3: Store in state
    state.reports = { summary, cashFlow, topTxns, recurring };
    
    // Step 4: Log what we got
    console.log('📊 Dashboard data loaded:', {
      summaryExists: !!summary,
      cashFlowLength: cashFlow?.length || 0,
      cashFlowData: cashFlow,
      topTxnsLength: topTxns?.length || 0,
      recurringLength: recurring?.length || 0
    });
    
    // Step 5: Render page
    console.log('🎨 Rendering page...');
    render();
    
    // Step 6: Wait for DOM, then render charts
    console.log('⏳ Waiting for DOM...');
    setTimeout(() => {
      console.log('🎨 Rendering charts...');
      renderDashboardCharts();
    }, 500);  // Increased delay
    
  } catch (error) {
    console.error('❌ Error loading dashboard:', error);
    alert('Failed to load dashboard: ' + error.message);
  }
}



async function loadAccounts() {
  try {
    console.log('📊 Loading accounts...');
    const response = await fetch(endpoints.accounts);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const accounts = await response.json();
    state.accounts = accounts;
    
    console.log('✅ Accounts loaded:', accounts.length, accounts);
    return accounts;
  } catch (error) {
    console.error('❌ Error loading accounts:', error);
    state.accounts = [];
    return [];
  }
}

async function loadAccountLedger(accountId) {
  try {
    console.log('📊 Loading ledger for', accountId);
    const ledger = await fetch(endpoints.accountLedger(accountId)).then(r => r.json());
    state.ledger = ledger;
    console.log('✅ Ledger loaded:', ledger.length);
    return ledger;
  } catch (error) {
    console.error('❌ Error loading ledger:', error);
    return [];
  }
}

// This should already be in your code - it will now fetch real predictions!
async function loadPredictions() {
  try {
    console.log('🔮 Loading predictions...');
    
    if (!state.transactions || state.transactions.length < 5) {
      console.warn('⚠️ Not enough data for predictions');
      state.predictions = { 
        forecast: [], 
        recurring: [],
        hasEnoughData: false 
      };
      return state.predictions;
    }
    
    const [forecast, recurring] = await Promise.all([
      fetch(`${endpoints.forecast}?months=3`)
        .then(r => r.ok ? r.json() : [])
        .catch(e => { console.error('Forecast error:', e); return []; }),
      fetch(`${endpoints.recurring}?minOccurrences=2`)
        .then(r => r.ok ? r.json() : [])
        .catch(e => { console.error('Recurring error:', e); return []; })
    ]);
    
    state.predictions = { 
      forecast, 
      recurring,
      hasEnoughData: true 
    };
    
    console.log('✅ Predictions loaded:', {
      forecastCount: forecast.length,
      recurringCount: recurring.length
    });
    
    return state.predictions;
  } catch (error) {
    console.error('❌ Error loading predictions:', error);
    state.predictions = { 
      forecast: [], 
      recurring: [],
      hasEnoughData: false 
    };
    return state.predictions;
  }
}

// ========================================
// RENDER FUNCTIONS - REFACTORED
// ========================================

function render() {
  const app = document.getElementById('app');
  
  if (!state.isLoggedIn) {
    app.innerHTML = renderLogin();
    attachLoginEvents();
  } else {
    app.innerHTML = renderMain();
    attachMainEvents();
  }
}

function renderLogin() {
  return `
    <div class="login-container" style="display: flex; align-items: center; min-height: 100vh; background: linear-gradient(120deg, #1F2937, #121820 90%); justify-content: center;">
      <div class="login-box" style="background: #181F29; box-shadow: 0 12px 32px rgba(17,24,39,0.25); border-radius: 18px; padding: 40px 30px; max-width: 350px; width: 100%;">
        <div class="login-logo" style="font-size: 2.2rem; text-align: center; font-weight: bold; color: #FFB800; margin-bottom: 12px;">Ai Smart Ledger</div>
        <h2 class="login-title" style="text-align: center; color: #E5E7EB; font-weight: 800; font-size: 1.5rem; margin-bottom: 18px;">
          ${t('common.login')}
        </h2>
        
        <form id="loginForm" autocomplete="on">
          <!-- Language Selector -->
          <div style="display: flex; justify-content: center; gap: 8px; margin-bottom: 22px;">
            <button 
              type="button" 
              class="lang-btn${state.language === 'en' ? ' lang-btn-active' : ''}"
              onclick="setLanguage('en')"
              style="padding: 8px 18px; background: ${state.language === 'en' ? '#FFB800' : '#262C37'}; color: ${state.language === 'en' ? '#111928' : '#E5E7EB'}; border: none; border-radius: 8px; font-weight: bold; font-size: 14px; cursor: pointer; transition: background 0.2s;">
              🇬🇧 EN
            </button>
            <button 
              type="button" 
              class="lang-btn${state.language === 'el' ? ' lang-btn-active' : ''}"
              onclick="setLanguage('el')"
              style="padding: 8px 18px; background: ${state.language === 'el' ? '#FFB800' : '#262C37'}; color: ${state.language === 'el' ? '#111928' : '#E5E7EB'}; border: none; border-radius: 8px; font-weight: bold; font-size: 14px; cursor: pointer; transition: background 0.2s;">
              🇬🇷 EL
            </button>
          </div>

          <!-- Demo Account Info -->
          <div style="background: #222C37; border-left: 5px solid #FFB800; border-radius: 7px; padding: 13px 14px; margin-bottom: 23px; color: #FFB800;">
            <div style="font-weight: 700; letter-spacing: 0.2px; font-size: 12.5px; margin-bottom: 6px;">
              💡 ${state.language === 'en' ? 'Demo Account' : 'Δημο Λογαριασμό'}
            </div>
            <div style="color: #FFD98D;">${state.language === 'en' ? 'Username:' : 'Όνομα χρήστη:'} <strong>demo</strong></div>
            <div style="color: #FFD98D;">${state.language === 'en' ? 'Password:' : 'Κωδικός:'} <strong>demo</strong></div>
          </div>

          <!-- Username Field -->
          <div class="form-group" style="margin-bottom: 15px;">
            <label for="username" style="color: #E5E7EB; font-weight: 500; font-size: 14px; margin-bottom: 6px; display: block;">
              ${state.language === 'en' ? 'Username' : 'Όνομα Χρήστη'}:
            </label>
            <input 
              type="text" id="username" value="demo" required placeholder="demo"
              autocomplete="username"
              style="width: 100%; padding: 13px; border-radius: 8px; border: 1.5px solid #293043; background: #1D232D; color: #F7FAFC; font-size: 15px; font-weight: 500; margin-top: 2px;">
          </div>

          <!-- Password Field -->
          <div class="form-group" style="margin-bottom: 15px;">
            <label for="password" style="color: #E5E7EB; font-weight: 500; font-size: 14px; margin-bottom: 6px; display: block;">
              ${state.language === 'en' ? 'Password' : 'Κωδικός'}:
            </label>
            <input 
              type="password" id="password" value="demo" required placeholder="demo"
              autocomplete="current-password"
              style="width: 100%; padding: 13px; border-radius: 8px; border: 1.5px solid #293043; background: #1D232D; color: #F7FAFC; font-size: 15px; font-weight: 500; margin-top: 2px;">
          </div>

          <button 
            type="submit"
            style="width: 100%; padding: 13px; margin-top: 18px; background: linear-gradient(90deg,#FFB800 70%, #FFD98D 100%); box-shadow: 0 2px 10px #FFB80055; color: #181F29; font-weight: 700; font-size: 17px; border: none; border-radius: 8px; letter-spacing: 0.2px; cursor: pointer; transition: background 0.2s, color 0.2s;">
            ${state.language === 'en' ? '🔐 Login' : '🔐 Σύνδεση'}
          </button>

          <!-- Error Message -->
          <div id="errorMessage" style="margin-top: 14px; color: #ef4444; text-align: center; font-size: 15px;"></div>

          <!-- Footer Info -->
          <div style="text-align: center; margin-top: 22px; font-size: 12.5px; color: #A4B0BC;">
            <div>Smart Ledger v2.0</div>
            <div>${state.language === 'en'
              ? 'AI-Powered Financial Dashboard'
              : 'Πίνακας Χρηματοοικονομικών Δεδομένων Με Ενισχυμένη Τεχνητή Νοημοσύνη'}</div>
          </div>
        </form>
      </div>
    </div>
  `;
}

function renderMain() {
  return `
    <div style="display: flex; width: 100%; height: 100vh; overflow: hidden;">
      ${renderSidebar()}
      <div class="main-content">
        ${renderNavbar()}
        <div class="page-content">
          ${renderPageContent()}
        </div>
      </div>
    </div>
  `;
}

function renderSidebar() {
  return `
    <div class="sidebar">
      <div class="sidebar-logo">
        <i class="mdi mdi-chart-line"></i>
        <span>Smart Ledger</span>
      </div>
      
      <ul class="nav-menu">
        <li class="nav-item">
          <a class="nav-link ${state.currentPage === 'dashboard' ? 'active' : ''}" onclick="changePage('dashboard')">
            <i class="mdi mdi-home"></i>
            <span>${t('nav.dashboard')}</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link ${state.currentPage === 'transactions' ? 'active' : ''}" onclick="changePage('transactions')">
            <i class="mdi mdi-swap-horizontal"></i>
            <span>${t('nav.transactions')}</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link ${state.currentPage === 'accounts' ? 'active' : ''}" onclick="changePage('accounts')">
            <i class="mdi mdi-bank"></i>
            <span>${t('nav.accounts')}</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link ${state.currentPage === 'reports' ? 'active' : ''}" onclick="changePage('reports')">
            <i class="mdi mdi-chart-bar"></i>
            <span>${t('nav.reports')}</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link ${state.currentPage === 'ledger' ? 'active' : ''}" onclick="changePage('ledger')">
            <i class="mdi mdi-book-open"></i>
            <span>${t('nav.ledger')}</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link ${state.currentPage === 'predictions' ? 'active' : ''}" onclick="changePage('predictions')">
            <i class="mdi mdi-crystal-ball"></i>
            <span>${t('nav.predictions')}</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link ${state.currentPage === 'upload' ? 'active' : ''}" onclick="changePage('upload')">
            <i class="mdi mdi-cloud-upload"></i>
            <span>${t('nav.upload')}</span>
          </a>
        </li>
      </ul>
      
       <!-- Settings & Tutorial -->
      <div style="padding: 15px; border-top: 0px solid #1F2937; margin-top: auto;">
        <button 
          onclick="startTutorial()" 
          style="width: 100%; padding: 8px; background: transparent; border: 1px solid #6B7280; color: #9CA3AF; border-radius: 6px; cursor: pointer; font-size: 12px; margin-bottom: 8px;">
          ${state.language === 'en' ? '🎓 Show Tutorial' : '🎓 Εμφάνιση Tutorial'}
        </button>
      </div>


      <!-- Language Toggle - ENHANCED -->
      <div class="sidebar-footer">
        <div style="display: flex; gap: 5px; margin-bottom: 10px;">
          <button 
            class="lang-toggle ${state.language === 'en' ? 'lang-btn-active' : ''}"
            onclick="setLanguage('en')"
            style="flex: 1; padding: 8px; background-color: ${state.language === 'en' ? '#FFB800' : '#1F2937'}; color: ${state.language === 'en' ? '#000' : '#E5E7EB'}; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; transition: all 0.3s;">
            🇬🇧 EN
          </button>
          <button 
            class="lang-toggle ${state.language === 'el' ? 'lang-btn-active' : ''}"
            onclick="setLanguage('el')"
            style="flex: 1; padding: 8px; background-color: ${state.language === 'el' ? '#FFB800' : '#1F2937'}; color: ${state.language === 'el' ? '#000' : '#E5E7EB'}; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; transition: all 0.3s;">
            🇬🇷 EL
          </button>
        </div>
        


        <button 
          class="lang-toggle" 
          onclick="logout()"
          style="width: 100%; background-color: #ef4444; color: white; padding: 8px; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">
          ${t('common.logout')}
        </button>
      </div>
    </div>
  `;
}


function renderNavbar() {
  return `
    <div class="navbar">
      <h2 class="navbar-title">${getPageTitle()}</h2>
      <div class="navbar-right">
        <span style="font-size: 14px;">👤 ${state.currentUser?.username || 'User'}</span>
      </div>
    </div>
  `;
}

function renderPageContent() {
  switch(state.currentPage) {
    case 'dashboard': return renderDashboard();
    case 'transactions': return renderTransactions();
    case 'accounts': return renderAccounts();
    case 'reports': return renderReports();
    case 'ledger': return renderLedger();
    case 'predictions': return renderPredictions();
    case 'upload': return renderUpload();
    default: return renderDashboard();
  }
}

// ========================================
// DASHBOARD - NEW VERSION
// ========================================

function renderDashboard() {
  const summary = state.reports.summary || {};
  const hasData = state.transactions && state.transactions.length > 0;
  
  return `
  <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h2 style="margin: 0;">${t('dashboard.welcome')}, ${state.currentUser?.username}! 👋</h2>
        
        <!-- Quick Upload Button - SMALLER VERSION -->
        <button 
          id="uploadButton"
          onclick="changePage('upload')" 
          class="btn-primary"
          style="padding: 8px 16px; font-size: 13px; display: flex; align-items: center; gap: 6px;">
          <span style="font-size: 16px;">📤</span>
          <span>${state.language === 'en' ? 'Upload Statement' : 'Ανέβασμα'}</span>
        </button>
      </div>
      
      ${!hasData ? `
        <!-- Empty State -->
        <div class="card" style="text-align: center; padding: 60px 20px; background: linear-gradient(135deg, rgba(255, 184, 0, 0.1) 0%, rgba(255, 184, 0, 0.05) 100%); border: 2px dashed #FFB800;">
          <div style="font-size: 64px; margin-bottom: 20px;">📊</div>
          <h3 style="margin: 0 0 10px 0; color: #FFB800;">
            ${state.language === 'en' ? 'Get Started!' : 'Ξεκινήστε!'}
          </h3>
          <p style="color: #9CA3AF; margin-bottom: 25px; max-width: 500px; margin-left: auto; margin-right: auto;">
            ${state.language === 'en' 
              ? 'Upload your bank statement to automatically categorize transactions and generate financial insights.' 
              : 'Ανεβάστε το τραπεζικό σας αντίγραφο για αυτόματη κατηγοριοποίηση συναλλαγών και οικονομικές αναλύσεις.'}
          </p>
          <button 
            onclick="changePage('upload')" 
            class="btn-primary"
            style="padding: 15px 30px; font-size: 16px;">
            ${state.language === 'en' ? '📤 Upload Your First File' : '📤 Ανεβάστε το Πρώτο Αρχείο'}
          </button>
        </div>
      ` : ''}
      
      
      <!-- Summary Cards -->
      <div class="dashboard-grid">
        <div class="card card-gold">
          <div class="card-title">${t('dashboard.totalBalance')}</div>
          <div class="card-value">€${(summary.credit_total - summary.debit_total || 0).toFixed(2)}</div>
        </div>
        
        <div class="card card-green">
          <div class="card-title">${t('dashboard.totalIncome')}</div>
          <div class="card-value">€${(summary.credit_total || 0).toFixed(2)}</div>
        </div>
        
        <div class="card card-red">
          <div class="card-title">${t('dashboard.totalExpenses')}</div>
          <div class="card-value">€${(summary.debit_total || 0).toFixed(2)}</div>
        </div>
        
        <div class="card">
          <div class="card-title">${t('dashboard.transactionCount')}</div>
          <div class="card-value">${summary.total_transactions || 0}</div>
        </div>
      </div>
      
      <!-- Charts Row -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 30px;">
        <div class="card">
          <h3>${t('reports.cashFlow')}</h3>
          <div style="position: relative; height: 300px; width: 100%;">
            <canvas id="cashFlowChart" style="max-height: 280px;"></canvas>
          </div>
        </div>
        
        <div class="card">
          <h3>${t('predictions.recurringPatterns')}</h3>
          <div id="recurringList" style="max-height: 300px; overflow-y: auto;"></div>
        </div>
      </div>
      
<!-- Recent Transactions -->
<div class="card" style="margin-top: 20px;">
  <h3>${t('dashboard.recentTransactions')}</h3>
  <table class="table" style="width: 100%; margin-top: 15px;">
    <thead>
      <tr>
        <th>Date</th>
        <th>Description</th>
        <th>Amount</th>
        <th>Type</th>
      </tr>
    </thead>
    <tbody>
      ${state.transactions && state.transactions.length > 0 ? 
        state.transactions.slice(0, 10).map(t => `
          <tr>
            <td>${t.date}</td>
            <td style="max-width: 300px; overflow: hidden; text-overflow: ellipsis;">${t.description}</td>
            <td style="text-align: right; color: ${t.type === 'CREDIT' ? '#10b981' : '#ef4444'}; font-weight: 600;">
              €${Math.abs(t.amount).toFixed(2)}
            </td>
            <td>
              <span style="padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; 
                background-color: ${t.type === 'CREDIT' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
                color: ${t.type === 'CREDIT' ? '#10b981' : '#ef4444'};">
                ${t.type}
              </span>
            </td>
          </tr>
        `).join('') 
        : '<tr><td colspan="4" style="text-align: center; padding: 20px; color: #9CA3AF;">No transactions yet</td></tr>'}
    </tbody>
  </table>
</div>
  `;
}


function skipTutorial() {
  // Skip for this session only
  sessionStorage.setItem('tutorialSkipped', 'true');
  closeTutorial();
}


function disableTutorial() {
  // Disable permanently
  localStorage.setItem('tutorialDisabled', 'true');
  closeTutorial();
}

// ========================================
// ACCOUNTS PAGE
// ========================================

function renderAccounts() {
  return `
    <div>
      <button class="btn-primary" style="margin-bottom: 20px;" onclick="showCreateAccountModal()">
        + ${t('accounts.createNew')}
      </button>
      
      <div class="table-container">
        <table id="accountsTable" class="table">
          <thead>
            <tr>
              <th>${t('accounts.accountName')}</th>
              <th>${t('accounts.accountNumber')}</th>
              <th>${t('accounts.accountType')}</th>
              <th>${t('accounts.currentBalance')}</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="accountsBody">
            <tr><td colspan="5">${t('common.loading')}</td></tr>
          </tbody>
        </table>
        <div id="accountsPagination"></div>
      </div>
      
      <div id="createAccountModal" class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <h3>${t('accounts.createNew')}</h3>
            <button class="modal-close" onclick="closeModal('createAccountModal')">×</button>
          </div>
          
          <form id="createAccountForm" onsubmit="createAccount(event)">
            <div class="form-group">
              <label>${t('accounts.accountName')}:</label>
              <input type="text" id="accountName" required>
            </div>
            
            <div class="form-group">
              <label>${t('accounts.accountNumber')}:</label>
              <input type="text" id="accountNumber">
            </div>
            
            <div class="form-group">
              <label>${t('accounts.accountType')}:</label>
              <select id="accountType">
                <option value="checking">Checking</option>
                <option value="savings">Savings</option>
                <option value="cash">Cash</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>${t('accounts.openingBalance')}:</label>
              <input type="number" id="openingBalance" step="0.01" value="0">
            </div>
            
            <div class="modal-footer">
              <button type="button" class="btn-secondary" onclick="closeModal('createAccountModal')">${t('common.cancel')}</button>
              <button type="submit" class="btn-primary">${t('common.create')}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
}

// ========================================
// REPORTS PAGE
// ========================================

function renderReports() {
  const summary = state.reports?.summary || {};
  
  return `
    <div style="height: calc(100vh - 100px); overflow-y: auto; padding: 20px;">
      
      <!-- Page Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
        <h2 style="margin: 0; color: #FFB800; font-weight: 300;">📊 ${t('nav.reports')}</h2>
        <button 
          onclick="exportReports()" 
          class="btn-secondary"
          style="padding: 8px 16px; font-size: 13px;">
          ${state.language === 'en' ? '📥 Export PDF' : '📥 Εξαγωγή PDF'}
        </button>
      </div>

      <!-- Summary Cards -->
      <div class="dashboard-grid" style="margin-bottom: 30px;">
        <div class="card card-gold">
          <div class="card-title">${state.language === 'en' ? 'Total Balance' : 'Συνολικό Υπόλοιπο'}</div>
          <div class="card-value">€${((summary.credit_total || 0) - Math.abs(summary.debit_total || 0)).toFixed(2)}</div>
          <div style="font-size: 12px; color: #9CA3AF; margin-top: 5px;">
            ${summary.total_transactions || 0} ${state.language === 'en' ? 'transactions' : 'συναλλαγές'}
          </div>
        </div>
        
        <div class="card card-green">
          <div class="card-title">${state.language === 'en' ? 'Total Income' : 'Συνολικό Εισόδημα'}</div>
          <div class="card-value">€${(summary.credit_total || 0).toFixed(2)}</div>
          <div style="font-size: 12px; color: #9CA3AF; margin-top: 5px;">
            ${summary.total_credits || 0} ${state.language === 'en' ? 'credits' : 'πιστώσεις'}
          </div>
        </div>
        
        <div class="card card-red">
          <div class="card-title">${state.language === 'en' ? 'Total Expenses' : 'Συνολικά Έξοδα'}</div>
          <div class="card-value">€${Math.abs(summary.debit_total || 0).toFixed(2)}</div>
          <div style="font-size: 12px; color: #9CA3AF; margin-top: 5px;">
            ${summary.total_debits || 0} ${state.language === 'en' ? 'debits' : 'χρεώσεις'}
          </div>
        </div>
        
        <div class="card">
          <div class="card-title">${state.language === 'en' ? 'Net Cash Flow' : 'Καθαρή Ροή'}</div>
          <div class="card-value" style="color: ${summary.net_flow >= 0 ? '#10b981' : '#ef4444'};">
            €${(summary.net_flow || 0).toFixed(2)}
          </div>
          <div style="font-size: 12px; color: #9CA3AF; margin-top: 5px;">
            ${summary.reconciled_count || 0} ${state.language === 'en' ? 'reconciled' : 'συμφωνημένες'}
          </div>
        </div>
      </div>

      <!-- Filters Section -->
      <div class="card" style="margin-bottom: 25px;">
        <h3 style="margin-bottom: 15px; font-weight: 300; font-size: 16px;">
          ${state.language === 'en' ? '🔍 Date Range & Filters' : '🔍 Εύρος Ημερομηνιών & Φίλτρα'}
        </h3>
        
        <!-- Quick Date Presets -->
        <div style="display: flex; gap: 8px; margin-bottom: 15px; flex-wrap: wrap;">
          <button onclick="setReportDateRange('today')" class="btn-secondary" style="padding: 6px 12px; font-size: 12px;">
            ${state.language === 'en' ? 'Today' : 'Σήμερα'}
          </button>
          <button onclick="setReportDateRange('week')" class="btn-secondary" style="padding: 6px 12px; font-size: 12px;">
            ${state.language === 'en' ? 'This Week' : 'Αυτή την Εβδομάδα'}
          </button>
          <button onclick="setReportDateRange('month')" class="btn-secondary" style="padding: 6px 12px; font-size: 12px;">
            ${state.language === 'en' ? 'This Month' : 'Αυτόν τον Μήνα'}
          </button>
          <button onclick="setReportDateRange('quarter')" class="btn-secondary" style="padding: 6px 12px; font-size: 12px;">
            ${state.language === 'en' ? 'This Quarter' : 'Αυτό το Τρίμηνο'}
          </button>
          <button onclick="setReportDateRange('year')" class="btn-secondary" style="padding: 6px 12px; font-size: 12px;">
            ${state.language === 'en' ? 'This Year' : 'Φέτος'}
          </button>
          <button onclick="setReportDateRange('all')" class="btn-secondary" style="padding: 6px 12px; font-size: 12px;">
            ${state.language === 'en' ? 'All Time' : 'Όλος ο Χρόνος'}
          </button>
        </div>
        
        <!-- Custom Date Range -->
        <div style="display: grid; grid-template-columns: 1fr 1fr auto; gap: 15px; align-items: end;">
          <div>
            <label style="display: block; margin-bottom: 5px; color: var(--text-secondary); font-size: 12px;">
              ${state.language === 'en' ? 'Date From' : 'Από Ημερομηνία'}
            </label>
            <input 
              type="date" 
              id="reportDateFrom" 
              style="width: 100%; padding: 8px; border-radius: 6px; background-color: #121820; border: 1px solid #1F2937; color: #E5E7EB;">
          </div>
          <div>
            <label style="display: block; margin-bottom: 5px; color: var(--text-secondary); font-size: 12px;">
              ${state.language === 'en' ? 'Date To' : 'Έως Ημερομηνία'}
            </label>
            <input 
              type="date" 
              id="reportDateTo" 
              style="width: 100%; padding: 8px; border-radius: 6px; background-color: #121820; border: 1px solid #1F2937; color: #E5E7EB;">
          </div>
          <div>
            <button class="btn-primary" onclick="loadReportsData()" style="width: 100%; padding: 8px 16px; white-space: nowrap;">
              ${state.language === 'en' ? '🔍 Generate' : '🔍 Δημιουργία'}
            </button>
          </div>
        </div>
      </div>

      <!-- Charts Grid - 2 PER ROW -->
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 25px;">
        
        <!-- Row 1: Cash Flow + Category Pie -->
        <div class="card">
          <h3 style="margin-bottom: 12px; font-weight: 300; font-size: 15px;">
            ${state.language === 'en' ? '📈 Cash Flow Trend' : '📈 Τάση Ταμειακής Ροής'}
            <span id="cashFlowDateRange" style="font-size: 11px; color: #9CA3AF; font-weight: 400; display: block; margin-top: 5px;"></span>
          </h3>
          <div style="position: relative; height: 280px; width: 100%;">
            <canvas id="cashFlowLineChart"></canvas>
          </div>
        </div>

        <div class="card">
          <h3 style="margin-bottom: 12px; font-weight: 300; font-size: 15px;">
            ${state.language === 'en' ? '🥧 Income vs Expenses' : '🥧 Εισόδημα vs Έξοδα'}
            <span id="categoryDateRange" style="font-size: 11px; color: #9CA3AF; font-weight: 400; display: block; margin-top: 5px;"></span>
          </h3>
          <div style="position: relative; height: 280px; width: 100%;">
            <canvas id="categoryChart"></canvas>
          </div>
        </div>

        <!-- Row 2: Monthly Comparison + Top Categories -->
        <div class="card">
          <h3 style="margin-bottom: 12px; font-weight: 300; font-size: 15px;">
            ${state.language === 'en' ? '📊 Monthly Comparison' : '📊 Μηνιαία Σύγκριση'}
            <span id="monthlyDateRange" style="font-size: 11px; color: #9CA3AF; font-weight: 400; display: block; margin-top: 5px;"></span>
          </h3>
          <div style="position: relative; height: 280px; width: 100%;">
            <canvas id="monthlyChart"></canvas>
          </div>
        </div>

        <div class="card">
          <h3 style="margin-bottom: 12px; font-weight: 300; font-size: 15px;">
            ${state.language === 'en' ? '🏆 Top Categories' : '🏆 Κορυφαίες Κατηγορίες'}
            <span id="topCatDateRange" style="font-size: 11px; color: #9CA3AF; font-weight: 400; display: block; margin-top: 5px;"></span>
          </h3>
          <div style="position: relative; height: 280px; width: 100%;">
            <canvas id="topCategoriesChart"></canvas>
          </div>
        </div>
      </div>

      <!-- Transaction Summary Table -->
      <div class="card" style="margin-bottom: 25px;">
        <h3 style="margin-bottom: 15px; font-weight: 300; font-size: 16px;">
          ${state.language === 'en' ? '📊 Transaction Summary' : '📊 Περίληψη Συναλλαγών'}
        </h3>
        <div style="overflow-x: auto;">
          <table class="table" style="width: 100%;">
            <thead>
              <tr>
                <th>${state.language === 'en' ? 'Type' : 'Τύπος'}</th>
                <th style="text-align: right;">${state.language === 'en' ? 'Count' : 'Αριθμός'}</th>
                <th style="text-align: right;">${state.language === 'en' ? 'Total Amount' : 'Συνολικό Ποσό'}</th>
                <th style="text-align: right;">${state.language === 'en' ? 'Average' : 'Μέσος Όρος'}</th>
                <th style="text-align: right;">${state.language === 'en' ? 'Percentage' : 'Ποσοστό'}</th>
              </tr>
            </thead>
            <tbody id="transactionSummaryBody">
              <tr>
                <td colspan="5" style="text-align: center; padding: 20px;">
                  <span style="color: #9CA3AF;">${t('common.loading')}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Category Analysis Table -->
      <div class="card" style="margin-bottom: 25px;">
        <h3 style="margin-bottom: 15px; font-weight: 300; font-size: 16px;">
          ${state.language === 'en' ? '📋 Category Analysis' : '📋 Ανάλυση Κατηγοριών'}
        </h3>
        <div style="overflow-x: auto;">
          <table class="table" style="width: 100%;">
            <thead>
              <tr>
                <th>${state.language === 'en' ? 'Category' : 'Κατηγορία'}</th>
                <th>${state.language === 'en' ? 'Type' : 'Τύπος'}</th>
                <th style="text-align: right;">${state.language === 'en' ? 'Count' : 'Αριθμός'}</th>
                <th style="text-align: right;">${state.language === 'en' ? 'Total' : 'Σύνολο'}</th>
                <th style="text-align: right;">${state.language === 'en' ? 'Average' : 'Μέσος Όρος'}</th>
                <th style="text-align: right;">${state.language === 'en' ? 'Min' : 'Ελάχιστο'}</th>
                <th style="text-align: right;">${state.language === 'en' ? 'Max' : 'Μέγιστο'}</th>
              </tr>
            </thead>
            <tbody id="categoryBody">
              <tr>
                <td colspan="7" style="text-align: center; padding: 20px;">
                  <span style="color: #9CA3AF;">${t('common.loading')}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Category Distribution Chart - Full Width -->
      <div class="card">
        <h3 style="margin-bottom: 15px; font-weight: 300; font-size: 16px;">
          ${state.language === 'en' ? '📊 Category Distribution' : '📊 Κατανομή Κατηγοριών'}
        </h3>
        <div style="position: relative; height: 320px; width: 100%;">
          <canvas id="categoryBreakdownChart"></canvas>
        </div>
      </div>
    </div>
  `;
}



// Show available data range info
async function showDataRangeInfo() {
  try {
    const response = await fetch(endpoints.dateRange);
    const dateRange = await response.json();
    
    const infoDiv = document.getElementById('dataRangeInfo');
    const textSpan = document.getElementById('dataRangeText');
    
    if (!infoDiv || !textSpan) return;
    
    if (dateRange.hasData) {
      const minDate = new Date(dateRange.min_date).toLocaleDateString(state.language === 'el' ? 'el-GR' : 'en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
      const maxDate = new Date(dateRange.max_date).toLocaleDateString(state.language === 'el' ? 'el-GR' : 'en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
      
      textSpan.textContent = state.language === 'en' 
        ? `📊 Available data: ${minDate} to ${maxDate} (${dateRange.total_transactions} transactions)`
        : `📊 Διαθέσιμα δεδομένα: ${minDate} έως ${maxDate} (${dateRange.total_transactions} συναλλαγές)`;
      
      infoDiv.style.display = 'block';
    } else {
      infoDiv.style.display = 'none';
    }
  } catch (error) {
    console.error('Error showing data range info:', error);
  }
}

function setReportDateRange(preset) {
  const today = new Date();
  let dateFrom, dateTo;
  
  switch(preset) {
    case 'today':
      dateFrom = today.toISOString().split('T')[0];
      dateTo = today.toISOString().split('T')[0];
      break;
      
    case 'week':
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      dateFrom = weekStart.toISOString().split('T')[0];
      dateTo = today.toISOString().split('T')[0];
      break;
      
    case 'month':
      dateFrom = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
      dateTo = today.toISOString().split('T')[0];
      break;
      
    case 'quarter':
      const quarter = Math.floor(today.getMonth() / 3);
      dateFrom = new Date(today.getFullYear(), quarter * 3, 1).toISOString().split('T')[0];
      dateTo = today.toISOString().split('T')[0];
      break;
      
    case 'year':
      dateFrom = new Date(today.getFullYear(), 0, 1).toISOString().split('T')[0];
      dateTo = today.toISOString().split('T')[0];
      break;
      
    case 'all':
      dateFrom = '';
      dateTo = '';
      break;
  }
  
  // Update inputs
  if (document.getElementById('reportDateFrom')) {
    document.getElementById('reportDateFrom').value = dateFrom;
  }
  if (document.getElementById('reportDateTo')) {
    document.getElementById('reportDateTo').value = dateTo;
  }
  
  // Load data
  loadReportsData();
}




// ========================================
// LEDGER PAGE
// ========================================

function renderLedger() {
  const hasAccounts = state.accounts && state.accounts.length > 0;
  const selectedAccountData = hasAccounts 
    ? state.accounts.find(a => a.id === state.selectedAccount) 
    : null;
  
  return `
    <div>
      <!-- Page Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
        <h2 style="margin: 0; color: #FFB800; font-weight: 300;">📖 ${t('ledger.title')}</h2>
        ${state.ledger && state.ledger.length > 0 ? `
          <button 
            onclick="exportLedger()" 
            class="btn-secondary"
            style="padding: 8px 16px; font-size: 13px;">
            ${state.language === 'en' ? '📥 Export Ledger' : '📥 Εξαγωγή Καθολικού'}
          </button>
        ` : ''}
      </div>

      ${!hasAccounts ? `
        <!-- No Accounts State -->
        <div class="card" style="text-align: center; padding: 60px 20px; background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%); border: 2px dashed #ef4444;">
          <div style="font-size: 64px; margin-bottom: 20px;">🏦</div>
          <h3 style="margin: 0 0 10px 0; color: #ef4444;">
            ${state.language === 'en' ? 'No Accounts Found' : 'Δεν Βρέθηκαν Λογαριασμοί'}
          </h3>
          <p style="color: #9CA3AF; margin-bottom: 25px; max-width: 500px; margin-left: auto; margin-right: auto;">
            ${state.language === 'en' 
              ? 'You need to create at least one account to view ledger entries.' 
              : 'Πρέπει να δημιουργήσετε τουλάχιστον έναν λογαριασμό για να δείτε καταχωρήσεις.'}
          </p>
          <button 
            onclick="changePage('accounts')" 
            class="btn-primary"
            style="padding: 15px 30px; font-size: 16px;">
            ${state.language === 'en' ? '➕ Create Account' : '➕ Δημιουργία Λογαριασμού'}
          </button>
        </div>
      ` : `
        <!-- Account Selection & Info -->
        <div class="card" style="margin-bottom: 25px;">
          <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 20px; align-items: end;">
            
            <!-- Account Selector -->
            <div>
              <label style="display: block; margin-bottom: 8px; color: var(--text-secondary); font-size: 12px; text-transform: uppercase; font-weight: 600;">
                ${t('accounts.accountName')}
              </label>
              <select 
                id="ledgerAccountSelect" 
                onchange="handleLedgerAccountChange(this.value)"
                style="width: 100%; padding: 12px; background-color: var(--bg-hover); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-primary); font-size: 14px; font-weight: 500;">
                ${state.accounts.map(a => 
                  `<option value="${a.id}" ${a.id === state.selectedAccount ? 'selected' : ''}>
                    ${a.account_name} ${a.account_number ? '(' + a.account_number + ')' : ''}
                  </option>`
                ).join('')}
              </select>
            </div>
            
            <!-- Current Balance -->
            ${selectedAccountData ? `
              <div style="text-align: center; padding: 15px; background-color: rgba(255, 184, 0, 0.1); border-radius: 8px; border: 1px solid rgba(255, 184, 0, 0.3);">
                <div style="font-size: 11px; color: #9CA3AF; text-transform: uppercase; margin-bottom: 5px;">
                  ${state.language === 'en' ? 'Current Balance' : 'Τρέχον Υπόλοιπο'}
                </div>
                <div style="font-size: 22px; font-weight: 700; color: #FFB800;">
                  ${formatCurrency(selectedAccountData.current_balance || 0)}
                </div>
              </div>
              
              <!-- Account Type -->
              <div style="text-align: center; padding: 15px; background-color: var(--bg-hover); border-radius: 8px; border: 1px solid var(--border-color);">
                <div style="font-size: 11px; color: #9CA3AF; text-transform: uppercase; margin-bottom: 5px;">
                  ${state.language === 'en' ? 'Account Type' : 'Τύπος Λογαριασμού'}
                </div>
                <div style="font-size: 16px; font-weight: 600; color: var(--text-primary); text-transform: capitalize;">
                  ${selectedAccountData.account_type || 'N/A'}
                </div>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Filters -->
        <div class="card" style="margin-bottom: 25px;">
          <h3 style="margin-bottom: 15px; font-weight: 300; font-size: 15px;">
            ${state.language === 'en' ? '🔍 Filters' : '🔍 Φίλτρα'}
          </h3>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr auto; gap: 15px; align-items: end;">
            <div>
              <label style="display: block; margin-bottom: 5px; color: var(--text-secondary); font-size: 12px;">
                ${state.language === 'en' ? 'Date From' : 'Από Ημερομηνία'}
              </label>
              <input 
                type="date" 
                id="ledgerDateFrom" 
                style="width: 100%; padding: 8px; border-radius: 6px; background-color: #121820; border: 1px solid #1F2937; color: #E5E7EB;">
            </div>
            <div>
              <label style="display: block; margin-bottom: 5px; color: var(--text-secondary); font-size: 12px;">
                ${state.language === 'en' ? 'Date To' : 'Έως Ημερομηνία'}
              </label>
              <input 
                type="date" 
                id="ledgerDateTo" 
                style="width: 100%; padding: 8px; border-radius: 6px; background-color: #121820; border: 1px solid #1F2937; color: #E5E7EB;">
            </div>
            <div>
              <label style="display: block; margin-bottom: 5px; color: var(--text-secondary); font-size: 12px;">
                ${state.language === 'en' ? 'Status' : 'Κατάσταση'}
              </label>
              <select 
                id="ledgerReconciled"
                style="width: 100%; padding: 8px; border-radius: 6px; background-color: #121820; border: 1px solid #1F2937; color: #E5E7EB;">
                <option value="all">${state.language === 'en' ? 'All' : 'Όλα'}</option>
                <option value="1">${state.language === 'en' ? 'Reconciled' : 'Συμφωνημένα'}</option>
                <option value="0">${state.language === 'en' ? 'Pending' : 'Εκκρεμή'}</option>
              </select>
            </div>
            <div>
              <button class="btn-primary" onclick="applyLedgerFilters()" style="padding: 8px 16px; white-space: nowrap;">
                ${state.language === 'en' ? 'Apply' : 'Εφαρμογή'}
              </button>
            </div>
          </div>
        </div>

        <!-- Ledger Table -->
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <h3 style="margin: 0; font-weight: 300; font-size: 16px;">
              ${state.language === 'en' ? '📊 Ledger Entries' : '📊 Καταχωρήσεις Καθολικού'}
            </h3>
            <div style="font-size: 12px; color: #9CA3AF;">
              ${state.ledger ? state.ledger.length : 0} ${state.language === 'en' ? 'entries' : 'καταχωρήσεις'}
            </div>
          </div>
          
          <div style="overflow-x: auto;">
            <table class="table" style="width: 100%;">
              <thead>
                <tr style="background-color: var(--bg-hover);">
                  <th style="width: 100px;">${t('ledger.date')}</th>
                  <th style="min-width: 250px;">${t('ledger.description')}</th>
                  <th style="text-align: right; width: 120px;">${t('ledger.debit')}</th>
                  <th style="text-align: right; width: 120px;">${t('ledger.credit')}</th>
                  <th style="text-align: right; width: 140px; background-color: rgba(255, 184, 0, 0.1);">${t('ledger.balance')}</th>
                  <th style="text-align: center; width: 80px;">${t('ledger.reconciled')}</th>
                </tr>
              </thead>
              <tbody id="ledgerBody">
                <tr><td colspan="6" style="text-align: center; padding: 20px; color: var(--text-secondary);">${t('common.loading')}</td></tr>
              </tbody>
            </table>
          </div>
          
          <!-- Pagination -->
          <div id="ledgerPagination"></div>
        </div>
      `}
    </div>
  `;
}
// Handle ledger account change
async function handleLedgerAccountChange(accountId) {
  console.log('📊 Changing ledger account to:', accountId);
  
  if (!accountId) {
    state.selectedAccount = null;
    state.ledger = [];
    renderLedgerTable();
    return;
  }
  
  state.selectedAccount = accountId;
  
  // Show loading
  const tbody = document.getElementById('ledgerBody');
  if (tbody) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 30px;">
          <div style="font-size: 32px; margin-bottom: 10px;">⏳</div>
          <div style="color: #9CA3AF;">${state.language === 'en' ? 'Loading ledger entries...' : 'Φόρτωση καταχωρήσεων...'}</div>
        </td>
      </tr>
    `;
  }
  
  // Load ledger
  await loadAccountLedger(accountId);
  
  // Render table
  renderLedgerTable();
}

// Apply ledger filters
function applyLedgerFilters() {
  renderLedgerTable();
}

// ========================================
// FILE UPLOAD HANDLERS
// ========================================

function handleDragOver(e) {
  e.preventDefault();
  e.stopPropagation();
  const uploadArea = document.getElementById('uploadArea');
  if (uploadArea) {
    uploadArea.style.backgroundColor = 'rgba(255, 184, 0, 0.15)';
    uploadArea.style.borderColor = '#FFC933';
  }
}

function handleDragLeave(e) {
  e.preventDefault();
  const uploadArea = document.getElementById('uploadArea');
  if (uploadArea) {
    uploadArea.style.backgroundColor = 'rgba(255, 184, 0, 0.05)';
    uploadArea.style.borderColor = '#FFB800';
  }
}

function handleDrop(e) {
  e.preventDefault();
  e.stopPropagation();
  const uploadArea = document.getElementById('uploadArea');
  if (uploadArea) {
    uploadArea.style.backgroundColor = 'rgba(255, 184, 0, 0.05)';
    uploadArea.style.borderColor = '#FFB800';
  }
  
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    uploadFile(files);
  }
}

function handleFileSelect(e) {
  const files = e.target.files;
  if (files.length > 0) {
    uploadFile(files);
  }
}

async function uploadFile(files) {
  const file = files[0] || files;
  
  if (!file || !file.name) {
    console.error('❌ No valid file provided');
    return;
  }

  try {
    console.log('📤 Upload starting:', file.name);
    
    // Show full-screen loading overlay
    showUploadOverlay();
    updateUploadProgress('preparing', 'Preparing file...', 10);
    
    await sleep(500);
    
    // Create FormData
    const formData = new FormData();
    formData.append('file', file);
    
    updateUploadProgress('uploading', 'Uploading file to server...', 20);
    
    // Upload file
    const response = await fetch(`${API_BASE}/files/upload`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    updateUploadProgress('analyzing', 'Analyzing with AI...', 40);
    
    const data = await response.json();
    console.log('✅ Upload response:', data);

    if (data.error) {
      throw new Error(data.error);
    }

    if (data.success && data.transactions) {
      updateUploadProgress('processing', 'Processing transactions...', 70);
      await sleep(500);
      
      // Map transactions
      const mappedTransactions = data.transactions.map(txn => ({
        id: txn.id,
        date: txn.date,
        description: txn.description,
        amount: txn.amount,
        type: txn.type,
        category: txn.categoryCode,
        categoryCode: txn.categoryCode,
        confidence: txn.confidence,
        counterparty: txn.counterparty || '',
        reasoning: txn.reasoning || ''
      }));
      
      state.transactions.push(...mappedTransactions);
      
      updateUploadProgress('finalizing', 'Finalizing...', 90);
      await sleep(300);
      
      updateUploadProgress('complete', 'Upload complete!', 100);
      await sleep(500);
      
      // Hide overlay
      hideUploadOverlay();
      
      // Show success dialog
      showSuccessDialog(data);
      
      // Refresh uploads table
      await loadRecentUploads();
      
    } else {
      throw new Error('Invalid response from server');
    }

  } catch (error) {
    console.error('❌ Upload error:', error);
    
    hideUploadOverlay();
    
    showNotification(
      `${state.language === 'en' ? '❌ Upload failed: ' : '❌ Το ανέβασμα απέτυχε: '}${error.message}`,
      'error'
    );
  }
  
  // Reset file input
  const fileInput = document.getElementById('fileInput');
  if (fileInput) fileInput.value = '';
}

// Helper sleep function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// Show full-screen upload overlay
function showUploadOverlay() {
  // Remove existing overlay
  const existing = document.getElementById('uploadOverlay');
  if (existing) existing.remove();
  
  const overlay = document.createElement('div');
  overlay.id = 'uploadOverlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.85);
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(5px);
  `;
  
  overlay.innerHTML = `
    <div style="background: linear-gradient(135deg, #1F2937 0%, #111827 100%); border: 2px solid #FFB800; border-radius: 16px; padding: 40px; max-width: 500px; width: 90%; box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);">
      
      <!-- Icon Animation -->
      <div id="uploadIcon" style="text-align: center; font-size: 64px; margin-bottom: 20px; animation: pulse 2s infinite;">
        📤
      </div>
      
      <!-- Status Message -->
      <h3 id="uploadStatusTitle" style="margin: 0 0 10px 0; color: #FFB800; text-align: center; font-size: 20px; font-weight: 600;">
        Uploading...
      </h3>
      
      <p id="uploadStatusMessage" style="margin: 0 0 25px 0; color: #9CA3AF; text-align: center; font-size: 14px;">
        Preparing your file...
      </p>
      
      <!-- Progress Bar -->
      <div style="background-color: #1F2937; height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 15px;">
        <div id="uploadProgressBar" style="height: 100%; background: linear-gradient(90deg, #FFB800 0%, #FFC933 100%); width: 0%; transition: width 0.5s ease-out;"></div>
      </div>
      
      <!-- Percentage -->
      <div id="uploadPercentage" style="text-align: center; color: #E5E7EB; font-size: 24px; font-weight: 700;">
        0%
      </div>
      
      <!-- AI Analysis Notice -->
      <div style="margin-top: 25px; padding: 15px; background-color: rgba(59, 130, 246, 0.1); border-left: 3px solid #3B82F6; border-radius: 6px;">
        <div style="font-size: 11px; color: #9CA3AF; text-align: center;">
          <strong style="color: #3B82F6;">🤖 AI Analysis in Progress</strong><br>
          ${state.language === 'en' 
            ? 'Claude AI is analyzing your bank statement and categorizing transactions...' 
            : 'Το Claude AI αναλύει το τραπεζικό σας αντίγραφο και κατηγοριοποιεί τις συναλλαγές...'}
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);
  
  // Prevent scrolling
  document.body.style.overflow = 'hidden';
}

// Update upload progress
function updateUploadProgress(stage, message, percentage) {
  const icon = document.getElementById('uploadIcon');
  const title = document.getElementById('uploadStatusTitle');
  const msg = document.getElementById('uploadStatusMessage');
  const bar = document.getElementById('uploadProgressBar');
  const percent = document.getElementById('uploadPercentage');
  
  if (!icon || !title || !msg || !bar || !percent) return;
  
  // Update icon based on stage
  const icons = {
    preparing: '📁',
    uploading: '📤',
    analyzing: '🤖',
    processing: '⚙️',
    finalizing: '✨',
    complete: '✅'
  };
  
  icon.textContent = icons[stage] || '📤';
  
  // Update title
  const titles = {
    preparing: state.language === 'en' ? 'Preparing...' : 'Προετοιμασία...',
    uploading: state.language === 'en' ? 'Uploading...' : 'Ανέβασμα...',
    analyzing: state.language === 'en' ? 'AI Analysis...' : 'Ανάλυση AI...',
    processing: state.language === 'en' ? 'Processing...' : 'Επεξεργασία...',
    finalizing: state.language === 'en' ? 'Finalizing...' : 'Ολοκλήρωση...',
    complete: state.language === 'en' ? 'Complete!' : 'Ολοκληρώθηκε!'
  };
  
  title.textContent = titles[stage] || 'Processing...';
  msg.textContent = message;
  bar.style.width = percentage + '%';
  percent.textContent = percentage + '%';
  
  // Change color on complete
  if (stage === 'complete') {
    bar.style.background = 'linear-gradient(90deg, #10b981 0%, #059669 100%)';
    title.style.color = '#10b981';
  }
}

// Hide upload overlay
function hideUploadOverlay() {
  const overlay = document.getElementById('uploadOverlay');
  if (overlay) {
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s';
    setTimeout(() => overlay.remove(), 300);
  }
  
  // Restore scrolling
  document.body.style.overflow = '';
}

// Show success dialog with options
function showSuccessDialog(data) {
  // Remove existing dialog
  const existing = document.getElementById('successDialog');
  if (existing) existing.remove();
  
  const dialog = document.createElement('div');
  dialog.id = 'successDialog';
  dialog.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s;
  `;
  
  dialog.innerHTML = `
    <div style="background: linear-gradient(135deg, #1F2937 0%, #111827 100%); border: 2px solid #10b981; border-radius: 16px; padding: 40px; max-width: 550px; width: 90%; box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);">
      
      <!-- Success Icon -->
      <div style="text-align: center; font-size: 72px; margin-bottom: 20px; animation: scaleIn 0.5s;">
        ✅
      </div>
      
      <!-- Title -->
      <h2 style="margin: 0 0 15px 0; color: #10b981; text-align: center; font-size: 24px; font-weight: 700;">
        ${state.language === 'en' ? 'Upload Successful!' : 'Επιτυχής Μεταφόρτωση!'}
      </h2>
      
      <!-- Summary -->
      <div style="background-color: rgba(16, 185, 129, 0.1); border-radius: 8px; padding: 20px; margin-bottom: 25px;">
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
          <div style="text-align: center;">
            <div style="font-size: 11px; color: #9CA3AF; text-transform: uppercase; margin-bottom: 5px;">
              ${state.language === 'en' ? 'Transactions' : 'Συναλλαγές'}
            </div>
            <div style="font-size: 28px; font-weight: 700; color: #10b981;">
              ${data.transactionCount || data.transactions?.length || 0}
            </div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 11px; color: #9CA3AF; text-transform: uppercase; margin-bottom: 5px;">
              ${state.language === 'en' ? 'Net Flow' : 'Καθαρή Ροή'}
            </div>
            <div style="font-size: 28px; font-weight: 700; color: ${data.summary?.netCashFlow >= 0 ? '#10b981' : '#ef4444'};">
              €${(data.summary?.netCashFlow || 0).toFixed(0)}
            </div>
          </div>
        </div>
        
        ${data.predictions ? `
          <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(16, 185, 129, 0.3);">
            <div style="text-align: center; font-size: 12px; color: #9CA3AF;">
              🔮 <strong style="color: #10b981;">${(data.predictions.recurring?.length || 0) + (data.predictions.forecast?.length || 0)}</strong> 
              ${state.language === 'en' ? 'AI predictions generated' : 'προβλέψεις AI δημιουργήθηκαν'}
            </div>
          </div>
        ` : ''}
      </div>
      
      <!-- Analysis Message -->
      ${data.analysis ? `
        <div style="margin-bottom: 25px; padding: 15px; background-color: rgba(59, 130, 246, 0.1); border-left: 3px solid #3B82F6; border-radius: 6px;">
          <div style="font-size: 12px; color: #E5E7EB;">
            💡 ${data.analysis}
          </div>
        </div>
      ` : ''}
      
      <!-- Action Buttons -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
        <button 
          onclick="closeSuccessDialog()" 
          style="padding: 14px 20px; background-color: #374151; border: none; color: #E5E7EB; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 14px; transition: all 0.3s;">
          ${state.language === 'en' ? 'Stay Here' : 'Παραμονή Εδώ'}
        </button>
        <button 
          onclick="goToTransactions()" 
          style="padding: 14px 20px; background-color: #10b981; border: none; color: white; border-radius: 8px; cursor: pointer; font-weight: 700; font-size: 14px; transition: all 0.3s; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);">
          ${state.language === 'en' ? '👉 View Transactions' : '👉 Προβολή Συναλλαγών'}
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(dialog);
  
  // Add click outside to close
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
      closeSuccessDialog();
    }
  });
}

// Close success dialog
function closeSuccessDialog() {
  const dialog = document.getElementById('successDialog');
  if (dialog) {
    dialog.style.opacity = '0';
    dialog.style.transition = 'opacity 0.3s';
    setTimeout(() => dialog.remove(), 300);
  }
}

// Go to transactions page
// Go to transactions page
async function goToTransactions() {
  closeSuccessDialog();
  state.currentPage = 'transactions';
  render();
  
  // Refresh transactions data
  await loadTransactions();
  renderTransactionsTable();
}




function updateProgressBar(percent) {
  const bar = document.getElementById('progressBar');
  if (bar) {
    bar.style.width = percent + '%';
  }
  const status = document.getElementById('uploadStatus');
  if (status) {
    status.textContent = `${Math.round(percent)}% ${state.language === 'en' ? 'Complete' : 'Ολοκληρώθηκε'}`;
  }
}

function displayFilePreview(upload) {
  console.log('🔍 Displaying preview for:', upload.fileName);
  
  const previewContainer = document.getElementById('previewContainer');
  const previewData = document.getElementById('previewData');
  
  if (!previewContainer || !previewData) {
    console.warn('⚠️ Preview elements not found');
    return;
  }

  if (!upload.transactions || upload.transactions.length === 0) {
    console.warn('⚠️ No transactions to preview');
    previewData.innerHTML = '<p style="color: #9CA3AF; text-align: center; padding: 20px;">No transactions found</p>';
    previewContainer.style.display = 'block';
    return;
  }

  // Show first 10 transactions
  const previewTxns = upload.transactions.slice(0, 10);
  
  let html = `
    <div style="background-color: rgba(16, 185, 129, 0.1); border-left: 4px solid #10b981; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
        <span style="font-size: 24px;">✅</span>
        <div>
          <div style="font-weight: 700; font-size: 16px; color: #10b981;">
            ${state.language === 'en' ? 'Upload Successful!' : 'Επιτυχής Μεταφόρτωση!'}
          </div>
          <div style="font-size: 12px; color: #9CA3AF; margin-top: 3px;">
            ${upload.fileName} • ${upload.transactionCount} ${state.language === 'en' ? 'transactions' : 'συναλλαγές'}
          </div>
        </div>
      </div>
      
      ${upload.summary ? `
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(16, 185, 129, 0.3);">
          <div>
            <div style="font-size: 10px; color: #9CA3AF; text-transform: uppercase;">${state.language === 'en' ? 'Income' : 'Εισόδημα'}</div>
            <div style="font-size: 16px; font-weight: 600; color: #10b981;">€${(upload.summary.creditTotal || 0).toFixed(2)}</div>
          </div>
          <div>
            <div style="font-size: 10px; color: #9CA3AF; text-transform: uppercase;">${state.language === 'en' ? 'Expenses' : 'Έξοδα'}</div>
            <div style="font-size: 16px; font-weight: 600; color: #ef4444;">€${(upload.summary.debitTotal || 0).toFixed(2)}</div>
          </div>
          <div>
            <div style="font-size: 10px; color: #9CA3AF; text-transform: uppercase;">${state.language === 'en' ? 'Net' : 'Καθαρό'}</div>
            <div style="font-size: 16px; font-weight: 600; color: ${upload.summary.netCashFlow >= 0 ? '#10b981' : '#ef4444'};">
              €${(upload.summary.netCashFlow || 0).toFixed(2)}
            </div>
          </div>
        </div>
      ` : ''}
    </div>
    
    <div style="margin-bottom: 15px;">
      <h4 style="margin: 0 0 10px 0; color: var(--text-primary); font-weight: 300;">
        ${state.language === 'en' ? 'Preview' : 'Προεπισκόπηση'} 
        <span style="color: #9CA3AF; font-size: 12px;">(${state.language === 'en' ? 'showing' : 'εμφάνιση'} ${previewTxns.length} ${state.language === 'en' ? 'of' : 'από'} ${upload.transactionCount})</span>
      </h4>
    </div>
  `;
  
  previewTxns.forEach((txn, idx) => {
    const categoryName = getCategoryName(txn.categoryCode);
    const confidenceColor = txn.confidence >= 0.9 ? '#10b981' : txn.confidence >= 0.7 ? '#FFB800' : '#ef4444';
    
    html += `
      <div style="background-color: var(--bg-hover); padding: 12px; border-radius: 6px; margin-bottom: 10px; border-left: 3px solid ${txn.type === 'CREDIT' ? '#10b981' : '#ef4444'};">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
          <div style="flex: 1;">
            <div style="font-weight: 600; color: var(--text-primary); margin-bottom: 4px;">
              #${idx + 1} • ${txn.date}
            </div>
            <div style="color: var(--text-secondary); font-size: 13px;">
              ${txn.description}
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-weight: 700; font-size: 16px; color: ${txn.type === 'CREDIT' ? '#10b981' : '#ef4444'};">
              ${txn.type === 'CREDIT' ? '+' : '-'}€${Math.abs(txn.amount || 0).toFixed(2)}
            </div>
          </div>
        </div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <span style="padding: 3px 8px; border-radius: 4px; font-size: 11px; background-color: ${txn.type === 'CREDIT' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}; color: ${txn.type === 'CREDIT' ? '#10b981' : '#ef4444'};">
            ${txn.type}
          </span>
          <span style="padding: 3px 8px; border-radius: 4px; font-size: 11px; background-color: rgba(100, 100, 100, 0.2); color: #9CA3AF;">
            ${categoryName}
          </span>
          <span style="padding: 3px 8px; border-radius: 4px; font-size: 11px; background-color: rgba(${txn.confidence >= 0.9 ? '16, 185, 129' : txn.confidence >= 0.7 ? '255, 184, 0' : '239, 68, 68'}, 0.2); color: ${confidenceColor};">
            ${((txn.confidence || 0) * 100).toFixed(0)}% ${state.language === 'en' ? 'confidence' : 'εμπιστοσύνη'}
          </span>
        </div>
      </div>
    `;
  });
  
  if (upload.transactionCount > 10) {
    html += `
      <div style="text-align: center; padding: 15px; color: #9CA3AF; font-size: 13px;">
        ${state.language === 'en' ? 'And' : 'Και'} ${upload.transactionCount - 10} ${state.language === 'en' ? 'more transactions...' : 'περισσότερες συναλλαγές...'}
      </div>
    `;
  }

  previewData.innerHTML = html;
  previewContainer.style.display = 'block';
  
  // Scroll to preview
  setTimeout(() => {
    previewContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 200);
}

async function loadRecentUploads() {
  console.log('📋 Loading recent uploads...');
  
  const tbody = document.getElementById('uploadsBody');
  if (!tbody) {
    console.warn('⚠️ Upload table body not found');
    return;
  }

  try {
    // Fetch from backend
    const response = await fetch(`${API_BASE}/uploads`);
    if (response.ok) {
      const uploads = await response.json();
      state.uploads = uploads;
    }
  } catch (error) {
    console.error('Error fetching uploads:', error);
  }

  if (!state.uploads || state.uploads.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 40px;">
          <div style="font-size: 48px; margin-bottom: 15px;">📁</div>
          <p style="color: #9CA3AF; margin-bottom: 8px;">
            ${state.language === 'en' ? 'No uploads yet' : 'Δεν υπάρχουν αναβάσματα ακόμη'}
          </p>
          <p style="color: #6B7280; font-size: 12px;">
            ${state.language === 'en' ? 'Upload a file to get started' : 'Ανεβάστε ένα αρχείο για να ξεκινήσετε'}
          </p>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = state.uploads.map((upload, idx) => {
    const uploadDate = upload.created_at ? new Date(upload.created_at).toLocaleString(state.language === 'el' ? 'el-GR' : 'en-US') : '-';
    
    const statusConfig = {
      completed: { icon: '✅', text: state.language === 'en' ? 'Completed' : 'Ολοκληρώθηκε', color: '#10b981' },
      processing: { icon: '⏳', text: state.language === 'en' ? 'Processing' : 'Επεξεργασία', color: '#FFB800' },
      failed: { icon: '❌', text: state.language === 'en' ? 'Failed' : 'Απέτυχε', color: '#ef4444' },
      pending: { icon: '⏸️', text: state.language === 'en' ? 'Pending' : 'Εκκρεμεί', color: '#9CA3AF' }
    };
    
    const status = statusConfig[upload.status] || statusConfig.pending;
    
    return `
      <tr style="background-color: ${idx === 0 ? 'rgba(255, 184, 0, 0.05)' : 'transparent'};">
        <td>
          <div style="font-weight: 600; color: var(--text-primary);">${upload.file_name}</div>
          <div style="font-size: 11px; color: #6B7280; margin-top: 2px;">${uploadDate}</div>
        </td>
        <td>
          <span style="padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 600; background-color: ${status.color}20; color: ${status.color};">
            ${status.icon} ${status.text}
          </span>
        </td>
        <td style="text-align: right; font-weight: 600;">
          ${upload.transaction_count || 0}
        </td>
        <td style="text-align: right;">
          ${upload.status === 'completed' ? `
            <div style="font-size: 12px; color: #9CA3AF;">
              ${upload.analysis || 'Analysis completed'}
            </div>
          ` : upload.status === 'failed' ? `
            <div style="font-size: 11px; color: #ef4444;">
              ${upload.error_message || 'Upload failed'}
            </div>
          ` : '-'}
        </td>
        <td style="text-align: center;">
          ${upload.status === 'completed' ? `
            <button 
              onclick="changePage('transactions')" 
              class="btn-primary" 
              style="padding: 6px 12px; font-size: 12px;">
              ${state.language === 'en' ? '👁️ View' : '👁️ Προβολή'}
            </button>
          ` : '-'}
        </td>
      </tr>
    `;
  }).join('');

  console.log('✅ Loaded', state.uploads.length, 'uploads');
}


// Show notification toast
function showNotification(message, type = 'info') {
  // Remove existing notification
  const existing = document.getElementById('notification');
  if (existing) existing.remove();
  
  const colors = {
    success: { bg: '#10b981', border: '#059669' },
    error: { bg: '#ef4444', border: '#dc2626' },
    info: { bg: '#3B82F6', border: '#2563EB' },
    warning: { bg: '#FFB800', border: '#F59E0B' }
  };
  
  const color = colors[type] || colors.info;
  
  const notification = document.createElement('div');
  notification.id = 'notification';
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: ${color.bg};
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    border-left: 4px solid ${color.border};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    max-width: 400px;
    animation: slideIn 0.3s ease-out;
    font-size: 14px;
    font-weight: 500;
  `;
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-in';
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}





function showUploadDetails(uploadId) {
  const upload = state.uploads.find(u => u.id === uploadId);
  
  if (!upload) {
    showNotification(state.language === 'en' ? 'Upload not found' : 'Το ανέβασμα δεν βρέθηκε', 'error');
    return;
  }
  
  displayFilePreview(upload);
}



function renderTransactions() {
  return `
    <div>
      <!-- Filters Card -->
      <div class="card" style="margin-bottom: 20px;">
        <h3 style="margin-bottom: 15px; font-weight: 300; font-size: 15px;">
          ${state.language === 'en' ? '🔍 Filters' : '🔍 Φίλτρα'}
        </h3>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 15px;">
          
          <!-- Date From -->
          <div>
            <label style="display: block; margin-bottom: 5px; color: var(--text-secondary); font-size: 12px;">
              ${state.language === 'en' ? 'Date From' : 'Από Ημερομηνία'}
            </label>
            <input 
              type="date" 
              id="filterDateFrom" 
              style="width: 100%; padding: 8px; background-color: var(--bg-hover); border: 1px solid var(--border-color); border-radius: 4px; color: var(--text-primary);">
          </div>
          
          <!-- Date To -->
          <div>
            <label style="display: block; margin-bottom: 5px; color: var(--text-secondary); font-size: 12px;">
              ${state.language === 'en' ? 'Date To' : 'Έως Ημερομηνία'}
            </label>
            <input 
              type="date" 
              id="filterDateTo" 
              style="width: 100%; padding: 8px; background-color: var(--bg-hover); border: 1px solid var(--border-color); border-radius: 4px; color: var(--text-primary);">
          </div>
          
          <!-- Search -->
          <div>
            <label style="display: block; margin-bottom: 5px; color: var(--text-secondary); font-size: 12px;">
              ${state.language === 'en' ? 'Search' : 'Αναζήτηση'}
            </label>
            <input 
              type="text" 
              id="filterSearch" 
              placeholder="${state.language === 'en' ? 'Description, counterparty...' : 'Περιγραφή, αντισυμβαλλόμενος...'}"
              style="width: 100%; padding: 8px; background-color: var(--bg-hover); border: 1px solid var(--border-color); border-radius: 4px; color: var(--text-primary);">
          </div>
          
          <!-- Category Filter - NEW -->
          <div>
            <label style="display: block; margin-bottom: 5px; color: var(--text-secondary); font-size: 12px;">
              ${state.language === 'en' ? 'Category' : 'Κατηγορία'}
            </label>
            <select 
              id="filterCategory" 
              style="width: 100%; padding: 8px; background-color: var(--bg-hover); border: 1px solid var(--border-color); border-radius: 4px; color: var(--text-primary);">
              <option value="all">${state.language === 'en' ? 'All Categories' : 'Όλες οι Κατηγορίες'}</option>
              <!-- Categories will be populated dynamically -->
            </select>
          </div>
          
          <!-- Type -->
          <div>
            <label style="display: block; margin-bottom: 5px; color: var(--text-secondary); font-size: 12px;">
              ${state.language === 'en' ? 'Type' : 'Τύπος'}
            </label>
            <select 
              id="filterType" 
              style="width: 100%; padding: 8px; background-color: var(--bg-hover); border: 1px solid var(--border-color); border-radius: 4px; color: var(--text-primary);">
              <option value="all">${state.language === 'en' ? 'All' : 'Όλα'}</option>
              <option value="CREDIT">${state.language === 'en' ? 'Credit (Income)' : 'Πίστωση (Εισόδημα)'}</option>
              <option value="DEBIT">${state.language === 'en' ? 'Debit (Expense)' : 'Χρέωση (Έξοδο)'}</option>
            </select>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div style="display: flex; gap: 10px;">
          <button 
            onclick="applyFilters()" 
            class="btn-primary" 
            style="flex: 1;">
            ${state.language === 'en' ? '🔍 Apply Filters' : '🔍 Εφαρμογή Φίλτρων'}
          </button>
          <button 
            onclick="clearFilters()" 
            class="btn-secondary" 
            style="flex: 1;">
            ${state.language === 'en' ? '✕ Clear' : '✕ Καθαρισμός'}
          </button>
        </div>
      </div>
      
      <!-- Transactions Table -->
      <div class="card">
        <h3 style="margin-bottom: 15px; font-weight: 300; font-size: 16px;">
          ${state.language === 'en' ? '📊 Transactions' : '📊 Συναλλαγές'}
        </h3>
        
        <div style="overflow-x: auto;">
          <table class="table" style="width: 100%;">
            <thead>
              <tr>
                <th>${state.language === 'en' ? 'Date' : 'Ημερομηνία'}</th>
                <th>${state.language === 'en' ? 'Description' : 'Περιγραφή'}</th>
                <th style="text-align: right;">${state.language === 'en' ? 'Amount' : 'Ποσό'}</th>
                <th>${state.language === 'en' ? 'Type' : 'Τύπος'}</th>
                <th>${state.language === 'en' ? 'Category' : 'Κατηγορία'}</th>
                <th style="text-align: center;">${state.language === 'en' ? 'Confidence' : 'Εμπιστοσύνη'}</th>
              </tr>
            </thead>
            <tbody id="txnBody">
              <tr>
                <td colspan="6" style="text-align: center; padding: 20px; color: var(--text-secondary);">
                  ${state.language === 'en' ? 'Loading...' : 'Φόρτωση...'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Pagination -->
        <div id="transactionsPagination"></div>
      </div>
    </div>
  `;
}


// Load categories for filter dropdown
async function loadCategoriesForFilter() {
  try {
    console.log('📋 Loading categories for filter...');
    
    const response = await fetch(`${API_BASE}/categories`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const categories = await response.json();
    state.categories = categories;
    
    console.log('✅ Categories loaded:', categories.length);
    
    // Populate the dropdown
    populateCategoryFilter(categories);
    
    return categories;
  } catch (error) {
    console.error('❌ Error loading categories:', error);
    state.categories = [];
    return [];
  }
}

// Populate category filter dropdown
function populateCategoryFilter(categories) {
  const categorySelect = document.getElementById('filterCategory');
  if (!categorySelect) {
    console.warn('⚠️ Category filter dropdown not found');
    return;
  }
  
  // Keep "All Categories" option
  const allOption = categorySelect.querySelector('option[value="all"]');
  categorySelect.innerHTML = '';
  if (allOption) {
    categorySelect.appendChild(allOption);
  } else {
    categorySelect.innerHTML = `<option value="all">${state.language === 'en' ? 'All Categories' : 'Όλες οι Κατηγορίες'}</option>`;
  }
  
  // Group by type
  const creditCategories = categories.filter(c => c.type === 'CREDIT');
  const debitCategories = categories.filter(c => c.type === 'DEBIT');
  
  // Add Income group
  if (creditCategories.length > 0) {
    const incomeGroup = document.createElement('optgroup');
    incomeGroup.label = state.language === 'en' ? '💰 Income' : '💰 Εισόδημα';
    
    creditCategories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat.code;
      option.textContent = state.language === 'en' ? cat.name_en : cat.name_el;
      incomeGroup.appendChild(option);
    });
    
    categorySelect.appendChild(incomeGroup);
  }
  
  // Add Expense group
  if (debitCategories.length > 0) {
    const expenseGroup = document.createElement('optgroup');
    expenseGroup.label = state.language === 'en' ? '💸 Expenses' : '💸 Έξοδα';
    
    debitCategories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat.code;
      option.textContent = state.language === 'en' ? cat.name_en : cat.name_el;
      expenseGroup.appendChild(option);
    });
    
    categorySelect.appendChild(expenseGroup);
  }
  
  console.log('✅ Category filter populated with', categories.length, 'categories');
}



function renderUpload() {
  return `
    <div>
      <div class="card" style="margin-bottom: 20px;">
        <h3 style="margin-bottom: 15px; font-weight: 300;">
          ${state.language === 'en' ? 'Upload Bank Statement' : 'Ανέβασμα Τραπεζικού Καταστατικού'}
        </h3>
        
        <div class="upload-area" 
             id="uploadArea" 
             onclick="document.getElementById('fileInput').click()"
             ondragover="handleDragOver(event)"
             ondragleave="handleDragLeave(event)"
             ondrop="handleDrop(event)"
             style="cursor: pointer; padding: 40px; text-align: center; border: 2px dashed #FFB800; border-radius: 8px; background-color: rgba(255, 184, 0, 0.05);">
          <div style="font-size: 48px; margin-bottom: 15px;">📄</div>
          <div style="font-size: 16px; color: #E5E7EB; margin-bottom: 5px;">
            ${state.language === 'en' ? 'Click or drag file to upload' : 'Κάντε κλικ ή σύρετε αρχείο για ανέβασμα'}
          </div>
          <div style="font-size: 12px; color: #9CA3AF;">
            ${state.language === 'en' ? 'Supports CSV, XLSX files' : 'Υποστηρίζει αρχεία CSV, XLSX'}
          </div>
        </div>

        <input type="file" 
               id="fileInput" 
               style="display: none;" 
               accept=".csv,.xlsx,.xls"
               onchange="handleFileSelect(event)">
      </div>

      <!-- Upload Progress -->
      <div id="uploadProgress" style="display: none; margin-bottom: 20px;">
        <div class="card">
          <h4 style="margin-bottom: 10px;">${state.language === 'en' ? 'Uploading...' : 'Ανέβασμα...'}</h4>
          <div style="background-color: #1F2937; height: 8px; border-radius: 4px; overflow: hidden;">
            <div id="progressBar" style="height: 100%; background-color: #FFB800; width: 0%; transition: width 0.3s;"></div>
          </div>
          <div id="uploadStatus" style="margin-top: 8px; color: #9CA3AF; font-size: 12px;">0% Complete</div>
        </div>
      </div>

      <!-- Preview Container -->
      <div id="previewContainer" style="display: none; margin-bottom: 20px;">
        <div class="card">
          <h3 style="margin-bottom: 15px;">
            ${state.language === 'en' ? 'Preview' : 'Προεπισκόπηση'}
          </h3>
          <div id="previewData"></div>
        </div>
      </div>

<!-- Recent Uploads -->
<div class="card">
  <h3 style="margin-bottom: 15px;">
    ${state.language === 'en' ? 'Recent Uploads' : 'Πρόσφατα Αναβάσματα'}
  </h3>
  <table class="table" style="width: 100%;">
    <thead>
      <tr>
        <th>${state.language === 'en' ? 'File' : 'Αρχείο'}</th>
        <th>${state.language === 'en' ? 'Status' : 'Κατάσταση'}</th>
        <th style="text-align: right;">${state.language === 'en' ? 'Transactions' : 'Συναλλαγές'}</th>
        <th style="text-align: right;">${state.language === 'en' ? 'Summary' : 'Περίληψη'}</th>
        <th style="text-align: center;">${state.language === 'en' ? 'Action' : 'Ενέργεια'}</th>
      </tr>
    </thead>
    <tbody id="uploadsBody">
      <tr>
        <td colspan="5" style="text-align: center; padding: 20px; color: #9CA3AF;">
          ${state.language === 'en' ? 'Loading...' : 'Φόρτωση...'}
        </td>
      </tr>
    </tbody>
  </table>
</div>
  `;
}


// ========================================
// EVENT HANDLERS
// ========================================

async function changePage(page) {
  console.log('📄 Changing to page:', page);
  state.currentPage = page;

  // Special handling for ledger - load accounts BEFORE rendering
  if (page === 'ledger') {
    console.log('📖 Loading ledger page...');
    
    // Load accounts first
    await loadAccounts();
    console.log('✅ Accounts loaded:', state.accounts?.length || 0);
    
    // Set selected account
    if (state.accounts && state.accounts.length > 0) {
      state.selectedAccount = state.accounts[0].id;
      console.log('✅ Selected account:', state.selectedAccount);
    } else {
      state.selectedAccount = null;
      state.ledger = [];
    }
    
    // NOW render the page (accounts are ready)
    render();
    
    // Then load the ledger for selected account
    if (state.selectedAccount) {
      await loadAccountLedger(state.selectedAccount);
      renderLedgerTable();
    }
    
    return; // Exit early - we handled everything
  }

  // For all other pages, render first then load data
  render();

  switch (page) {
    case 'dashboard':
      await loadDashboard();
      break;

    case 'transactions':
      await new Promise(r => setTimeout(r, 100));
      await loadTransactions();
      break;

    case 'accounts':
      const accounts = await loadAccounts();
      if (accounts) renderAccountsTable();
      break;

      case 'predictions':
        console.log('🔮 Loading predictions page...');
        render();
        await new Promise(r => setTimeout(r, 100));
        
        try {
          await loadPredictions();
          renderPredictionsPage();
        } catch (error) {
          console.error('❌ Error loading predictions:', error);
        }
        break;

    case 'reports':
      await new Promise(r => setTimeout(r, 100));
      await loadReportsData();
      break;

    case 'upload':
      await new Promise(r => setTimeout(r, 100));
      await loadRecentUploads();
      break;
  }
}


function getPageTitle() {
  const titles = {
    dashboard: t('nav.dashboard'),
    transactions: t('nav.transactions'),
    accounts: t('nav.accounts'),
    reports: t('nav.reports'),
    ledger: t('nav.ledger'),
    predictions: t('nav.predictions'),
    upload: t('nav.upload')
  };
  return titles[state.currentPage] || 'Dashboard';
}

function logout() {
  state.isLoggedIn = false;
  state.currentUser = null;
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('currentUser');
  render();
}

// ========================================
// ACCOUNT FUNCTIONS
// ========================================

function showCreateAccountModal() {
  document.getElementById('createAccountModal').classList.add('show');
}

async function createAccount(event) {
  event.preventDefault();
  
  try {
    const accountData = {
      account_name: document.getElementById('accountName').value,
      account_number: document.getElementById('accountNumber').value,
      account_type: document.getElementById('accountType').value,
      currency: 'EUR',
      opening_balance: parseFloat(document.getElementById('openingBalance').value)
    };

    const response = await fetch(endpoints.accounts, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(accountData)
    });

    if (response.ok) {
      console.log('✅ Account created');
      document.getElementById('createAccountForm').reset();
      closeModal('createAccountModal');
      loadAccounts().then(() => renderAccountsTable());
    }
  } catch (error) {
    console.error('❌ Error creating account:', error);
  }
}

function renderAccountsTable() {
  const tbody = document.getElementById('accountsBody');
  const paginationContainer = document.getElementById('accountsPagination');
  
  if (!tbody) return;
  
  if (state.accounts.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px; color: #9CA3AF;">No accounts yet</td></tr>';
    if (paginationContainer) paginationContainer.innerHTML = '';
    return;
  }
  
  // Update total items
  state.pagination.accounts.totalItems = state.accounts.length;
  
  // Get paginated data
  const paginatedData = paginateData(
    state.accounts,
    state.pagination.accounts.currentPage,
    state.pagination.accounts.itemsPerPage
  );
  
  tbody.innerHTML = paginatedData.map(a => `
    <tr>
      <td>${a.account_name}</td>
      <td>${a.account_number}</td>
      <td>${a.account_type}</td>
      <td style="text-align: right; font-weight: 600;">${formatCurrency(a.current_balance)}</td>
      <td>
        <button 
          class="btn-primary" 
          onclick="viewAccountLedger('${a.id}')" 
          style="padding: 6px 12px; font-size: 12px;">
          ${state.language === 'en' ? 'View Ledger' : 'Προβολή'}
        </button>
      </td>
    </tr>
  `).join('');
  
}
function viewAccountLedger(accountId) {
  state.selectedAccount = accountId;
  changePage('ledger');
}

function renderLedgerTable() {
  setTimeout(() => {
    const tbody = document.getElementById('ledgerBody');
    const paginationContainer = document.getElementById('ledgerPagination');
    
    if (!tbody) return;
    
    console.log('📊 Rendering ledger table with', state.ledger?.length || 0, 'entries');
    
    // Check if we have a selected account
    if (!state.selectedAccount) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 40px;">
            <div style="font-size: 48px; margin-bottom: 15px;">📖</div>
            <p style="color: #9CA3AF; margin-bottom: 8px;">
              ${state.language === 'en' ? 'Select an account to view ledger entries' : 'Επιλέξτε λογαριασμό για προβολή καταχωρήσεων'}
            </p>
          </td>
        </tr>
      `;
      if (paginationContainer) paginationContainer.innerHTML = '';
      return;
    }
    
    // Check if we have ledger entries
    if (!state.ledger || state.ledger.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 40px;">
            <div style="font-size: 48px; margin-bottom: 15px;">📭</div>
            <p style="color: #9CA3AF; margin-bottom: 8px;">
              ${state.language === 'en' ? 'No ledger entries for this account' : 'Δεν υπάρχουν καταχωρήσεις για αυτόν τον λογαριασμό'}
            </p>
            <p style="color: #6B7280; font-size: 12px;">
              ${state.language === 'en' ? 'Upload transactions to populate the ledger' : 'Ανεβάστε συναλλαγές για να συμπληρώσετε το καθολικό'}
            </p>
          </td>
        </tr>
      `;
      if (paginationContainer) paginationContainer.innerHTML = '';
      return;
    }
    
    // Apply filters
    let filteredLedger = [...state.ledger];
    
    const dateFrom = document.getElementById('ledgerDateFrom')?.value;
    const dateTo = document.getElementById('ledgerDateTo')?.value;
    const reconciled = document.getElementById('ledgerReconciled')?.value;
    
    if (dateFrom) {
      filteredLedger = filteredLedger.filter(e => e.entry_date >= dateFrom);
    }
    if (dateTo) {
      filteredLedger = filteredLedger.filter(e => e.entry_date <= dateTo);
    }
    if (reconciled && reconciled !== 'all') {
      filteredLedger = filteredLedger.filter(e => e.reconciled === parseInt(reconciled));
    }
    
    // Update total items
    state.pagination.ledger.totalItems = filteredLedger.length;
    
    // Get paginated data
    const paginatedData = paginateData(
      filteredLedger,
      state.pagination.ledger.currentPage,
      state.pagination.ledger.itemsPerPage
    );
    
    // Render rows
    tbody.innerHTML = paginatedData.map((entry, idx) => {
      const isDebit = entry.entry_type === 'DEBIT';
      const isCredit = entry.entry_type === 'CREDIT';
      
      return `
        <tr style="border-left: 3px solid ${isDebit ? '#ef4444' : '#10b981'};">
          <td style="font-weight: 500; color: var(--text-primary);">${formatDate(entry.entry_date)}</td>
          <td style="max-width: 300px;">
            <div style="font-weight: 500; color: var(--text-primary); margin-bottom: 3px;">${entry.description}</div>
            ${entry.reference ? `<div style="font-size: 11px; color: #6B7280;">Ref: ${entry.reference}</div>` : ''}
          </td>
          <td style="text-align: right; font-family: 'Courier New', monospace;">
            ${isDebit ? `<span style="color: #ef4444; font-weight: 600;">${formatCurrency(Math.abs(entry.amount))}</span>` : '<span style="color: #4B5563;">—</span>'}
          </td>
          <td style="text-align: right; font-family: 'Courier New', monospace;">
            ${isCredit ? `<span style="color: #10b981; font-weight: 600;">${formatCurrency(Math.abs(entry.amount))}</span>` : '<span style="color: #4B5563;">—</span>'}
          </td>
          <td style="text-align: right; font-family: 'Courier New', monospace; background-color: rgba(255, 184, 0, 0.05); font-weight: 700; color: #FFB800;">
            ${formatCurrency(entry.running_balance || 0)}
          </td>
          <td style="text-align: center;">
            ${entry.reconciled 
              ? '<span style="color: #10b981; font-size: 16px;">✓</span>' 
              : '<span style="color: #6B7280; font-size: 16px;">○</span>'}
          </td>
        </tr>
      `;
    }).join('');
    
    // Render pagination
    if (paginationContainer) {
      paginationContainer.innerHTML = renderPagination('ledger', filteredLedger.length);
    }
  }, 100);
}



// Export ledger to CSV
function exportLedger() {
  if (!state.ledger || state.ledger.length === 0) {
    showNotification(
      state.language === 'en' ? 'No ledger entries to export' : 'Δεν υπάρχουν καταχωρήσεις για εξαγωγή',
      'warning'
    );
    return;
  }
  
  const selectedAccount = state.accounts.find(a => a.id === state.selectedAccount);
  const accountName = selectedAccount ? selectedAccount.account_name : 'Unknown';
  
  // Create CSV content
  let csv = 'Date,Description,Reference,Debit,Credit,Balance,Reconciled\n';
  
  state.ledger.forEach(entry => {
    const debit = entry.entry_type === 'DEBIT' ? Math.abs(entry.amount).toFixed(2) : '';
    const credit = entry.entry_type === 'CREDIT' ? Math.abs(entry.amount).toFixed(2) : '';
    const reconciled = entry.reconciled ? 'Yes' : 'No';
    
    csv += `${entry.entry_date},"${entry.description}","${entry.reference || ''}",${debit},${credit},${entry.running_balance.toFixed(2)},${reconciled}\n`;
  });
  
  // Download CSV
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Ledger_${accountName}_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
  
  showNotification(
    state.language === 'en' ? '✅ Ledger exported successfully' : '✅ Το καθολικό εξήχθη επιτυχώς',
    'success'
  );
}


// ========================================
// CHART FUNCTIONS
// ========================================

function renderDashboardCharts() {
  // Check Chart.js
  if (typeof Chart === 'undefined') {
    console.error('❌ Chart.js not loaded!');
    alert('Chart.js library not loaded. Check your internet connection.');
    return;
  }
  
  setTimeout(() => {
    console.log('🎨 Starting chart render...');
    
    // Get canvas
    const cashFlowCtx = document.getElementById('cashFlowChart');
    console.log('Canvas element:', cashFlowCtx);
    
    if (!cashFlowCtx) {
      console.error('❌ Canvas element not found in DOM!');
      return;
    }
    
    // Check data
    console.log('State reports object:', state.reports);
    console.log('Cash flow array:', state.reports?.cashFlow);
    console.log('Cash flow length:', state.reports?.cashFlow?.length);
    
    if (!state.reports?.cashFlow) {
      console.error('❌ No cash flow data in state!');
      alert('No financial data loaded. Please upload transactions first.');
      return;
    }
    
    if (state.reports.cashFlow.length === 0) {
      console.warn('⚠️ Cash flow data is empty array');
      cashFlowCtx.parentElement.innerHTML = '<p style="text-align: center; padding: 40px; color: #9CA3AF;">No cash flow data available. Upload transactions to see charts.</p>';
      return;
    }
    
    // Destroy existing chart
    if (window.cashFlowChartInstance) {
      console.log('🗑️ Destroying old chart...');
      window.cashFlowChartInstance.destroy();
    }
    
    // Prepare data
    const data = state.reports.cashFlow.slice(-6);
    console.log('Chart data (last 6 months):', data);
    
    const labels = data.map(d => d.period);
    const incomeData = data.map(d => d.total_income || 0);
    const expensesData = data.map(d => d.total_expenses || 0);
    
    console.log('Labels:', labels);
    console.log('Income data:', incomeData);
    console.log('Expenses data:', expensesData);
    
    // Create chart
    try {
      console.log('🎨 Creating chart...');
      window.cashFlowChartInstance = new Chart(cashFlowCtx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Income',
              data: incomeData,
              borderColor: '#10b981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              tension: 0.4,
              fill: true
            },
            {
              label: 'Expenses',
              data: expensesData,
              borderColor: '#ef4444',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              tension: 0.4,
              fill: true
            }
          ]
        },
        options: { 
          responsive: true, 
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
              labels: { 
                color: '#E5E7EB',
                padding: 10,
                font: { size: 12 }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { 
                color: '#9CA3AF',
                callback: function(value) {
                  return '€' + value.toFixed(0);
                }
              },
              grid: { color: '#1F2937' }
            },
            x: {
              ticks: { color: '#9CA3AF' },
              grid: { color: '#1F2937' }
            }
          }
        }
      });
      console.log('✅ Chart created successfully!');
    } catch (error) {
      console.error('❌ Chart creation failed:', error);
      alert('Chart creation failed: ' + error.message);
    }
    
    // Recurring List
    const recurringList = document.getElementById('recurringList');
    if (recurringList) {
      if (state.reports?.recurring?.length > 0) {
        recurringList.innerHTML = `
          <table style="width: 100%;">
            ${state.reports.recurring.slice(0, 5).map(r => `
              <tr style="border-bottom: 1px solid #1f2937;">
                <td style="padding: 10px 0;">${r.description}</td>
                <td style="text-align: right; color: #9CA3AF;">${r.occurrence_count}x</td>
                <td style="text-align: right; font-weight: 600;">€${(r.avg_amount || 0).toFixed(2)}</td>
              </tr>
            `).join('')}
          </table>
        `;
        console.log('✅ Recurring list rendered');
      } else {
        recurringList.innerHTML = '<p style="color: #9CA3AF; text-align: center; padding: 20px;">No recurring patterns detected</p>';
      }
    }
    
    // Recent Transactions
    const recentBody = document.getElementById('recentBody');
    if (recentBody) {
      if (state.transactions?.length > 0) {
        recentBody.innerHTML = state.transactions.slice(0, 10).map(t => `
          <tr>
            <td>${t.date}</td>
            <td style="max-width: 300px; overflow: hidden; text-overflow: ellipsis;">${t.description}</td>
            <td style="text-align: right; color: ${t.type === 'CREDIT' ? '#10b981' : '#ef4444'}; font-weight: 600;">
              €${Math.abs(t.amount).toFixed(2)}
            </td>
            <td>
              <span style="padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; 
                background-color: ${t.type === 'CREDIT' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
                color: ${t.type === 'CREDIT' ? '#10b981' : '#ef4444'};">
                ${t.type}
              </span>
            </td>
          </tr>
        `).join('');
        console.log('✅ Recent transactions rendered');
      } else {
        recentBody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 20px; color: #9CA3AF;">No transactions yet. Upload a file to get started.</td></tr>';
      }
    }
  }, 200);
}

function renderReportsCharts() {
  const categoryCtx = document.getElementById('categoryChart');
  if (!categoryCtx) return;

  const summary = state.reports?.summary;
  if (!summary) {
    console.warn('⚠️ No report summary available');
    return;
  }

  // Destroy previous instance
  if (window.categoryChartInstance) {
    window.categoryChartInstance.destroy();
  }

  const data = {
    labels: ['Income', 'Expenses'],
    datasets: [{
      data: [summary.credit_total || 0, summary.debit_total || 0],
      backgroundColor: ['#10b981', '#ef4444'],
    }]
  };

  window.categoryChartInstance = new Chart(categoryCtx, {
    type: 'pie',
    data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#E5E7EB', padding: 10 }
        }
      }
    }
  });

  console.log('✅ Category summary chart rendered');
}

function renderPredictions() {
  const hasEnoughData = state.transactions && state.transactions.length >= 5;
  const hasForecast = state.predictions?.forecast && state.predictions.forecast.length > 0;
  const hasRecurring = state.predictions?.recurring && state.predictions.recurring.length > 0;
  
  return `
    <div>
      <!-- Page Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
        <h2 style="margin: 0; color: #FFB800; font-weight: 300;">🔮 ${t('predictions.title')}</h2>
        ${hasEnoughData ? `
          <button 
            onclick="refreshPredictions()" 
            class="btn-secondary"
            style="padding: 8px 16px; font-size: 13px;">
            ${state.language === 'en' ? '🔄 Refresh' : '🔄 Ανανέωση'}
          </button>
        ` : ''}
      </div>

      ${!hasEnoughData ? `
        <!-- Not Enough Data State -->
        <div class="card" style="text-align: center; padding: 60px 20px; background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%); border: 2px dashed #3B82F6;">
          <div style="font-size: 64px; margin-bottom: 20px;">🔮</div>
          <h3 style="margin: 0 0 10px 0; color: #3B82F6;">
            ${state.language === 'en' ? 'Not Enough Data for Predictions' : 'Ανεπαρκή Δεδομένα για Προβλέψεις'}
          </h3>
          <p style="color: #9CA3AF; margin-bottom: 25px; max-width: 500px; margin-left: auto; margin-right: auto;">
            ${state.language === 'en' 
              ? 'We need at least 5 transactions to generate meaningful predictions. Upload more bank statements to unlock forecasting.' 
              : 'Χρειαζόμαστε τουλάχιστον 5 συναλλαγές για να δημιουργήσουμε προβλέψεις. Ανεβάστε περισσότερα αντίγραφα.'}
          </p>
          <div style="display: flex; gap: 15px; justify-content: center;">
            <button 
              onclick="changePage('upload')" 
              class="btn-primary"
              style="padding: 12px 24px; font-size: 14px;">
              ${state.language === 'en' ? '📤 Upload Transactions' : '📤 Ανέβασμα Συναλλαγών'}
            </button>
            <button 
              onclick="changePage('dashboard')" 
              class="btn-secondary"
              style="padding: 12px 24px; font-size: 14px;">
              ${state.language === 'en' ? '← Back to Dashboard' : '← Πίσω στον Πίνακα'}
            </button>
          </div>
        </div>
      ` : `
        <!-- Insights Summary Cards -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px;">
          <div class="card" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%); border-left: 4px solid #10b981;">
            <div style="font-size: 11px; color: #9CA3AF; text-transform: uppercase; margin-bottom: 8px;">
              ${state.language === 'en' ? 'Recurring Patterns' : 'Επαναλαμβανόμενα Μοτίβα'}
            </div>
            <div style="font-size: 28px; font-weight: 700; color: #10b981; margin-bottom: 5px;">
              ${hasRecurring ? state.predictions.recurring.length : 0}
            </div>
            <div style="font-size: 12px; color: #6B7280;">
              ${state.language === 'en' ? 'Detected patterns' : 'Ανιχνευμένα μοτίβα'}
            </div>
          </div>
          
          <div class="card" style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%); border-left: 4px solid #3B82F6;">
            <div style="font-size: 11px; color: #9CA3AF; text-transform: uppercase; margin-bottom: 8px;">
              ${state.language === 'en' ? 'Forecast Horizon' : 'Ορίζοντας Πρόβλεψης'}
            </div>
            <div style="font-size: 28px; font-weight: 700; color: #3B82F6; margin-bottom: 5px;">
              ${hasForecast ? state.predictions.forecast.length : 0}
            </div>
            <div style="font-size: 12px; color: #6B7280;">
              ${state.language === 'en' ? 'Months forecasted' : 'Μήνες πρόβλεψης'}
            </div>
          </div>
          
          <div class="card" style="background: linear-gradient(135deg, rgba(255, 184, 0, 0.1) 0%, rgba(255, 184, 0, 0.05) 100%); border-left: 4px solid #FFB800;">
            <div style="font-size: 11px; color: #9CA3AF; text-transform: uppercase; margin-bottom: 8px;">
              ${state.language === 'en' ? 'Data Points' : 'Σημεία Δεδομένων'}
            </div>
            <div style="font-size: 28px; font-weight: 700; color: #FFB800; margin-bottom: 5px;">
              ${state.transactions?.length || 0}
            </div>
            <div style="font-size: 12px; color: #6B7280;">
              ${state.language === 'en' ? 'Total transactions' : 'Συνολικές συναλλαγές'}
            </div>
          </div>
        </div>

        <!-- Charts Row -->
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 25px;">
          
          <!-- Cash Flow Forecast Chart -->
          <div class="card">
            <h3 style="margin-bottom: 15px; font-weight: 300; font-size: 16px;">
              ${t('predictions.cashFlowForecast')}
            </h3>
            <div style="position: relative; height: 320px; width: 100%;">
              <canvas id="forecastChart"></canvas>
            </div>
          </div>

          <!-- Recurring Patterns Pie Chart -->
          <div class="card">
            <h3 style="margin-bottom: 15px; font-weight: 300; font-size: 16px;">
              ${state.language === 'en' ? '🔄 Recurring Transaction Types' : '🔄 Τύποι Επαναλαμβανόμενων Συναλλαγών'}
            </h3>
            <div style="position: relative; height: 320px; width: 100%;">
              <canvas id="recurringTypesChart"></canvas>
            </div>
          </div>
        </div>

        <!-- Forecast Table -->
        ${hasForecast ? `
          <div class="card" style="margin-bottom: 25px;">
            <h3 style="margin-bottom: 15px; font-weight: 300; font-size: 16px;">
              ${t('predictions.nextTransactions')}
            </h3>
            <div style="overflow-x: auto;">
              <table class="table" style="width: 100%;">
                <thead>
                  <tr style="background-color: var(--bg-hover);">
                    <th>${state.language === 'en' ? 'Period' : 'Περίοδος'}</th>
                    <th style="text-align: right;">${state.language === 'en' ? 'Expected Income' : 'Αναμενόμενο Εισόδημα'}</th>
                    <th style="text-align: right;">${state.language === 'en' ? 'Expected Expenses' : 'Αναμενόμενα Έξοδα'}</th>
                    <th style="text-align: right;">${state.language === 'en' ? 'Net Flow' : 'Καθαρή Ροή'}</th>
                    <th style="text-align: center;">${state.language === 'en' ? 'Confidence' : 'Εμπιστοσύνη'}</th>
                    <th style="text-align: center;">${state.language === 'en' ? 'Trend' : 'Τάση'}</th>
                  </tr>
                </thead>
                <tbody id="predictionsBody">
                  <tr><td colspan="6" style="text-align: center; padding: 20px;">${t('common.loading')}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        ` : ''}

        <!-- Recurring Transactions Table -->
        ${hasRecurring ? `
          <div class="card">
            <h3 style="margin-bottom: 15px; font-weight: 300; font-size: 16px;">
              ${t('predictions.recurringPatterns')}
            </h3>
            <div style="overflow-x: auto;">
              <table class="table" style="width: 100%;">
                <thead>
                  <tr style="background-color: var(--bg-hover);">
                    <th>${state.language === 'en' ? 'Description' : 'Περιγραφή'}</th>
                    <th style="text-align: center;">${state.language === 'en' ? 'Frequency' : 'Συχνότητα'}</th>
                    <th style="text-align: right;">${state.language === 'en' ? 'Avg Amount' : 'Μέσο Ποσό'}</th>
                    <th style="text-align: center;">${state.language === 'en' ? 'Type' : 'Τύπος'}</th>
                    <th style="text-align: right;">${state.language === 'en' ? 'Last Seen' : 'Τελευταία Εμφάνιση'}</th>
                    <th style="text-align: center;">${state.language === 'en' ? 'Next Expected' : 'Επόμενη Αναμενόμενη'}</th>
                  </tr>
                </thead>
                <tbody id="recurringBody">
                  <tr><td colspan="6" style="text-align: center; padding: 20px;">${t('common.loading')}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        ` : `
          <div class="card" style="text-align: center; padding: 40px; background-color: rgba(100, 100, 100, 0.05);">
            <div style="font-size: 48px; margin-bottom: 15px;">🔍</div>
            <p style="color: #9CA3AF;">
              ${state.language === 'en' 
                ? 'No recurring patterns detected yet. Upload more transactions to identify patterns.' 
                : 'Δεν ανιχνεύτηκαν επαναλαμβανόμενα μοτίβα. Ανεβάστε περισσότερες συναλλαγές.'}
            </p>
          </div>
        `}
      `}
    </div>
  `;
}



function renderPredictionsPage() {
  setTimeout(() => {
    console.log('🎨 Rendering predictions page...');
    console.log('Predictions data:', state.predictions);
    
    // Render forecast table
    const forecastBody = document.getElementById('predictionsBody');
    if (forecastBody && state.predictions?.forecast?.length > 0) {
      forecastBody.innerHTML = state.predictions.forecast.map((f, idx) => {
        const netFlow = (f.predicted_income || 0) - Math.abs(f.predicted_expenses || 0);
        const trend = idx > 0 ? 
          (netFlow > state.predictions.forecast[idx - 1].net_flow ? '📈' : 
           netFlow < state.predictions.forecast[idx - 1].net_flow ? '📉' : '➡️') : '➡️';
        
        return `
          <tr>
            <td style="font-weight: 600;">${f.month || f.period}</td>
            <td style="text-align: right; color: #10b981; font-weight: 600;">
              ${formatCurrency(f.predicted_income || 0)}
            </td>
            <td style="text-align: right; color: #ef4444; font-weight: 600;">
              ${formatCurrency(Math.abs(f.predicted_expenses || 0))}
            </td>
            <td style="text-align: right; font-weight: 700; color: ${netFlow >= 0 ? '#10b981' : '#ef4444'};">
              ${formatCurrency(netFlow)}
            </td>
            <td style="text-align: center;">
              <span style="padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 600; 
                background-color: ${(f.confidence || 0) >= 0.8 ? 'rgba(16, 185, 129, 0.2)' : (f.confidence || 0) >= 0.6 ? 'rgba(255, 184, 0, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
                color: ${(f.confidence || 0) >= 0.8 ? '#10b981' : (f.confidence || 0) >= 0.6 ? '#FFB800' : '#ef4444'};">
                ${((f.confidence || 0) * 100).toFixed(0)}%
              </span>
            </td>
            <td style="text-align: center; font-size: 20px;">
              ${trend}
            </td>
          </tr>
        `;
      }).join('');
    }
    
    // Render recurring table
    const recurringBody = document.getElementById('recurringBody');
    if (recurringBody && state.predictions?.recurring?.length > 0) {
      recurringBody.innerHTML = state.predictions.recurring.map(r => {
        const frequency = r.occurrence_count || 0;
        const avgDays = r.avg_days_between || 0;
        const lastDate = r.last_occurrence ? new Date(r.last_occurrence) : null;
        const nextDate = lastDate && avgDays > 0 ? new Date(lastDate.getTime() + (avgDays * 24 * 60 * 60 * 1000)) : null;
        
        return `
          <tr>
            <td>
              <div style="font-weight: 600; margin-bottom: 3px;">${r.description}</div>
              ${r.counterparty ? `<div style="font-size: 11px; color: #6B7280;">${r.counterparty}</div>` : ''}
            </td>
            <td style="text-align: center;">
              <span style="padding: 4px 10px; border-radius: 4px; background-color: rgba(59, 130, 246, 0.2); color: #3B82F6; font-weight: 600; font-size: 12px;">
                ${frequency}x
              </span>
            </td>
            <td style="text-align: right; font-weight: 600; color: ${r.type === 'CREDIT' ? '#10b981' : '#ef4444'};">
              ${formatCurrency(Math.abs(r.avg_amount || 0))}
            </td>
            <td style="text-align: center;">
              <span style="padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 600;
                background-color: ${r.type === 'CREDIT' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
                color: ${r.type === 'CREDIT' ? '#10b981' : '#ef4444'};">
                ${r.type}
              </span>
            </td>
            <td style="text-align: right; font-size: 13px; color: #9CA3AF;">
              ${lastDate ? formatDate(r.last_occurrence) : '-'}
            </td>
            <td style="text-align: center; font-weight: 600; color: #FFB800;">
              ${nextDate ? formatDate(nextDate.toISOString().split('T')[0]) : '-'}
            </td>
          </tr>
        `;
      }).join('');
    }
    
    // Draw charts
    drawPredictionCharts();
    
    console.log('✅ Predictions page rendered');
  }, 200);
}


function drawPredictionCharts() {
  if (typeof Chart === 'undefined') {
    console.error('❌ Chart.js not loaded!');
    return;
  }
  
  setTimeout(() => {
    console.log('🎨 Drawing prediction charts...');
    
    // Forecast Chart
    const forecastCtx = document.getElementById('forecastChart');
    if (forecastCtx && state.predictions?.forecast?.length > 0) {
      if (window.forecastChartInstance) {
        window.forecastChartInstance.destroy();
      }

      try {
        window.forecastChartInstance = new Chart(forecastCtx, {
          type: 'bar',
          data: {
            labels: state.predictions.forecast.map(d => d.month || d.period),
            datasets: [
              { 
                label: state.language === 'en' ? 'Expected Income' : 'Αναμενόμενο Εισόδημα', 
                data: state.predictions.forecast.map(d => d.predicted_income || 0), 
                backgroundColor: 'rgba(16, 185, 129, 0.7)',
                borderColor: '#10b981',
                borderWidth: 2
              },
              { 
                label: state.language === 'en' ? 'Expected Expenses' : 'Αναμενόμενα Έξοδα', 
                data: state.predictions.forecast.map(d => Math.abs(d.predicted_expenses || 0)), 
                backgroundColor: 'rgba(239, 68, 68, 0.7)',
                borderColor: '#ef4444',
                borderWidth: 2
              }
            ]
          },
          options: { 
            responsive: true, 
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: { color: '#E5E7EB', padding: 10 }
              },
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                callbacks: {
                  footer: function(tooltipItems) {
                    const income = tooltipItems[0]?.parsed.y || 0;
                    const expense = tooltipItems[1]?.parsed.y || 0;
                    const net = income - expense;
                    return '\n' + (state.language === 'en' ? 'Net: ' : 'Καθαρό: ') + '€' + net.toFixed(2);
                  }
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: { 
                  color: '#9CA3AF',
                  callback: value => '€' + value.toLocaleString()
                },
                grid: { color: '#1F2937' }
              },
              x: {
                ticks: { color: '#9CA3AF' },
                grid: { color: '#1F2937' }
              }
            }
          }
        });
        console.log('✅ Forecast chart created');
      } catch (error) {
        console.error('❌ Forecast chart error:', error);
      }
    }
    
    // Recurring Types Pie Chart
    const recurringTypesCtx = document.getElementById('recurringTypesChart');
    if (recurringTypesCtx && state.predictions?.recurring?.length > 0) {
      if (window.recurringTypesChartInstance) {
        window.recurringTypesChartInstance.destroy();
      }
      
      try {
        const creditCount = state.predictions.recurring.filter(r => r.type === 'CREDIT').length;
        const debitCount = state.predictions.recurring.filter(r => r.type === 'DEBIT').length;
        
        window.recurringTypesChartInstance = new Chart(recurringTypesCtx, {
          type: 'doughnut',
          data: {
            labels: [
              state.language === 'en' ? 'Recurring Income' : 'Επαναλαμβανόμενο Εισόδημα',
              state.language === 'en' ? 'Recurring Expenses' : 'Επαναλαμβανόμενα Έξοδα'
            ],
            datasets: [{
              data: [creditCount, debitCount],
              backgroundColor: ['#10b981', '#ef4444'],
              borderColor: '#0F1419',
              borderWidth: 3
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: { color: '#E5E7EB', padding: 15 }
              },
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12
              }
            }
          }
        });
        console.log('✅ Recurring types chart created');
      } catch (error) {
        console.error('❌ Recurring types chart error:', error);
      }
    }
  }, 300);
}


async function refreshPredictions() {
  console.log('🔄 Refreshing predictions...');
  showNotification(
    state.language === 'en' ? 'Refreshing predictions...' : 'Ανανέωση προβλέψεων...',
    'info'
  );
  
  await loadPredictions();
  renderPredictionsPage();
  
  showNotification(
    state.language === 'en' ? '✅ Predictions updated' : '✅ Οι προβλέψεις ενημερώθηκαν',
    'success'
  );
}


function renderPredictionsTable() {
  setTimeout(() => {
    console.log('🔮 Rendering predictions...');
    console.log('Predictions data:', state.predictions);
    
    const tbody = document.getElementById('predictionsBody');
    if (tbody) {
      if (state.predictions?.forecast && state.predictions.forecast.length > 0) {
        tbody.innerHTML = state.predictions.forecast.map(f => `
          <tr>
            <td>${f.month || f.period}</td>
            <td style="text-align: right; color: #10b981;">${formatCurrency(f.predicted_income || 0)}</td>
            <td style="text-align: right; color: #ef4444;">${formatCurrency(f.predicted_expenses || 0)}</td>
            <td style="text-align: right; color: ${(f.net_flow || 0) >= 0 ? '#10b981' : '#ef4444'}; font-weight: 600;">${formatCurrency(f.net_flow || 0)}</td>
            <td style="text-align: center;">
              <span style="padding: 4px 8px; border-radius: 4px; font-size: 11px; background-color: rgba(16, 185, 129, 0.1); color: #10b981;">
                ${((f.confidence || 0) * 100).toFixed(0)}%
              </span>
            </td>
          </tr>
        `).join('');
      } else {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px; color: #9CA3AF;">No forecast data available. Upload more transactions to enable predictions.</td></tr>';
      }
    }
    
    // Forecast Chart
    const forecastCtx = document.getElementById('forecastChart');
    if (forecastCtx && state.predictions?.forecast?.length > 0) {
      if (window.forecastChartInstance) {
        window.forecastChartInstance.destroy();
      }

      try {
        window.forecastChartInstance = new Chart(forecastCtx, {
          type: 'bar',
          data: {
            labels: state.predictions.forecast.map(d => d.month || d.period),
            datasets: [
              { 
                label: 'Predicted Income', 
                data: state.predictions.forecast.map(d => d.predicted_income || 0), 
                backgroundColor: '#10b981' 
              },
              { 
                label: 'Predicted Expenses', 
                data: state.predictions.forecast.map(d => d.predicted_expenses || 0), 
                backgroundColor: '#ef4444' 
              }
            ]
          },
          options: { 
            responsive: true, 
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: { color: '#E5E7EB' }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: { color: '#9CA3AF' },
                grid: { color: '#1F2937' }
              },
              x: {
                ticks: { color: '#9CA3AF' },
                grid: { color: '#1F2937' }
              }
            }
          }
        });
        console.log('✅ Forecast chart created');
      } catch (error) {
        console.error('❌ Forecast chart error:', error);
      }
    }
  }, 200);
}

// ========================================
// ATTACH EVENT HANDLERS
// ========================================

function attachLoginEvents() {
  const form = document.getElementById('loginForm');
  const langSelect = document.getElementById('langSelect');
  
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const errorDiv = document.getElementById('errorMessage');
      
      // Simple validation
      if (!username || !password) {
        errorDiv.textContent = state.language === 'en' 
          ? 'Please enter username and password' 
          : 'Παρακαλώ εισαγάγετε όνομα χρήστη και κωδικό πρόσβασης';
        return;
      }
      
      // Demo login (any username/password works, but we show demo)
      if (username === 'demo' && password === 'demo') {
        console.log('✅ Login successful');
        state.isLoggedIn = true;
        state.currentUser = { 
          username, 
          role: 'user',
          loginTime: new Date().toLocaleString()
        };
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
        errorDiv.textContent = '';
        
        // Redirect to dashboard
        setTimeout(() => {
          render();
          loadDashboard();
        }, 500);
      } else {
        errorDiv.textContent = state.language === 'en' 
          ? 'Invalid credentials. Use demo/demo' 
          : 'Μη έγκυρα διαπιστευτήρια. Χρησιμοποιήστε demo/demo';
        console.error('❌ Login failed');
      }
    };
  }
}



function attachMainEvents() {
  if (state.currentPage === 'dashboard') {
    renderDashboardCharts();
  }
}

// ========================================
// HELPER FUNCTIONS
// ========================================

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('show');
}

function handleDragOver(e) {
  e.preventDefault();
  document.getElementById('uploadArea').classList.add('dragover');
}

function handleDrop(e) {
  e.preventDefault();
  document.getElementById('uploadArea').classList.remove('dragover');
  const files = e.dataTransfer.files;
  if (files.length > 0) uploadFile(files);
}

function handleFileSelect(e) {
  const files = e.target.files;
  if (files.length > 0) uploadFile(files);
}

// ========================================
// FILE UPLOAD - WORKING VERSION
// ========================================

async function uploadFile(file) {
  if (!file) {
    console.error('No file provided');
    return;
  }

  try {
    console.log('📤 Upload starting');
    console.log('📋 File:', file.name);
    
    // Create upload entry in state
    const uploadId = 'upload_' + Date.now();
    state.uploads.push({
      id: uploadId,
      fileName: file.name,
      fileType: file.type,
      status: 'uploading',
      transactionCount: 0,
      transactions: [],
      error: null
    });

    // Show progress
    const progressContainer = document.getElementById('uploadProgress');
    if (progressContainer) {
      progressContainer.style.display = 'block';
    }

    const formData = new FormData();
    formData.append('file', file);

    console.log('📨 Sending to backend...');

    const response = await fetch('/api/files/upload', {
      method: 'POST',
      body: formData
    });

    console.log('📊 Response status:', response.status);

    const data = await response.json();
    console.log('📊 Response data:', data);

    // Find upload entry
    const idx = state.uploads.findIndex(u => u.id === uploadId);
    
    if (idx === -1) {
      console.error('❌ Upload not found');
      alert('Error: Upload not found');
      if (progressContainer) progressContainer.style.display = 'none';
      return;
    }

    if (!response.ok) {
      console.error('❌ Backend error:', data.error);
      state.uploads[idx].status = 'failed';
      state.uploads[idx].error = data.error || 'Unknown error';
      render();
      if (progressContainer) progressContainer.style.display = 'none';
      alert('❌ Failed: ' + data.error);
      return;
    }

    if (data.success && data.transactions) {
      console.log('✅ Upload successful');
      
      state.uploads[idx].status = 'completed';
      state.uploads[idx].transactionCount = data.transactionCount || data.transactions.length;
      state.uploads[idx].transactions = data.transactions;
      state.uploads[idx].analysis = data.analysis;
      state.uploads[idx].summary = data.summary;
      
      // Map transactions correctly
      const mappedTransactions = data.transactions.map(txn => ({
        id: txn.id,
        date: txn.date,
        description: txn.description,
        amount: txn.amount,
        type: txn.type,
        category: txn.categoryCode,
        categoryCode: txn.categoryCode,
        confidence: txn.confidence,
        counterparty: txn.counterparty || '',
        reasoning: txn.reasoning || ''
      }));
      
      state.transactions.push(...mappedTransactions);
      
      // Show preview
      displayFilePreview(state.uploads[idx]);
      
      // Hide progress
      if (progressContainer) progressContainer.style.display = 'none';
      
      render();
      
      const msg = state.language === 'en'
        ? `✅ Success: ${data.transactionCount || data.transactions.length} transactions imported`
        : `✅ Επιτυχία: ${data.transactionCount || data.transactions.length} συναλλαγές εισήχθησαν`;
      
      alert(msg);
      
      // Load dashboard to refresh
      setTimeout(() => loadDashboard(), 1000);
      
    } else {
      console.error('❌ Invalid response:', data);
      state.uploads[idx].status = 'failed';
      state.uploads[idx].error = 'Invalid response';
      render();
      if (progressContainer) progressContainer.style.display = 'none';
      alert('Invalid response from server');
    }

  } catch (error) {
    console.error('❌ Upload error:', error);
    
    if (progressContainer) progressContainer.style.display = 'none';
    
    const idx = state.uploads.findIndex(u => u.fileName === file.name);
    if (idx !== -1) {
      state.uploads[idx].status = 'failed';
      state.uploads[idx].error = error.message;
      render();
    }
    
    alert('Error: ' + error.message);
  }

  // Reset file input
  const fileInput = document.getElementById('fileInput');
  if (fileInput) fileInput.value = '';
}

function displayFilePreview(upload) {
  console.log('🔍 Displaying preview for:', upload.fileName);
  
  const previewContainer = document.getElementById('previewContainer');
  if (!previewContainer) return;

  if (!upload.transactions || upload.transactions.length === 0) {
    console.warn('⚠️ No transactions to preview');
    return;
  }

  const previewData = document.getElementById('previewData');
  if (!previewData) return;

  // Show first 10 transactions
  const previewTxns = upload.transactions.slice(0, 10);
  
  let html = `
    <div style="color: #10b981; margin-bottom: 15px; font-weight: 600;">
      ✅ Preview (showing ${previewTxns.length} of ${upload.transactions.length})
    </div>
  `;
  
  previewTxns.forEach((txn, idx) => {
    const categoryName = getCategoryName(txn.categoryCode);
    html += `
      <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #1F2937;">
        <div style="font-weight: 600; margin-bottom: 4px;">#${idx + 1} - ${txn.date}</div>
        <div style="color: #FFB800; margin-bottom: 4px;">📝 ${txn.description}</div>
        <div style="font-size: 12px;">
          <span style="color: ${txn.type === 'CREDIT' ? '#10b981' : '#ef4444'}; font-weight: 600;">
            ${txn.type}: €${(txn.amount || 0).toFixed(2)}
          </span>
          | <span style="color: #9CA3AF;">Category: ${categoryName}</span>
          | <span style="color: #9CA3AF;">Confidence: ${((txn.confidence || 0) * 100).toFixed(0)}%</span>
        </div>
      </div>
    `;
  });

  previewData.innerHTML = html;
  previewContainer.style.display = 'block';
}



function getCategoryName(categoryCode) {
  const categories = {
    'INVOICE_PAYMENT_FULL': state.language === 'en' ? 'Invoice Payment (Full)' : 'Πληρωμή Τιμολογίου (Πλήρης)',
    'INVOICE_PAYMENT_PARTIAL': state.language === 'en' ? 'Invoice Payment (Partial)' : 'Πληρωμή Τιμολογίου (Μερική)',
    'SUPPLIER_PAYMENT': state.language === 'en' ? 'Supplier Payment' : 'Πληρωμή Προμηθευτή',
    'BANK_FEES': state.language === 'en' ? 'Bank Fees' : 'Τραπεζικά Τέλη',
    'TAX_PAYMENT': state.language === 'en' ? 'Tax Payment' : 'Καταβολή Φόρου',
    'PAYROLL': state.language === 'en' ? 'Payroll' : 'Μισθοδοσία',
    'RENT': state.language === 'en' ? 'Rent' : 'Ενοίκιο',
    'UTILITIES': state.language === 'en' ? 'Utilities' : 'Κοινόχρηστα',
    'LOAN_REPAYMENT': state.language === 'en' ? 'Loan Repayment' : 'Αποπληρωμή Δανείου',
    'ATM_WITHDRAWAL': state.language === 'en' ? 'ATM Withdrawal' : 'Ανάληψη ΑΤΜ',
    'CAPITAL_RAISE': state.language === 'en' ? 'Capital Raise' : 'Αύξηση Κεφαλαίου',
    'INTEREST_INCOME': state.language === 'en' ? 'Interest Income' : 'Έσοδα Τόκων',
    'LOAN_RECEIVED': state.language === 'en' ? 'Loan Received' : 'Λήψη Δανείου',
  };
  
  return categories[categoryCode] || categoryCode;
}

// File handlers
function handleDragOver(e) {
  e.preventDefault();
  e.stopPropagation();
}

function handleDragLeave(e) {
  e.preventDefault();
}

function handleDrop(e) {
  e.preventDefault();
  e.stopPropagation();
  
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    handleFileSelect({ target: { files } });
  }
}


// ========================================
// INITIALIZATION
// ========================================

// ========================================
// TUTORIAL SYSTEM - FIXED CLEANUP
// ========================================

const tutorialSteps = {
  en: [
    { target: '.sidebar', title: '📊 Navigation', text: 'Use this menu to navigate between different sections', position: 'right' },
    { target: '.dashboard-grid', title: '💰 Financial Overview', text: 'See your total balance, income, and expenses at a glance', position: 'bottom' },
    { target: '#uploadButton', title: '📤 Upload Files', text: 'Click here to upload your bank statements - this is the most important step!', position: 'bottom', highlight: true },
    { target: '.nav-link', title: '📈 Reports & Analytics', text: 'View detailed reports and charts after uploading your data', position: 'right' }
  ],
  el: [
    { target: '.sidebar', title: '📊 Πλοήγηση', text: 'Χρησιμοποιήστε αυτό το μενού για πλοήγηση', position: 'right' },
    { target: '.dashboard-grid', title: '💰 Οικονομική Επισκόπηση', text: 'Δείτε το συνολικό υπόλοιπο, εισόδημα και έξοδα', position: 'bottom' },
    { target: '#uploadButton', title: '📤 Ανέβασμα Αρχείων', text: 'Κάντε κλικ εδώ για να ανεβάσετε τα τραπεζικά σας αντίγραφα - αυτό είναι το πιο σημαντικό βήμα!', position: 'bottom', highlight: true },
    { target: '.nav-link', title: '📈 Αναφορές', text: 'Δείτε λεπτομερείς αναφορές μετά το ανέβασμα δεδομένων', position: 'right' }
  ]
};

let currentTutorialStep = 0;

function startTutorial() {
  // Check if permanently disabled
  if (localStorage.getItem('tutorialDisabled') === 'true') {
    return;
  }
  
  // Check if skipped this session
  if (sessionStorage.getItem('tutorialSkipped') === 'true') {
    return;
  }
  
  currentTutorialStep = 0;
  showTutorialStep(0);
}

function skipTutorial() {
  // Skip for this session only
  sessionStorage.setItem('tutorialSkipped', 'true');
  closeTutorial();
  console.log('✅ Tutorial skipped for this session');
}

function disableTutorial() {
  // Disable permanently
  localStorage.setItem('tutorialDisabled', 'true');
  closeTutorial();
  console.log('✅ Tutorial disabled permanently');
  showNotification(
    state.language === 'en' 
      ? 'Tutorial disabled. You can re-enable it from Settings.' 
      : 'Το tutorial απενεργοποιήθηκε. Μπορείτε να το ενεργοποιήσετε από τις Ρυθμίσεις.',
    'info'
  );
}

function closeTutorial() {
  console.log('🧹 Cleaning up tutorial...');
  
  // Remove overlay
  const overlay = document.getElementById('tutorialOverlay');
  if (overlay) {
    overlay.remove();
    console.log('✅ Removed overlay');
  }
  
  // Remove ALL spotlight borders (multiple selectors to be thorough)
  const spotlights = document.querySelectorAll('.tutorial-spotlight');
  spotlights.forEach(s => {
    s.remove();
    console.log('✅ Removed spotlight');
  });
  
  // Remove by style attribute (backup cleanup)
  const styledSpotlights = document.querySelectorAll('[style*="border: 2px solid #FFB800"]');
  styledSpotlights.forEach(s => {
    s.remove();
    console.log('✅ Removed styled spotlight');
  });
  
  // Remove by inline style (another backup)
  const allDivs = document.querySelectorAll('div');
  allDivs.forEach(div => {
    const style = div.getAttribute('style');
    if (style && style.includes('border: 2px solid #FFB800') && style.includes('position: fixed')) {
      div.remove();
      console.log('✅ Removed inline spotlight');
    }
  });
  
  console.log('✅ Tutorial cleanup complete');
}

function showTutorialStep(stepIndex) {
  const steps = tutorialSteps[state.language] || tutorialSteps.en;
  
  if (stepIndex >= steps.length) {
    completeTutorial();
    return;
  }
  
  const step = steps[stepIndex];
  currentTutorialStep = stepIndex;
  
  // Clean up previous tutorial elements FIRST
  closeTutorial();
  
  // Wait a moment for cleanup
  setTimeout(() => {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'tutorialOverlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    
    // Find target element
    const targetEl = document.querySelector(step.target);
    
    if (targetEl) {
      // FIXED: Smaller, tighter spotlight
      const rect = targetEl.getBoundingClientRect();
      const spotlightSize = Math.max(rect.width, rect.height) + 40;
      
      overlay.style.background = `
        radial-gradient(
          circle at ${rect.left + rect.width / 2}px ${rect.top + rect.height / 2}px,
          transparent ${spotlightSize / 2}px,
          rgba(0, 0, 0, 0.85) ${spotlightSize / 2 + 10}px
        )
      `;
      
      // Add spotlight border with unique class
      const spotlight = document.createElement('div');
      spotlight.className = 'tutorial-spotlight'; // Add class for easy cleanup
      spotlight.style.cssText = `
        position: fixed;
        top: ${rect.top - 8}px;
        left: ${rect.left - 8}px;
        width: ${rect.width + 16}px;
        height: ${rect.height + 16}px;
        border: 2px solid #FFB800;
        border-radius: 8px;
        pointer-events: none;
        z-index: 10000;
        box-shadow: 0 0 20px rgba(255, 184, 0, 0.5);
      `;
      document.body.appendChild(spotlight);
    }
    
    // Create tutorial card
    const card = document.createElement('div');
    card.style.cssText = `
      background: linear-gradient(135deg, #1F2937 0%, #111827 100%);
      border: 2px solid #FFB800;
      border-radius: 12px;
      padding: 25px;
      max-width: 380px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      position: relative;
      margin: 20px;
      z-index: 10001;
    `;
    
    card.innerHTML = `
      <div style="margin-bottom: 15px;">
        <h3 style="margin: 0 0 8px 0; color: #FFB800; font-size: 18px; font-weight: 600;">
          ${step.title}
        </h3>
        <p style="margin: 0; color: #E5E7EB; font-size: 14px; line-height: 1.5;">
          ${step.text}
        </p>
      </div>
      
      <div style="display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 15px;">
        <div style="color: #9CA3AF; font-size: 12px;">
          ${stepIndex + 1} / ${steps.length}
        </div>
        <div style="flex: 1; height: 3px; background: #1F2937; border-radius: 2px; overflow: hidden;">
          <div style="width: ${((stepIndex + 1) / steps.length) * 100}%; height: 100%; background: #FFB800; transition: width 0.3s;"></div>
        </div>
      </div>
      
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        ${stepIndex === 0 ? `
          <button 
            onclick="disableTutorial()" 
            style="padding: 8px 12px; background: transparent; border: 1px solid #ef4444; color: #ef4444; border-radius: 6px; cursor: pointer; font-size: 12px; flex: 1; min-width: 120px;">
            ${state.language === 'en' ? "Don't Show Again" : 'Μη Εμφανίζεται'}
          </button>
          <button 
            onclick="skipTutorial()" 
            style="padding: 8px 12px; background: transparent; border: 1px solid #6B7280; color: #9CA3AF; border-radius: 6px; cursor: pointer; font-size: 12px; flex: 1; min-width: 80px;">
            ${state.language === 'en' ? 'Skip' : 'Παράλειψη'}
          </button>
        ` : `
          <button 
            onclick="skipTutorial()" 
            style="padding: 8px 12px; background: transparent; border: 1px solid #6B7280; color: #9CA3AF; border-radius: 6px; cursor: pointer; font-size: 12px;">
            ${state.language === 'en' ? 'Skip' : 'Παράλειψη'}
          </button>
        `}
        
        ${stepIndex > 0 ? `
          <button 
            onclick="showTutorialStep(${stepIndex - 1})" 
            style="padding: 8px 12px; background: #374151; border: none; color: #E5E7EB; border-radius: 6px; cursor: pointer; font-size: 12px;">
            ${state.language === 'en' ? '← Back' : '← Πίσω'}
          </button>
        ` : ''}
        
        <button 
          onclick="showTutorialStep(${stepIndex + 1})" 
          style="padding: 8px 12px; background: #FFB800; border: none; color: #000; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 12px; flex: 1; min-width: 80px;">
          ${stepIndex === steps.length - 1 
            ? (state.language === 'en' ? '✓ Finish' : '✓ Τέλος')
            : (state.language === 'en' ? 'Next →' : 'Επόμενο →')}
        </button>
      </div>
    `;
    
    overlay.appendChild(card);
    document.body.appendChild(overlay);
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        skipTutorial();
      }
    });
  }, 100); // Small delay after cleanup
}

function completeTutorial() {
  closeTutorial();
  sessionStorage.setItem('tutorialSkipped', 'true');
  showNotification(
    state.language === 'en' 
      ? '✅ Tutorial completed! Start by uploading your bank statements.' 
      : '✅ Το tutorial ολοκληρώθηκε! Ξεκινήστε ανεβάζοντας τα τραπεζικά σας αντίγραφα.',
    'success'
  );
}

function resetTutorial() {
  localStorage.removeItem('tutorialDisabled');
  sessionStorage.removeItem('tutorialSkipped');
  closeTutorial(); // Clean up any leftover elements
  console.log('✅ Tutorial reset');
  showNotification(
    state.language === 'en' 
      ? 'Tutorial re-enabled. Refresh the page to see it again.' 
      : 'Το tutorial ενεργοποιήθηκε. Ανανεώστε τη σελίδα για να το δείτε ξανά.',
    'success'
  );
}



function init() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (isLoggedIn) {
    state.isLoggedIn = true;
    state.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    loadDashboard().then(() => {
      // Start tutorial after dashboard loads (if not disabled)
      setTimeout(() => {
        startTutorial();
      }, 1000);
    });
  }
  render();
}


// ========================================
// REFRESH ALL DATA FUNCTION
// ========================================
async function refreshAllData() {
  console.log('🔄 Refreshing all data...');
  
  try {
    // Create an array of refresh promises
    const refreshPromises = [];
    
    // Always refresh these core data
    refreshPromises.push(
      loadTransactions().catch(err => {
        console.error('Error loading transactions:', err);
      })
    );
    
    refreshPromises.push(
      loadAccounts().catch(err => {
        console.error('Error loading accounts:', err);
      })
    );
    
    // If we're on a specific page, refresh that page's data
    switch(state.currentPage) {
      case 'dashboard':
        refreshPromises.push(
          loadDashboard().catch(err => {
            console.error('Error loading dashboard:', err);
          })
        );
        break;
        
      case 'reports':
        refreshPromises.push(
          loadReportsData().catch(err => {
            console.error('Error loading reports:', err);
          })
        );
        break;
        
      case 'ledger':
        if (state.selectedAccount) {
          refreshPromises.push(
            loadAccountLedger(state.selectedAccount).catch(err => {
              console.error('Error loading ledger:', err);
            })
          );
        }
        break;
        
      case 'predictions':
        refreshPromises.push(
          loadPredictions().catch(err => {
            console.error('Error loading predictions:', err);
          })
        );
        break;
        
      case 'upload':
        refreshPromises.push(
          loadRecentUploads().catch(err => {
            console.error('Error loading uploads:', err);
          })
        );
        break;
    }
    
    // Wait for all refreshes to complete
    await Promise.all(refreshPromises);
    
    console.log('✅ All data refreshed successfully');
    
    // Re-render the current page content
    const pageContentDiv = document.querySelector('.page-content');
    if (pageContentDiv) {
      pageContentDiv.innerHTML = renderPageContent();
      
      // Re-attach events and render tables based on current page
      setTimeout(() => {
        switch(state.currentPage) {
          case 'dashboard':
            renderDashboardCharts();
            break;
          case 'transactions':
            renderTransactionsTable();
            break;
          case 'accounts':
            renderAccountsTable();
            break;
          case 'reports':
            loadReportsData();
            break;
          case 'ledger':
            renderLedgerTable();
            break;
          case 'predictions':
            renderPredictionsPage();
            break;
          case 'upload':
            loadRecentUploads();
            break;
        }
      }, 100);
    }
    
  } catch (error) {
    console.error('❌ Error refreshing data:', error);
    
    // Fallback: reload the page if refresh fails
    console.log('⚠️ Falling back to full page reload...');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}


function handleFileSelect(event) {
  console.log('File select triggered');
  
  if (!event || !event.target || !event.target.files) {
    console.error('Invalid event');
    return;
  }

  const files = event.target.files;
  if (files.length === 0) {
    console.error('No file selected');
    return;
  }

  const file = files[0];
  if (!file || !file.name) {
    console.error('Invalid file');
    return;
  }

  console.log('File:', file.name);

  let fileType = 'Unknown';
  try {
    const parts = file.name.split('.');
    fileType = parts[parts.length - 1].toUpperCase();
  } catch (e) {
    fileType = 'Unknown';
  }

  const upload = {
    id: 'upl_' + Date.now(),
    fileName: file.name,
    fileType: fileType,
    status: 'processing',
    transactionCount: null,
    transactions: null,
    analysis: null,
    summary: null,
    error: null
  };

  state.uploads.push(upload);
  render();

  uploadFile(file, upload.id);
}

async function uploadFile(file, uploadId) {
  console.log('Upload starting');

  if (!file || !uploadId) {
    console.error('Invalid parameters');
    return;
  }

  try {
    const formData = new FormData();
    formData.append('file', file);

    console.log('Sending to backend...');

    const response = await fetch('/api/files/upload', {
      method: 'POST',
      body: formData
    });

    console.log('Response status:', response.status);

    const data = await response.json();
    console.log('Response data:', data);

    const idx = state.uploads.findIndex(u => u.id === uploadId);
    
    if (idx === -1) {
      console.error('Upload not found');
      alert('Error: Upload not found');
      return;
    }

    if (!response.ok) {
      state.uploads[idx].status = 'failed';
      state.uploads[idx].error = data.error || 'Unknown error';
      render();
      alert('Failed: ' + data.error);
      return;
    }

    if (data.success && data.transactions) {
      updateUploadProgress('processing', 'Processing transactions...', 70);
      await sleep(500);
      
      // Map transactions
      const mappedTransactions = data.transactions.map(txn => ({
        id: txn.id,
        date: txn.date,
        description: txn.description,
        amount: txn.amount,
        type: txn.type,
        category: txn.categoryCode,
        categoryCode: txn.categoryCode,
        confidence: txn.confidence,
        counterparty: txn.counterparty || '',
        reasoning: txn.reasoning || ''
      }));
      
      state.transactions.push(...mappedTransactions);
      
      updateUploadProgress('finalizing', 'Finalizing...', 90);
      await sleep(300);
      
      updateUploadProgress('complete', 'Upload complete!', 100);
      await sleep(500);
      
      // Hide overlay
      hideUploadOverlay();
      
      // Show success dialog
      showSuccessDialog(data);
      
      // ⭐ REFRESH ALL DATA WITHOUT PAGE RELOAD ⭐
      console.log('🔄 Starting data refresh...');
      await refreshAllData();
      
      console.log('✅ Upload and refresh complete!');
      
    } else {
      state.uploads[idx].status = 'failed';
      state.uploads[idx].error = 'Invalid response';
      render();
      alert('Invalid response from server');
    } 

  } catch (error) {
    console.error('Upload error:', error);
    
    const idx = state.uploads.findIndex(u => u.id === uploadId);
    if (idx !== -1) {
      state.uploads[idx].status = 'failed';
      state.uploads[idx].error = error.message;
      render();
    }
    
    alert('Error: ' + error.message);
  }
}

async function loadTransactions() {
  try {
    console.log('📊 Loading transactions...');
    const response = await fetch(`${API_BASE}/transactions?limit=100`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const transactions = await response.json();
    console.log('✅ Loaded', transactions.length, 'transactions');
    
    state.transactions = transactions;
    
    // Load categories for filter - NEW
    await loadCategoriesForFilter();
    
    // Render table
    renderTransactionsTable();
    
    return transactions;
  } catch (error) {
    console.error('❌ Error loading transactions:', error);
    return [];
  }
}
function renderTransactionsTable() {
  const tbody = document.getElementById('txnBody');
  const paginationContainer = document.getElementById('transactionsPagination');
  
  if (!tbody) return;
  
  if (state.transactions.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px; color: #9CA3AF;">No transactions yet. Upload a file to get started.</td></tr>';
    if (paginationContainer) paginationContainer.innerHTML = '';
    return;
  }
  
  // Apply filters
  const filteredData = filterData(state.transactions, state.filters);
  
  // Update total items
  state.pagination.transactions.totalItems = filteredData.length;
  
  // Get paginated data
  const paginatedData = paginateData(
    filteredData,
    state.pagination.transactions.currentPage,
    state.pagination.transactions.itemsPerPage
  );
  
  // Render table rows
  tbody.innerHTML = paginatedData.map(t => `
    <tr>
      <td>${t.date}</td>
      <td style="max-width: 300px; overflow: hidden; text-overflow: ellipsis;">${t.description}</td>
      <td style="text-align: right; color: ${t.type === 'CREDIT' ? '#10b981' : '#ef4444'}; font-weight: 600;">
        €${Math.abs(t.amount).toFixed(2)}
      </td>
      <td>
        <span style="padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; 
          background-color: ${t.type === 'CREDIT' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
          color: ${t.type === 'CREDIT' ? '#10b981' : '#ef4444'};">
          ${t.type}
        </span>
      </td>
      <td>${getCategoryName(t.categoryCode)}</td>
      <td>
        <span style="padding: 4px 8px; border-radius: 4px; font-size: 11px; 
          background-color: rgba(16, 185, 129, 0.1); color: #10b981;">
          ${((t.confidence || 0) * 100).toFixed(0)}%
        </span>
      </td>
    </tr>
  `).join('');
  
  // Render pagination
  if (paginationContainer) {
    paginationContainer.innerHTML = renderPagination('transactions', filteredData.length);
  }
}


function previewUpload(uploadId) {
  const upload = state.uploads.find(u => u.id === uploadId);
  
  if (!upload || !upload.transactions || upload.transactions.length === 0) {
    alert('No transactions to preview');
    return;
  }

  const modal = document.createElement('div');
  modal.className = 'modal show';
  modal.id = 'previewModal';
  
  modal.innerHTML = `
    <div class="modal-content" style="max-width: 900px; max-height: 80vh; overflow-y: auto;">
      <div class="modal-header">
        <div>
          <h2 style="margin: 0; font-weight: 300;">Upload Preview</h2>
          <p style="margin: 5px 0 0 0; color: var(--text-secondary); font-size: 12px;">
            File: ${upload.fileName} | Transactions: ${upload.transactionCount}
          </p>
        </div>
        <button class="modal-close" onclick="document.getElementById('previewModal').remove()">×</button>
      </div>

      <div class="modal-body">
        <div style="background: var(--bg-hover); padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-bottom: 10px;">
            <div>
              <span style="color: var(--text-secondary); font-size: 11px;">File Name</span>
              <p style="margin: 5px 0 0 0; font-weight: 300;">${upload.fileName}</p>
            </div>
            <div>
              <span style="color: var(--text-secondary); font-size: 11px;">File Type</span>
              <p style="margin: 5px 0 0 0; font-weight: 300;">${upload.fileType}</p>
            </div>
            <div>
              <span style="color: var(--text-secondary); font-size: 11px;">Transactions Found</span>
              <p style="margin: 5px 0 0 0; font-weight: 300; color: var(--accent-green);">${upload.transactionCount}</p>
            </div>
          </div>
          
          ${upload.analysis ? `
            <div>
              <span style="color: var(--text-secondary); font-size: 11px;">Analysis</span>
              <p style="margin: 5px 0 0 0; font-weight: 300; font-size: 13px;">${upload.analysis}</p>
            </div>
          ` : ''}
        </div>

        ${upload.summary ? `
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 10px; margin-bottom: 20px;">
            <div style="background: var(--bg-hover); padding: 10px; border-radius: 6px;">
              <span style="color: var(--text-secondary); font-size: 10px;">Total Transactions</span>
              <p style="margin: 5px 0 0 0; font-size: 18px; color: var(--text-primary);">${upload.summary.totalTransactions}</p>
            </div>
            <div style="background: var(--bg-hover); padding: 10px; border-radius: 6px;">
              <span style="color: var(--text-secondary); font-size: 10px;">Credit Total</span>
              <p style="margin: 5px 0 0 0; font-size: 18px; color: var(--accent-green);">€${upload.summary.creditTotal?.toFixed(2) || 0}</p>
            </div>
            <div style="background: var(--bg-hover); padding: 10px; border-radius: 6px;">
              <span style="color: var(--text-secondary); font-size: 10px;">Debit Total</span>
              <p style="margin: 5px 0 0 0; font-size: 18px; color: var(--accent-red);">€${upload.summary.debitTotal?.toFixed(2) || 0}</p>
            </div>
            <div style="background: var(--bg-hover); padding: 10px; border-radius: 6px;">
              <span style="color: var(--text-secondary); font-size: 10px;">Net Cash Flow</span>
              <p style="margin: 5px 0 0 0; font-size: 18px; color: ${upload.summary.netCashFlow >= 0 ? 'var(--accent-green)' : 'var(--accent-red)'};">€${upload.summary.netCashFlow?.toFixed(2) || 0}</p>
            </div>
          </div>
        ` : ''}

        <div class="table-container">
          <h3 style="margin: 0 0 15px 0; font-weight: 300; font-size: 13px; text-transform: uppercase;">Analyzed Transactions</h3>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Confidence</th>
                </tr>
              </thead>
              <tbody>
                ${upload.transactions.map(txn => `
                  <tr>
                    <td>${txn.date}</td>
                    <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis;">${txn.description}</td>
                    <td style="text-align: right;">€${txn.amount?.toFixed(2) || 0}</td>
                    <td>
                      <span class="${txn.type === 'CREDIT' ? 'type-credit' : 'type-debit'}">
                        ${txn.type}
                      </span>
                    </td>
                    <td>
                      <span class="category-badge">${getCategoryName(txn.categoryCode)}</span>
                    </td>
                    <td>
                      <span class="confidence-badge">${(txn.confidence * 100).toFixed(0)}%</span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn-secondary" onclick="document.getElementById('previewModal').remove()">Close</button>
        <button class="btn-primary" onclick="importTransactions('${uploadId}')">Import to Dashboard</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
}

// Check language on load
window.addEventListener('DOMContentLoaded', init);
