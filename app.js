const grammature = {
    "Sottotronchi": [2400, 2000, 1100],
    "Liste": [590, 390]
};

// Righe iniziali: UNA SOLA
let righe = [
    { L1: 16, L2: 16, pezzi: 0 }
];

function aggiungiRiga() {
    righe.push({ L1: 16, L2: 16, pezzi: 0 });
    render();
}

function updateGrammature() {
    const tipo = document.getElementById("tipo").value;
    const g = grammature[tipo];

    const select = document.getElementById("grammatura");
    select.innerHTML = "";

    g.forEach(v => {
        const opt = document.createElement("option");
        opt.value = v;
        opt.textContent = v;
        select.appendChild(opt);
    });

    render();
}

function render() {
    const grammatura = parseFloat(document.getElementById("grammatura").value);
    const coef = grammatura / 10000;

    let html = "";
    let totaleKg = 0;
    let totalePezzi = 0;

    righe.forEach((r, i) => {
        const grpz = r.L1 * r.L2 * coef;
        const pzcf = 5000 / grpz;
        const cf = r.pezzi > 0 ? Math.ceil(r.pezzi / pzcf) : 0;
        const kg = (grpz * r.pezzi) / 1000;

        totaleKg += kg;
        totalePezzi += r.pezzi;

        html += `
            <div class="card">
                <h3>Riga ${i + 1}</h3>

                <label>L1:</label>
                <input type="number" value="${r.L1}" onchange="updateL1(${i}, this.value)">

                <label>L2:</label>
                <input type="number" value="${r.L2}" onchange="updateL2(${i}, this.value)">

                <label>Pezzi richiesti:</label>
                <input type="number" value="${r.pezzi}" onchange="updatePezzi(${i}, this.value)">

                <p>gr/pz: ${grpz.toFixed(2)}</p>
                <p>pz/CF: ${pzcf.toFixed(2)}</p>
                <p>CF necessari: ${cf}</p>
                <p>Kg: ${kg.toFixed(2)}</p>

                <button class="removeBtn" onclick="rimuoviRiga(${i})">🗑️ Rimuovi riga</button>
            </div>
        `;
    });

    document.getElementById("righe").innerHTML = html;
    document.getElementById("totali").innerHTML =
        `Totale pezzi: ${totalePezzi} — Totale Kg: ${totaleKg.toFixed(2)}`;
}

function rimuoviRiga(i) {
    if (righe.length > 1) {
        righe.splice(i, 1);
        render();
    }
}

function updateL1(i, v) { righe[i].L1 = parseFloat(v); render(); }
function updateL2(i, v) { righe[i].L2 = parseFloat(v); render(); }
function updatePezzi(i, v) { righe[i].pezzi = parseInt(v); render(); }

updateGrammature();
function copiaRiepilogo() {
    const tipo = document.getElementById("tipo").value;
    const grammatura = document.getElementById("grammatura").value;

    let testo = `Tipo: ${tipo}\nGrammatura: ${grammatura}\n\n`;

    righe.forEach((r, i) => {
        const coef = grammatura / 10000;
        const grpz = r.L1 * r.L2 * coef;
        const pzcf = 5000 / grpz;
        const cf = r.pezzi > 0 ? Math.ceil(r.pezzi / pzcf) : 0;
        const kg = (grpz * r.pezzi) / 1000;

        testo += `Riga ${i + 1}:\n`;
        testo += `  L1: ${r.L1}\n`;
        testo += `  L2: ${r.L2}\n`;
        testo += `  Pezzi: ${r.pezzi}\n`;
        testo += `  gr/pz: ${grpz.toFixed(2)}\n`;
        testo += `  pz/CF: ${pzcf.toFixed(2)}\n`;
        testo += `  CF necessari: ${cf}\n`;
        testo += `  Kg: ${kg.toFixed(2)}\n\n`;
    });

    navigator.clipboard.writeText(testo)
        .then(() => {
            document.getElementById("copyStatus").textContent = "Riepilogo copiato!";
        })
        .catch(() => {
            const area = document.createElement("textarea");
            area.value = testo;
            document.body.appendChild(area);
            area.select();
            document.execCommand("copy");
            document.body.removeChild(area);
            document.getElementById("copyStatus").textContent = "Riepilogo copiato (fallback)";
        });
}
