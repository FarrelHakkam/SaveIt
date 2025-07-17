// MineTrader Pro - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize UI components
  initNavigation();
  initModals();
  initCharts();
  initUserMenu();
  setupDemoData();
});

// Initialize navigation and sidebar functionality
function initNavigation() {
  const sidebar = document.getElementById('sidebar');
  const content = document.getElementById('content');
  const toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
  const closeSidebarBtn = document.getElementById('closeSidebar');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  // Toggle sidebar on mobile
  toggleSidebarBtn.addEventListener('click', function() {
    sidebar.classList.toggle('-translate-x-full');
  });

  // Close sidebar on mobile
  closeSidebarBtn.addEventListener('click', function() {
    sidebar.classList.add('-translate-x-full');
  });

  // Mobile menu toggle
  mobileMenuBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
      mobileMenu.classList.add('hidden');
    }
  });

  // Handle responsive layout
  function handleResize() {
    if (window.innerWidth >= 768) { // md breakpoint
      sidebar.classList.remove('-translate-x-full');
      content.classList.remove('ml-0');
      content.classList.add('md:ml-64');
    } else {
      sidebar.classList.add('-translate-x-full');
    }
  }

  // Initialize and listen for window resize
  handleResize();
  window.addEventListener('resize', handleResize);
}

// Initialize modals
function initModals() {
  const loginBtn = document.getElementById('loginBtn');
  const loginModal = document.getElementById('loginModal');
  const closeLoginModal = document.getElementById('closeLoginModal');
  const loginForm = document.getElementById('loginForm');
  const userMenuContainer = document.getElementById('userMenuContainer');
  const userMenuBtn = document.getElementById('userMenuBtn');
  const userMenu = document.getElementById('userMenu');
  const usernameEl = document.getElementById('username');

  // Open login modal
  loginBtn.addEventListener('click', function() {
    loginModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  });

  // Close login modal
  closeLoginModal.addEventListener('click', function() {
    loginModal.classList.add('hidden');
    document.body.style.overflow = ''; // Restore scrolling
  });

  // Close modal when clicking outside
  loginModal.addEventListener('click', function(event) {
    if (event.target === loginModal) {
      loginModal.classList.add('hidden');
      document.body.style.overflow = ''; // Restore scrolling
    }
  });

  // Handle login form submission
  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // For demo purposes, just check if fields are not empty
    if (email && password) {
      // Simulate successful login
      loginModal.classList.add('hidden');
      document.body.style.overflow = ''; // Restore scrolling
      
      // Update UI to logged in state
      loginBtn.classList.add('hidden');
      userMenuContainer.classList.remove('hidden');
      
      // Extract username from email
      const username = email.split('@')[0];
      usernameEl.textContent = username;
    }
  });

  // User menu toggle
  userMenuBtn.addEventListener('click', function() {
    userMenu.classList.toggle('hidden');
  });

  // Close user menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!userMenuBtn.contains(event.target) && !userMenu.contains(event.target)) {
      userMenu.classList.add('hidden');
    }
  });
}

// Initialize user menu functionality
function initUserMenu() {
  const userMenuBtn = document.getElementById('userMenuBtn');
  const userMenu = document.getElementById('userMenu');

  userMenuBtn.addEventListener('click', function() {
    userMenu.classList.toggle('hidden');
  });

  // Close user menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!userMenuBtn.contains(event.target) && !userMenu.contains(event.target)) {
      userMenu.classList.add('hidden');
    }
  });
}

function initCharts() {
  Chart.defaults.color = '#9ca3af';
  Chart.defaults.borderColor = 'rgba(75, 85, 99, 0.3)';
  Chart.defaults.font.family = "'Inter', 'Helvetica', 'Arial', sans-serif";

  initBalanceChart();
  initProfitChart();
  initDistributionChart();
  initMainPriceChart();
  initMiniCharts();
}

function initBalanceChart() {
  const balanceCtx = document.getElementById('balanceChart').getContext('2d');
  
  const balanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Balance',
      data: [85400, 92000, 88500, 97600, 116200, 128560],
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      borderColor: '#10b981',
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 0
    }]
  };
  
  new Chart(balanceCtx, {
    type: 'line',
    data: balanceData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        }
      },
      scales: {
        x: {
          display: false
        },
        y: {
          display: false
        }
      }
    }
  });
}

function initProfitChart() {
  const profitCtx = document.getElementById('profitChart').getContext('2d');
  
  const profitData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Profit/Loss',
      data: [520, 1120, -450, 890, -320, 1400, 3256],
      backgroundColor: function(context) {
        const index = context.dataIndex;
        const value = context.dataset.data[index];
        return value < 0 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)';
      },
      borderColor: function(context) {
        const index = context.dataIndex;
        const value = context.dataset.data[index];
        return value < 0 ? '#ef4444' : '#10b981';
      },
      borderWidth: 2
    }]
  };
  
  new Chart(profitCtx, {
    type: 'bar',
    data: profitData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        }
      },
      scales: {
        x: {
          display: false
        },
        y: {
          display: false
        }
      }
    }
  });
}

function initDistributionChart() {
  const distributionCtx = document.getElementById('distributionChart').getContext('2d');
  
  const distributionData = {
    labels: ['Gold', 'Silver', 'Lithium', 'Copper'],
    datasets: [{
      label: 'Distribution',
      data: [45, 25, 15, 15],
      backgroundColor: [
        '#f59e0b', // Gold (amber)
        '#94a3b8', // Silver (gray)
        '#3b82f6', // Lithium (blue)
        '#d97706'  // Copper (orange)
      ],
      borderWidth: 0
    }]
  };
  
  new Chart(distributionCtx, {
    type: 'doughnut',
    data: distributionData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        }
      }
    }
  });
}

function initMainPriceChart() {
  const mainChartCtx = document.getElementById('mainChart').getContext('2d');
  const chartAssetSelect = document.getElementById('chartAssetSelect');

  const chartData = {
    gold: generateChartData(1800, 1900, 365, 0.5),
    silver: generateChartData(22, 24, 365, 0.8),
    lithium: generateChartData(60, 70, 365, 1.2),
    copper: generateChartData(4, 4.6, 365, 0.7)
  };

  let currentAsset = 'gold';
  let mainChart = createMainChart(mainChartCtx, chartData[currentAsset], currentAsset);
  chartAssetSelect.addEventListener('change', function() {
    currentAsset = this.value;
    mainChart.destroy();
    mainChart = createMainChart(mainChartCtx, chartData[currentAsset], currentAsset);
  });
}

function createMainChart(ctx, data, assetType) {
  let primaryColor, gradientColor;
  
  switch(assetType) {
    case 'gold':
      primaryColor = '#f59e0b';
      gradientColor = 'rgba(245, 158, 11, 0.1)';
      break;
    case 'silver':
      primaryColor = '#94a3b8';
      gradientColor = 'rgba(148, 163, 184, 0.1)';
      break;
    case 'lithium':
      primaryColor = '#3b82f6';
      gradientColor = 'rgba(59, 130, 246, 0.1)';
      break;
    case 'copper':
      primaryColor = '#d97706';
      gradientColor = 'rgba(217, 119, 6, 0.1)';
      break;
    default:
      primaryColor = '#10b981';
      gradientColor = 'rgba(16, 185, 129, 0.1)';
  }
  
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, gradientColor);
  gradient.addColorStop(1, 'rgba(31, 41, 55, 0)');
  
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [{
        label: assetType.charAt(0).toUpperCase + assetType.slice(1) + ' Price',
        data: data.values,
        backgroundColor: gradient,
        borderColor: primaryColor,
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: primaryColor,
        pointHoverBorderColor: '#fff'
      }]
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
          display: false
        },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(31, 41, 55, 0.9)',
          titleColor: '#f9fafb',
          bodyColor: '#f9fafb',
          borderColor: 'rgba(75, 85, 99, 0.5)',
          borderWidth: 1,
          padding: 10,
          cornerRadius: 4,
          displayColors: false,
          callbacks: {
            label: function(context) {
              return `$${context.parsed.y.toFixed(2)}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            maxRotation: 0,
            maxTicksLimit: 6
          }
        },
        y: {
          grid: {
            color: 'rgba(75, 85, 99, 0.1)'
          },
          ticks: {
            callback: function(value) {
              return '$' + value;
            }
          }
        }
      }
    }
  });
}

function initMiniCharts() {
  const miniChartElements = document.querySelectorAll('.miniChart');
  
  miniChartElements.forEach(canvas => {
    const ctx = canvas.getContext('2d');
    const id = canvas.getAttribute('data-id');
    
    let data, color;
    
    switch(id) {
      case 'gold-chart':
        data = [1850, 1860, 1865, 1855, 1870, 1875, 1876];
        color = '#f59e0b';
        break;
      case 'silver-chart':
        data = [23.2, 23.5, 23.4, 23.6, 23.7, 23.5, 23.75];
        color = '#94a3b8';
        break;
      case 'lithium-chart':
        data = [68.5, 68.2, 68.0, 67.8, 67.5, 68.0, 67.92];
        color = '#3b82f6';
        break;
      case 'copper-chart':
        data = [4.37, 4.40, 4.42, 4.45, 4.48, 4.50, 4.52];
        color = '#d97706';
        break;
      default:
        data = [100, 102, 98, 101, 99, 103, 105];
        color = '#10b981';
    }
    
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['', '', '', '', '', '', ''],
        datasets: [{
          data: data,
          borderColor: color,
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        },
        scales: {
          x: {
            display: false
          },
          y: {
            display: false
          }
        }
      }
    });
  });
}


function generateChartData(min, max, days, volatility) {
  const values = [];
  const labels = [];
  let currentValue = (max + min) / 2;
  
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const change = (Math.random() - 0.5) * volatility;
    currentValue = Math.max(min, Math.min(max, currentValue * (1 + change)));
    values.push(currentValue);
    
    const date = new Date();
    date.setDate(now.getDate() - i);
    labels.push(formatDate(date));
  }
  
  return { values, labels };
}

function formatDate(date) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}`;
}

function setupDemoData() {
  setTimeout(() => {
    document.getElementById('username').textContent = 'Demo User';
  }, 1000);
}
              