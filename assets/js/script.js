fetch("data/school.json")

.then(response => response.json())

.then(data => {


/* =========================
   META TITLE
========================= */

document.title =
data.schoolName +
" | " +
data.event.name;



/* =========================
   HERO
========================= */

document.getElementById("hero-title").innerHTML =
data.hero.title;


document.getElementById("hero-description").innerHTML =
data.hero.description;



/* =========================
   EVENT
========================= */

document.getElementById("event-name").innerHTML =
data.event.name;


document.getElementById("event-date").innerHTML =
data.event.date;



/* =========================
   BELIEFS
========================= */


let beliefHTML = "";


data.beliefs.forEach(item => {


beliefHTML += `


<div class="card belief-card">


<img 
src="${item.image}" 
alt="${item.title}"
class="belief-icon"
>


<h3>

${item.title}

</h3>


<p>

${item.description}

</p>


</div>


`;


});


document.getElementById(
"belief-container"
).innerHTML = beliefHTML;





/* =========================
   THROUGH
========================= */


let throughHTML = "";


data.through.forEach(item => {


throughHTML += `


<div class="card">


<h3>

${item.title}

</h3>


<p>

${item.description}

</p>


</div>


`;


});


document.getElementById(
"through-container"
).innerHTML = throughHTML;



});


/* ===================================================
   KOREKSI/TAMBAHAN: GOOGLE SHEETS + WHATSAPP REDIRECT
   =================================================== */

// 1. Masukkan URL Web App dari Google Apps Script Anda (yang berakhiran /exec)
const gasWebhookUrl = "https://script.google.com/macros/s/AKfycbx8-DmWcWij-OEww1VxbndJmJRw3OpkUsCvdQxRAOIuRbokF6e6XVkpj890x_34iaT_Uw/exec";

// 2. Masukkan Nomor WhatsApp resmi Panitia Sekolah Athalia (Gunakan kode negara, contoh: 6282113866890)
const nomorWaSekolah = "6282113866890"; 

const btnSubmit = document.getElementById("btn-submit");

if (btnSubmit) {
  btnSubmit.addEventListener("click", function (e) {
    e.preventDefault();

    // Ambil data nilai dari input form
    const namaOrangTua = document.getElementById("input-ortu").value.trim();
    const whatsapp = document.getElementById("input-wa").value.trim();
    const namaAnak = document.getElementById("input-anak").value.trim();
    const unit = document.getElementById("input-unit").value;

    // Validasi input kosong
    if (!namaOrangTua || !whatsapp || !namaAnak || !unit) {
      alert("Mohon lengkapi semua data pendaftaran terlebih dahulu.");
      return;
    }

    // Ubah status tombol saat memproses pendaftaran
    btnSubmit.disabled = true;
    btnSubmit.innerText = "Memproses Pendaftaran...";

    // Siapkan payload data untuk dikirim ke Google Sheet
    const formData = {
      namaOrangTua: namaOrangTua,
      whatsapp: whatsapp,
      namaAnak: namaAnak,
      unit: unit
    };

    // Alur: Kirim data ke Google Sheet dahulu via API Fetch POST
    fetch(gasWebhookUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(() => {
      // Susun template teks pesan WhatsApp
      const teksWa = `Halo Panitia Open House *Sekolah Athalia*,\n\nSaya ingin melakukan konfirmasi pendaftaran Open House 2026.\n\n*Data Pendaftar:*\n📝 Nama Orang Tua: ${namaOrangTua}\n📱 No. WhatsApp: ${whatsapp}\n👦 Nama Anak: ${namaAnak}\n🏫 Unit Pilihan: ${unit}\n\nMohon informasi dan konfirmasi tiket kehadiran selanjutnya. Terima kasih!`;

      // Encode pesan teks agar aman dibaca sebagai URL browser
      const urlWhatsapp = `https://wa.me/${nomorWaSekolah}?text=${encodeURIComponent(teksWa)}`;

      // Buka chat WhatsApp di tab baru browser
      window.open(urlWhatsapp, "_blank");

      // Reset form isian setelah pendaftaran berhasil
      document.getElementById("input-ortu").value = "";
      document.getElementById("input-wa").value = "";
      document.getElementById("input-anak").value = "";
      document.getElementById("input-unit").value = "";
      
      alert("Data Anda telah tercatat! Anda akan dialihkan ke WhatsApp untuk menerima konfirmasi tiket pendaftaran.");
    })
    .catch(error => {
      console.error("Error pendaftaran:", error);
      alert("Terjadi kendala koneksi saat mendaftar. Silakan coba lagi.");
    })
    .finally(() => {
      // Kembalikan tombol ke kondisi aktif semula
      btnSubmit.disabled = false;
      btnSubmit.innerText = "Daftar Sekarang";
    });
  });
}
