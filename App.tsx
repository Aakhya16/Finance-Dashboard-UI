import * as React from 'react';
import {
  LayoutDashboard,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Search,
  Filter,
  Moon,
  Sun,
  MoreVertical,
  PieChart,
  History,
  Wallet,
  TrendingUp,
  CreditCard,
  Layers,
  Settings,
  LogOut,
  ChevronRight,
  User,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import './style.css';

// --- MOCK DATA ---
const INITIAL_TRANSACTIONS = [
  {
    id: 1,
    date: '2026-04-01',
    description: 'Monthly Salary',
    amount: 5000,
    category: 'Income',
    type: 'income',
  },
  {
    id: 2,
    date: '2026-04-01',
    description: 'Apartment Rent',
    amount: 1500,
    category: 'Housing',
    type: 'expense',
  },
  {
    id: 3,
    date: '2026-04-02',
    description: 'Grocery Store',
    amount: 120,
    category: 'Food',
    type: 'expense',
  },
  {
    id: 4,
    date: '2026-04-02',
    description: 'Netflix Subscription',
    amount: 15,
    category: 'Entertainment',
    type: 'expense',
  },
  {
    id: 5,
    date: '2026-04-03',
    description: 'Freelance Project',
    amount: 800,
    category: 'Income',
    type: 'income',
  },
  {
    id: 6,
    date: '2026-04-03',
    description: 'Dinner with friends',
    amount: 65,
    category: 'Food',
    type: 'expense',
  },
  {
    id: 7,
    date: '2026-03-28',
    description: 'Uber Ride',
    amount: 25,
    category: 'Transport',
    type: 'expense',
  },
  {
    id: 8,
    date: '2026-03-25',
    description: 'Electricity Bill',
    amount: 90,
    category: 'Utilities',
    type: 'expense',
  },
];

const TREND_DATA = [
  { name: 'Mon', balance: 3200 },
  { name: 'Tue', balance: 3150 },
  { name: 'Wed', balance: 3400 },
  { name: 'Thu', balance: 3320 },
  { name: 'Fri', balance: 4120 },
  { name: 'Sat', balance: 4050 },
  { name: 'Sun', balance: 4080 },
];

const CATEGORY_DATA = [
  { name: 'Housing', value: 1500, color: '#4f6ef7' },
  { name: 'Food', value: 450, color: '#f59e0b' },
  { name: 'Transport', value: 200, color: '#06b6d4' },
  { name: 'Entertainment', value: 150, color: '#ec4899' },
  { name: 'Others', value: 300, color: '#64748b' },
];

// --- COMPONENTS ---

const Badge = ({ type, children }) => (
  <span
    className={`category-badge ${
      type === 'income' ? 'amount-income' : 'amount-expense'
    }`}
    style={{
      background:
        type === 'income' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
      padding: '0.25rem 0.6rem',
      borderRadius: '0.5rem',
      fontSize: '0.75rem',
      fontWeight: '600',
    }}
  >
    {children}
  </span>
);

export default function App() {
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [darkMode, setDarkMode] = React.useState(false);
  const [role, setRole] = React.useState('admin');
  const [transactions, setTransactions] = React.useState(INITIAL_TRANSACTIONS);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterType, setFilterType] = React.useState('all');

  // Form State
  const [formData, setFormData] = React.useState({
    description: '',
    amount: '',
    category: 'Food',
    type: 'expense',
    date: new Date().toISOString().split('T')[0],
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark');
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    const newTx = {
      id: Date.now(),
      ...formData,
      amount: parseFloat(formData.amount),
    };
    setTransactions([newTx, ...transactions]);
    setIsModalOpen(false);
    setFormData({
      description: '',
      amount: '',
      category: 'Food',
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const totalBalance = transactions.reduce(
    (acc, curr) =>
      curr.type === 'income' ? acc + curr.amount : acc - curr.amount,
    0
  );
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = t.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const renderDashboard = () => (
    <>
      <div className="summary-grid">
        <div className="summary-card">
          <div className="summary-header">
            <span className="summary-label">Total Balance</span>
            <Wallet size={20} color="var(--primary)" />
          </div>
          <div className="summary-value">${totalBalance.toLocaleString()}</div>
          <div className="summary-change positive">+12.5% from last month</div>
        </div>
        <div className="summary-card">
          <div className="summary-header">
            <span className="summary-label">Income</span>
            <ArrowUpRight size={20} color="var(--success)" />
          </div>
          <div className="summary-value">${totalIncome.toLocaleString()}</div>
          <div className="summary-change positive">+8.2%</div>
        </div>
        <div className="summary-card">
          <div className="summary-header">
            <span className="summary-label">Expenses</span>
            <ArrowDownRight size={20} color="var(--danger)" />
          </div>
          <div className="summary-value">${totalExpenses.toLocaleString()}</div>
          <div className="summary-change negative">+4.1%</div>
        </div>
      </div>

      <div className="chart-grid">
        <div className="chart-card">
          <h3 className="chart-title">Balance Trend</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <AreaChart data={TREND_DATA}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--primary)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--primary)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--border)"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.5rem',
                    color: 'var(--text)',
                  }}
                  itemStyle={{ color: 'var(--primary)' }}
                />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="var(--primary)"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorBalance)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="chart-card">
          <h3 className="chart-title">Spending by Category</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <RePieChart>
                <Pie
                  data={CATEGORY_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {CATEGORY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.5rem',
                  }}
                />
              </RePieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ marginTop: '1rem' }}>
            {CATEGORY_DATA.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: item.color,
                    }}
                  ></div>
                  <span
                    style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}
                  >
                    {item.name}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: 'var(--text)',
                  }}
                >
                  ${item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
          }}
        >
          <h3 className="chart-title" style={{ marginBottom: 0 }}>
            Recent Transactions
          </h3>
          <button
            className="btn btn-ghost"
            onClick={() => setActiveTab('transactions')}
          >
            View All
          </button>
        </div>
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Category</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.slice(0, 5).map((t) => (
              <tr key={t.id} className="transaction-row">
                <td>{t.description}</td>
                <td>
                  <Badge type={t.type}>{t.category}</Badge>
                </td>
                <td style={{ color: 'var(--text-muted)' }}>{t.date}</td>
                <td
                  className={
                    t.type === 'income' ? 'amount-income' : 'amount-expense'
                  }
                >
                  {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderTransactions = () => (
    <div className="card">
      <div className="transaction-filters">
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
            }}
          />
          <input
            type="text"
            placeholder="Search transactions..."
            className="filter-input"
            style={{ paddingLeft: '2.5rem', width: '100%' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="filter-input"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button className="btn btn-ghost">
          <Filter size={18} />
          More Filters
        </button>
      </div>

      <table className="transaction-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Date</th>
            <th>Amount</th>
            {role === 'admin' && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((t) => (
              <tr key={t.id} className="transaction-row">
                <td style={{ fontWeight: '500' }}>{t.description}</td>
                <td>
                  <Badge type={t.type}>{t.category}</Badge>
                </td>
                <td style={{ color: 'var(--text-muted)' }}>{t.date}</td>
                <td
                  className={
                    t.type === 'income' ? 'amount-income' : 'amount-expense'
                  }
                  style={{ fontSize: '1rem' }}
                >
                  {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                </td>
                {role === 'admin' && (
                  <td>
                    <button
                      className="btn btn-ghost"
                      style={{ padding: '0.25rem' }}
                    >
                      <MoreVertical size={16} />
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={role === 'admin' ? 5 : 4}>
                <div className="empty-state">
                  <div className="empty-state-icon">🔍</div>
                  <p>No transactions found matching your criteria.</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderInsights = () => (
    <div className="insights-grid">
      <div className="insight-card">
        <div
          style={{
            background: 'rgba(79, 110, 247, 0.1)',
            width: 40,
            height: 40,
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyCenter: 'center',
            marginBottom: '1rem',
            color: 'var(--primary)',
          }}
        >
          <TrendingUp size={24} style={{ margin: 'auto' }} />
        </div>
        <div className="insight-title">Highest Spending Category</div>
        <div className="insight-value">Housing</div>
        <div className="insight-description">
          You spent $1,500 on housing this month, which is 62% of your total
          expenses.
        </div>
      </div>
      <div className="insight-card">
        <div
          style={{
            background: 'rgba(34, 197, 94, 0.1)',
            width: 40,
            height: 40,
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyCenter: 'center',
            marginBottom: '1rem',
            color: 'var(--success)',
          }}
        >
          <PieChart size={24} style={{ margin: 'auto' }} />
        </div>
        <div className="insight-title">Savings Rate</div>
        <div className="insight-value">58%</div>
        <div className="insight-description">
          Excellent! Your savings rate is well above the recommended 20%.
        </div>
      </div>
      <div className="insight-card">
        <div
          style={{
            background: 'rgba(245, 158, 11, 0.1)',
            width: 40,
            height: 40,
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyCenter: 'center',
            marginBottom: '1rem',
            color: 'var(--warning)',
          }}
        >
          <ArrowUpRight size={24} style={{ margin: 'auto' }} />
        </div>
        <div className="insight-title">Subscription Alert</div>
        <div className="insight-value">Netflix</div>
        <div className="insight-description">
          Your Netflix subscription was charged yesterday. You have 3 other
          active subscriptions.
        </div>
      </div>
    </div>
  );

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div
            style={{
              background: 'var(--primary)',
              width: 32,
              height: 32,
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
            }}
          >
            <Wallet size={18} />
          </div>
          FinDash
        </div>

        <nav className="sidebar-nav">
          <div
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={20} />
            Overview
          </div>
          <div
            className={`nav-item ${
              activeTab === 'transactions' ? 'active' : ''
            }`}
            onClick={() => setActiveTab('transactions')}
          >
            <History size={20} />
            Transactions
          </div>
          <div
            className={`nav-item ${activeTab === 'insights' ? 'active' : ''}`}
            onClick={() => setActiveTab('insights')}
          >
            <PieChart size={20} />
            Insights
          </div>
        </nav>

        <div style={{ marginTop: 'auto' }}>
          <div className="nav-item">
            <Settings size={20} />
            Settings
          </div>
          <div className="nav-item">
            <LogOut size={20} />
            Logout
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="header">
          <h2 className="header-title">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>
          <div className="header-actions">
            <div className="role-switcher">
              <button
                className={`role-btn ${role === 'viewer' ? 'active' : ''}`}
                onClick={() => setRole('viewer')}
              >
                Viewer
              </button>
              <button
                className={`role-btn ${role === 'admin' ? 'active' : ''}`}
                onClick={() => setRole('admin')}
              >
                Admin
              </button>
            </div>

            <button className="btn btn-ghost" onClick={toggleDarkMode}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {role === 'admin' && (
              <button
                className="btn btn-primary"
                onClick={() => setIsModalOpen(true)}
              >
                <Plus size={20} />
                Add Transaction
              </button>
            )}

            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <User size={20} color="var(--text-muted)" />
            </div>
          </div>
        </header>

        <div className="content">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'transactions' && renderTransactions()}
          {activeTab === 'insights' && renderInsights()}
        </div>
      </main>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 className="modal-header">Add New Transaction</h3>
            <form onSubmit={handleAddTransaction}>
              <div className="form-group">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                }}
              >
                <div className="form-group">
                  <label className="form-label">Amount</label>
                  <input
                    type="number"
                    className="form-input"
                    required
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select
                    className="form-input"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-input"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option>Food</option>
                  <option>Housing</option>
                  <option>Transport</option>
                  <option>Entertainment</option>
                  <option>Income</option>
                  <option>Utilities</option>
                </select>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
