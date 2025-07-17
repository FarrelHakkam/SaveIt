document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("depositForm");
  const nameInput = document.getElementById("depositName");
  const amountInput = document.getElementById("depositAmount");
  const paymentSelect = document.getElementById("paymentMethod");
  const listContainer = document.getElementById("depositList");

  const methodDetail = document.getElementById("methodDetail");
  const qrisSection = document.getElementById("qrisSection");
  const bankSection = document.getElementById("bankSection");
  const ewalletSection = document.getElementById("ewalletSection");

  const STORAGE_KEY = "saveitDeposits";

  function getDeposits() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  }

  function saveDeposits(deposits) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(deposits));
  }

  function renderDeposits() {
    const deposits = getDeposits();
    if (deposits.length === 0) {
      listContainer.innerHTML = "<p class='text-gray-400'>Belum ada data deposit</p>";
      return;
    }

    listContainer.innerHTML = `
      <h3 class="text-lg font-bold border-b border-gray-700 pb-2 mb-2">Riwayat Deposit</h3>
      ${deposits.map(dep => `
        <div class="bg-gray-700 p-3 rounded-md mb-2">
          <div class="flex justify-between">
            <span class="font-semibold">${dep.name}</span>
            <span class="text-emerald-400 font-semibold">Rp ${parseInt(dep.amount).toLocaleString('id-ID')}</span>
          </div>
          <div class="text-sm text-gray-400">Metode: ${dep.method}</div>
        </div>
      `).join("")}
    `;
  }

  paymentSelect.addEventListener("change", () => {
    methodDetail.classList.remove("hidden");
    qrisSection.classList.add("hidden");
    bankSection.classList.add("hidden");
    ewalletSection.classList.add("hidden");

    if (paymentSelect.value === "QRIS") {
      qrisSection.classList.remove("hidden");
    } else if (paymentSelect.value === "Transfer Bank") {
      bankSection.classList.remove("hidden");
    } else if (paymentSelect.value === "E-Wallet") {
      ewalletSection.classList.remove("hidden");
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const method = paymentSelect.value;

    if (!name || isNaN(amount) || amount <= 0) {
      alert("Harap isi data dengan benar!");
      return;
    }

    const deposits = getDeposits();
    deposits.push({ name, amount, method });
    saveDeposits(deposits);
    renderDeposits();

    form.reset();
    methodDetail.classList.add("hidden");
    qrisSection.classList.add("hidden");
    bankSection.classList.add("hidden");
    ewalletSection.classList.add("hidden");
  });

  renderDeposits();
});
