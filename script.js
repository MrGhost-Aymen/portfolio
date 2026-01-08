document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("commandInput");
    const output = document.getElementById("output");
    const terminal = document.getElementById("terminal");
    const terminalContainer = document.getElementById("terminal-container");
    const hint = document.getElementById("autocompleteHint");
    const mirror = document.getElementById("inputMirror");

    let commandHistory = [];
    let historyIndex = -1;

    // --- Commands Object (Help Removed, Neofetch Updated) ---
    const commands = {
        neofetch: () => {
            const t = new Date().toLocaleString();
            return `<pre class="fetch-output">
      <span class="research-accent">.</span>          
     <span class="research-accent">/ \\</span>         <span class="research-accent">GenomeSec Research Shell</span>
    <span class="research-accent">| <span class="white">S</span> |</span>        ────────────────────────────────
   <span class="research-accent">/ <span class="white">DNA</span> \\</span>       <span class="white">User</span>        : <span class="research-accent">Aymen Ouamou</span>
  <span class="research-accent">|  <span class="white">| |</span>  |</span>      <span class="white">Affiliation</span> : PhD Researcher
   <span class="research-accent">\\ <span class="white">V V</span> /</span>       <span class="white">Email</span>       : <span class="white">Ouamoa@gmail.com</span>
    <span class="research-accent">| <span class="white">_</span> |</span>        <span class="white">Focus</span>       : Plants Genomics
     <span class="research-accent">\\ /</span>         <span class="white">Session</span>     : ${t}
      <span class="research-accent">'</span>          ────────────────────────────────
      
      <span class="accent-blue">Active Modules:</span> whoami, research, projects, pipeline, 
      cv, contact, github, linkedin, clear, logout.
</pre>`;
        },

        whoami: `<b>Aymen Ouamou</b><br>Doctoral researcher specializing in computational genomics with a focus on chloroplast and mitochondrial genome analysis, evolutionary inference, and security assessment of scientific data pipelines.`,

        research: `
        <span class="category-header">-- Published Research & Data --</span><br>
        <b>[01] Artemisia ifranensis Organellar Genomes</b><br>
        Status: Published (NCBI/GenBank)<br>
        DOI: <a href="https://doi.org/10.XXXX/example1" target="_blank" class="green">10.XXXX/example1</a><br>
        <br>
        <b>[02] Comparative Analysis of RNA Editing in Asteraceae</b><br>
        Status: In Preparation / Manuscript<br>
        DOI: <span style="opacity:0.5">PENDING_ASSIGNMENT</span><br>`,

        projects: `
        <span class="category-header">-- Computational & Sec Projects --</span><br>
        <b>[P-01] Auto-Annotate Pro</b><br>
        Python-based wrapper for chloroplast genome annotation curation.<br>
        Source: <a href="https://github.com/MrGhost-Aymen" target="_blank" class="green">GitHub Repo</a><br>
        <br>
        <b>[P-02] Bio-Sec Pipeline Auditor</b><br>
        Tool for scanning bioinformatics workflows for common vulnerabilities.<br>
        Source: <a href="https://github.com/MrGhost-Aymen" target="_blank" class="green">GitHub Repo</a><br>`,

        pipeline: `
        <span class="research-accent">Restricted Workflow: Organellar Genome Pipeline</span><br>
        <div class="pipeline-flow">
        SRA retrieval → FastQC → Trimming<br>
        → Host and contaminant filtering<br>
        → Genome assembly<br>
        → BUSCO validation<br>
        → Functional annotation and curation
        </div>`,

        contact: `
        <span class="category-header">-- Secure Communication --</span><br>
        <b>Primary Email:</b> <a href="mailto:ouamoa@gmail.com" class="green">ouamoa@gmail.com</a><br>
        <b>Availability:</b> Open for PhD collaborations & Security consulting.`,

        pentest: `<b>Penetration Testing Experience</b><br>• Web application security testing<br>• Infrastructure and API assessment<br>• Secure deployment review for data-driven systems`,

        disclosures: `<b>Responsible Security Disclosures</b><br>• <b>Meta (Facebook):</b> Privilege escalation<br>• <b>Microsoft:</b> Intune and Exchange Admin vulnerabilities<br>• <b>Gov:</b> Stored XSS in government infrastructure`,

        tools: `<b>Bioinformatics:</b> Galaxy, GeSeq, BUSCO, IRscope, TBtools<br><b>Security:</b> Burp Suite, Nmap, Nuclei, Metasploit, Sliver C2`,

        github: () => {
            window.open("https://github.com/MrGhost-Aymen", "_blank");
            return "Establishing secure link to GitHub: @MrGhost-Aymen...";
        },

        linkedin: () => {
            window.open("https://www.linkedin.com/in/aymen-o-shell/", "_blank");
            return "Syncing professional network with LinkedIn...";
        },

        cv: () => {
            const link = document.createElement('a');
            link.href = './Aymen.pdf'; 
            link.download = 'Aymen.pdf';
            link.click();
            return "Accessing encrypted storage... Download of Aymen.pdf started.";
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
                    <div style="color: #00ff99; font-family: 'Fira Code', monospace; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; text-align: center;">
                        <p style="font-size: 1.5rem;">[ SESSION TERMINATED ]</p>
                        <button onclick="location.reload()" style="margin-top: 25px; background: transparent; border: 1px solid #00ff99; color: #00ff99; padding: 10px 20px; cursor: pointer;">RE-AUTHENTICATE</button>
                    </div>`;
            }, 2000);
            return "De-authenticating session...";
        }
    };

    const aliases = { gh: "github", ln: "linkedin", cls: "clear", fetch: "neofetch", exit: "logout", resume: "cv" };
    const commandList = Object.keys(commands).concat(Object.keys(aliases));

    function typewriter(element, text, speed = 2) {
        let i = 0;
        input.disabled = true;
        function type() {
            if (i < text.length) {
                if (text.charAt(i) === "<") {
                    let tag = "";
                    while (text.charAt(i) !== ">" && i < text.length) { tag += text.charAt(i); i++; }
                    tag += ">"; element.innerHTML += tag; i++;
                } else { element.innerHTML += text.charAt(i); i++; }
                terminal.scrollTop = terminal.scrollHeight;
                setTimeout(type, speed);
            } else {
                input.disabled = false;
                input.focus();
                terminal.scrollTop = terminal.scrollHeight;
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
        if (actualCmd === "clear") { commands.clear(); return; }
        const commandLine = document.createElement("div");
        commandLine.classList.add("command-line");
        commandLine.innerHTML = `<span class="prompt">researcher@aymen:~$</span> ${cmd}`;
        output.appendChild(commandLine);
        terminal.scrollTop = terminal.scrollHeight;
        await new Promise(r => setTimeout(r, 300));
        const response = typeof commands[actualCmd] === "function" ? commands[actualCmd]() : commands[actualCmd] || `Command not found: ${cmd}.`;
        const resultLine = document.createElement("div");
        resultLine.classList.add("command-result");
        output.appendChild(resultLine);
        if (response) typewriter(resultLine, response);
        else { input.disabled = false; input.focus(); terminal.scrollTop = terminal.scrollHeight; }
    }

    function createCommandBar() {
        const bar = document.getElementById("command-bar");
        const buttonConfig = [
            { label: "Whoami", cmd: "whoami" },
            { label: "Research", cmd: "research" },
            { label: "Projects", cmd: "projects" },
            { label: "Pipeline", cmd: "pipeline" },
            { label: "CV", cmd: "cv" },
            { label: "Contact", cmd: "contact" },
            { label: "Neofetch", cmd: "neofetch" },
            { label: "Github", cmd: "github" },
            { label: "Linkedin", cmd: "linkedin" },
            { label: "Logout", cmd: "logout" }
        ];
        bar.innerHTML = "";
        buttonConfig.forEach(item => {
            const btn = document.createElement("button");
            btn.textContent = item.label;
            if (item.cmd === "cv" || item.cmd === "contact") btn.style.borderColor = "#00d9ff";
            if (item.cmd === "logout") btn.style.borderColor = "#ff5555";
            btn.onclick = () => { if (!input.disabled) processCommand(item.cmd); };
            bar.appendChild(btn);
        });
    }

    // --- AUTO-BOOT LOGIC ---
    async function bootSequence() {
        createCommandBar();
        updateSystemStatus();
        // Wait for the initial HTML "Initializing..." text to settle
        await new Promise(r => setTimeout(r, 1000));
        processCommand("neofetch");
    }

    // Existing helper functions (autocomplete, system status, etc.)
    function updateSystemStatus() {
        const bar = document.getElementById("progress-bar");
        const processName = document.getElementById("process-name");
        const processes = ["SEQ_ALIGN", "MITO_SEARCH", "DOI_INDEXING", "PHYLO_GEN"];
        let percent = 0;
        processName.textContent = processes[Math.floor(Math.random() * processes.length)];
        const interval = setInterval(() => {
            percent += 2;
            if (percent >= 100) { clearInterval(interval); setTimeout(updateSystemStatus, 3000); }
            const filled = Math.floor(percent / 10);
            bar.textContent = `[${"■".repeat(filled)}${"░".repeat(10-filled)}] ${percent}%`;
        }, 150);
    }

    function updateAutocompleteHint() {
        const val = input.value;
        if (!val) { hint.textContent = ""; return; }
        const match = commandList.find(c => c.startsWith(val));
        if (match) {
            hint.textContent = match.slice(val.length);
            mirror.textContent = val;
            hint.style.left = (mirror.offsetWidth + 5) + "px";
        } else { hint.textContent = ""; }
    }

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") { processCommand(input.value); input.value = ""; hint.textContent = ""; }
        else if (e.key === "Tab") { e.preventDefault(); const match = commandList.find(c => c.startsWith(input.value)); if (match) input.value = match; }
    });

    input.addEventListener("input", updateAutocompleteHint);
    terminalContainer.addEventListener("click", () => input.focus());
    
    bootSequence(); // Start the auto-boot
});
