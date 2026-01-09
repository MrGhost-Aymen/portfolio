/* ===============================
   GenomeSec Research Shell v1.0
   Author: Aymen Ouamou
================================ */

document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("commandInput");
    const output = document.getElementById("output");
    const terminal = document.getElementById("terminal");
    const terminalContainer = document.getElementById("terminal-container");
    const hint = document.getElementById("autocompleteHint");
    const mirror = document.getElementById("inputMirror");

    let commandHistory = [];
    let historyIndex = -1;

    const SESSION_CPU = 72;
    const SESSION_RAM = 41;
    const SHELL_VERSION = "GenomeSec v1.1.0";

    const commands = {

        help: `
        <span class="category-header">-- Available Commands --</span><br>
        <b>whoami</b>        → researcher profile<br>
        <b>publications</b>  → publications & datasets<br>
        <b>research</b>      → research focus & directions<br>
        <b>projects</b>      → software & computational tools<br>
        <b>pipeline</b>      → organellar genome workflow<br>
        <b>tools</b>         → bioinformatics & security stack<br>
        <b>disclosures</b>   → responsible security disclosures<br>
        <b>cv</b>            → download curriculum vitae<br>
        <b>contact</b>       → professional contact<br>
        <b>clear / cls</b>   → clear terminal<br>
        <b>logout / exit</b> → terminate session<br><br>
        <span style="opacity:0.7">Aliases:</span> gh → github, ln → linkedin, fetch → neofetch, resume → cv
        `,

        neofetch: () => {
            const t = new Date().toLocaleString();
            const dnaSeq = Array.from({ length: 24 }, () => "ATGC"[Math.floor(Math.random() * 4)]).join("");
            const cpuLoad = SESSION_CPU;
            const ramLoad = SESSION_RAM;

            return `
<span class="research-accent">┌──────────────── SYSTEM OVERVIEW ────────────────┐</span>
<span class="research-accent">│</span> <span class="white">USER:</span> mrghost-aymen.github.io                 <span class="research-accent">│</span>
<span class="research-accent">│</span> <span class="white">TASK:</span> organellar_genome_assembly              <span class="research-accent">│</span>
<span class="research-accent">├──────────────── LIVE DATA STREAM ───────────────┤</span>
<span class="research-accent">│</span> <span class="white">SEQ:</span> <span class="green">${dnaSeq}</span>   <span class="research-accent">│</span>
<span class="research-accent">│</span> <span class="white">CPU:</span> [${"█".repeat(cpuLoad / 10)}${"░".repeat(10 - cpuLoad / 10)}] ${cpuLoad}%                     <span class="research-accent">│</span>
<span class="research-accent">│</span> <span class="white">RAM:</span> [${"█".repeat(ramLoad / 10)}${"░".repeat(10 - ramLoad / 10)}] ${ramLoad}%                     <span class="research-accent">│</span>
<span class="research-accent">├──────────────── RESEARCH NODE ──────────────────┤</span>
<span class="research-accent">│</span> <span class="white">DATASETS:</span> 1 plastomes | 1 mitogenomes        <span class="research-accent">│</span>
<span class="research-accent">│</span> <span class="white">ACCESS:</span> NCBI GenBank                         <span class="research-accent">│</span>
<span class="research-accent">│</span> <span class="white">STATUS:</span> <span class="green">OPERATIONAL</span>                     <span class="research-accent">│</span>
<span class="research-accent">├──────────────── SHELL INFO ─────────────────────┤</span>
<span class="research-accent">│</span> <span class="white">SHELL:</span> ${SHELL_VERSION}                    <span class="research-accent">│</span>
<span class="research-accent">└─────────────────────────────────────────────────┘</span>
<span class="white">SESSION:</span> ${t}<br><br>
<span class="accent-blue">Active Modules:</span> whoami, publications, research, projects, pipeline, tools, disclosures, cv, contact, github, linkedin, logout.
            `;
        },

        whoami: `
<b>Aymen Ouamou</b><br>
Doctoral researcher in computational genomics, specializing in Plants genome analysis, comparative genomics, RNA editing, and Dev bioinformatics pipelines.
        `,

        publications: `
<span class="category-header">-- Publications & Datasets --</span><br>

<b>[01] Artemisia ifranensis plastome and mitogenome</b><br>
Type: Organellar genome resources<br>
Status: Unpublished yet<br>
Repository: NCBI GenBank<br>
Scope: Assembly, annotation, comparative analysis<br><br>

<b>[02] RNA editing patterns in Asteraceae organelles</b><br>
Type: Comparative genomics study<br>
Status: Manuscript in preparation<br>
Focus: C-to-U editing, codon impact, evolutionary implications
        `,

        research: `
<span class="category-header">-- Research Focus --</span><br>
• Chloroplast and mitochondrial genome evolution in angiosperms<br>
• RNA editing mechanisms and functional consequences<br>
• Comparative genomics<br>
• Ka/Ks–based selection analysis of organellar genes<br>
        `,

        projects: `
<span class="category-header">-- Software & Computational Projects --</span><br>
<b>[P-01] Auto-Annotate Pro</b><br>
Python-based wrapper for organellar genome annotation and curation.<br>
Source: <a href="https://github.com/MrGhost-Aymen" target="_blank" class="green">GitHub</a><br><br>
        `,

        pipeline: `
<span class="research-accent">Restricted Workflow: Organellar Genome Pipeline</span><br>
<div class="pipeline-flow">
SRA retrieval → FastQC → Trimming → Host/contaminant filtering<br>
→ Genome assembly → BUSCO validation → Auto Annotation & curation → SNPs indentification across the closes species 
</div>
        `,

        tools: `
<b>Bioinformatics:</b> Galaxy, GeSeq, BUSCO, IRscope, TBtools ...<br>
<b>Security:</b> Burp Suite Pro, Nmap, Nuclei, Metasploit ...
        `,

        disclosures: `
<b>Responsible Security Disclosures</b><br>
• Meta: Stored XSS<br>
• Government infrastructure:  Blind SQL injection
        `,

        contact: `
<span class="category-header">-- Professional Contact --</span><br>
<b>Email:</b> <a href="mailto:ouamoa@gmail.com" class="green">ouamoa@gmail.com</a><br>
<b>Availability:</b> Open to PhD positions and research collaborations
        `,

        github: () => {
            window.open("https://github.com/MrGhost-Aymen", "_blank");
            return "Establishing secure link to GitHub...";
        },

        linkedin: () => {
            window.open("https://www.linkedin.com/in/aymen-o-shell/", "_blank");
            return "Syncing professional network...";
        },

        cv: () => {
            const link = document.createElement("a");
            link.href = "./Aymen.pdf";
            link.download = "Aymen.pdf";
            link.click();
            return "Accessing encrypted storage... CV download initiated.";
        },

        clear: () => {
            output.innerHTML = "";
            return null;
        },

        logout: () => {
            const wrapper = document.getElementById("terminal-wrapper");
            wrapper.style.transition = "all 2s ease";
            wrapper.style.filter = "blur(15px) brightness(0)";
            wrapper.style.transform = "scale(0.9)";

            setTimeout(() => {
                document.body.innerHTML = `
<div style="color:#00ff99;font-family:'Fira Code',monospace;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
<p style="font-size:1.5rem;">[ SESSION TERMINATED ]</p>
<button onclick="location.reload()" style="margin-top:25px;background:transparent;border:1px solid #00ff99;color:#00ff99;padding:10px 20px;cursor:pointer;">
RE-AUTHENTICATE
</button>
</div>`;
            }, 2000);

            return "De-authenticating session...";
        }
    };

    const aliases = {
        gh: "github",
        ln: "linkedin",
        cls: "clear",
        fetch: "neofetch",
        exit: "logout",
        resume: "cv",
        papers: "publications",
        pub: "publications"
    };

    const commandList = Object.keys(commands).concat(Object.keys(aliases));

    function typewriter(element, text, speed = 2) {
        let i = 0;
        input.disabled = true;

        function type() {
            if (i < text.length) {
                if (text[i] === "<") {
                    let tag = "";
                    while (text[i] !== ">" && i < text.length) tag += text[i++];
                    tag += ">";
                    element.innerHTML += tag;
                    i++;
                } else {
                    element.innerHTML += text[i++];
                }
                terminal.scrollTop = terminal.scrollHeight;
                setTimeout(type, speed);
            } else {
                input.disabled = false;
                input.focus();
            }
        }
        type();
    }

    async function processCommand(cmd) {
        cmd = cmd.toLowerCase().trim();
        if (!cmd) return;

        commandHistory.push(cmd);
        historyIndex = commandHistory.length;

        const actualCmd = aliases[cmd] || cmd;

        if (actualCmd === "clear") {
            commands.clear();
            return;
        }

        const commandLine = document.createElement("div");
        commandLine.className = "command-line";
        commandLine.innerHTML = `<span class="prompt">Mrghost-aymen.github.io:~$</span> ${cmd}`;
        output.appendChild(commandLine);

        await new Promise(r => setTimeout(r, 200));

        const resultLine = document.createElement("div");
        resultLine.className = "command-result";
        output.appendChild(resultLine);

        const response = typeof commands[actualCmd] === "function"
            ? commands[actualCmd]()
            : commands[actualCmd] || `Command not found: ${cmd}. Type 'help'.`;

        if (response) typewriter(resultLine, response);
        else input.disabled = false;
    }

    function updateAutocompleteHint() {
        const val = input.value;
        if (!val) {
            hint.textContent = "";
            return;
        }
        const match = commandList.find(c => c.startsWith(val));
        if (match) {
            hint.textContent = match.slice(val.length);
            mirror.textContent = val;
            hint.style.left = mirror.offsetWidth + 5 + "px";
        } else {
            hint.textContent = "";
        }
    }

    input.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            processCommand(input.value);
            input.value = "";
            hint.textContent = "";
        } else if (e.key === "Tab") {
            e.preventDefault();
            const match = commandList.find(c => c.startsWith(input.value));
            if (match) input.value = match;
        }
    });

    input.addEventListener("input", updateAutocompleteHint);
    terminalContainer.addEventListener("click", () => input.focus());

    function updateSystemStatus() {
        const bar = document.getElementById("progress-bar");
        const processName = document.getElementById("process-name");
        const processes = ["SEQ_ALIGN", "MITO_SEARCH", "DOI_INDEXING", "PHYLO_GEN"];
        let percent = 0;

        processName.textContent = processes[Math.floor(Math.random() * processes.length)];

        const interval = setInterval(() => {
            percent += 2;
            if (percent >= 100) {
                clearInterval(interval);
                setTimeout(updateSystemStatus, 3000);
            }
            const filled = Math.floor(percent / 10);
            bar.textContent = `[${"■".repeat(filled)}${"░".repeat(10 - filled)}] ${percent}%`;
        }, 150);
    }

    function createCommandBar() {
        const bar = document.getElementById("command-bar");
        const buttons = [
            ["Help", "help"],
            ["Whoami", "whoami"],
            ["Publications", "publications"],
            ["Research", "research"],
            ["Projects", "projects"],
            ["Pipeline", "pipeline"],
            ["CV", "cv"],
            ["Contact", "contact"],
            ["Neofetch", "neofetch"],
            ["GitHub", "github"],
            ["LinkedIn", "linkedin"],
            ["Logout", "logout"]
        ];

        bar.innerHTML = "";
        buttons.forEach(([label, cmd]) => {
            const btn = document.createElement("button");
            btn.textContent = label;
            btn.onclick = () => !input.disabled && processCommand(cmd);
            bar.appendChild(btn);
        });
    }

    async function bootSequence() {
        createCommandBar();
        updateSystemStatus();
        await new Promise(r => setTimeout(r, 800));
        processCommand("neofetch");
    }

    bootSequence();
});
