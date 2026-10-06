# Ders Programı Hazırlama (GitHub tabanlı)

Bölümlerin ders programı taleplerini ortak bir depoda toplar. Veri `data/` altındaki JSON dosyalarında durur (bölüm başına bir dosya), her kayıt bir git commit'idir, `index.html` GitHub Pages'ten çalışır.

## Kurulum (bir kez)
1. GitHub'da **herkese açık** yeni bir depo oluşturun (örn. `ders-programi`).
2. Bu klasörün tüm içeriğini (gizli `.github` klasörü dahil) depoya yükleyin. `main` dalında olsun.
3. **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main` / `(root)`. Adres: `https://KULLANICI.github.io/ders-programi/`. Araç kullanıcı ve depo adını bu adresten kendisi bulur.
4. **Settings → Actions → General**: Actions'ın açık olduğundan emin olun.
5. Düzenleyecek kişiler için erişim anahtarı üretin: **GitHub → Settings → Developer settings → Fine-grained tokens → Generate**. *Repository access* = yalnızca bu depo; *Permissions → Contents* = **Read and write**; süreyi dönem sonuna ayarlayın. Kişi, depoya yazma yetkisine sahip olmalıdır (**Settings → Collaborators** ile ekleyin; token yetkiyi aşamaz).

## Kullanım
- Sayfayı açan herkes programı **görür** (giriş gerekmez).
- Düzenlemek için sağ üstteki **Giriş** → token yapıştırılır (tarayıcıda saklanır; ortak bilgisayarda **Çıkış** yapın).
- Bölüm sekmesini seçin, "+ ders" ile ders girin. Her kayıt `data/<bölüm>.json` dosyasına commit olur; mesajda bölüm, ders ve saat yazar. Geçmiş: depoda *History*.
- Sayfa 45 saniyede bir yeni değişiklikleri çeker. Aynı anda aynı bölüm dosyasına yazılırsa araç kaydı yeni sürümün üzerine otomatik uygular.
- **Çakışma kuralları:** Aynı derslik aynı gün ve saatte, bölüm ve sınıf fark etmeden iki derse verilemez; araç böyle bir kaydı reddeder. Aynı bölümün farklı sınıflarının saatleri çakışabilir; aynı sınıfta çakışma ve hoca çakışması uyarıdır. Lisansta her bölümün 1–4. sınıf sekmeleri vardır; PDF çıktısında her sınıf ayrı sayfadır.
- **Çakışma gösterimi:** Araç, form açıkken ve listede hoca/derslik/sınıf çakışmasını bölümler arası gösterir. Ayrıca `Actions` her değişiklikte `scripts/kontrol.mjs` çalıştırır: derslik çakışması kırmızı ✗ (hata), hoca ve sınıf çakışması sarı uyarıdır.
- **Derslik:** Formdaki listeden seçilir (kapasiteler ders düzenine göre gösterilir). Listede olmayan için “+ Yeni derslik ekle…” seçilir; ad ve kapasite `data/derslikler.json` dosyasına kaydolur, herkesin listesinde görünür. Kontenjan girilirse kapasiteyi aşınca uyarı verilir.
- **Dönemi kilitlemek:** `data/donem.json` içinde `"kilit": true` yapın; düzenleme herkes için kapanır. Dönem adı da buradan gelir.
- `SBKY` dosyasında güncel program yüklü gelir; diğer bölümler boştur. Eski araçtaki yerel veriyi taşımak için *Yedekle* ile aldığınız dosyayı yeni araçta *Yükle* ile yükleyin.

## Nihai programı sitede yayınlama
`https://KULLANICI.github.io/ders-programi/data/sbky.json` gibi adresler herkese açık JSON verir; web sitenizdeki sayfa bunu okuyup tabloyu çizebilir (her değişiklikte HTML yapıştırmak gerekmez).

## Sınırlar
- Yazma yetkisi depo düzeyindedir: yetkili kişi teknik olarak başka bölümün dosyasını da değiştirebilir (geçmişte her commit görünür, geri alınabilir). Daha sıkı kontrol gerekirse bölüm dosyalarını `CODEOWNERS` + Pull Request akışına bağlayabiliriz.
- Veriler herkese açıktır; yalnızca yayımlanabilir bilgi girin.
- GitHub API, girişsiz kullanımda saatte 60 istekle sınırlıdır; araç yalnızca değişiklik olunca dosya çeker, bu yüzden normal kullanımda sorun olmaz.
