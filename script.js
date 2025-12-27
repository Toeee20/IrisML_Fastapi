// CREATE
async function createItem(name, description) {
    const res = await fetch("http://localhost:8000/items/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ name, description })
    });
    return await res.json();
  }
  
  // READ ALL
  async function getItems() {
    const res = await fetch("http://localhost:8000/items/");
    return await res.json();
  }
  
  // UPDATE
  async function updateItem(id, name, description) {
    const res = await fetch(`http://localhost:8000/items/${id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ name, description })
    });
    return await res.json();
  }
  
  // DELETE
  async function deleteItem(id) {
    const res = await fetch(`http://localhost:8000/items/${id}`, {
      method: "DELETE"
    });
    return await res.json();
  }  
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('iris-form');
    const resultDiv = document.getElementById('result');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        resultDiv.className = '';
        resultDiv.textContent = 'Predicting...';
        try {
            const data = Object.fromEntries(new FormData(form));
            // Validasi: ganti koma jadi titik & pastikan angka valid
            Object.keys(data).forEach(k => {
                data[k] = data[k].replace(',', '.');
                data[k] = parseFloat(data[k]);
            });
            // Kirim ke backend
            const res = await fetch('http://localhost:8000/predict', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error((await res.json()).detail || "API error");
            const json = await res.json();
            let kelas = ["Setosa 🌼", "Versicolor 🌺", "Virginica 🪻"];
            resultDiv.textContent = "Hasil prediksi: " + kelas[json.class_label] + ` (label ${json.class_label})`;
            resultDiv.className = 'success';
        } catch (err) {
            resultDiv.textContent = "Terjadi error: " + (err.message || err);
            resultDiv.className = 'error';
        }
    });
});
