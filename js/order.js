document.addEventListener('DOMContentLoaded', function () {

    const orderForm = document.getElementById('orderForm');
    const orderTableBody = document.getElementById('orderTableBody');
    const searchInput = document.getElementById('searchInput');
    const emptyState = document.getElementById('emptyState');
    const orderCount = document.getElementById('orderCount');
    const toastElement = document.getElementById('orderToast');

    const STORAGE_KEY = 'kopikita-orders';

    let orders = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    function renderTable(data) {
        if (!data) data = orders;
        orderTableBody.innerHTML = '';

        if (data.length === 0) {
            emptyState.style.display = 'block';
            if (orderCount) orderCount.textContent = '0';
            return;
        }

        emptyState.style.display = 'none';
        if (orderCount) orderCount.textContent = data.length;

        data.forEach(function (order, index) {
            const row = document.createElement('tr');
            row.classList.add('animate-fadeInUp');
            row.innerHTML = `
        <td>${getOriginalIndex(order) + 1}</td>
        <td><strong>${escapeHtml(order.nama)}</strong></td>
        <td><span class="badge bg-coffee">${escapeHtml(order.menu)}</span></td>
        <td>${order.jumlah}</td>
        <td>${escapeHtml(order.alamat)}</td>
        <td>
          <button class="btn-delete" onclick="deleteOrder(${getOriginalIndex(order)})" title="Hapus pesanan">
            <i class="bi bi-trash-fill"></i> Hapus
          </button>
        </td>
      `;
            orderTableBody.appendChild(row);
        });
    }

    function getOriginalIndex(order) {
        return orders.findIndex(o =>
            o.nama === order.nama &&
            o.menu === order.menu &&
            o.jumlah === order.jumlah &&
            o.alamat === order.alamat &&
            o.timestamp === order.timestamp
        );
    }

    // ---------- Save to localStorage ----------
    function saveOrders() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    }

    // ---------- Escape HTML ----------
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ---------- Show toast ----------
    function showToast(message) {
        if (toastElement) {
            const toastBody = toastElement.querySelector('.toast-body');
            if (toastBody) toastBody.textContent = message;
            const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
            toast.show();
        }
    }

    // ---------- Validate form ----------
    function validateForm(nama, menu, jumlah, alamat) {
        let isValid = true;

        // Reset errors
        clearErrors();

        if (!nama.trim()) {
            showError('nama', 'Nama pelanggan wajib diisi');
            isValid = false;
        }

        if (!menu) {
            showError('menu', 'Pilih menu terlebih dahulu');
            isValid = false;
        }

        if (!jumlah || jumlah <= 0) {
            showError('jumlah', 'Jumlah harus berupa angka positif');
            isValid = false;
        }

        if (!alamat.trim()) {
            showError('alamat', 'Alamat wajib diisi');
            isValid = false;
        }

        return isValid;
    }

    // ---------- Show error ----------
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.classList.add('is-invalid');
            const feedback = field.nextElementSibling;
            if (feedback && feedback.classList.contains('invalid-feedback')) {
                feedback.textContent = message;
            }
        }
    }

    // ---------- Clear errors ----------
    function clearErrors() {
        document.querySelectorAll('.is-invalid').forEach(el => {
            el.classList.remove('is-invalid');
        });
    }

    // ---------- Form submit ----------
    if (orderForm) {
        orderForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nama = document.getElementById('nama').value;
            const menu = document.getElementById('menu').value;
            const jumlah = parseInt(document.getElementById('jumlah').value);
            const alamat = document.getElementById('alamat').value;

            if (!validateForm(nama, menu, jumlah, alamat)) {
                return;
            }

            const order = {
                nama: nama.trim(),
                menu: menu,
                jumlah: jumlah,
                alamat: alamat.trim(),
                timestamp: Date.now()
            };

            orders.push(order);
            saveOrders();
            renderTable();
            orderForm.reset();
            clearErrors();
            showToast(`Pesanan ${order.nama} berhasil ditambahkan! ☕`);
        });

        // Remove is-invalid on input
        orderForm.querySelectorAll('input, select, textarea').forEach(el => {
            el.addEventListener('input', function () {
                this.classList.remove('is-invalid');
            });
        });
    }

    // ---------- Delete order ----------
    window.deleteOrder = function (index) {
        if (index >= 0 && index < orders.length) {
            const deletedName = orders[index].nama;
            orders.splice(index, 1);
            saveOrders();

            // Re-apply search filter if active
            if (searchInput && searchInput.value.trim()) {
                filterOrders(searchInput.value.trim());
            } else {
                renderTable();
            }

            showToast(`Pesanan ${deletedName} berhasil dihapus`);
        }
    };

    // ---------- Search / Filter ----------
    function filterOrders(query) {
        const q = query.toLowerCase();
        const filtered = orders.filter(order =>
            order.nama.toLowerCase().includes(q) ||
            order.menu.toLowerCase().includes(q)
        );
        renderTable(filtered);
    }

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const query = this.value.trim();
            if (query) {
                filterOrders(query);
            } else {
                renderTable();
            }
        });
    }

    // ---------- Initial render ----------
    renderTable();
});
