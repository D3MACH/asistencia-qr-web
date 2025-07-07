// Este es un esqueleto base, luego se reemplazará por lógica real del paso 3
const scriptURL = "URL_DEL_SCRIPT_WEB_APP"; // Reemplaza con tu URL de Apps Script

function onScanSuccess(decodedText, decodedResult) {
    console.log(`QR code detected: ${decodedText}`);
    document.getElementById("datos").textContent = "ID detectado: " + decodedText;
    document.getElementById("beep").play();
}

const html5QrCode = new Html5Qrcode("reader");
Html5Qrcode.getCameras().then(devices => {
    if (devices && devices.length) {
        html5QrCode.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: 250 },
            onScanSuccess
        );
    }
});

function descargarResumen() {
    alert("Función de exportación aún no implementada completamente.");
}