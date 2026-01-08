document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("commandInput");
    const output = document.getElementById("output");
    const terminal = document.getElementById("terminal");
    const terminalContainer = document.getElementById("terminal-container");
    const hint = document.getElementById("autocompleteHint");
    const mirror = document.getElementById("inputMirror");

    let commandHistory = [];
    let historyIndex = -1;

    // --- Research & Identity Data ---
    const helpMessage = `
    <span class="category-header">-- Academic & Research --</span><br>
    <b>whoami</b>       - Professional identity & focus<br>
    <b>research</b>     - PhD research areas<br>
    <b>methods</b>      - Methodological expertise<br>
    <b>publications</b> - Publications and data assets<br>
    <b>pipeline</b>     - Plants genome workflow<br>
    <br>
    <span class="category-header">-- Security & Systems --</span><br>
    <b>pentest</b>      - Security testing experience<br>
    <b>disclosures</b>  - Responsible security disclosures<br>
    <b>tools</b>        - Technical toolkit (Bio & Sec)<br>
    <b>stack</b>        - Technical stack & languages<br>
    <br>
    <span class="category-header">-- External & Session --</span><br>
    <b>cv</b>           - Download Resume (PDF)<br>
    <b>linkedin</b>     - Professional profile<br>
    <b>github</b>       - Code repositories<br>
    <b>neofetch</b>     - Display session info<br>
    <b>clear</b>        - Wipe the terminal screen<br>
    <b>logout</b>       - Terminate secure session<br>
    `;

    const commands = {
        help: helpMessage,

        neofetch: () => {
            const t = new Date().toLocaleString();
            return `<pre class="fetch-output">
      <span class="research-accent">.</span>          
     <span class="research-accent">/ \\</span>         <span class="research-accent">GenomeSec Research Shell</span>
    <span class="research-accent">| <span class="white">S</span> |</span>        ────────────────────────────────
   <span class="research-accent">/ <span class="white">DNA</span> \\</span>       <span class="white">User</span>        : <span class="research-accent">Aymen Ouamou</span>
  <span class="research-accent">|  <span class="white">| |</span>  |</span>      <span class="white">Affiliation</span> : PhD Researcher
   <span class="research-accent">\\ <span class="white">V V</span> /</span>       <span class="white">Domains</span>     : Bioinformatics & Security
    <span class="research-accent">| <span class="white">_</span> |</span>        <span class="white">Focus</span>       : Plants Genomics
     <span class="research-accent">\\ /</span>         <span class="white">Session</span>     : ${t}
      <span class="research-accent">'</span>          ────────────────────────────────
</pre>`;
        },

        whoami: `<b>Aymen Trso</b><br>Doctoral researcher specializing in computational genomics with a focus on chloroplast and mitochondrial genome analysis, evolutionary inference, and security assessment of scientific data pipelines.`,

        research: `<b>Research Focus</b><br>• Plant genomics<br>• RNA editing characterization<br>• Codon usage and selection pressure analysis (Ka/Ks)<br>• Comparative phylogenomics<br>• Reproducible and secure bioinformatics workflows`,

        methods: `<b>Methodological Expertise</b><br>• Illumina read quality control and trimming<br>• De novo and reference-guided assembly<br>• BUSCO-based completeness assessment<br>• Automated and manual genome annotation<br>• Phylogenetic reconstruction and comparative analysis`,

        publications: `<b>Publications and Data</b><br>• Organellar genomes of <i>Artemisia ifranensis</i> (GenBank)<br>• Manuscripts in preparation on RNA editing and genome evolution`,

        pipeline: `
        <span class="research-accent">Restricted Workflow: Organellar Genome Pipeline</span><br>
        <div class="pipeline-flow">
        SRA retrieval → FastQC → Trimming<br>
        → Host and contaminant filtering<br>
        → Genome assembly<br>
        → BUSCO validation<br>
        → Functional annotation and curation
        </div>`,

        pentest: `<b>Penetration Testing Experience</b><br>• Web application security testing<br>• Infrastructure and API assessment<br>• Threat modeling for research platforms<br>• Secure deployment review for data-driven systems`,

        disclosures: `<b>Responsible Security Disclosures</b><br>• <b>Meta (Facebook):</b> Privilege escalation<br>• <b>Microsoft:</b> Intune and Exchange Admin vulnerabilities<br>• <b>Gov:</b> Stored XSS in government infrastructure (via CERT-In)`,

        tools: `<b>Bioinformatics:</b> Galaxy, GeSeq, BUSCO, IRscope, TBtools<br><b>Security:</b> Burp Suite, Nmap, Nuclei, Metasploit, Sliver C2<br><b>Systems:</b> Linux (Kali/Debian), Git, Docker`,

        stack: `<b>Technical Stack</b><br>Operating System : Linux<br>Languages        : Python, JavaScript, Bash<br>Data Formats     : FASTA, GFF3, GenBank, SAM/BAM`,

        github: () => {
            window.open("https://github.com/MrGhost-Aymen", "_blank");
            return "Establishing secure link to GitHub: @MrGhost-Aymen...";
        },

        linkedin: () => {
            window.open("https://www.linkedin.com/in/aymen-o-shell/", "_blank");
            return "Syncing professional network with LinkedIn: Aymen Trso...";
        },

        cv: () => {
            const link = document.createElement('a');
            link.href = '/Aymen.pdf'; 
            link.download = 'Aymen.pdf';
            link.click();
            return "Accessing encrypted storage... Fetching CV_Aymen.pdf... Download started.";
        },

        clear: () => {
            output.innerHTML = "";
            updateSystemStatus();
            return null;
        },

        logout: () => {
            const wrapper = document.getElementById("terminal-wrapper");
            wrapper.style.transition = "all 2s ease";
            wrapper.style.filter = "blur(15px) brightness(0)";
            wrapper.style.transform = "scale(0.9)";
            wrapper.style.pointerEvents = "none";
            
            setTimeout(() => {
                document.body.innerHTML = `
                    <div style="color: #00ff99; font-family: 'Fira Code', monospace; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; text-align: center;">
                        <p style="font-size: 1.5rem;">[ SESSION TERMINATED ]</p>
                        <p style="opacity: 0.5; margin-top: 10px;">Connection to GenomeSec node closed successfully.</p>
                        <button onclick="location.reload()" style="margin-top: 25px; background: transparent; border: 1px solid #00ff99; color: #00ff99; padding: 10px 20px; cursor: pointer; font-family: inherit;">RE-AUTHENTICATE</button>
                    </div>
                `;
            }, 2000);
            return "Wiping session cache... Closing encrypted tunnels... De-authenticating...";
        }
    };

    const aliases = { gh: "github", ln: "linkedin", h: "help", cls: "clear", fetch: "neofetch", exit: "logout", resume: "cv" };
    const commandList = Object.keys(commands).concat(Object.keys(aliases));

    // --- Live DNA Sequencing Progress ---
    function updateSystemStatus() {
        const bar = document.getElementById("progress-bar");
        const processName = document.getElementById("process-name");
        const processes = ["MITO_ANNOTATE", "PLASTOME_SEQ", "KAS_CALC", "PHYLO_RECON", "SRA_FILTER"];
        
        let percent = 0;
        processName.textContent = processes[Math.floor(Math.random() * processes.length)];

        const interval = setInterval(() => {
            percent += Math.floor(Math.random() * 4) + 1;
            if (percent >= 100) {
                percent = 100;
                clearInterval(interval);
                setTimeout(updateSystemStatus, 5000);
            }
            const filled = Math.floor(percent / 10);
            const empty = 10 - filled;
            bar.textContent = `[${"■".repeat(filled)}${"░".repeat(empty)}] ${percent}%`;
        }, 600);
    }

    // --- Typewriter Logic ---
    function typewriter(element, text, speed = 5) {
        let i = 0;
        input.disabled = true;

        function type() {
            if (i < text.length) {
                if (text.charAt(i) === "<") {
                    let tag = "";
                    while (text.charAt(i) !== ">" && i < text.length) {
                        tag += text.charAt(i);
                        i++;
                    }
                    tag += ">";
                    element.innerHTML += tag;
                    i++;
                } else {
                    element.innerHTML += text.charAt(i);
                    i++;
                }
                setTimeout(type, speed);
                terminal.scrollTop = terminal.scrollHeight;
            } else {
                input.disabled = false;
                input.focus();
            }
        }
        type();
    }

    // --- Process Command with Analytical Delay ---
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
        commandLine.classList.add("command-line");
        commandLine.innerHTML = `<span class="prompt">researcher@aymen:~$</span> ${cmd}`;
        output.appendChild(commandLine);

        const loadingLine = document.createElement("div");
        loadingLine.classList.add("command-result");
        loadingLine.style.opacity = "0.5";
        loadingLine.innerHTML = `<i>Querying research database...</i>`;
        output.appendChild(loadingLine);
        
        input.disabled = true;
        terminal.scrollTop = terminal.scrollHeight;

        await new Promise(resolve => setTimeout(resolve, 800));
        loadingLine.remove();

        const response = typeof commands[actualCmd] === "function"
            ? commands[actualCmd]()
            : commands[actualCmd] || `Command not found: ${cmd}. Type 'help' for database access.`;

        const resultLine = document.createElement("div");
        resultLine.classList.add("command-result");
        output.appendChild(resultLine);

        if (response) {
            typewriter(resultLine, response);
        } else {
            input.disabled = false;
            input.focus();
        }
    }

    function updateAutocompleteHint() {
        const val = input.value;
        if (!val) { hint.textContent = ""; return; }
        const match = commandList.find(c => c.startsWith(val));
        if (match) {
            hint.textContent = match.slice(val.length);
            mirror.textContent = val;
            hint.style.left = (mirror.offsetWidth + 5) + "px";
        } else {
            hint.textContent = "";
        }
    }

    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            processCommand(input.value);
            input.value = "";
            hint.textContent = "";
        } else if (e.key === "ArrowRight" || e.key === "Tab") {
            e.preventDefault();
            const match = commandList.find(c => c.startsWith(input.value));
            if (match) input.value = match;
            hint.textContent = "";
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[historyIndex];
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                input.value = "";
            }
        }
    });

    function createCommandBar() {
        const bar = document.getElementById("command-bar");
        const buttons = ["Help", "Whoami", "Pipeline", "Curriculum Vitae", "Github", "Linkedin", "Clear", "logout"];
        bar.innerHTML = "";
        buttons.forEach(cmd => {
            const btn = document.createElement("button");
            btn.textContent = cmd;
            if (cmd === "cv") btn.style.borderColor = "#00d9ff";
            if (cmd === "logout") btn.style.borderColor = "#ff5555";
            btn.onclick = () => { if (!input.disabled) processCommand(cmd); };
            bar.appendChild(btn);
        });
    }

    input.addEventListener("input", updateAutocompleteHint);
    terminalContainer.addEventListener("click", () => input.focus());
    
    updateSystemStatus();
    createCommandBar();
});
