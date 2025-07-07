const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const estado = document.getElementById('estado');
const registros = document.getElementById('registros');
const fechaInput = document.getElementById('fecha');
const tipoSelect = document.getElementById('tipo');

let scanning = false;
let lastResult = null;

document.getElementById('iniciar').onclick = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    video.srcObject = stream;
    scanning = true;
    estado.textContent = 'Escaneando...';
    requestAnimationFrame(scan);
  } catch (error) {
    alert('No se pudo acceder a la cámara.');
    console.error(error);
  }
};

document.getElementById('detener').onclick = () => {
  scanning = false;
  const stream = video.srcObject;
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    video.srcObject = null;
  }
  estado.textContent = 'Escaneo detenido.';
};

function scan() {
  if (!scanning) return;
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const code = jsQR(imageData.data, canvas.width, canvas.height);
  if (code && code.data !== lastResult) {
    lastResult = code.data;
    registrarAsistencia(code.data);
  }
  requestAnimationFrame(scan);
}

function registrarAsistencia(qrData) {
  const fecha = fechaInput.value || new Date().toISOString().split('T')[0];
  const tipo = tipoSelect.value;

  estado.textContent = `QR detectado: ${qrData}`;
  agregarRegistroLocal(qrData, fecha, tipo);

  fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
    method: 'POST',
    body: new URLSearchParams({ qr: qrData, fecha, tipo })
  })
  .then(res => res.text())
  .then(res => {
    console.log('Respuesta del servidor:', res);
  })
  .catch(err => {
    console.error('Error al enviar a Google Sheets:', err);
  });
}

function agregarRegistroLocal(qr, fecha, tipo) {
  const li = document.createElement('li');
  li.textContent = `[${tipo.toUpperCase()}] ${qr} - ${fecha}`;
  registros.prepend(li);
}
