document.addEventListener("DOMContentLoaded", function () {
  const storedData = JSON.parse(localStorage.getItem("depositHistory")) || [];

  const names = storedData.map(item => item.name);
  const amounts = storedData.map(item => item.amount);
  const timestamps = storedData.map((_, index) => `Transaksi ${index + 1}`);

  const colors = [
    "#34d399", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#10b981"
  ];

  // PIE CHART
  const pieCtx = document.getElementById("pieChart").getContext("2d");
  new Chart(pieCtx, {
    type: "doughnut",
    data: {
      labels: names,
      datasets: [{
        label: "Deposit",
        data: amounts,
        backgroundColor: colors,
        borderWidth: 2,
        borderColor: "#0f172a"
      }]
    },
    options: {
      plugins: {
        legend: { labels: { color: "#f1f5f9" } },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.label}: Rp ${ctx.formattedValue}`
          }
        }
      }
    }
  });

  // BAR CHART
  const barCtx = document.getElementById("barChart").getContext("2d");
  new Chart(barCtx, {
    type: "bar",
    data: {
      labels: names,
      datasets: [{
        label: "Jumlah Deposit",
        data: amounts,
        backgroundColor: "#3b82f6"
      }]
    },
    options: {
      scales: {
        x: { ticks: { color: "#f1f5f9" } },
        y: {
          ticks: {
            color: "#f1f5f9",
            callback: val => `Rp ${val}`
          }
        }
      },
      plugins: {
        legend: { labels: { color: "#f1f5f9" } }
      }
    }
  });

  // LINE CHART
  const lineCtx = document.getElementById("lineChart").getContext("2d");
  new Chart(lineCtx, {
    type: "line",
    data: {
      labels: timestamps,
      datasets: [{
        label: "Urutan Deposit",
        data: amounts,
        fill: false,
        borderColor: "#f59e0b",
        tension: 0.3,
        pointBackgroundColor: "#facc15",
        pointBorderColor: "#f59e0b"
      }]
    },
    options: {
      scales: {
        x: { ticks: { color: "#f1f5f9" } },
        y: {
          ticks: {
            color: "#f1f5f9",
            callback: val => `Rp ${val}`
          }
        }
      },
      plugins: {
        legend: { labels: { color: "#f1f5f9" } }
      }
    }
  });
});
