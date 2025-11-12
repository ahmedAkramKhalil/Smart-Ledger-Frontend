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
  uploads: [],           // ← CRITICAL: Add this
  categories: [],        // ← Add if missing
  
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
  
  // UI State
  currentTransactionPage: 1,
  transactionsPerPage: 10,
  editingTransaction: null,
  selectedAccount: 'acc_default_001'
};

// ========================================
// API ENDPOINTS
// ========================================

const API_BASE = 'http://localhost:5001/api';

const endpoints = {
  // Reports
  dashboard: `${API_BASE}/reports/dashboard`,
  incomeExpenses: `${API_BASE}/reports/income-expenses`,
  cashFlow: `${API_BASE}/reports/cash-flow`,
  categoryAnalysis: `${API_BASE}/reports/category-analysis`,
  topTransactions: `${API_BASE}/reports/top-transactions`,
  reconciliation: `${API_BASE}/reports/reconciliation-status`,
  monthlyComparison: `${API_BASE}/reports/monthly-comparison`,
  
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
  upload: `${API_BASE}/files/upload`
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



async function loadReportsData() {
  try {
    console.log('📊 Loading reports data...');
    
    const dateFrom = document.getElementById('reportDateFrom')?.value;
    const dateTo = document.getElementById('reportDateTo')?.value;

    const filters = {};
    if (dateFrom) filters.dateFrom = dateFrom;
    if (dateTo) filters.dateTo = dateTo;

    const queryString = new URLSearchParams(filters).toString();

    const [categoryData, reconcileData] = await Promise.all([
      fetch(`${endpoints.categoryAnalysis}${queryString ? '?' + queryString : ''}`).then(r => r.json()).catch(e => { console.error('Category error:', e); return []; }),
      fetch(`${endpoints.reconciliation}${queryString ? '?' + queryString : ''}`).then(r => r.json()).catch(e => { console.error('Reconcile error:', e); return []; })
    ]);

    // Update category table
    const categoryBody = document.getElementById('categoryBody');
    if (categoryBody && categoryData.length > 0) {
      categoryBody.innerHTML = categoryData.map(c => `
        <tr>
          <td>${state.language === 'en' ? c.name_en : c.name_el}</td>
          <td><span style="background-color: ${c.type === 'CREDIT' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}; padding: 4px 8px; border-radius: 4px; color: ${c.type === 'CREDIT' ? '#10b981' : '#ef4444'};">${c.type}</span></td>
          <td>${c.transaction_count || 0}</td>
          <td>${formatCurrency(c.total_amount || 0)}</td>
          <td>${formatCurrency(c.average_amount || 0)}</td>
        </tr>
      `).join('');
    }

    // Update reconciliation table
    const reconcileBody = document.getElementById('reconcileBody');
    if (reconcileBody && reconcileData.length > 0) {
      reconcileBody.innerHTML = reconcileData.map(r => `
        <tr>
          <td>${r.status}</td>
          <td>${r.count || 0}</td>
          <td>${formatCurrency(r.total_amount || 0)}</td>
          <td>${r.percentage ? r.percentage.toFixed(1) : 0}%</td>
        </tr>
      `).join('');
    }

    // Draw charts
    drawReportsCharts(categoryData);

    console.log('✅ Reports loaded');
  } catch (error) {
    console.error('❌ Error loading reports:', error);
  }
}

function drawReportsCharts(categoryData) {
  setTimeout(() => {
    // Category Pie Chart
    const categoryCtx = document.getElementById('categoryChart');
    if (categoryCtx && categoryData && categoryData.length > 0) {
      // Destroy existing chart if any
      if (window.categoryChartInstance) {
        window.categoryChartInstance.destroy();
      }

      const creditTotal = categoryData
        .filter(c => c.type === 'CREDIT')
        .reduce((sum, c) => sum + (c.total_amount || 0), 0);
      
      const debitTotal = categoryData
        .filter(c => c.type === 'DEBIT')
        .reduce((sum, c) => sum + (c.total_amount || 0), 0);

      window.categoryChartInstance = new Chart(categoryCtx, {
        type: 'pie',
        data: {
          labels: [
            state.language === 'en' ? 'Income' : 'Εισόδημα',
            state.language === 'en' ? 'Expenses' : 'Έξοδα'
          ],
          datasets: [{
            data: [creditTotal, debitTotal],
            backgroundColor: ['#10b981', '#ef4444'],
            borderColor: '#0F1419',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: '#E5E7EB' }
            }
          }
        }
      });
    }

    // Monthly Chart
    const monthlyCtx = document.getElementById('monthlyChart');
    if (monthlyCtx) {
      if (window.monthlyChartInstance) {
        window.monthlyChartInstance.destroy();
      }

      const monthData = categoryData.slice(0, 12);
      
      window.monthlyChartInstance = new Chart(monthlyCtx, {
        type: 'bar',
        data: {
          labels: monthData.map((_, i) => `Month ${i + 1}`),
          datasets: [
            {
              label: state.language === 'en' ? 'Income' : 'Εισόδημα',
              data: monthData.map(m => m.total_amount || 0),
              backgroundColor: '#10b981'
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
    }
  }, 100);
}



async function loadDashboard() {
  try {
    console.log('📊 Loading dashboard data...');
    
    const [summary, cashFlow, topTxns, recurring] = await Promise.all([
      fetch(endpoints.dashboard).then(r => r.json()),
      fetch(endpoints.cashFlow).then(r => r.json()),
      fetch(`${endpoints.topTransactions}?limit=5`).then(r => r.json()),
      fetch(`${endpoints.recurring}?minOccurrences=3`).then(r => r.json())
    ]);

    state.reports = { summary, cashFlow, topTxns, recurring };
    console.log('✅ Dashboard data loaded');
    render();
  } catch (error) {
    console.error('❌ Error loading dashboard:', error);
  }
}

async function loadAccounts() {
  try {
    console.log('📊 Loading accounts...');
    const accounts = await fetch(endpoints.accounts).then(r => r.json());
    state.accounts = accounts;
    console.log('✅ Accounts loaded:', accounts.length);
    return accounts;
  } catch (error) {
    console.error('❌ Error loading accounts:', error);
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

async function loadPredictions() {
  try {
    console.log('🔮 Loading predictions...');
    const [forecast, recurring] = await Promise.all([
      fetch(`${endpoints.forecast}?months=3`).then(r => r.json()),
      fetch(`${endpoints.recurring}?minOccurrences=3`).then(r => r.json())
    ]);
    state.predictions = { forecast, recurring };
    console.log('✅ Predictions loaded');
    return { forecast, recurring };
  } catch (error) {
    console.error('❌ Error loading predictions:', error);
    return { forecast: [], recurring: [] };
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
    <div class="login-container">
      <div class="login-box">
        <div class="login-logo">📊 Smart Ledger</div>
        <h1 class="login-title">${t('common.login')}</h1>
        
        <form id="loginForm">
          <!-- Language Selector at Top -->
          <div class="form-group" style="margin-bottom: 20px; display: flex; gap: 10px;">
            <label style="flex: 1;">${t('common.language')}:</label>
            <div style="flex: 2; display: flex; gap: 5px;">
              <button 
                type="button" 
                class="lang-btn ${state.language === 'en' ? 'lang-btn-active' : ''}"
                onclick="setLanguage('en')"
                style="flex: 1; padding: 8px; background-color: ${state.language === 'en' ? '#FFB800' : '#1F2937'}; color: ${state.language === 'en' ? '#000' : '#E5E7EB'}; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">
                🇬🇧 EN
              </button>
              <button 
                type="button" 
                class="lang-btn ${state.language === 'el' ? 'lang-btn-active' : ''}"
                onclick="setLanguage('el')"
                style="flex: 1; padding: 8px; background-color: ${state.language === 'el' ? '#FFB800' : '#1F2937'}; color: ${state.language === 'el' ? '#000' : '#E5E7EB'}; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">
                🇬🇷 EL
              </button>
            </div>
          </div>

          <hr style="border: none; border-top: 1px solid #1F2937; margin: 20px 0;">

          <!-- Demo Account Info -->
          <div style="background-color: #1F2937; border-left: 4px solid #FFB800; padding: 12px; border-radius: 6px; margin-bottom: 20px; font-size: 12px;">
            <div style="font-weight: 600; margin-bottom: 5px;">💡 ${state.language === 'en' ? 'Demo Account' : 'Δημο Λογαριασμό'}</div>
            <div>${state.language === 'en' ? 'Username: ' : 'Όνομα χρήστη: '}<strong>demo</strong></div>
            <div>${state.language === 'en' ? 'Password: ' : 'Κωδικός: '}<strong>demo</strong></div>
          </div>

          <!-- Username Field -->
          <div class="form-group">
            <label>${state.language === 'en' ? 'Username' : 'Όνομα Χρήστη'}:</label>
            <input 
              type="text" 
              id="username" 
              required 
              value="demo"
              placeholder="demo"
              style="width: 100%; padding: 12px; border-radius: 6px; background-color: #121820; border: 1px solid #1F2937; color: #E5E7EB; font-size: 14px;">
          </div>

          <!-- Password Field -->
          <div class="form-group">
            <label>${state.language === 'en' ? 'Password' : 'Κωδικός'}:</label>
            <input 
              type="password" 
              id="password" 
              required 
              value="demo"
              placeholder="demo"
              style="width: 100%; padding: 12px; border-radius: 6px; background-color: #121820; border: 1px solid #1F2937; color: #E5E7EB; font-size: 14px;">
          </div>

          <!-- Login Button -->
          <button 
            type="submit" 
            class="login-btn"
            style="width: 100%; padding: 12px; margin-top: 20px; background-color: #FFB800; color: #000; border: none; border-radius: 6px; font-weight: 600; font-size: 16px; cursor: pointer; transition: all 0.3s;">
            ${state.language === 'en' ? '🔐 Login' : '🔐 Σύνδεση'}
          </button>

          <!-- Error Message -->
          <div id="errorMessage" class="error-message" style="margin-top: 15px; color: #ef4444; text-align: center; font-size: 14px;"></div>

          <!-- Footer Info -->
          <div style="text-align: center; margin-top: 25px; font-size: 12px; color: #9CA3AF;">
            <div>${state.language === 'en' ? 'Smart Ledger v2.0' : 'Smart Ledger v2.0'}</div>
            <div>${state.language === 'en' ? 'AI-Powered Financial Dashboard' : 'Πίνακας Χρηματοοικονομικών Δεδομένων Με Ενισχυμένη Τεχνητή Νοημοσύνη'}</div>
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
  
  return `
    <div>
      <h2>${t('dashboard.welcome')}, ${state.currentUser?.username}! 👋</h2>
      
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
          <canvas id="cashFlowChart"></canvas>
        </div>
        
        <div class="card">
          <h3>${t('predictions.recurringPatterns')}</h3>
          <div id="recurringList"></div>
        </div>
      </div>
      
      <!-- Recent Transactions -->
      <div class="card" style="margin-top: 20px;">
        <h3>${t('dashboard.recentTransactions')}</h3>
        <table id="recentTable" class="table" style="width: 100%; margin-top: 15px;">
          <thead>
            <tr>
              <th>${t('transactions.date')}</th>
              <th>${t('transactions.description')}</th>
              <th>${t('transactions.amount')}</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody id="recentBody">
            <tr><td colspan="4">${t('common.loading')}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
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
  return `
    <div style="height: calc(100vh - 80px); overflow-y: auto; padding: 20px;">
      
      <!-- Title -->
      <h2 style="margin-bottom: 20px; color: #FFB800;">📊 ${t('nav.reports')}</h2>
      
      <!-- Filters Row -->
      <div class="card" style="margin-bottom: 20px;">
        <h3>${t('reports.summary')}</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
          <div style="display: flex; flex-direction: column;">
            <label style="font-size: 12px; color: #9CA3AF; margin-bottom: 5px;">${state.language === 'en' ? 'Date From' : 'Από Ημερομηνία'}:</label>
            <input type="date" id="reportDateFrom" style="padding: 8px; border-radius: 6px; background-color: #121820; border: 1px solid #1F2937; color: #E5E7EB;">
          </div>
          <div style="display: flex; flex-direction: column;">
            <label style="font-size: 12px; color: #9CA3AF; margin-bottom: 5px;">${state.language === 'en' ? 'Date To' : 'Έως Ημερομηνία'}:</label>
            <input type="date" id="reportDateTo" style="padding: 8px; border-radius: 6px; background-color: #121820; border: 1px solid #1F2937; color: #E5E7EB;">
          </div>
          <div style="display: flex; align-items: flex-end;">
            <button class="btn-primary" onclick="loadReportsData()" style="width: 100%; padding: 8px;">
              ${state.language === 'en' ? 'Generate Reports' : 'Δημιουργία Αναφορών'}
            </button>
          </div>
        </div>
      </div>

      <!-- Charts Container - FIXED HEIGHT -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
        
        <!-- Category Chart -->
        <div class="card" style="height: 350px; display: flex; flex-direction: column;">
          <h3>${t('reports.categoryAnalysis')}</h3>
          <div style="flex: 1; position: relative; min-height: 280px;">
            <canvas id="categoryChart" style="max-height: 250px;"></canvas>
          </div>
        </div>

        <!-- Monthly Chart -->
        <div class="card" style="height: 350px; display: flex; flex-direction: column;">
          <h3>${t('reports.monthlyComparison')}</h3>
          <div style="flex: 1; position: relative; min-height: 280px;">
            <canvas id="monthlyChart" style="max-height: 250px;"></canvas>
          </div>
        </div>
      </div>

      <!-- Reconciliation Status -->
      <div class="card" style="margin-bottom: 20px;">
        <h3>${t('reports.reconciliation')}</h3>
        <table class="table" style="width: 100%;">
          <thead>
            <tr>
              <th>${state.language === 'en' ? 'Status' : 'Κατάσταση'}</th>
              <th>${state.language === 'en' ? 'Count' : 'Αριθμός'}</th>
              <th>${state.language === 'en' ? 'Amount' : 'Ποσό'}</th>
              <th>${state.language === 'en' ? 'Percentage' : 'Ποσοστό'}</th>
            </tr>
          </thead>
          <tbody id="reconcileBody">
            <tr>
              <td colspan="4" style="text-align: center; padding: 20px;">
                <span style="color: #9CA3AF;">${t('common.loading')}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Category Breakdown Table -->
      <div class="card">
        <h3>${t('reports.categoryAnalysis')}</h3>
        <div style="max-height: 400px; overflow-y: auto;">
          <table class="table" style="width: 100%;">
            <thead>
              <tr>
                <th>${state.language === 'en' ? 'Category' : 'Κατηγορία'}</th>
                <th>${state.language === 'en' ? 'Type' : 'Τύπος'}</th>
                <th>${state.language === 'en' ? 'Count' : 'Αριθμός'}</th>
                <th>${state.language === 'en' ? 'Total' : 'Σύνολο'}</th>
                <th>${state.language === 'en' ? 'Average' : 'Μέσος'}</th>
              </tr>
            </thead>
            <tbody id="categoryBody">
              <tr>
                <td colspan="5" style="text-align: center; padding: 20px;">
                  <span style="color: #9CA3AF;">${t('common.loading')}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;
}

// ========================================
// LEDGER PAGE
// ========================================

function renderLedger() {
  return `
    <div>
      <div style="margin-bottom: 20px;">
        <label>${t('accounts.accountName')}:</label>
        <select id="ledgerAccountSelect" onchange="loadAccountLedger(this.value)">
          ${state.accounts.map(a => `<option value="${a.id}">${a.account_name}</option>`).join('')}
        </select>
      </div>
      
      <div class="table-container">
        <table id="ledgerTable" class="table">
          <thead>
            <tr>
              <th>${t('ledger.date')}</th>
              <th>${t('ledger.description')}</th>
              <th>${t('ledger.debit')}</th>
              <th>${t('ledger.credit')}</th>
              <th>${t('ledger.balance')}</th>
              <th>${t('ledger.reconciled')}</th>
            </tr>
          </thead>
          <tbody id="ledgerBody">
            <tr><td colspan="6">${t('common.loading')}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ========================================
// PREDICTIONS PAGE
// ========================================

function renderPredictions() {
  return `
    <div>
      <h2>${t('predictions.title')} 🔮</h2>
      
      <div class="card" style="margin-top: 20px;">
        <h3>${t('predictions.cashFlowForecast')}</h3>
        <canvas id="forecastChart"></canvas>
      </div>
      
      <div class="card" style="margin-top: 20px;">
        <h3>${t('predictions.nextTransactions')}</h3>
        <table id="predictionsTable" class="table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Predicted Income</th>
              <th>Predicted Expenses</th>
              <th>Net Flow</th>
              <th>Confidence</th>
            </tr>
          </thead>
          <tbody id="predictionsBody">
            <tr><td colspan="5">${t('common.loading')}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ========================================
// TRANSACTIONS & UPLOAD (KEEP EXISTING)
// ========================================


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

async function uploadFile(file) {
  try {
    console.log('📤 Starting file upload:', file.name);
    
    // Show progress
    document.getElementById('uploadProgress').style.display = 'block';
    document.getElementById('previewContainer').style.display = 'none';
    
    const formData = new FormData();
    formData.append('file', file);
    
    // Simulate progress
    let progress = 0;
    const progressInterval = setInterval(() => {
      if (progress < 90) {
        progress += Math.random() * 30;
        updateProgressBar(Math.min(progress, 90));
      }
    }, 200);

    console.log('📨 Sending file to backend...');
    const response = await fetch(`${API_BASE}/files/upload`, {
      method: 'POST',
      body: formData
    });

    clearInterval(progressInterval);
    updateProgressBar(100);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ File uploaded response:', data);

    if (data.error) {
      throw new Error(data.error);
    }

    // Show preview
    displayFilePreview(data);
    
    // Update uploads list
    await loadRecentUploads();

    // Refresh dashboard after successful upload
    setTimeout(() => {
      document.getElementById('uploadProgress').style.display = 'none';
      alert(state.language === 'en' 
        ? `✅ File uploaded successfully! ${data.transactions?.length || 0} transactions extracted.`
        : `✅ Το αρχείο ανέβηκε με επιτυχία! ${data.transactions?.length || 0} συναλλαγές εξήχθησαν.`
      );
      loadDashboard();
    }, 1000);

  } catch (error) {
    console.error('❌ Upload error:', error);
    clearInterval(progressInterval);
    document.getElementById('uploadProgress').style.display = 'none';
    alert(`${state.language === 'en' ? 'Upload failed' : 'Το ανέβασμα απέτυχε'}: ${error.message}`);
  }
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

function displayFilePreview(data) {
  const preview = document.getElementById('previewData');
  if (!preview) return;

  const transactions = data.transactions || [];
  
  if (transactions.length === 0) {
    preview.innerHTML = '<span style="color: #9CA3AF;">No transactions to preview</span>';
    return;
  }

  // Show first 10 transactions
  const previewTxns = transactions.slice(0, 10);
  let html = `<div style="color: #10b981; margin-bottom: 10px;">✅ Preview (showing ${previewTxns.length} of ${transactions.length})</div>`;
  
  previewTxns.forEach((txn, idx) => {
    html += `
      <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #1F2937;">
        <div><strong>#${idx + 1}</strong> - ${txn.date}</div>
        <div style="color: #FFB800;">📝 ${txn.description}</div>
        <div>
          <span style="color: ${txn.type === 'CREDIT' ? '#10b981' : '#ef4444'};">
            ${txn.type}: €${(txn.amount || 0).toFixed(2)}
          </span>
          | Category: ${txn.category_code || 'N/A'}
          | Confidence: ${((txn.confidence || 0) * 100).toFixed(0)}%
        </div>
      </div>
    `;
  });

  preview.innerHTML = html;
  document.getElementById('previewContainer').style.display = 'block';
}

async function loadRecentUploads() {
  try {
    console.log('📋 Loading recent uploads...');
    const response = await fetch(`${API_BASE}/files/uploads`);
    
    if (!response.ok) {
      console.warn('Could not load uploads list');
      return;
    }

    const uploads = await response.json();
    console.log('✅ Loaded', uploads.length, 'uploads');

    const tbody = document.getElementById('uploadsBody');
    if (!tbody) return;

    if (uploads.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: 20px; color: #9CA3AF;">
            ${state.language === 'en' ? 'No uploads yet' : 'Δεν υπάρχουν αναβάσματα ακόμη'}
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = uploads.map((upload, idx) => `
      <tr>
        <td>${upload.fileName || upload.file_name || 'Unknown'}</td>
        <td>${upload.fileType || upload.file_type || 'CSV'}</td>
        <td>
          ${upload.status === 'completed' ? '✅ Completed' : 
            upload.status === 'processing' ? '⏳ Processing' : 
            upload.status === 'failed' ? '❌ Failed' : upload.status}
        </td>
        <td>${upload.transactionCount || upload.transaction_count || 0}</td>
        <td>
          ${upload.status === 'completed' ? `
            <button onclick="viewUploadDetails('${upload.id || idx}')" class="btn-small" style="padding: 4px 8px; font-size: 12px;">
              ${state.language === 'en' ? 'View' : 'Προβολή'}
            </button>
          ` : '-'}
        </td>
      </tr>
    `).join('');

  } catch (error) {
    console.warn('⚠️ Could not load uploads:', error.message);
  }
}

function viewUploadDetails(uploadId) {
  console.log('Viewing upload:', uploadId);
  changePage('transactions');
}

// Load uploads when page loads
function initializeUploadPage() {
  if (state.currentPage === 'upload') {
    setTimeout(() => {
      loadRecentUploads();
    }, 100);
  }
}



function renderTransactions() {
  return `
    <div>
      <!-- Filters -->
      <div class="filters-container">
        <input type="date" id="filterDateFrom" placeholder="${t('transactions.from')}">
        <input type="date" id="filterDateTo" placeholder="${t('transactions.to')}">
        <input type="text" id="filterSearch" placeholder="${t('transactions.search')}...">
        <button onclick="applyFilters()" class="btn-primary">Filter</button>
      </div>
      
      <div class="table-container">
        <table id="transactionsTable" class="table">
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
          <tbody id="txnBody">
            <tr><td colspan="6">${t('common.loading')}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderUpload() {
  return `
    <div>
      <div class="card" style="margin-bottom: 20px;">
        <h3 style="margin-bottom: 15px; font-weight: 300;">Upload File</h3>
        
        <div class="upload-area" 
             id="uploadArea" 
             onclick="document.getElementById('fileInput').click()"
             style="cursor: pointer; padding: 40px; text-align: center; border: 2px dashed var(--border-color); border-radius: 8px;">
          <div style="font-size: 30px; margin-bottom: 10px;">📄</div>
          <div>Click to select file</div>
        </div>

        <input type="file" 
               id="fileInput" 
               style="display: none;" 
               accept=".csv,.xlsx,.xls,.txt"
               onchange="handleFileSelect(event)">
      </div>

      ${state.uploads.length > 0 ? `
        <div class="card">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th>File</th>
                <th>Status</th>
                <th>Transactions</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${state.uploads.map(u => `
                <tr>
                  <td>${u.fileName}</td>
                  <td>
                    ${u.status === 'processing' ? '⏳ Processing' :
                      u.status === 'completed' ? '✓ Done' :
                      u.status === 'failed' ? '✗ Failed: ' + u.error : u.status}
                  </td>
                  <td>${u.transactionCount || '-'}</td>
                  <td>
                    ${u.status === 'completed' && u.transactions ?
                      `<button onclick="previewUpload('${u.id}')">Preview</button>` : '-'}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : ''}
    </div>
  `;
}




// ========================================
// EVENT HANDLERS
// ========================================

function changePage(page) {
  state.currentPage = page;
  
  if (page === 'dashboard') {
    loadDashboard();
  } else if (page === 'accounts') {
    loadAccounts().then(() => {
      renderAccountsTable();
    });
  } else if (page === 'predictions') {
    loadPredictions().then(() => renderPredictionsTable());
  } else if (page === 'reports') {
    render();
    // Load reports data after render
    setTimeout(() => {
      loadReportsData();
    }, 100);
  } else if (page === 'ledger') {
    loadAccounts().then(() => {
      loadAccountLedger(state.selectedAccount);
      renderLedgerTable();
    });
  }
  
  render();
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
  if (!tbody) return;
  
  tbody.innerHTML = state.accounts.map(a => `
    <tr>
      <td>${a.account_name}</td>
      <td>${a.account_number}</td>
      <td>${a.account_type}</td>
      <td>${formatCurrency(a.current_balance)}</td>
      <td>
        <button class="action-btn" onclick="viewAccountLedger('${a.id}')">View Ledger</button>
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
    if (!tbody) return;
    
    tbody.innerHTML = state.ledger.map(entry => `
      <tr>
        <td>${formatDate(entry.entry_date)}</td>
        <td>${entry.description}</td>
        <td>${entry.entry_type === 'DEBIT' ? formatCurrency(entry.amount) : '-'}</td>
        <td>${entry.entry_type === 'CREDIT' ? formatCurrency(entry.amount) : '-'}</td>
        <td>${formatCurrency(entry.running_balance)}</td>
        <td>${entry.reconciled ? '✓' : '-'}</td>
      </tr>
    `).join('');
  }, 100);
}

// ========================================
// CHART FUNCTIONS
// ========================================

function renderDashboardCharts() {
  setTimeout(() => {
    // Cash Flow Chart
    const cashFlowCtx = document.getElementById('cashFlowChart');
    if (cashFlowCtx && state.reports.cashFlow?.length > 0) {
      const data = state.reports.cashFlow.slice(-6);
      new Chart(cashFlowCtx, {
        type: 'line',
        data: {
          labels: data.map(d => d.period),
          datasets: [
            {
              label: 'Income',
              data: data.map(d => d.total_income),
              borderColor: '#10b981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              tension: 0.4
            },
            {
              label: 'Expenses',
              data: data.map(d => d.total_expenses),
              borderColor: '#ef4444',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              tension: 0.4
            }
          ]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
    }
    
    // Recurring List
    const recurringList = document.getElementById('recurringList');
    if (recurringList && state.reports.recurring?.length > 0) {
      recurringList.innerHTML = `
        <table style="width: 100;">
          ${state.reports.recurring.slice(0, 5).map(r => `
            <tr style="padding: 10px; border-bottom: 1px solid #1f2937;">
              <td>${r.description}</td>
              <td style="text-align: right;">${r.occurrence_count}x</td>
              <td style="text-align: right;">${formatCurrency(r.avg_amount)}</td>
            </tr>
          `).join('')}
        </table>
      `;
    }
    
    // Recent Transactions
    const recentBody = document.getElementById('recentBody');
    if (recentBody && state.reports.topTxns?.length > 0) {
      recentBody.innerHTML = state.reports.topTxns.slice(0, 5).map(t => `
        <tr>
          <td>${formatDate(t.date)}</td>
          <td>${t.description}</td>
          <td>${formatCurrency(t.amount)}</td>
          <td class="type-${t.type.toLowerCase()}">${t.type}</td>
        </tr>
      `).join('');
    }
  }, 100);
}

function renderReportsCharts() {
  setTimeout(() => {
    // Category Chart
    const categoryCtx = document.getElementById('categoryChart');
    if (categoryCtx) {
      const categories = state.reports.summary || [];
      new Chart(categoryCtx, {
        type: 'pie',
        data: {
          labels: categories.length > 0 ? ['Income', 'Expenses'] : [],
          datasets: [{
            data: categories.length > 0 ? [
              state.reports.summary?.credit_total || 0,
              state.reports.summary?.debit_total || 0
            ] : [],
            backgroundColor: ['#10b981', '#ef4444']
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
    }
  }, 100);
}

function renderPredictionsTable() {
  setTimeout(() => {
    const tbody = document.getElementById('predictionsBody');
    if (!tbody || !state.predictions.forecast) return;
    
    tbody.innerHTML = state.predictions.forecast.map(f => `
      <tr>
        <td>${f.month}</td>
        <td>${formatCurrency(f.predicted_income)}</td>
        <td>${formatCurrency(f.predicted_expenses)}</td>
        <td style="color: ${f.net_flow >= 0 ? '#10b981' : '#ef4444'}">${formatCurrency(f.net_flow)}</td>
        <td>${(f.confidence * 100).toFixed(0)}%</td>
      </tr>
    `).join('');
    
    // Forecast Chart
    const forecastCtx = document.getElementById('forecastChart');
    if (forecastCtx && state.predictions.forecast?.length > 0) {
      new Chart(forecastCtx, {
        type: 'bar',
        data: {
          labels: state.predictions.forecast.map(d => d.month),
          datasets: [
            { label: 'Income', data: state.predictions.forecast.map(d => d.predicted_income), backgroundColor: '#10b981' },
            { label: 'Expenses', data: state.predictions.forecast.map(d => d.predicted_expenses), backgroundColor: '#ef4444' }
          ]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
    }
  }, 100);
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

    const response = await fetch('http://localhost:5001/api/files/upload', {
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

function init() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (isLoggedIn) {
    state.isLoggedIn = true;
    state.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    loadDashboard();
  }
  render();
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

    const response = await fetch('http://localhost:5001/api/files/upload', {
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
      state.uploads[idx].status = 'completed';
      state.uploads[idx].transactionCount = data.transactionCount;
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
      render();
      alert('✅ Success: ' + data.transactionCount + ' transactions imported');
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
