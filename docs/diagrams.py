# -*- coding: utf-8 -*-
"""
Vector SVG Diagram Generators for EduVault Mini Project Report.
Contains 23 publication-grade vector graphics for Chapters 1, 2, 3, 4, and 5.
"""

def svg_fig1_1():
    # Figure 1.1: High-level architectural dataflow
    return """
    <div style="text-align: center; margin: 8px 0;">
      <svg width="600" height="90" viewBox="0 0 600 90" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eff6ff"/><stop offset="100%" stop-color="#dbeafe"/></linearGradient>
          <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f0fdf4"/><stop offset="100%" stop-color="#dcfce7"/></linearGradient>
          <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fefce8"/><stop offset="100%" stop-color="#fef9c3"/></linearGradient>
          <linearGradient id="g4" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#faf5ff"/><stop offset="100%" stop-color="#f3e8ff"/></linearGradient>
          <linearGradient id="g5" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fff1f2"/><stop offset="100%" stop-color="#ffe4e6"/></linearGradient>
          <linearGradient id="g6" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ecfeff"/><stop offset="100%" stop-color="#cffafe"/></linearGradient>
          <marker id="arr1" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#475569"/>
          </marker>
        </defs>

        <!-- Stage 1 -->
        <rect x="5" y="15" width="82" height="52" rx="5" fill="url(#g1)" stroke="#3b82f6" stroke-width="1.2"/>
        <text x="46" y="34" font-family="'Times New Roman', serif" font-size="8pt" font-weight="bold" fill="#1e3a8a" text-anchor="middle">Stage 1</text>
        <text x="46" y="49" font-family="'Times New Roman', serif" font-size="7pt" fill="#1e40af" text-anchor="middle">JWT Auth &amp; RBAC</text>

        <line x1="87" y1="41" x2="105" y2="41" stroke="#475569" stroke-width="1.2" marker-end="url(#arr1)"/>

        <!-- Stage 2 -->
        <rect x="105" y="15" width="82" height="52" rx="5" fill="url(#g2)" stroke="#22c55e" stroke-width="1.2"/>
        <text x="146" y="34" font-family="'Times New Roman', serif" font-size="8pt" font-weight="bold" fill="#14532d" text-anchor="middle">Stage 2</text>
        <text x="146" y="49" font-family="'Times New Roman', serif" font-size="7pt" fill="#166534" text-anchor="middle">Student Locker</text>

        <line x1="187" y1="41" x2="205" y2="41" stroke="#475569" stroke-width="1.2" marker-end="url(#arr1)"/>

        <!-- Stage 3 -->
        <rect x="205" y="15" width="82" height="52" rx="5" fill="url(#g3)" stroke="#eab308" stroke-width="1.2"/>
        <text x="246" y="34" font-family="'Times New Roman', serif" font-size="8pt" font-weight="bold" fill="#713f12" text-anchor="middle">Stage 3</text>
        <text x="246" y="49" font-family="'Times New Roman', serif" font-size="7pt" fill="#854d0e" text-anchor="middle">File Validation</text>

        <line x1="287" y1="41" x2="305" y2="41" stroke="#475569" stroke-width="1.2" marker-end="url(#arr1)"/>

        <!-- Stage 4 -->
        <rect x="305" y="15" width="82" height="52" rx="5" fill="url(#g4)" stroke="#a855f7" stroke-width="1.2"/>
        <text x="346" y="34" font-family="'Times New Roman', serif" font-size="8pt" font-weight="bold" fill="#581c87" text-anchor="middle">Stage 4</text>
        <text x="346" y="49" font-family="'Times New Roman', serif" font-size="7pt" fill="#6b21a8" text-anchor="middle">Committee Verify</text>

        <line x1="387" y1="41" x2="405" y2="41" stroke="#475569" stroke-width="1.2" marker-end="url(#arr1)"/>

        <!-- Stage 5 -->
        <rect x="405" y="15" width="82" height="52" rx="5" fill="url(#g5)" stroke="#f43f5e" stroke-width="1.2"/>
        <text x="446" y="34" font-family="'Times New Roman', serif" font-size="8pt" font-weight="bold" fill="#881337" text-anchor="middle">Stage 5</text>
        <text x="446" y="49" font-family="'Times New Roman', serif" font-size="7pt" fill="#9f1239" text-anchor="middle">Placement Talent</text>

        <line x1="487" y1="41" x2="505" y2="41" stroke="#475569" stroke-width="1.2" marker-end="url(#arr1)"/>

        <!-- Stage 6 -->
        <rect x="505" y="15" width="88" height="52" rx="5" fill="url(#g6)" stroke="#06b6d4" stroke-width="1.2"/>
        <text x="549" y="34" font-family="'Times New Roman', serif" font-size="8pt" font-weight="bold" fill="#164e63" text-anchor="middle">Stage 6</text>
        <text x="549" y="49" font-family="'Times New Roman', serif" font-size="7pt" fill="#155e75" text-anchor="middle">QR Key Dossier</text>
      </svg>
    </div>
    """

def svg_fig1_2():
    # Figure 1.2: Four-tier technology architecture
    return """
    <div style="text-align: center; margin: 8px 0;">
      <svg width="600" height="210" viewBox="0 0 600 210" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arr2" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#334155"/>
          </marker>
        </defs>

        <!-- Client Tier Box -->
        <rect x="330" y="8" width="250" height="75" rx="5" fill="#f8fafc" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,3"/>
        <text x="455" y="22" font-family="'Times New Roman', serif" font-size="8pt" fill="#64748b" text-anchor="middle">Client Tier (Browser &amp; Mobile)</text>
        
        <rect x="345" y="28" width="220" height="46" rx="4" fill="#eff6ff" stroke="#3b82f6" stroke-width="1"/>
        <text x="455" y="45" font-family="'Times New Roman', serif" font-size="8.5pt" font-weight="bold" fill="#1e3a8a" text-anchor="middle">React 18 + Vite SPA</text>
        <text x="455" y="60" font-family="'Times New Roman', serif" font-size="7.5pt" fill="#2563eb" text-anchor="middle">Tailwind CSS | Lucide Icons | QRCode.react</text>

        <!-- Testing Box -->
        <rect x="20" y="8" width="180" height="65" rx="5" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
        <text x="110" y="22" font-family="'Times New Roman', serif" font-size="8pt" fill="#64748b" text-anchor="middle">Testing &amp; QA Tier</text>
        <rect x="35" y="28" width="150" height="36" rx="4" fill="#f1f5f9" stroke="#64748b" stroke-width="1"/>
        <text x="110" y="50" font-family="'Times New Roman', serif" font-size="8pt" font-weight="bold" fill="#334155" text-anchor="middle">Postman &amp; Django TestClient</text>

        <!-- Line Down from Client -->
        <line x1="455" y1="83" x2="455" y2="105" stroke="#334155" stroke-width="1.2" marker-end="url(#arr2)"/>
        <text x="480" y="96" font-family="'Times New Roman', serif" font-size="7pt" fill="#475569">HTTPS / REST JSON</text>

        <!-- Line from QA to API -->
        <line x1="110" y1="73" x2="230" y2="110" stroke="#334155" stroke-width="1" stroke-dasharray="2,2" marker-end="url(#arr2)"/>

        <!-- API Tier Box -->
        <rect x="180" y="108" width="400" height="45" rx="5" fill="#f0fdf4" stroke="#22c55e" stroke-width="1.2"/>
        <text x="380" y="125" font-family="'Times New Roman', serif" font-size="8.5pt" font-weight="bold" fill="#14532d" text-anchor="middle">FastAPI / Django REST Framework 6.0 on Gunicorn WSGI</text>
        <text x="380" y="140" font-family="'Times New Roman', serif" font-size="7.5pt" fill="#166534" text-anchor="middle">SimpleJWT Authentication | WhiteNoise Static Middleware | Python 3.11</text>

        <!-- Line Down to DB -->
        <line x1="380" y1="153" x2="380" y2="170" stroke="#334155" stroke-width="1.2" marker-end="url(#arr2)"/>

        <!-- Persistence Tier -->
        <rect x="250" y="170" width="260" height="32" rx="5" fill="#faf5ff" stroke="#a855f7" stroke-width="1.2"/>
        <text x="380" y="189" font-family="'Times New Roman', serif" font-size="8pt" font-weight="bold" fill="#581c87" text-anchor="middle">PostgreSQL 16 (Neon Serverless Cloud)</text>
      </svg>
    </div>
    """

def svg_fig1_3():
    # Figure 1.3: Summary breakdown of technology ecosystem
    return """
    <div style="text-align: center; margin: 8px 0;">
      <svg width="600" height="150" viewBox="0 0 600 150" xmlns="http://www.w3.org/2000/svg">
        <!-- 5 Pillar Cards -->
        <!-- Card 1 -->
        <rect x="10" y="10" width="108" height="130" rx="5" fill="#eff6ff" stroke="#3b82f6" stroke-width="1"/>
        <rect x="10" y="10" width="108" height="24" rx="5" fill="#3b82f6"/>
        <text x="64" y="26" font-family="'Times New Roman', serif" font-size="8pt" font-weight="bold" fill="#fff" text-anchor="middle">Frontend Tier</text>
        <text x="16" y="48" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" fill="#1e3a8a">• React 18.2</text>
        <text x="16" y="64" font-family="'Times New Roman', serif" font-size="7pt" fill="#1e40af">• Vite 5 Bundler</text>
        <text x="16" y="80" font-family="'Times New Roman', serif" font-size="7pt" fill="#1e40af">• Tailwind CSS</text>
        <text x="16" y="96" font-family="'Times New Roman', serif" font-size="7pt" fill="#1e40af">• Lucide React</text>
        <text x="16" y="112" font-family="'Times New Roman', serif" font-size="7pt" fill="#1e40af">• Axios HTTP</text>
        <text x="16" y="128" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#3b82f6">• QRCode.react</text>

        <!-- Card 2 -->
        <rect x="128" y="10" width="108" height="130" rx="5" fill="#f0fdf4" stroke="#22c55e" stroke-width="1"/>
        <rect x="128" y="10" width="108" height="24" rx="5" fill="#22c55e"/>
        <text x="182" y="26" font-family="'Times New Roman', serif" font-size="8pt" font-weight="bold" fill="#fff" text-anchor="middle">Backend Core</text>
        <text x="134" y="48" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" fill="#14532d">• Django 6.0</text>
        <text x="134" y="64" font-family="'Times New Roman', serif" font-size="7pt" fill="#166534">• Django REST</text>
        <text x="134" y="80" font-family="'Times New Roman', serif" font-size="7pt" fill="#166534">• Python 3.11</text>
        <text x="134" y="96" font-family="'Times New Roman', serif" font-size="7pt" fill="#166534">• Gunicorn WSGI</text>
        <text x="134" y="112" font-family="'Times New Roman', serif" font-size="7pt" fill="#166534">• WhiteNoise</text>
        <text x="134" y="128" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#22c55e">• CORS Headers</text>

        <!-- Card 3 -->
        <rect x="246" y="10" width="108" height="130" rx="5" fill="#faf5ff" stroke="#a855f7" stroke-width="1"/>
        <rect x="246" y="10" width="108" height="24" rx="5" fill="#a855f7"/>
        <text x="300" y="26" font-family="'Times New Roman', serif" font-size="8pt" font-weight="bold" fill="#fff" text-anchor="middle">Database Tier</text>
        <text x="252" y="48" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" fill="#581c87">• PostgreSQL 16</text>
        <text x="252" y="64" font-family="'Times New Roman', serif" font-size="7pt" fill="#6b21a8">• Neon Cloud</text>
        <text x="252" y="80" font-family="'Times New Roman', serif" font-size="7pt" fill="#6b21a8">• Serverless Pool</text>
        <text x="252" y="96" font-family="'Times New Roman', serif" font-size="7pt" fill="#6b21a8">• psycopg2-binary</text>
        <text x="252" y="112" font-family="'Times New Roman', serif" font-size="7pt" fill="#6b21a8">• Django ORM</text>
        <text x="252" y="128" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#a855f7">• Auto-Migrations</text>

        <!-- Card 4 -->
        <rect x="364" y="10" width="108" height="130" rx="5" fill="#fff1f2" stroke="#f43f5e" stroke-width="1"/>
        <rect x="364" y="10" width="108" height="24" rx="5" fill="#f43f5e"/>
        <text x="418" y="26" font-family="'Times New Roman', serif" font-size="8pt" font-weight="bold" fill="#fff" text-anchor="middle">Security &amp; Auth</text>
        <text x="370" y="48" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" fill="#881337">• SimpleJWT</text>
        <text x="370" y="64" font-family="'Times New Roman', serif" font-size="7pt" fill="#9f1239">• PBKDF2 Hash</text>
        <text x="370" y="80" font-family="'Times New Roman', serif" font-size="7pt" fill="#9f1239">• 4-Role RBAC</text>
        <text x="370" y="96" font-family="'Times New Roman', serif" font-size="7pt" fill="#9f1239">• UUIDv4 Tokens</text>
        <text x="370" y="112" font-family="'Times New Roman', serif" font-size="7pt" fill="#9f1239">• HTTPS / TLS</text>
        <text x="370" y="128" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#f43f5e">• XSS Sanitization</text>

        <!-- Card 5 -->
        <rect x="482" y="10" width="108" height="130" rx="5" fill="#fefce8" stroke="#eab308" stroke-width="1"/>
        <rect x="482" y="10" width="108" height="24" rx="5" fill="#eab308"/>
        <text x="536" y="26" font-family="'Times New Roman', serif" font-size="8pt" font-weight="bold" fill="#713f12" text-anchor="middle">Cloud &amp; DevOps</text>
        <text x="488" y="48" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" fill="#713f12">• Vercel Edge CDN</text>
        <text x="488" y="64" font-family="'Times New Roman', serif" font-size="7pt" fill="#854d0e">• Render Web Svc</text>
        <text x="488" y="80" font-family="'Times New Roman', serif" font-size="7pt" fill="#854d0e">• GitHub CI/CD</text>
        <text x="488" y="96" font-family="'Times New Roman', serif" font-size="7pt" fill="#854d0e">• Auto Deploy</text>
        <text x="488" y="112" font-family="'Times New Roman', serif" font-size="7pt" fill="#854d0e">• Environment Vars</text>
        <text x="488" y="128" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#ca8a04">• Health Checks</text>
      </svg>
    </div>
    """

def svg_fig2_1():
    # Figure 2.1: Four-tier system architecture
    return """
    <div style="text-align: center; margin: 8px 0;">
      <svg width="600" height="210" viewBox="0 0 600 210" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arr3" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#334155"/>
          </marker>
        </defs>

        <!-- Tier 1 -->
        <rect x="20" y="8" width="125" height="185" rx="5" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.2"/>
        <text x="82" y="26" font-family="'Times New Roman', serif" font-size="8.5pt" font-weight="bold" fill="#1e3a8a" text-anchor="middle">Tier 1</text>
        <text x="82" y="39" font-family="'Times New Roman', serif" font-size="7.5pt" fill="#1e40af" text-anchor="middle">Presentation</text>
        <line x1="28" y1="46" x2="137" y2="46" stroke="#bfdbfe"/>
        <rect x="28" y="52" width="109" height="30" rx="4" fill="#ffffff" stroke="#93c5fd"/>
        <text x="82" y="70" font-family="'Times New Roman', serif" font-size="7pt" fill="#1e3a8a" text-anchor="middle">Student Locker</text>
        <rect x="28" y="88" width="109" height="30" rx="4" fill="#ffffff" stroke="#93c5fd"/>
        <text x="82" y="106" font-family="'Times New Roman', serif" font-size="7pt" fill="#1e3a8a" text-anchor="middle">Committee Queue</text>
        <rect x="28" y="124" width="109" height="30" rx="4" fill="#ffffff" stroke="#93c5fd"/>
        <text x="82" y="142" font-family="'Times New Roman', serif" font-size="7pt" fill="#1e3a8a" text-anchor="middle">Placement Portal</text>
        <rect x="28" y="160" width="109" height="24" rx="4" fill="#ffffff" stroke="#93c5fd"/>
        <text x="82" y="176" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#1e3a8a" text-anchor="middle">Public QR Dossier</text>

        <!-- Arrow Tier 1 to 2 -->
        <line x1="145" y1="100" x2="175" y2="100" stroke="#334155" stroke-width="1.2" marker-end="url(#arr3)"/>

        <!-- Tier 2 -->
        <rect x="175" y="8" width="120" height="185" rx="5" fill="#f0fdf4" stroke="#22c55e" stroke-width="1.2"/>
        <text x="235" y="26" font-family="'Times New Roman', serif" font-size="8.5pt" font-weight="bold" fill="#14532d" text-anchor="middle">Tier 2</text>
        <text x="235" y="39" font-family="'Times New Roman', serif" font-size="7.5pt" fill="#166534" text-anchor="middle">API &amp; Security</text>
        <line x1="183" y1="46" x2="287" y2="46" stroke="#bbf7d0"/>
        <rect x="183" y="55" width="104" height="34" rx="4" fill="#ffffff" stroke="#86efac"/>
        <text x="235" y="75" font-family="'Times New Roman', serif" font-size="7pt" fill="#14532d" text-anchor="middle">Django REST Views</text>
        <rect x="183" y="98" width="104" height="34" rx="4" fill="#ffffff" stroke="#86efac"/>
        <text x="235" y="118" font-family="'Times New Roman', serif" font-size="7pt" fill="#14532d" text-anchor="middle">SimpleJWT &amp; RBAC</text>
        <rect x="183" y="142" width="104" height="34" rx="4" fill="#ffffff" stroke="#86efac"/>
        <text x="235" y="162" font-family="'Times New Roman', serif" font-size="7pt" fill="#14532d" text-anchor="middle">CORS &amp; Proxy Gate</text>

        <!-- Arrow Tier 2 to 3 -->
        <line x1="295" y1="100" x2="325" y2="100" stroke="#334155" stroke-width="1.2" marker-end="url(#arr3)"/>

        <!-- Tier 3 -->
        <rect x="325" y="8" width="120" height="185" rx="5" fill="#fefce8" stroke="#eab308" stroke-width="1.2"/>
        <text x="385" y="26" font-family="'Times New Roman', serif" font-size="8.5pt" font-weight="bold" fill="#713f12" text-anchor="middle">Tier 3</text>
        <text x="385" y="39" font-family="'Times New Roman', serif" font-size="7.5pt" fill="#854d0e" text-anchor="middle">Domain Services</text>
        <line x1="333" y1="46" x2="437" y2="46" stroke="#fef08a"/>
        <rect x="333" y="55" width="104" height="34" rx="4" fill="#ffffff" stroke="#fde047"/>
        <text x="385" y="75" font-family="'Times New Roman', serif" font-size="7pt" fill="#713f12" text-anchor="middle">Document Validator</text>
        <rect x="333" y="98" width="104" height="34" rx="4" fill="#ffffff" stroke="#fde047"/>
        <text x="385" y="118" font-family="'Times New Roman', serif" font-size="7pt" fill="#713f12" text-anchor="middle">Verification Engine</text>
        <rect x="333" y="142" width="104" height="34" rx="4" fill="#ffffff" stroke="#fde047"/>
        <text x="385" y="162" font-family="'Times New Roman', serif" font-size="7pt" fill="#713f12" text-anchor="middle">Placement Analytics</text>

        <!-- Arrow Tier 3 to 4 -->
        <line x1="445" y1="100" x2="475" y2="100" stroke="#334155" stroke-width="1.2" marker-end="url(#arr3)"/>

        <!-- Tier 4 -->
        <rect x="475" y="8" width="115" height="185" rx="5" fill="#faf5ff" stroke="#a855f7" stroke-width="1.2"/>
        <text x="532" y="26" font-family="'Times New Roman', serif" font-size="8.5pt" font-weight="bold" fill="#581c87" text-anchor="middle">Tier 4</text>
        <text x="532" y="39" font-family="'Times New Roman', serif" font-size="7.5pt" fill="#6b21a8" text-anchor="middle">Persistence</text>
        <line x1="483" y1="46" x2="582" y2="46" stroke="#e9d5ff"/>
        <rect x="483" y="60" width="99" height="42" rx="4" fill="#ffffff" stroke="#d8b4fe"/>
        <text x="532" y="80" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" fill="#581c87" text-anchor="middle">PostgreSQL 16</text>
        <text x="532" y="93" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#6b21a8" text-anchor="middle">Neon Serverless</text>
        <rect x="483" y="118" width="99" height="42" rx="4" fill="#ffffff" stroke="#d8b4fe"/>
        <text x="532" y="138" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" fill="#581c87" text-anchor="middle">Media Storage</text>
        <text x="532" y="151" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#6b21a8" text-anchor="middle">Upload Vault</text>
      </svg>
    </div>
    """

def svg_fig3_1():
    # Figure 3.1: Object diagram
    return """
    <div style="text-align: center; margin: 8px 0;">
      <svg width="600" height="220" viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg">
        <!-- Object: User akshay -->
        <rect x="15" y="12" width="165" height="70" rx="5" fill="#fef08a" stroke="#ca8a04" stroke-width="1.2"/>
        <text x="97" y="28" font-family="'Courier New', monospace" font-size="8pt" font-weight="bold" text-anchor="middle">akshayUser : User</text>
        <line x1="15" y1="34" x2="180" y2="34" stroke="#ca8a04"/>
        <text x="22" y="47" font-family="'Courier New', monospace" font-size="7pt">id = 14</text>
        <text x="22" y="59" font-family="'Courier New', monospace" font-size="7pt">email = "ak12@gmail.com"</text>
        <text x="22" y="71" font-family="'Courier New', monospace" font-size="7pt">role = "STUDENT"</text>

        <!-- Object: Profile -->
        <rect x="15" y="120" width="165" height="85" rx="5" fill="#fed7aa" stroke="#ea580c" stroke-width="1.2"/>
        <text x="97" y="136" font-family="'Courier New', monospace" font-size="8pt" font-weight="bold" text-anchor="middle">akshayProfile : Profile</text>
        <line x1="15" y1="142" x2="180" y2="142" stroke="#ea580c"/>
        <text x="22" y="155" font-family="'Courier New', monospace" font-size="7pt">prn = "1272250311"</text>
        <text x="22" y="167" font-family="'Courier New', monospace" font-size="7pt">cgpa = 9.20</text>
        <text x="22" y="179" font-family="'Courier New', monospace" font-size="7pt">dept = "Computer Science"</text>
        <text x="22" y="191" font-family="'Courier New', monospace" font-size="7pt">batch = "2024-2026"</text>

        <line x1="97" y1="82" x2="97" y2="120" stroke="#334155" stroke-width="1.2"/>
        <text x="102" y="104" font-family="'Times New Roman', serif" font-size="7pt" fill="#475569">owns</text>

        <!-- Object: Document -->
        <rect x="230" y="35" width="185" height="105" rx="5" fill="#bbf7d0" stroke="#16a34a" stroke-width="1.2"/>
        <text x="322" y="52" font-family="'Courier New', monospace" font-size="8pt" font-weight="bold" text-anchor="middle">degreeDoc : Document</text>
        <line x1="230" y1="58" x2="415" y2="58" stroke="#16a34a"/>
        <text x="236" y="71" font-family="'Courier New', monospace" font-size="7pt">id = 42</text>
        <text x="236" y="83" font-family="'Courier New', monospace" font-size="7pt">title = "MCA Degree Transcript"</text>
        <text x="236" y="95" font-family="'Courier New', monospace" font-size="7pt">category = "CERTIFICATE"</text>
        <text x="236" y="107" font-family="'Courier New', monospace" font-size="7pt">status = "VERIFIED"</text>
        <text x="236" y="119" font-family="'Courier New', monospace" font-size="7pt">uuid = "f47ac10b-58cc-4372..."</text>

        <line x1="180" y1="55" x2="230" y2="65" stroke="#334155" stroke-width="1.2"/>
        <text x="190" y="55" font-family="'Times New Roman', serif" font-size="7pt" fill="#475569">uploads</text>

        <!-- Object: Committee -->
        <rect x="455" y="15" width="135" height="65" rx="5" fill="#bae6fd" stroke="#0284c7" stroke-width="1.2"/>
        <text x="522" y="31" font-family="'Courier New', monospace" font-size="8pt" font-weight="bold" text-anchor="middle">faculty : User</text>
        <line x1="455" y1="37" x2="590" y2="37" stroke="#0284c7"/>
        <text x="461" y="50" font-family="'Courier New', monospace" font-size="7pt">id = 3</text>
        <text x="461" y="62" font-family="'Courier New', monospace" font-size="7pt">role = "COMMITTEE"</text>

        <line x1="455" y1="58" x2="415" y2="72" stroke="#334155" stroke-width="1.2"/>
        <text x="420" y="60" font-family="'Times New Roman', serif" font-size="7pt" fill="#475569">verifies</text>

        <!-- Object: Recruiter -->
        <rect x="455" y="130" width="135" height="65" rx="5" fill="#fbcfe8" stroke="#db2777" stroke-width="1.2"/>
        <text x="522" y="146" font-family="'Courier New', monospace" font-size="8pt" font-weight="bold" text-anchor="middle">recruiter : Session</text>
        <line x1="455" y1="152" x2="590" y2="152" stroke="#db2777"/>
        <text x="461" y="165" font-family="'Courier New', monospace" font-size="7pt">device = "Mobile Phone"</text>
        <text x="461" y="177" font-family="'Courier New', monospace" font-size="7pt">scans = "QR Token"</text>

        <line x1="455" y1="155" x2="415" y2="115" stroke="#334155" stroke-width="1.2"/>
        <text x="420" y="142" font-family="'Times New Roman', serif" font-size="7pt" fill="#475569">inspects</text>
      </svg>
    </div>
    """

def svg_fig3_2():
    # Figure 3.2: Class diagram
    return """
    <div style="text-align: center; margin: 8px 0;">
      <svg width="600" height="210" viewBox="0 0 600 210" xmlns="http://www.w3.org/2000/svg">
        <!-- Class User -->
        <rect x="15" y="10" width="170" height="90" rx="3" fill="#f8fafc" stroke="#334155" stroke-width="1.2"/>
        <rect x="15" y="10" width="170" height="20" rx="3" fill="#e2e8f0"/>
        <text x="100" y="24" font-family="'Times New Roman', serif" font-size="8pt" font-weight="bold" text-anchor="middle">accounts.User</text>
        <text x="20" y="42" font-family="'Courier New', monospace" font-size="6.5pt">+ id: BigSerial</text>
        <text x="20" y="52" font-family="'Courier New', monospace" font-size="6.5pt">+ email: EmailField</text>
        <text x="20" y="62" font-family="'Courier New', monospace" font-size="6.5pt">+ role: CharField (Enum)</text>
        <line x1="15" y1="68" x2="185" y2="68" stroke="#cbd5e1"/>
        <text x="20" y="78" font-family="'Courier New', monospace" font-size="6.5pt">+ register(), login()</text>
        <text x="20" y="88" font-family="'Courier New', monospace" font-size="6.5pt">+ generate_tokens()</text>

        <!-- Class StudentProfile -->
        <rect x="15" y="115" width="170" height="85" rx="3" fill="#f8fafc" stroke="#2563eb" stroke-width="1.2"/>
        <rect x="15" y="115" width="170" height="20" rx="3" fill="#dbeafe"/>
        <text x="100" y="129" font-family="'Times New Roman', serif" font-size="8pt" font-weight="bold" fill="#1e3a8a" text-anchor="middle">students.StudentProfile</text>
        <text x="20" y="146" font-family="'Courier New', monospace" font-size="6.5pt">+ prn: CharField</text>
        <text x="20" y="156" font-family="'Courier New', monospace" font-size="6.5pt">+ cgpa: DecimalField</text>
        <text x="20" y="166" font-family="'Courier New', monospace" font-size="6.5pt">+ current_company: str</text>
        <line x1="15" y1="172" x2="185" y2="172" stroke="#cbd5e1"/>
        <text x="20" y="182" font-family="'Courier New', monospace" font-size="6.5pt">+ get_verified_ratio()</text>
        <text x="20" y="192" font-family="'Courier New', monospace" font-size="6.5pt">+ is_eligible(cutoff)</text>

        <line x1="100" y1="100" x2="100" y2="115" stroke="#334155" stroke-width="1.2"/>
        <text x="105" y="109" font-family="'Times New Roman', serif" font-size="6.5pt">1:1</text>

        <!-- Class Document -->
        <rect x="235" y="10" width="180" height="100" rx="3" fill="#f8fafc" stroke="#16a34a" stroke-width="1.2"/>
        <rect x="235" y="10" width="180" height="20" rx="3" fill="#dcfce7"/>
        <text x="325" y="24" font-family="'Times New Roman', serif" font-size="8pt" font-weight="bold" fill="#14532d" text-anchor="middle">documents.Document</text>
        <text x="240" y="42" font-family="'Courier New', monospace" font-size="6.5pt">+ id: BigSerial</text>
        <text x="240" y="52" font-family="'Courier New', monospace" font-size="6.5pt">+ title: CharField</text>
        <text x="240" y="62" font-family="'Courier New', monospace" font-size="6.5pt">+ file: FileField</text>
        <text x="240" y="72" font-family="'Courier New', monospace" font-size="6.5pt">+ status: CharField</text>
        <text x="240" y="82" font-family="'Courier New', monospace" font-size="6.5pt">+ verification_id: UUID</text>
        <line x1="235" y1="88" x2="415" y2="88" stroke="#cbd5e1"/>
        <text x="240" y="98" font-family="'Courier New', monospace" font-size="6.5pt">+ verify(), reject()</text>

        <line x1="185" y1="45" x2="235" y2="45" stroke="#334155" stroke-width="1.2"/>
        <text x="205" y="40" font-family="'Times New Roman', serif" font-size="6.5pt">1 : N</text>

        <!-- Class Project -->
        <rect x="235" y="125" width="180" height="75" rx="3" fill="#f8fafc" stroke="#ca8a04" stroke-width="1.2"/>
        <rect x="235" y="125" width="180" height="20" rx="3" fill="#fef9c3"/>
        <text x="325" y="139" font-family="'Times New Roman', serif" font-size="8pt" font-weight="bold" fill="#713f12" text-anchor="middle">students.Project</text>
        <text x="240" y="156" font-family="'Courier New', monospace" font-size="6.5pt">+ title: CharField</text>
        <text x="240" y="166" font-family="'Courier New', monospace" font-size="6.5pt">+ technologies: CharField</text>
        <text x="240" y="176" font-family="'Courier New', monospace" font-size="6.5pt">+ github_url: URLField</text>
        <line x1="235" y1="182" x2="415" y2="182" stroke="#cbd5e1"/>
        <text x="240" y="192" font-family="'Courier New', monospace" font-size="6.5pt">+ get_summary()</text>

        <line x1="185" y1="145" x2="235" y2="145" stroke="#334155" stroke-width="1.2"/>
        <text x="205" y="140" font-family="'Times New Roman', serif" font-size="6.5pt">1 : N</text>

        <!-- Class Internship -->
        <rect x="450" y="60" width="140" height="85" rx="3" fill="#f8fafc" stroke="#9333ea" stroke-width="1.2"/>
        <rect x="450" y="60" width="140" height="20" rx="3" fill="#f3e8ff"/>
        <text x="520" y="74" font-family="'Times New Roman', serif" font-size="8pt" font-weight="bold" fill="#581c87" text-anchor="middle">students.Internship</text>
        <text x="455" y="92" font-family="'Courier New', monospace" font-size="6.5pt">+ company: CharField</text>
        <text x="455" y="102" font-family="'Courier New', monospace" font-size="6.5pt">+ role: CharField</text>
        <text x="455" y="112" font-family="'Courier New', monospace" font-size="6.5pt">+ certificate_url: str</text>
        <line x1="450" y1="118" x2="590" y2="118" stroke="#cbd5e1"/>
        <text x="455" y="128" font-family="'Courier New', monospace" font-size="6.5pt">+ get_duration()</text>

        <line x1="415" y1="102" x2="450" y2="102" stroke="#334155" stroke-width="1.2"/>
        <text x="428" y="96" font-family="'Times New Roman', serif" font-size="6.5pt">1:N</text>
      </svg>
    </div>
    """

def svg_fig3_3():
    # Figure 3.3: Use case diagram
    return """
    <div style="text-align: center; margin: 8px 0;">
      <svg width="600" height="210" viewBox="0 0 600 210" xmlns="http://www.w3.org/2000/svg">
        <!-- Boundary Box -->
        <rect x="150" y="8" width="300" height="195" rx="6" fill="#f8fafc" stroke="#334155" stroke-width="1.2"/>
        <text x="300" y="22" font-family="'Times New Roman', serif" font-size="8pt" font-weight="bold" fill="#0f172a" text-anchor="middle">EduVault System Boundary</text>

        <!-- Use Cases (Ovals) -->
        <ellipse cx="230" cy="45" rx="62" ry="13" fill="#dbeafe" stroke="#2563eb" stroke-width="1"/>
        <text x="230" y="49" font-family="'Times New Roman', serif" font-size="7pt" fill="#1e40af" text-anchor="middle">Register &amp; Authenticate</text>

        <ellipse cx="230" cy="78" rx="62" ry="13" fill="#dcfce7" stroke="#16a34a" stroke-width="1"/>
        <text x="230" y="82" font-family="'Times New Roman', serif" font-size="7pt" fill="#14532d" text-anchor="middle">Upload Academic Credential</text>

        <ellipse cx="230" cy="111" rx="62" ry="13" fill="#fef9c3" stroke="#ca8a04" stroke-width="1"/>
        <text x="230" y="115" font-family="'Times New Roman', serif" font-size="7pt" fill="#713f12" text-anchor="middle">Generate QR Interview Key</text>

        <ellipse cx="370" cy="78" rx="62" ry="13" fill="#f3e8ff" stroke="#9333ea" stroke-width="1"/>
        <text x="370" y="82" font-family="'Times New Roman', serif" font-size="7pt" fill="#581c87" text-anchor="middle">Review &amp; Verify Queue</text>

        <ellipse cx="370" cy="115" rx="62" ry="13" fill="#ffe4e6" stroke="#e11d48" stroke-width="1"/>
        <text x="370" y="119" font-family="'Times New Roman', serif" font-size="7pt" fill="#881337" text-anchor="middle">Filter Talent by CGPA</text>

        <ellipse cx="230" cy="152" rx="62" ry="13" fill="#cffafe" stroke="#0891b2" stroke-width="1"/>
        <text x="230" y="156" font-family="'Times New Roman', serif" font-size="7pt" fill="#155e75" text-anchor="middle">Browse Alumni Directory</text>

        <ellipse cx="370" cy="162" rx="62" ry="13" fill="#ffedd5" stroke="#ea580c" stroke-width="1"/>
        <text x="370" y="166" font-family="'Times New Roman', serif" font-size="7pt" fill="#7c2d12" text-anchor="middle">Scan QR &amp; Verify Dossier</text>

        <!-- Actor: Student (Left) -->
        <circle cx="50" cy="58" r="9" fill="#fff" stroke="#000" stroke-width="1.5"/>
        <line x1="50" y1="67" x2="50" y2="95" stroke="#000" stroke-width="1.5"/>
        <line x1="32" y1="76" x2="68" y2="76" stroke="#000" stroke-width="1.5"/>
        <line x1="50" y1="95" x2="36" y2="118" stroke="#000" stroke-width="1.5"/>
        <line x1="50" y1="95" x2="64" y2="118" stroke="#000" stroke-width="1.5"/>
        <text x="50" y="132" font-family="'Times New Roman', serif" font-size="7.5pt" font-weight="bold" text-anchor="middle">Student</text>

        <!-- Student Connections -->
        <line x1="68" y1="76" x2="168" y2="49" stroke="#475569" stroke-width="1"/>
        <line x1="68" y1="76" x2="168" y2="78" stroke="#475569" stroke-width="1"/>
        <line x1="68" y1="76" x2="168" y2="109" stroke="#475569" stroke-width="1"/>
        <line x1="68" y1="76" x2="168" y2="149" stroke="#475569" stroke-width="1"/>

        <!-- Actor: Committee (Right Top) -->
        <circle cx="530" cy="58" r="9" fill="#fff" stroke="#000" stroke-width="1.5"/>
        <line x1="530" y1="67" x2="530" y2="95" stroke="#000" stroke-width="1.5"/>
        <line x1="512" y1="76" x2="548" y2="76" stroke="#000" stroke-width="1.5"/>
        <line x1="530" y1="95" x2="516" y2="118" stroke="#000" stroke-width="1.5"/>
        <line x1="530" y1="95" x2="544" y2="118" stroke="#000" stroke-width="1.5"/>
        <text x="530" y="132" font-family="'Times New Roman', serif" font-size="7.5pt" font-weight="bold" text-anchor="middle">Committee</text>

        <line x1="512" y1="76" x2="432" y2="78" stroke="#475569" stroke-width="1"/>

        <!-- Actor: Recruiter (Right Bottom) -->
        <circle cx="530" cy="148" r="8" fill="#fff" stroke="#000" stroke-width="1.5"/>
        <line x1="530" y1="156" x2="530" y2="180" stroke="#000" stroke-width="1.5"/>
        <line x1="514" y1="164" x2="546" y2="164" stroke="#000" stroke-width="1.5"/>
        <line x1="530" y1="180" x2="518" y2="198" stroke="#000" stroke-width="1.5"/>
        <line x1="530" y1="180" x2="542" y2="198" stroke="#000" stroke-width="1.5"/>
        <text x="530" y="208" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" text-anchor="middle">Recruiter</text>

        <line x1="514" y1="164" x2="432" y2="164" stroke="#475569" stroke-width="1"/>
      </svg>
    </div>
    """

def svg_fig3_4():
    # Figure 3.4: Sequence diagram
    return """
    <div style="text-align: center; margin: 8px 0;">
      <svg width="600" height="205" viewBox="0 0 600 205" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrS" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#334155"/>
          </marker>
        </defs>

        <!-- Lifeline Headers -->
        <rect x="10" y="5" width="80" height="24" rx="4" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="50" y="21" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" fill="#1e3a8a" text-anchor="middle">Student</text>
        <line x1="50" y1="29" x2="50" y2="195" stroke="#94a3b8" stroke-dasharray="2,2"/>

        <rect x="110" y="5" width="80" height="24" rx="4" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="150" y="21" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" fill="#1e3a8a" text-anchor="middle">React SPA</text>
        <line x1="150" y1="29" x2="150" y2="195" stroke="#94a3b8" stroke-dasharray="2,2"/>

        <rect x="210" y="5" width="90" height="24" rx="4" fill="#f0fdf4" stroke="#22c55e"/>
        <text x="255" y="21" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" fill="#14532d" text-anchor="middle">Django API</text>
        <line x1="255" y1="29" x2="255" y2="195" stroke="#94a3b8" stroke-dasharray="2,2"/>

        <rect x="320" y="5" width="80" height="24" rx="4" fill="#faf5ff" stroke="#a855f7"/>
        <text x="360" y="21" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" fill="#581c87" text-anchor="middle">PostgreSQL</text>
        <line x1="360" y1="29" x2="360" y2="195" stroke="#94a3b8" stroke-dasharray="2,2"/>

        <rect x="420" y="5" width="80" height="24" rx="4" fill="#fefce8" stroke="#eab308"/>
        <text x="460" y="21" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" fill="#713f12" text-anchor="middle">Committee</text>
        <line x1="460" y1="29" x2="460" y2="195" stroke="#94a3b8" stroke-dasharray="2,2"/>

        <rect x="515" y="5" width="75" height="24" rx="4" fill="#ffe4e6" stroke="#f43f5e"/>
        <text x="552" y="21" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" fill="#881337" text-anchor="middle">Recruiter</text>
        <line x1="552" y1="29" x2="552" y2="195" stroke="#94a3b8" stroke-dasharray="2,2"/>

        <!-- Messages -->
        <!-- 1. Upload Doc -->
        <line x1="50" y1="45" x2="150" y2="45" stroke="#1e3a8a" stroke-width="1.2" marker-end="url(#arrS)"/>
        <text x="100" y="40" font-family="'Times New Roman', serif" font-size="6.5pt" text-anchor="middle">1. Select file &amp; upload</text>

        <!-- 2. POST multipart -->
        <line x1="150" y1="60" x2="255" y2="60" stroke="#1e3a8a" stroke-width="1.2" marker-end="url(#arrS)"/>
        <text x="202" y="55" font-family="'Times New Roman', serif" font-size="6.5pt" text-anchor="middle">2. POST /api/documents/</text>

        <!-- 3. Insert PENDING -->
        <line x1="255" y1="75" x2="360" y2="75" stroke="#14532d" stroke-width="1.2" marker-end="url(#arrS)"/>
        <text x="307" y="70" font-family="'Times New Roman', serif" font-size="6.5pt" text-anchor="middle">3. INSERT (status='PENDING')</text>

        <!-- 4. Committee Fetch Queue -->
        <line x1="460" y1="95" x2="255" y2="95" stroke="#713f12" stroke-width="1.2" marker-end="url(#arrS)"/>
        <text x="357" y="90" font-family="'Times New Roman', serif" font-size="6.5pt" text-anchor="middle">4. GET /api/committee/pending</text>

        <!-- 5. Committee Approve -->
        <line x1="460" y1="115" x2="255" y2="115" stroke="#16a34a" stroke-width="1.2" marker-end="url(#arrS)"/>
        <text x="357" y="110" font-family="'Times New Roman', serif" font-size="6.5pt" text-anchor="middle">5. POST /verify/ (Approve)</text>

        <!-- 6. Update to VERIFIED -->
        <line x1="255" y1="130" x2="360" y2="130" stroke="#14532d" stroke-width="1.2" marker-end="url(#arrS)"/>
        <text x="307" y="125" font-family="'Times New Roman', serif" font-size="6.5pt" text-anchor="middle">6. UPDATE status='VERIFIED'</text>

        <!-- 7. Recruiter Scans QR -->
        <line x1="552" y1="155" x2="150" y2="155" stroke="#f43f5e" stroke-width="1.2" marker-end="url(#arrS)"/>
        <text x="351" y="150" font-family="'Times New Roman', serif" font-size="6.5pt" text-anchor="middle">7. Scans QR -> /student/:id</text>

        <!-- 8. Fetch Verified Dossier -->
        <line x1="150" y1="170" x2="255" y2="170" stroke="#1e3a8a" stroke-width="1.2" marker-end="url(#arrS)"/>
        <text x="202" y="165" font-family="'Times New Roman', serif" font-size="6.5pt" text-anchor="middle">8. GET /api/students/:id/dossier</text>

        <!-- 9. Return Dossier -->
        <line x1="255" y1="185" x2="552" y2="185" stroke="#16a34a" stroke-width="1.2" stroke-dasharray="3,2" marker-end="url(#arrS)"/>
        <text x="403" y="180" font-family="'Times New Roman', serif" font-size="6.5pt" text-anchor="middle">9. Render Verified Academic Dossier</text>
      </svg>
    </div>
    """

def svg_fig3_5():
    # Figure 3.5: Activity diagram
    return """
    <div style="text-align: center; margin: 8px 0;">
      <svg width="600" height="195" viewBox="0 0 600 195" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrA" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#334155"/>
          </marker>
        </defs>

        <!-- Start Node -->
        <circle cx="35" cy="45" r="9" fill="#0f172a"/>

        <line x1="44" y1="45" x2="70" y2="45" stroke="#334155" stroke-width="1.2" marker-end="url(#arrA)"/>

        <!-- Activity: Select Document -->
        <rect x="70" y="28" width="95" height="34" rx="6" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.2"/>
        <text x="117" y="49" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" fill="#1e3a8a" text-anchor="middle">Upload Document</text>

        <line x1="165" y1="45" x2="195" y2="45" stroke="#334155" stroke-width="1.2" marker-end="url(#arrA)"/>

        <!-- Decision: Format Check -->
        <polygon points="215,30 235,45 215,60 195,45" fill="#fef9c3" stroke="#ca8a04" stroke-width="1.2"/>
        <text x="215" y="47" font-family="'Times New Roman', serif" font-size="6pt" text-anchor="middle">&lt;=5MB?</text>

        <!-- Invalid Path -->
        <line x1="215" y1="60" x2="215" y2="90" stroke="#dc2626" stroke-width="1" marker-end="url(#arrA)"/>
        <text x="225" y="78" font-family="'Times New Roman', serif" font-size="6pt" fill="#dc2626">No</text>
        <rect x="175" y="90" width="80" height="24" rx="4" fill="#fee2e2" stroke="#ef4444"/>
        <text x="215" y="105" font-family="'Times New Roman', serif" font-size="6pt" fill="#991b1b" text-anchor="middle">Error Alert</text>

        <!-- Valid Path -->
        <line x1="235" y1="45" x2="270" y2="45" stroke="#16a34a" stroke-width="1.2" marker-end="url(#arrA)"/>
        <text x="250" y="40" font-family="'Times New Roman', serif" font-size="6pt" fill="#16a34a">Yes</text>

        <!-- Activity: Store PENDING -->
        <rect x="270" y="28" width="95" height="34" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="1.2"/>
        <text x="317" y="44" font-family="'Times New Roman', serif" font-size="6.5pt" font-weight="bold" fill="#14532d" text-anchor="middle">Persist Document</text>
        <text x="317" y="54" font-family="'Times New Roman', serif" font-size="6pt" fill="#166534" text-anchor="middle">status = PENDING</text>

        <line x1="365" y1="45" x2="395" y2="45" stroke="#334155" stroke-width="1.2" marker-end="url(#arrA)"/>

        <!-- Decision: Committee Verification -->
        <polygon points="415,30 435,45 415,60 395,45" fill="#fef9c3" stroke="#ca8a04" stroke-width="1.2"/>
        <text x="415" y="47" font-family="'Times New Roman', serif" font-size="6pt" text-anchor="middle">Verify?</text>

        <!-- Rejected Path -->
        <line x1="415" y1="60" x2="415" y2="90" stroke="#dc2626" stroke-width="1" marker-end="url(#arrA)"/>
        <text x="425" y="78" font-family="'Times New Roman', serif" font-size="6pt" fill="#dc2626">Reject</text>
        <rect x="375" y="90" width="80" height="26" rx="4" fill="#fee2e2" stroke="#ef4444"/>
        <text x="415" y="102" font-family="'Times New Roman', serif" font-size="6pt" fill="#991b1b" text-anchor="middle">Status REJECTED</text>
        <text x="415" y="112" font-family="'Times New Roman', serif" font-size="5.5pt" fill="#991b1b" text-anchor="middle">Feedback Notice</text>

        <!-- Approved Path -->
        <line x1="435" y1="45" x2="465" y2="45" stroke="#16a34a" stroke-width="1.2" marker-end="url(#arrA)"/>
        <text x="448" y="40" font-family="'Times New Roman', serif" font-size="6pt" fill="#16a34a">Approve</text>

        <!-- Activity: Status VERIFIED -->
        <rect x="465" y="28" width="85" height="34" rx="6" fill="#f3e8ff" stroke="#a855f7" stroke-width="1.2"/>
        <text x="507" y="44" font-family="'Times New Roman', serif" font-size="6.5pt" font-weight="bold" fill="#581c87" text-anchor="middle">Status VERIFIED</text>
        <text x="507" y="54" font-family="'Times New Roman', serif" font-size="6pt" fill="#6b21a8" text-anchor="middle">Generate QR Key</text>

        <line x1="507" y1="62" x2="507" y2="135" stroke="#334155" stroke-width="1.2" marker-end="url(#arrA)"/>

        <!-- Activity: Public Dossier -->
        <rect x="445" y="135" width="125" height="30" rx="6" fill="#cffafe" stroke="#0891b2" stroke-width="1.2"/>
        <text x="507" y="154" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" fill="#155e75" text-anchor="middle">Published in Dossier</text>

        <line x1="445" y1="150" x2="350" y2="150" stroke="#334155" stroke-width="1.2" marker-end="url(#arrA)"/>

        <!-- Final End Node -->
        <circle cx="330" cy="150" r="11" fill="none" stroke="#0f172a" stroke-width="1.5"/>
        <circle cx="330" cy="150" r="6" fill="#0f172a"/>
      </svg>
    </div>
    """

def svg_fig3_6():
    # Figure 3.6: Module hierarchy
    return """
    <div style="text-align: center; margin: 8px 0;">
      <svg width="600" height="150" viewBox="0 0 600 150" xmlns="http://www.w3.org/2000/svg">
        <!-- Root Module -->
        <rect x="210" y="8" width="180" height="30" rx="5" fill="#1e293b" stroke="#0f172a"/>
        <text x="300" y="27" font-family="'Times New Roman', serif" font-size="8pt" font-weight="bold" fill="#ffffff" text-anchor="middle">EduVault Modular Ecosystem</text>

        <!-- Horizontal Bus Line -->
        <line x1="300" y1="38" x2="300" y2="52" stroke="#64748b" stroke-width="1.2"/>
        <line x1="60" y1="52" x2="540" y2="52" stroke="#64748b" stroke-width="1.2"/>

        <!-- Vertical Drop Lines -->
        <line x1="60" y1="52" x2="60" y2="65" stroke="#64748b" stroke-width="1.2"/>
        <line x1="180" y1="52" x2="180" y2="65" stroke="#64748b" stroke-width="1.2"/>
        <line x1="300" y1="52" x2="300" y2="65" stroke="#64748b" stroke-width="1.2"/>
        <line x1="420" y1="52" x2="420" y2="65" stroke="#64748b" stroke-width="1.2"/>
        <line x1="540" y1="52" x2="540" y2="65" stroke="#64748b" stroke-width="1.2"/>

        <!-- 5 Modules -->
        <!-- M1: Auth -->
        <rect x="10" y="65" width="100" height="75" rx="4" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="60" y="80" font-family="'Times New Roman', serif" font-size="7.5pt" font-weight="bold" fill="#1e3a8a" text-anchor="middle">Auth &amp; RBAC</text>
        <line x1="15" y1="86" x2="105" y2="86" stroke="#bfdbfe"/>
        <text x="18" y="99" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#1e40af">• SimpleJWT</text>
        <text x="18" y="112" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#1e40af">• Role Guard</text>
        <text x="18" y="125" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#1e40af">• Session Guard</text>

        <!-- M2: Locker -->
        <rect x="130" y="65" width="100" height="75" rx="4" fill="#f0fdf4" stroke="#22c55e"/>
        <text x="180" y="80" font-family="'Times New Roman', serif" font-size="7.5pt" font-weight="bold" fill="#14532d" text-anchor="middle">Student Locker</text>
        <line x1="135" y1="86" x2="225" y2="86" stroke="#bbf7d0"/>
        <text x="138" y="99" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#166534">• Drag-Drop Upload</text>
        <text x="138" y="112" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#166534">• Status Badges</text>
        <text x="138" y="125" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#166534">• QR Generator</text>

        <!-- M3: Committee -->
        <rect x="250" y="65" width="100" height="75" rx="4" fill="#fefce8" stroke="#eab308"/>
        <text x="300" y="80" font-family="'Times New Roman', serif" font-size="7.5pt" font-weight="bold" fill="#713f12" text-anchor="middle">Verification</text>
        <line x1="255" y1="86" x2="345" y2="86" stroke="#fef08a"/>
        <text x="258" y="99" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#854d0e">• Review Queue</text>
        <text x="258" y="112" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#854d0e">• In-App PDF View</text>
        <text x="258" y="125" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#854d0e">• Approve / Reject</text>

        <!-- M4: Placement -->
        <rect x="370" y="65" width="100" height="75" rx="4" fill="#fff1f2" stroke="#f43f5e"/>
        <text x="420" y="80" font-family="'Times New Roman', serif" font-size="7.5pt" font-weight="bold" fill="#881337" text-anchor="middle">Placement</text>
        <line x1="375" y1="86" x2="465" y2="86" stroke="#ffe4e6"/>
        <text x="378" y="99" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#9f1239">• CGPA Thresholds</text>
        <text x="378" y="112" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#9f1239">• Talent Search</text>
        <text x="378" y="125" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#9f1239">• Verified Metrics</text>

        <!-- M5: Alumni -->
        <rect x="490" y="65" width="100" height="75" rx="4" fill="#faf5ff" stroke="#a855f7"/>
        <text x="540" y="80" font-family="'Times New Roman', serif" font-size="7.5pt" font-weight="bold" fill="#581c87" text-anchor="middle">Alumni Portal</text>
        <line x1="495" y1="86" x2="585" y2="86" stroke="#e9d5ff"/>
        <text x="498" y="99" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#6b21a8">• Global Directory</text>
        <text x="498" y="112" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#6b21a8">• Company Badges</text>
        <text x="498" y="125" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#6b21a8">• Mentorship Tags</text>
      </svg>
    </div>
    """

def svg_fig3_7():
    # Figure 3.7: State diagram
    return """
    <div style="text-align: center; margin: 8px 0;">
      <svg width="600" height="195" viewBox="0 0 600 195" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arr4" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#334155"/>
          </marker>
        </defs>

        <!-- Start Dot -->
        <circle cx="40" cy="38" r="8" fill="#0f172a"/>

        <line x1="48" y1="38" x2="85" y2="38" stroke="#334155" stroke-width="1.2" marker-end="url(#arr4)"/>

        <!-- Login -->
        <rect x="85" y="20" width="90" height="36" rx="5" fill="#f1f5f9" stroke="#64748b" stroke-width="1.2"/>
        <text x="130" y="42" font-family="'Times New Roman', serif" font-size="8pt" font-weight="bold" text-anchor="middle">/login</text>

        <line x1="175" y1="38" x2="220" y2="38" stroke="#334155" stroke-width="1.2" marker-end="url(#arr4)"/>
        <text x="197" y="30" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#475569" text-anchor="middle">JWT Auth</text>

        <!-- Role Router / Dashboard Core -->
        <rect x="220" y="8" width="365" height="175" rx="6" fill="#fafafa" stroke="#94a3b8" stroke-width="1"/>
        <text x="400" y="22" font-family="'Times New Roman', serif" font-size="7.5pt" font-weight="bold" fill="#64748b" text-anchor="middle">Authenticated Application Shell</text>

        <!-- Student Dashboard -->
        <rect x="235" y="32" width="100" height="30" rx="4" fill="#eff6ff" stroke="#3b82f6" stroke-width="1"/>
        <text x="285" y="50" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" fill="#1e3a8a" text-anchor="middle">/dashboard (Student)</text>

        <line x1="285" y1="62" x2="285" y2="82" stroke="#334155" stroke-width="1" marker-end="url(#arr4)"/>
        <rect x="235" y="82" width="100" height="26" rx="4" fill="#ffffff" stroke="#93c5fd"/>
        <text x="285" y="99" font-family="'Times New Roman', serif" font-size="7pt" fill="#1e40af" text-anchor="middle">/certificates (Vault)</text>

        <line x1="285" y1="108" x2="285" y2="128" stroke="#334155" stroke-width="1" marker-end="url(#arr4)"/>
        <rect x="235" y="128" width="100" height="26" rx="4" fill="#ffffff" stroke="#93c5fd"/>
        <text x="285" y="145" font-family="'Times New Roman', serif" font-size="7pt" fill="#1e40af" text-anchor="middle">Interview Key QR</text>

        <!-- Committee -->
        <rect x="355" y="32" width="105" height="30" rx="4" fill="#f0fdf4" stroke="#22c55e" stroke-width="1"/>
        <text x="407" y="50" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" fill="#14532d" text-anchor="middle">/committee/dashboard</text>

        <line x1="407" y1="62" x2="407" y2="82" stroke="#334155" stroke-width="1" marker-end="url(#arr4)"/>
        <rect x="355" y="82" width="105" height="26" rx="4" fill="#ffffff" stroke="#86efac"/>
        <text x="407" y="99" font-family="'Times New Roman', serif" font-size="7pt" fill="#166534" text-anchor="middle">/committee/documents</text>

        <!-- Placement -->
        <rect x="475" y="32" width="95" height="30" rx="4" fill="#fefce8" stroke="#eab308" stroke-width="1"/>
        <text x="522" y="50" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" fill="#713f12" text-anchor="middle">/placement</text>

        <!-- Alumni -->
        <rect x="475" y="82" width="95" height="26" rx="4" fill="#faf5ff" stroke="#a855f7" stroke-width="1"/>
        <text x="522" y="99" font-family="'Times New Roman', serif" font-size="7pt" fill="#581c87" text-anchor="middle">/alumni</text>

        <!-- Public Dossier Outside -->
        <line x1="335" y1="141" x2="475" y2="141" stroke="#334155" stroke-width="1" stroke-dasharray="2,2" marker-end="url(#arr4)"/>
        <rect x="475" y="128" width="95" height="26" rx="4" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/>
        <text x="522" y="145" font-family="'Times New Roman', serif" font-size="6.5pt" font-weight="bold" fill="#991b1b" text-anchor="middle">/student/:id (Public)</text>
      </svg>
    </div>
    """

def svg_fig3_8():
    # Figure 3.8: Entity-relationship diagram (ERD)
    return """
    <div style="text-align: center; margin: 8px 0;">
      <svg width="600" height="215" viewBox="0 0 600 215" xmlns="http://www.w3.org/2000/svg">
        <!-- Table: accounts_user -->
        <rect x="15" y="10" width="165" height="100" rx="4" fill="#f8fafc" stroke="#475569" stroke-width="1.2"/>
        <rect x="15" y="10" width="165" height="20" rx="4" fill="#475569"/>
        <text x="97" y="24" font-family="'Courier New', monospace" font-size="7.5pt" font-weight="bold" fill="#fff" text-anchor="middle">accounts_user</text>
        <text x="21" y="42" font-family="'Courier New', monospace" font-size="6.5pt"><b>PK</b> id: BigSerial</text>
        <text x="21" y="53" font-family="'Courier New', monospace" font-size="6.5pt"><b>UK</b> email: Varchar(254)</text>
        <text x="21" y="64" font-family="'Courier New', monospace" font-size="6.5pt">password: Varchar(128)</text>
        <text x="21" y="75" font-family="'Courier New', monospace" font-size="6.5pt">role: Varchar(20)</text>
        <text x="21" y="86" font-family="'Courier New', monospace" font-size="6.5pt">college: Varchar(255)</text>
        <text x="21" y="97" font-family="'Courier New', monospace" font-size="6.5pt">department: Varchar(100)</text>

        <!-- Table: students_studentprofile -->
        <rect x="230" y="10" width="165" height="100" rx="4" fill="#f8fafc" stroke="#2563eb" stroke-width="1.2"/>
        <rect x="230" y="10" width="165" height="20" rx="4" fill="#2563eb"/>
        <text x="312" y="24" font-family="'Courier New', monospace" font-size="7.5pt" font-weight="bold" fill="#fff" text-anchor="middle">studentprofile</text>
        <text x="236" y="42" font-family="'Courier New', monospace" font-size="6.5pt"><b>PK</b> id: BigSerial</text>
        <text x="236" y="53" font-family="'Courier New', monospace" font-size="6.5pt"><b>FK</b> user_id: BigInt (1:1)</text>
        <text x="236" y="64" font-family="'Courier New', monospace" font-size="6.5pt">prn: Varchar(50)</text>
        <text x="236" y="75" font-family="'Courier New', monospace" font-size="6.5pt">cgpa: Numeric(4,2)</text>
        <text x="236" y="86" font-family="'Courier New', monospace" font-size="6.5pt">current_company: str</text>
        <text x="236" y="97" font-family="'Courier New', monospace" font-size="6.5pt">is_mentor_available: bool</text>

        <line x1="180" y1="50" x2="230" y2="50" stroke="#000" stroke-width="1.2"/>
        <text x="205" y="45" font-family="'Times New Roman', serif" font-size="6.5pt" text-anchor="middle">1:1</text>

        <!-- Table: documents_document -->
        <rect x="15" y="125" width="165" height="80" rx="4" fill="#f8fafc" stroke="#16a34a" stroke-width="1.2"/>
        <rect x="15" y="125" width="165" height="18" rx="4" fill="#16a34a"/>
        <text x="97" y="138" font-family="'Courier New', monospace" font-size="7.5pt" font-weight="bold" fill="#fff" text-anchor="middle">documents_document</text>
        <text x="21" y="154" font-family="'Courier New', monospace" font-size="6.5pt"><b>PK</b> id: BigSerial</text>
        <text x="21" y="165" font-family="'Courier New', monospace" font-size="6.5pt"><b>FK</b> user_id: BigInt</text>
        <text x="21" y="176" font-family="'Courier New', monospace" font-size="6.5pt"><b>UK</b> verification_id: UUID</text>
        <text x="21" y="187" font-family="'Courier New', monospace" font-size="6.5pt">title: Varchar(200)</text>
        <text x="21" y="198" font-family="'Courier New', monospace" font-size="6.5pt">status: PENDING/VERIFIED</text>

        <line x1="97" y1="110" x2="97" y2="125" stroke="#000" stroke-width="1.2"/>
        <text x="110" y="119" font-family="'Times New Roman', serif" font-size="6.5pt">1:N</text>

        <!-- Table: students_project -->
        <rect x="230" y="125" width="165" height="80" rx="4" fill="#f8fafc" stroke="#ca8a04" stroke-width="1.2"/>
        <rect x="230" y="125" width="165" height="18" rx="4" fill="#ca8a04"/>
        <text x="312" y="138" font-family="'Courier New', monospace" font-size="7.5pt" font-weight="bold" fill="#fff" text-anchor="middle">students_project</text>
        <text x="236" y="154" font-family="'Courier New', monospace" font-size="6.5pt"><b>PK</b> id: BigSerial</text>
        <text x="236" y="165" font-family="'Courier New', monospace" font-size="6.5pt"><b>FK</b> user_id: BigInt</text>
        <text x="236" y="176" font-family="'Courier New', monospace" font-size="6.5pt">title: Varchar(200)</text>
        <text x="236" y="187" font-family="'Courier New', monospace" font-size="6.5pt">technologies: Varchar(255)</text>
        <text x="236" y="198" font-family="'Courier New', monospace" font-size="6.5pt">github_url: Varchar(200)</text>

        <line x1="140" y1="110" x2="230" y2="140" stroke="#000" stroke-width="1.2"/>

        <!-- Table: students_internship -->
        <rect x="425" y="65" width="160" height="80" rx="4" fill="#f8fafc" stroke="#9333ea" stroke-width="1.2"/>
        <rect x="425" y="65" width="160" height="18" rx="4" fill="#9333ea"/>
        <text x="505" y="78" font-family="'Courier New', monospace" font-size="7.5pt" font-weight="bold" fill="#fff" text-anchor="middle">students_internship</text>
        <text x="431" y="94" font-family="'Courier New', monospace" font-size="6.5pt"><b>PK</b> id: BigSerial</text>
        <text x="431" y="105" font-family="'Courier New', monospace" font-size="6.5pt"><b>FK</b> user_id: BigInt</text>
        <text x="431" y="116" font-family="'Courier New', monospace" font-size="6.5pt">company_name: str</text>
        <text x="431" y="127" font-family="'Courier New', monospace" font-size="6.5pt">role: str</text>
        <text x="431" y="138" font-family="'Courier New', monospace" font-size="6.5pt">certificate_url: str</text>

        <line x1="180" y1="85" x2="425" y2="105" stroke="#000" stroke-width="1.2"/>
      </svg>
    </div>
    """

# ==============================================================================
# CHAPTER 4: HIGH-FIDELITY UI WIREFRAME DIAGRAMS
# ==============================================================================

def svg_fig4_1():
    # Figure 4.1: Authentication and Login UI Mockup
    return """
    <div style="text-align: center; margin: 8px 0;">
      <svg width="560" height="185" viewBox="0 0 560 185" xmlns="http://www.w3.org/2000/svg">
        <!-- Browser Frame -->
        <rect x="10" y="8" width="540" height="170" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="1"/>
        <rect x="10" y="8" width="540" height="22" rx="6" fill="#e2e8f0"/>
        <circle cx="24" cy="19" r="3.5" fill="#ef4444"/>
        <circle cx="35" cy="19" r="3.5" fill="#f59e0b"/>
        <circle cx="46" cy="19" r="3.5" fill="#10b981"/>
        <rect x="65" y="12" width="260" height="14" rx="3" fill="#ffffff"/>
        <text x="75" y="23" font-family="'Courier New', monospace" font-size="6.5pt" fill="#64748b">https://eduvault.vercel.app/login</text>

        <!-- Login Card -->
        <rect x="155" y="38" width="250" height="132" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
        <text x="280" y="55" font-family="'Times New Roman', serif" font-size="9pt" font-weight="bold" fill="#0b1f44" text-anchor="middle">EduVault Secure Access</text>
        <text x="280" y="67" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#64748b" text-anchor="middle">Digital Academic Locker &amp; Verification</text>

        <!-- Role Selectors -->
        <rect x="170" y="74" width="50" height="16" rx="3" fill="#2563eb"/>
        <text x="195" y="85" font-family="'Times New Roman', serif" font-size="6pt" font-weight="bold" fill="#fff" text-anchor="middle">Student</text>

        <rect x="225" y="74" width="50" height="16" rx="3" fill="#f1f5f9" stroke="#cbd5e1"/>
        <text x="250" y="85" font-family="'Times New Roman', serif" font-size="6pt" fill="#475569" text-anchor="middle">Alumni</text>

        <rect x="280" y="74" width="55" height="16" rx="3" fill="#f1f5f9" stroke="#cbd5e1"/>
        <text x="307" y="85" font-family="'Times New Roman', serif" font-size="6pt" fill="#475569" text-anchor="middle">Committee</text>

        <rect x="340" y="74" width="50" height="16" rx="3" fill="#f1f5f9" stroke="#cbd5e1"/>
        <text x="365" y="85" font-family="'Times New Roman', serif" font-size="6pt" fill="#475569" text-anchor="middle">Placement</text>

        <!-- Inputs -->
        <rect x="170" y="96" width="220" height="18" rx="3" fill="#f8fafc" stroke="#cbd5e1"/>
        <text x="180" y="108" font-family="'Courier New', monospace" font-size="6.5pt" fill="#334155">ak12@gmail.com</text>

        <rect x="170" y="120" width="220" height="18" rx="3" fill="#f8fafc" stroke="#cbd5e1"/>
        <text x="180" y="132" font-family="'Courier New', monospace" font-size="6.5pt" fill="#64748b">••••••••••••</text>

        <!-- Button -->
        <rect x="170" y="144" width="220" height="20" rx="3" fill="#2563eb"/>
        <text x="280" y="157" font-family="'Times New Roman', serif" font-size="7.5pt" font-weight="bold" fill="#ffffff" text-anchor="middle">Sign In to EduVault</text>
      </svg>
    </div>
    """

def svg_fig4_2():
    # Figure 4.2: Document Upload Screen Wireframe
    return """
    <div style="text-align: center; margin: 8px 0;">
      <svg width="560" height="185" viewBox="0 0 560 185" xmlns="http://www.w3.org/2000/svg">
        <!-- Browser Frame -->
        <rect x="10" y="8" width="540" height="170" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="1"/>
        <rect x="10" y="8" width="540" height="22" rx="6" fill="#e2e8f0"/>
        <circle cx="24" cy="19" r="3.5" fill="#ef4444"/>
        <circle cx="35" cy="19" r="3.5" fill="#f59e0b"/>
        <circle cx="46" cy="19" r="3.5" fill="#10b981"/>
        <rect x="65" y="12" width="260" height="14" rx="3" fill="#ffffff"/>
        <text x="75" y="23" font-family="'Courier New', monospace" font-size="6.5pt" fill="#64748b">https://eduvault.vercel.app/certificates/upload</text>

        <!-- Modal Box -->
        <rect x="130" y="36" width="300" height="135" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
        <text x="145" y="52" font-family="'Times New Roman', serif" font-size="8.5pt" font-weight="bold" fill="#0b1f44">Upload Academic Document</text>
        <line x1="130" y1="58" x2="430" y2="58" stroke="#e2e8f0"/>

        <!-- Drag Drop Zone -->
        <rect x="145" y="65" width="270" height="42" rx="4" fill="#f8fafc" stroke="#93c5fd" stroke-width="1" stroke-dasharray="3,2"/>
        <text x="280" y="83" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" fill="#2563eb" text-anchor="middle">Drag &amp; Drop PDF or PNG / JPG</text>
        <text x="280" y="95" font-family="'Times New Roman', serif" font-size="6pt" fill="#64748b" text-anchor="middle">Maximum file size: 5.0 MB (Academic Credentials Only)</text>

        <!-- Title input -->
        <text x="145" y="117" font-family="'Times New Roman', serif" font-size="6.5pt" font-weight="bold" fill="#334155">Document Title:</text>
        <rect x="210" y="108" width="205" height="14" rx="2" fill="#fff" stroke="#cbd5e1"/>
        <text x="215" y="119" font-family="'Courier New', monospace" font-size="6pt" fill="#334155">MCA Semester II Marksheet Transcript</text>

        <!-- Category dropdown -->
        <text x="145" y="134" font-family="'Times New Roman', serif" font-size="6.5pt" font-weight="bold" fill="#334155">Category:</text>
        <rect x="210" y="125" width="120" height="14" rx="2" fill="#fff" stroke="#cbd5e1"/>
        <text x="215" y="135" font-family="'Times New Roman', serif" font-size="6pt" fill="#334155">Degree Certificate ▼</text>

        <!-- Upload button -->
        <rect x="335" y="146" width="80" height="18" rx="3" fill="#16a34a"/>
        <text x="375" y="158" font-family="'Times New Roman', serif" font-size="6.5pt" font-weight="bold" fill="#ffffff" text-anchor="middle">Submit to Vault</text>
      </svg>
    </div>
    """

def svg_fig4_3():
    # Figure 4.3: Placement Filter Screen Wireframe
    return """
    <div style="text-align: center; margin: 8px 0;">
      <svg width="560" height="185" viewBox="0 0 560 185" xmlns="http://www.w3.org/2000/svg">
        <!-- Browser Frame -->
        <rect x="10" y="8" width="540" height="170" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="1"/>
        <rect x="10" y="8" width="540" height="22" rx="6" fill="#e2e8f0"/>
        <circle cx="24" cy="19" r="3.5" fill="#ef4444"/>
        <circle cx="35" cy="19" r="3.5" fill="#f59e0b"/>
        <circle cx="46" cy="19" r="3.5" fill="#10b981"/>
        <rect x="65" y="12" width="260" height="14" rx="3" fill="#ffffff"/>
        <text x="75" y="23" font-family="'Courier New', monospace" font-size="6.5pt" fill="#64748b">https://eduvault.vercel.app/placement</text>

        <!-- Top Header & Pills -->
        <text x="25" y="48" font-family="'Times New Roman', serif" font-size="8.5pt" font-weight="bold" fill="#0b1f44">Placement Talent Discovery Hub</text>
        <rect x="25" y="55" width="140" height="16" rx="3" fill="#ffffff" stroke="#cbd5e1"/>
        <text x="32" y="66" font-family="'Times New Roman', serif" font-size="6pt" fill="#64748b">🔍 Search candidate or PRN...</text>

        <!-- CGPA Threshold Pills -->
        <rect x="180" y="55" width="45" height="16" rx="8" fill="#e2e8f0"/>
        <text x="202" y="66" font-family="'Times New Roman', serif" font-size="6pt" fill="#334155" text-anchor="middle">All (240)</text>

        <rect x="232" y="55" width="60" height="16" rx="8" fill="#2563eb"/>
        <text x="262" y="66" font-family="'Times New Roman', serif" font-size="6pt" font-weight="bold" fill="#ffffff" text-anchor="middle">CGPA ≥ 9.0</text>

        <rect x="298" y="55" width="60" height="16" rx="8" fill="#f1f5f9" stroke="#cbd5e1"/>
        <text x="328" y="66" font-family="'Times New Roman', serif" font-size="6pt" fill="#475569" text-anchor="middle">CGPA ≥ 8.0</text>

        <rect x="364" y="55" width="60" height="16" rx="8" fill="#f1f5f9" stroke="#cbd5e1"/>
        <text x="394" y="66" font-family="'Times New Roman', serif" font-size="6pt" fill="#475569" text-anchor="middle">CGPA ≥ 7.5</text>

        <!-- Candidate Table Mockup -->
        <rect x="25" y="78" width="510" height="92" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
        <!-- Table Header -->
        <rect x="25" y="78" width="510" height="18" fill="#f8fafc"/>
        <text x="35" y="90" font-family="'Times New Roman', serif" font-size="6.5pt" font-weight="bold" fill="#334155">Candidate Name</text>
        <text x="160" y="90" font-family="'Times New Roman', serif" font-size="6.5pt" font-weight="bold" fill="#334155">PRN</text>
        <text x="245" y="90" font-family="'Times New Roman', serif" font-size="6.5pt" font-weight="bold" fill="#334155">CGPA</text>
        <text x="310" y="90" font-family="'Times New Roman', serif" font-size="6.5pt" font-weight="bold" fill="#334155">Verified Docs</text>
        <text x="440" y="90" font-family="'Times New Roman', serif" font-size="6.5pt" font-weight="bold" fill="#334155">Recruiter Action</text>

        <!-- Row 1 -->
        <line x1="25" y1="96" x2="535" y2="96" stroke="#e2e8f0"/>
        <text x="35" y="112" font-family="'Times New Roman', serif" font-size="6.5pt" font-weight="bold" fill="#0f172a">Akshay Darji</text>
        <text x="160" y="112" font-family="'Courier New', monospace" font-size="6.5pt" fill="#475569">1272250311</text>
        <text x="245" y="112" font-family="'Courier New', monospace" font-size="6.5pt" font-weight="bold" fill="#16a34a">9.20</text>
        <rect x="310" y="103" width="70" height="12" rx="3" fill="#dcfce7"/>
        <text x="345" y="112" font-family="'Times New Roman', serif" font-size="5.5pt" fill="#14532d" text-anchor="middle">6 Verified (100%)</text>
        <rect x="430" y="102" width="75" height="14" rx="3" fill="#2563eb"/>
        <text x="467" y="112" font-family="'Times New Roman', serif" font-size="6pt" fill="#ffffff" text-anchor="middle">View Dossier</text>

        <!-- Row 2 -->
        <line x1="25" y1="120" x2="535" y2="120" stroke="#e2e8f0"/>
        <text x="35" y="136" font-family="'Times New Roman', serif" font-size="6.5pt" font-weight="bold" fill="#0f172a">Priyesh Nandanwar</text>
        <text x="160" y="136" font-family="'Courier New', monospace" font-size="6.5pt" fill="#475569">1272250279</text>
        <text x="245" y="136" font-family="'Courier New', monospace" font-size="6.5pt" font-weight="bold" fill="#16a34a">9.05</text>
        <rect x="310" y="127" width="70" height="12" rx="3" fill="#dcfce7"/>
        <text x="345" y="136" font-family="'Times New Roman', serif" font-size="5.5pt" fill="#14532d" text-anchor="middle">5 Verified (100%)</text>
        <rect x="430" y="126" width="75" height="14" rx="3" fill="#2563eb"/>
        <text x="467" y="136" font-family="'Times New Roman', serif" font-size="6pt" fill="#ffffff" text-anchor="middle">View Dossier</text>

        <!-- Row 3 -->
        <line x1="25" y1="144" x2="535" y2="144" stroke="#e2e8f0"/>
        <text x="35" y="159" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#0f172a">Rohan Deshmukh</text>
        <text x="160" y="159" font-family="'Courier New', monospace" font-size="6.5pt" fill="#475569">1272250184</text>
        <text x="245" y="159" font-family="'Courier New', monospace" font-size="6.5pt" fill="#475569">9.12</text>
        <rect x="310" y="150" width="70" height="12" rx="3" fill="#dcfce7"/>
        <text x="345" y="159" font-family="'Times New Roman', serif" font-size="5.5pt" fill="#14532d" text-anchor="middle">4 Verified (80%)</text>
        <rect x="430" y="149" width="75" height="14" rx="3" fill="#2563eb"/>
        <text x="467" y="159" font-family="'Times New Roman', serif" font-size="6pt" fill="#ffffff" text-anchor="middle">View Dossier</text>
      </svg>
    </div>
    """

def svg_fig4_4():
    # Figure 4.4: Student Digital Locker Dashboard
    return """
    <div style="text-align: center; margin: 8px 0;">
      <svg width="560" height="185" viewBox="0 0 560 185" xmlns="http://www.w3.org/2000/svg">
        <!-- Browser Frame -->
        <rect x="10" y="8" width="540" height="170" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="1"/>
        <rect x="10" y="8" width="540" height="22" rx="6" fill="#e2e8f0"/>
        <circle cx="24" cy="19" r="3.5" fill="#ef4444"/>
        <circle cx="35" cy="19" r="3.5" fill="#f59e0b"/>
        <circle cx="46" cy="19" r="3.5" fill="#10b981"/>
        <rect x="65" y="12" width="260" height="14" rx="3" fill="#ffffff"/>
        <text x="75" y="23" font-family="'Courier New', monospace" font-size="6.5pt" fill="#64748b">https://eduvault.vercel.app/dashboard</text>

        <!-- Top Profile & Metric Cards -->
        <text x="25" y="47" font-family="'Times New Roman', serif" font-size="8.5pt" font-weight="bold" fill="#0b1f44">Welcome, Akshay Darji (PRN: 1272250311)</text>

        <!-- Stat Card 1 -->
        <rect x="25" y="55" width="105" height="36" rx="4" fill="#eff6ff" stroke="#bfdbfe"/>
        <text x="35" y="69" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#1e40af">Total Documents</text>
        <text x="35" y="85" font-family="'Times New Roman', serif" font-size="11pt" font-weight="bold" fill="#1e3a8a">8</text>

        <!-- Stat Card 2 -->
        <rect x="140" y="55" width="105" height="36" rx="4" fill="#f0fdf4" stroke="#bbf7d0"/>
        <text x="150" y="69" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#166534">Verified Credentials</text>
        <text x="150" y="85" font-family="'Times New Roman', serif" font-size="11pt" font-weight="bold" fill="#14532d">6</text>

        <!-- Stat Card 3 -->
        <rect x="255" y="55" width="105" height="36" rx="4" fill="#fefce8" stroke="#fef08a"/>
        <text x="265" y="69" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#854d0e">Pending Review</text>
        <text x="265" y="85" font-family="'Times New Roman', serif" font-size="11pt" font-weight="bold" fill="#713f12">2</text>

        <!-- Top Right Actions -->
        <rect x="375" y="55" width="75" height="36" rx="4" fill="#2563eb"/>
        <text x="412" y="77" font-family="'Times New Roman', serif" font-size="6.5pt" font-weight="bold" fill="#ffffff" text-anchor="middle">+ Upload</text>

        <rect x="458" y="55" width="77" height="36" rx="4" fill="#06b6d4"/>
        <text x="496" y="77" font-family="'Times New Roman', serif" font-size="6.5pt" font-weight="bold" fill="#ffffff" text-anchor="middle">QR Key</text>

        <!-- Document Cards Grid -->
        <!-- Doc Card 1 -->
        <rect x="25" y="100" width="160" height="68" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
        <text x="35" y="116" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" fill="#0f172a">MCA Degree Certificate</text>
        <rect x="35" y="122" width="55" height="12" rx="3" fill="#dcfce7"/>
        <text x="62" y="131" font-family="'Times New Roman', serif" font-size="5.5pt" font-weight="bold" fill="#166534" text-anchor="middle">VERIFIED</text>
        <text x="35" y="148" font-family="'Times New Roman', serif" font-size="5.5pt" fill="#64748b">Verified by: Mrs. Sukanya A.</text>
        <text x="35" y="160" font-family="'Courier New', monospace" font-size="5pt" fill="#94a3b8">UUID: f47ac10b...</text>

        <!-- Doc Card 2 -->
        <rect x="195" y="100" width="160" height="68" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
        <text x="205" y="116" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" fill="#0f172a">Sem II Grade Transcript</text>
        <rect x="205" y="122" width="55" height="12" rx="3" fill="#dcfce7"/>
        <text x="232" y="131" font-family="'Times New Roman', serif" font-size="5.5pt" font-weight="bold" fill="#166534" text-anchor="middle">VERIFIED</text>
        <text x="205" y="148" font-family="'Times New Roman', serif" font-size="5.5pt" fill="#64748b">Verified by: Mrs. Sukanya A.</text>
        <text x="205" y="160" font-family="'Courier New', monospace" font-size="5pt" fill="#94a3b8">UUID: 89ab32c1...</text>

        <!-- Doc Card 3 -->
        <rect x="365" y="100" width="170" height="68" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
        <text x="375" y="116" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" fill="#0f172a">AWS Cloud Practitioner</text>
        <rect x="375" y="122" width="55" height="12" rx="3" fill="#fef9c3"/>
        <text x="402" y="131" font-family="'Times New Roman', serif" font-size="5.5pt" font-weight="bold" fill="#854d0e" text-anchor="middle">PENDING</text>
        <text x="375" y="148" font-family="'Times New Roman', serif" font-size="5.5pt" fill="#ca8a04">Under Academic Committee Queue</text>
        <text x="375" y="160" font-family="'Courier New', monospace" font-size="5pt" fill="#94a3b8">Submitted: 26 Oct 2026</text>
      </svg>
    </div>
    """

def svg_fig4_5():
    # Figure 4.5: Cryptographic Interview Key QR Modal Wireframe
    return """
    <div style="text-align: center; margin: 8px 0;">
      <svg width="560" height="185" viewBox="0 0 560 185" xmlns="http://www.w3.org/2000/svg">
        <!-- Modal Backdrop -->
        <rect x="10" y="8" width="540" height="170" rx="6" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1"/>

        <!-- Modal Dialog Box -->
        <rect x="140" y="20" width="280" height="148" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
        <text x="280" y="38" font-family="'Times New Roman', serif" font-size="8.5pt" font-weight="bold" fill="#0b1f44" text-anchor="middle">Candidate Interview Key QR</text>
        <line x1="140" y1="44" x2="420" y2="44" stroke="#e2e8f0"/>

        <!-- QR Pattern Graphic -->
        <rect x="235" y="52" width="90" height="60" rx="4" fill="#f8fafc" stroke="#334155" stroke-width="1.2"/>
        <!-- QR Corner Squares -->
        <rect x="242" y="58" width="16" height="16" fill="#0f172a"/>
        <rect x="245" y="61" width="10" height="10" fill="#ffffff"/>
        <rect x="247" y="63" width="6" height="6" fill="#0f172a"/>

        <rect x="302" y="58" width="16" height="16" fill="#0f172a"/>
        <rect x="305" y="61" width="10" height="10" fill="#ffffff"/>
        <rect x="307" y="63" width="6" height="6" fill="#0f172a"/>

        <rect x="242" y="88" width="16" height="16" fill="#0f172a"/>
        <rect x="245" y="91" width="10" height="10" fill="#ffffff"/>
        <rect x="247" y="93" width="6" height="6" fill="#0f172a"/>

        <!-- QR bits -->
        <rect x="265" y="62" width="6" height="6" fill="#0f172a"/>
        <rect x="275" y="68" width="6" height="6" fill="#0f172a"/>
        <rect x="288" y="62" width="6" height="6" fill="#0f172a"/>
        <rect x="268" y="85" width="8" height="8" fill="#0f172a"/>
        <rect x="285" y="82" width="6" height="6" fill="#0f172a"/>
        <rect x="300" y="90" width="8" height="8" fill="#0f172a"/>

        <!-- URL Link Bar -->
        <rect x="155" y="118" width="250" height="16" rx="3" fill="#f8fafc" stroke="#cbd5e1"/>
        <text x="162" y="129" font-family="'Courier New', monospace" font-size="6pt" fill="#2563eb">https://eduvault.vercel.app/student/14</text>
        <rect x="375" y="119" width="28" height="14" rx="2" fill="#2563eb"/>
        <text x="389" y="129" font-family="'Times New Roman', serif" font-size="5.5pt" fill="#fff" text-anchor="middle">Copy</text>

        <!-- Buttons -->
        <rect x="175" y="140" width="95" height="18" rx="3" fill="#16a34a"/>
        <text x="222" y="152" font-family="'Times New Roman', serif" font-size="6.5pt" font-weight="bold" fill="#ffffff" text-anchor="middle">Download PNG</text>

        <rect x="290" y="140" width="95" height="18" rx="3" fill="#f1f5f9" stroke="#cbd5e1"/>
        <text x="337" y="152" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#475569" text-anchor="middle">Close Modal</text>
      </svg>
    </div>
    """

def svg_fig4_6():
    # Figure 4.6: Committee Review Queue Screen Wireframe
    return """
    <div style="text-align: center; margin: 8px 0;">
      <svg width="560" height="185" viewBox="0 0 560 185" xmlns="http://www.w3.org/2000/svg">
        <!-- Browser Frame -->
        <rect x="10" y="8" width="540" height="170" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="1"/>
        <rect x="10" y="8" width="540" height="22" rx="6" fill="#e2e8f0"/>
        <circle cx="24" cy="19" r="3.5" fill="#ef4444"/>
        <circle cx="35" cy="19" r="3.5" fill="#f59e0b"/>
        <circle cx="46" cy="19" r="3.5" fill="#10b981"/>
        <rect x="65" y="12" width="260" height="14" rx="3" fill="#ffffff"/>
        <text x="75" y="23" font-family="'Courier New', monospace" font-size="6.5pt" fill="#64748b">https://eduvault.vercel.app/committee/documents</text>

        <!-- Split Layout -->
        <!-- Left: Queue (35%) -->
        <rect x="20" y="38" width="190" height="132" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
        <rect x="20" y="38" width="190" height="20" fill="#f1f5f9"/>
        <text x="30" y="52" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" fill="#0b1f44">Pending Submissions (12)</text>

        <!-- Queue Item 1 (Selected) -->
        <rect x="25" y="64" width="180" height="30" rx="3" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="32" y="76" font-family="'Times New Roman', serif" font-size="6.5pt" font-weight="bold" fill="#1e3a8a">Akshay Darji (PRN: ...311)</text>
        <text x="32" y="87" font-family="'Times New Roman', serif" font-size="6pt" fill="#2563eb">MCA Degree Certificate.pdf</text>

        <!-- Queue Item 2 -->
        <rect x="25" y="98" width="180" height="30" rx="3" fill="#ffffff" stroke="#e2e8f0"/>
        <text x="32" y="110" font-family="'Times New Roman', serif" font-size="6.5pt" font-weight="bold" fill="#334155">Priyesh N. (PRN: ...279)</text>
        <text x="32" y="121" font-family="'Times New Roman', serif" font-size="6pt" fill="#64748b">Consolidated Marksheet.pdf</text>

        <!-- Queue Item 3 -->
        <rect x="25" y="132" width="180" height="30" rx="3" fill="#ffffff" stroke="#e2e8f0"/>
        <text x="32" y="144" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#334155">Rohan D. (PRN: ...184)</text>
        <text x="32" y="155" font-family="'Times New Roman', serif" font-size="6pt" fill="#64748b">AWS Certificate.png</text>

        <!-- Right: In-App Document Previewer (65%) -->
        <rect x="220" y="38" width="320" height="132" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
        <rect x="220" y="38" width="320" height="20" fill="#f8fafc"/>
        <text x="230" y="52" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" fill="#0b1f44">Document Preview: MCA Degree Certificate.pdf</text>

        <!-- Document Preview Body -->
        <rect x="240" y="65" width="280" height="68" rx="3" fill="#f8fafc" stroke="#cbd5e1"/>
        <text x="380" y="82" font-family="'Times New Roman', serif" font-size="8pt" font-weight="bold" fill="#0b1f44" text-anchor="middle">MIT WORLD PEACE UNIVERSITY</text>
        <text x="380" y="95" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#475569" text-anchor="middle">Master of Computer Applications — Degree Certificate</text>
        <text x="380" y="108" font-family="'Times New Roman', serif" font-size="6pt" fill="#64748b" text-anchor="middle">Awarded to: Akshay Darji | PRN: 1272250311 | CGPA: 9.20</text>
        <text x="380" y="120" font-family="'Times New Roman', serif" font-size="6pt" font-weight="bold" fill="#16a34a" text-anchor="middle">✔ Official Registrar Seal Verified</text>

        <!-- Action Bar -->
        <rect x="240" y="142" width="130" height="20" rx="3" fill="#dc2626"/>
        <text x="305" y="155" font-family="'Times New Roman', serif" font-size="6.5pt" font-weight="bold" fill="#ffffff" text-anchor="middle">Reject with Feedback</text>

        <rect x="390" y="142" width="130" height="20" rx="3" fill="#16a34a"/>
        <text x="455" y="155" font-family="'Times New Roman', serif" font-size="6.5pt" font-weight="bold" fill="#ffffff" text-anchor="middle">✔ Approve &amp; Verify Document</text>
      </svg>
    </div>
    """

def svg_fig4_7():
    # Figure 4.7: Dynamic Alumni Network Directory Wireframe
    return """
    <div style="text-align: center; margin: 8px 0;">
      <svg width="560" height="185" viewBox="0 0 560 185" xmlns="http://www.w3.org/2000/svg">
        <!-- Browser Frame -->
        <rect x="10" y="8" width="540" height="170" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="1"/>
        <rect x="10" y="8" width="540" height="22" rx="6" fill="#e2e8f0"/>
        <circle cx="24" cy="19" r="3.5" fill="#ef4444"/>
        <circle cx="35" cy="19" r="3.5" fill="#f59e0b"/>
        <circle cx="46" cy="19" r="3.5" fill="#10b981"/>
        <rect x="65" y="12" width="260" height="14" rx="3" fill="#ffffff"/>
        <text x="75" y="23" font-family="'Courier New', monospace" font-size="6.5pt" fill="#64748b">https://eduvault.vercel.app/alumni</text>

        <!-- Header and Search -->
        <text x="25" y="47" font-family="'Times New Roman', serif" font-size="8.5pt" font-weight="bold" fill="#0b1f44">MIT-WPU Alumni Network Directory</text>
        <rect x="25" y="55" width="200" height="16" rx="3" fill="#ffffff" stroke="#cbd5e1"/>
        <text x="32" y="66" font-family="'Times New Roman', serif" font-size="6pt" fill="#64748b">🔍 Search by company, role, or alumni name...</text>

        <rect x="235" y="55" width="60" height="16" rx="3" fill="#f1f5f9" stroke="#cbd5e1"/>
        <text x="265" y="66" font-family="'Times New Roman', serif" font-size="6pt" fill="#475569" text-anchor="middle">MCA ▼</text>

        <rect x="305" y="55" width="75" height="16" rx="3" fill="#2563eb"/>
        <text x="342" y="66" font-family="'Times New Roman', serif" font-size="6pt" fill="#fff" text-anchor="middle">Find Mentors</text>

        <!-- Alumni Cards Grid -->
        <!-- Card 1 -->
        <rect x="25" y="80" width="160" height="88" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
        <circle cx="45" cy="98" r="10" fill="#dbeafe"/>
        <text x="45" y="102" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" fill="#1e3a8a" text-anchor="middle">RS</text>
        <text x="62" y="96" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" fill="#0f172a">Rahul Sharma</text>
        <text x="62" y="106" font-family="'Times New Roman', serif" font-size="6pt" fill="#64748b">Class of 2024</text>
        <rect x="35" y="114" width="140" height="14" rx="2" fill="#eff6ff"/>
        <text x="105" y="124" font-family="'Times New Roman', serif" font-size="6pt" font-weight="bold" fill="#1e40af" text-anchor="middle">Software Engineer @ Google</text>
        <rect x="35" y="134" width="140" height="14" rx="2" fill="#dcfce7"/>
        <text x="105" y="144" font-family="'Times New Roman', serif" font-size="5.5pt" font-weight="bold" fill="#14532d" text-anchor="middle">✔ Available for Mentorship</text>

        <!-- Card 2 -->
        <rect x="195" y="80" width="160" height="88" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
        <circle cx="215" cy="98" r="10" fill="#fce7f3"/>
        <text x="215" y="102" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" fill="#be185d" text-anchor="middle">SP</text>
        <text x="232" y="96" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" fill="#0f172a">Sneha Patil</text>
        <text x="232" y="106" font-family="'Times New Roman', serif" font-size="6pt" fill="#64748b">Class of 2023</text>
        <rect x="205" y="114" width="140" height="14" rx="2" fill="#faf5ff"/>
        <text x="275" y="124" font-family="'Times New Roman', serif" font-size="6pt" font-weight="bold" fill="#6b21a8" text-anchor="middle">Data Scientist @ Microsoft</text>
        <rect x="205" y="134" width="140" height="14" rx="2" fill="#dcfce7"/>
        <text x="275" y="144" font-family="'Times New Roman', serif" font-size="5.5pt" font-weight="bold" fill="#14532d" text-anchor="middle">✔ Referral Program Active</text>

        <!-- Card 3 -->
        <rect x="365" y="80" width="170" height="88" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
        <circle cx="385" cy="98" r="10" fill="#fef3c7"/>
        <text x="385" y="102" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" fill="#b45309" text-anchor="middle">AD</text>
        <text x="402" y="96" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" fill="#0f172a">Amit Deshmukh</text>
        <text x="402" y="106" font-family="'Times New Roman', serif" font-size="6pt" fill="#64748b">Class of 2022</text>
        <rect x="375" y="114" width="150" height="14" rx="2" fill="#fff7ed"/>
        <text x="450" y="124" font-family="'Times New Roman', serif" font-size="6pt" font-weight="bold" fill="#c2410c" text-anchor="middle">Tech Lead @ Infosys</text>
        <rect x="375" y="134" width="150" height="14" rx="2" fill="#dcfce7"/>
        <text x="450" y="144" font-family="'Times New Roman', serif" font-size="5.5pt" font-weight="bold" fill="#14532d" text-anchor="middle">✔ Available for Mentorship</text>
      </svg>
    </div>
    """

def svg_fig4_8():
    # Figure 4.8: Public Candidate Verification Dossier Wireframe
    return """
    <div style="text-align: center; margin: 8px 0;">
      <svg width="560" height="185" viewBox="0 0 560 185" xmlns="http://www.w3.org/2000/svg">
        <!-- Browser Frame -->
        <rect x="10" y="8" width="540" height="170" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="1"/>
        <rect x="10" y="8" width="540" height="22" rx="6" fill="#e2e8f0"/>
        <circle cx="24" cy="19" r="3.5" fill="#ef4444"/>
        <circle cx="35" cy="19" r="3.5" fill="#f59e0b"/>
        <circle cx="46" cy="19" r="3.5" fill="#10b981"/>
        <rect x="65" y="12" width="260" height="14" rx="3" fill="#ffffff"/>
        <text x="75" y="23" font-family="'Courier New', monospace" font-size="6.5pt" fill="#64748b">https://eduvault.vercel.app/student/14</text>

        <!-- Official Institutional Banner -->
        <rect x="25" y="38" width="510" height="32" rx="4" fill="#0b1f44"/>
        <text x="280" y="52" font-family="'Times New Roman', serif" font-size="7.5pt" font-weight="bold" fill="#ffffff" text-anchor="middle">DR. VISHWANATH KARAD MIT WORLD PEACE UNIVERSITY, PUNE</text>
        <text x="280" y="63" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#93c5fd" text-anchor="middle">Official Verified Candidate Academic Dossier</text>

        <!-- Candidate Profile Header -->
        <rect x="25" y="74" width="510" height="30" rx="3" fill="#ffffff" stroke="#cbd5e1"/>
        <text x="35" y="87" font-family="'Times New Roman', serif" font-size="8pt" font-weight="bold" fill="#0f172a">Candidate: Akshay Darji</text>
        <text x="35" y="98" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#475569">SY Master of Computer Applications (MCA) | PRN: 1272250311</text>
        <text x="380" y="88" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" fill="#14532d">Cumulative CGPA: 9.20 / 10.0</text>
        <rect x="380" y="91" width="145" height="10" rx="2" fill="#dcfce7"/>
        <text x="452" y="99" font-family="'Times New Roman', serif" font-size="5pt" font-weight="bold" fill="#166534" text-anchor="middle">✔ 100% Verified Academic Record</text>

        <!-- Verified Documents List -->
        <rect x="25" y="108" width="510" height="62" rx="3" fill="#ffffff" stroke="#cbd5e1"/>
        <!-- Doc 1 -->
        <text x="35" y="122" font-family="'Times New Roman', serif" font-size="6.5pt" font-weight="bold" fill="#0f172a">1. Master of Computer Applications — Degree Certificate</text>
        <text x="35" y="132" font-family="'Courier New', monospace" font-size="5.5pt" fill="#64748b">Verified: 15 Oct 2026 | Signer: Mrs. Sukanya Akolkar (Internal Guide)</text>
        <rect x="440" y="114" width="85" height="14" rx="2" fill="#2563eb"/>
        <text x="482" y="124" font-family="'Times New Roman', serif" font-size="5.5pt" fill="#ffffff" text-anchor="middle">View Original PDF</text>

        <line x1="25" y1="137" x2="535" y2="137" stroke="#e2e8f0"/>

        <!-- Doc 2 -->
        <text x="35" y="149" font-family="'Times New Roman', serif" font-size="6.5pt" font-weight="bold" fill="#0f172a">2. Semester II Consolidated Marksheet Transcript</text>
        <text x="35" y="159" font-family="'Courier New', monospace" font-size="5.5pt" fill="#64748b">Verified: 18 Oct 2026 | Signer: Examination Controller Committee</text>
        <rect x="440" y="141" width="85" height="14" rx="2" fill="#2563eb"/>
        <text x="482" y="151" font-family="'Times New Roman', serif" font-size="5.5pt" fill="#ffffff" text-anchor="middle">View Original PDF</text>
      </svg>
    </div>
    """

# ==============================================================================
# CHAPTER 5: IMPLEMENTATION & DIAGNOSTIC DIAGRAMS
# ==============================================================================

def svg_fig5_1():
    # Figure 5.1: Layered Implementation Order & Dependencies
    return """
    <div style="text-align: center; margin: 8px 0;">
      <svg width="500" height="165" viewBox="0 0 500 165" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arr5" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#334155"/>
          </marker>
        </defs>

        <rect x="50" y="8" width="400" height="28" rx="4" fill="#f3e8ff" stroke="#a855f7" stroke-width="1.2"/>
        <text x="250" y="26" font-family="'Times New Roman', serif" font-size="8pt" font-weight="bold" fill="#581c87" text-anchor="middle">Layer 1: Database Models &amp; PostgreSQL Schema (Neon Cloud)</text>

        <line x1="250" y1="36" x2="250" y2="48" stroke="#334155" stroke-width="1.2" marker-end="url(#arr5)"/>

        <rect x="50" y="48" width="400" height="28" rx="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.2"/>
        <text x="250" y="66" font-family="'Times New Roman', serif" font-size="8pt" font-weight="bold" fill="#1e3a8a" text-anchor="middle">Layer 2: Django REST Serializers, SimpleJWT &amp; RBAC Guarding</text>

        <line x1="250" y1="76" x2="250" y2="88" stroke="#334155" stroke-width="1.2" marker-end="url(#arr5)"/>

        <rect x="50" y="88" width="400" height="28" rx="4" fill="#dcfce7" stroke="#22c55e" stroke-width="1.2"/>
        <text x="250" y="106" font-family="'Times New Roman', serif" font-size="8pt" font-weight="bold" fill="#14532d" text-anchor="middle">Layer 3: React 18 + Vite Frontend &amp; Tailwind CSS User Portals</text>

        <line x1="250" y1="116" x2="250" y2="128" stroke="#334155" stroke-width="1.2" marker-end="url(#arr5)"/>

        <rect x="50" y="128" width="400" height="28" rx="4" fill="#ffedd5" stroke="#f97316" stroke-width="1.2"/>
        <text x="250" y="146" font-family="'Times New Roman', serif" font-size="8pt" font-weight="bold" fill="#7c2d12" text-anchor="middle">Layer 4: Production Cloud Orchestration (Vercel + Render + Neon)</text>
      </svg>
    </div>
    """

def svg_fig5_2():
    # Figure 5.2: Production media routing failure when DEBUG=False
    return """
    <div style="text-align: center; margin: 8px 0;">
      <svg width="560" height="150" viewBox="0 0 560 150" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrD" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#334155"/>
          </marker>
        </defs>

        <!-- Client Request -->
        <rect x="180" y="8" width="200" height="26" rx="4" fill="#eff6ff" stroke="#3b82f6"/>
        <text x="280" y="25" font-family="'Times New Roman', serif" font-size="7.5pt" font-weight="bold" fill="#1e3a8a" text-anchor="middle">Client Requests: /media/documents/cert.pdf</text>

        <!-- Branch Line -->
        <line x1="280" y1="34" x2="280" y2="48" stroke="#334155" stroke-width="1.2"/>
        <line x1="140" y1="48" x2="420" y2="48" stroke="#334155" stroke-width="1.2"/>

        <line x1="140" y1="48" x2="140" y2="60" stroke="#334155" stroke-width="1.2" marker-end="url(#arrD)"/>
        <line x1="420" y1="48" x2="420" y2="60" stroke="#334155" stroke-width="1.2" marker-end="url(#arrD)"/>

        <!-- Left: DEBUG = True -->
        <rect x="50" y="60" width="180" height="30" rx="4" fill="#dcfce7" stroke="#16a34a"/>
        <text x="140" y="74" font-family="'Times New Roman', serif" font-size="7.5pt" font-weight="bold" fill="#14532d" text-anchor="middle">DEBUG = True (Local Dev)</text>
        <text x="140" y="85" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#166534" text-anchor="middle">django.conf.urls.static.static() active</text>

        <line x1="140" y1="90" x2="140" y2="108" stroke="#16a34a" stroke-width="1.2" marker-end="url(#arrD)"/>
        <rect x="50" y="108" width="180" height="26" rx="4" fill="#f0fdf4" stroke="#86efac"/>
        <text x="140" y="125" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" fill="#15803d" text-anchor="middle">✔ HTTP 200 OK (File Served)</text>

        <!-- Right: DEBUG = False -->
        <rect x="330" y="60" width="180" height="30" rx="4" fill="#fee2e2" stroke="#dc2626"/>
        <text x="420" y="74" font-family="'Times New Roman', serif" font-size="7.5pt" font-weight="bold" fill="#991b1b" text-anchor="middle">DEBUG = False (Production)</text>
        <text x="420" y="85" font-family="'Times New Roman', serif" font-size="6.5pt" fill="#b91c1c" text-anchor="middle">static() helper is stripped by Django</text>

        <line x1="420" y1="90" x2="420" y2="108" stroke="#dc2626" stroke-width="1.2" marker-end="url(#arrD)"/>
        <rect x="330" y="108" width="180" height="26" rx="4" fill="#fff1f2" stroke="#fca5a5"/>
        <text x="420" y="125" font-family="'Times New Roman', serif" font-size="7pt" font-weight="bold" fill="#b91c1c" text-anchor="middle">✖ HTTP 404 Not Found (Missing Route)</text>
      </svg>
    </div>
    """

def svg_fig5_3():
    # Figure 5.3: Monorepo folder hierarchy causing root build failures
    return """
    <div style="text-align: center; margin: 8px 0;">
      <svg width="560" height="150" viewBox="0 0 560 150" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrM" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#334155"/>
          </marker>
        </defs>

        <!-- Monorepo Root -->
        <rect x="180" y="8" width="200" height="26" rx="4" fill="#1e293b" stroke="#0f172a"/>
        <text x="280" y="25" font-family="'Courier New', monospace" font-size="7.5pt" font-weight="bold" fill="#ffffff" text-anchor="middle">/eduvault-root (Git Repo)</text>

        <!-- Drop Lines -->
        <line x1="280" y1="34" x2="280" y2="48" stroke="#64748b" stroke-width="1.2"/>
        <line x1="140" y1="48" x2="420" y2="48" stroke="#64748b" stroke-width="1.2"/>

        <line x1="140" y1="48" x2="140" y2="60" stroke="#64748b" stroke-width="1.2" marker-end="url(#arrM)"/>
        <line x1="420" y1="48" x2="420" y2="60" stroke="#64748b" stroke-width="1.2" marker-end="url(#arrM)"/>

        <!-- Left: Frontend Subfolder -->
        <rect x="50" y="60" width="180" height="78" rx="4" fill="#eff6ff" stroke="#3b82f6"/>
        <rect x="50" y="60" width="180" height="18" fill="#3b82f6"/>
        <text x="140" y="73" font-family="'Courier New', monospace" font-size="7pt" font-weight="bold" fill="#fff" text-anchor="middle">eduvault-frontend/</text>
        <text x="60" y="92" font-family="'Courier New', monospace" font-size="6.5pt" fill="#1e40af">• package.json</text>
        <text x="60" y="104" font-family="'Courier New', monospace" font-size="6.5pt" fill="#1e40af">• vite.config.js</text>
        <text x="60" y="116" font-family="'Courier New', monospace" font-size="6.5pt" fill="#1e40af">• src/ (React Components)</text>
        <text x="60" y="128" font-family="'Times New Roman', serif" font-size="6pt" font-weight="bold" fill="#2563eb">→ Set Vercel Root: eduvault-frontend</text>

        <!-- Right: Backend Subfolder -->
        <rect x="330" y="60" width="180" height="78" rx="4" fill="#f0fdf4" stroke="#22c55e"/>
        <rect x="330" y="60" width="180" height="18" fill="#22c55e"/>
        <text x="420" y="73" font-family="'Courier New', monospace" font-size="7pt" font-weight="bold" fill="#fff" text-anchor="middle">eduvault-backned/</text>
        <text x="340" y="92" font-family="'Courier New', monospace" font-size="6.5pt" fill="#166534">• requirements.txt</text>
        <text x="340" y="104" font-family="'Courier New', monospace" font-size="6.5pt" fill="#166534">• manage.py</text>
        <text x="340" y="116" font-family="'Courier New', monospace" font-size="6.5pt" fill="#166534">• eduvault/ (Django Project)</text>
        <text x="340" y="128" font-family="'Times New Roman', serif" font-size="6pt" font-weight="bold" fill="#16a34a">→ Set Render Root: eduvault-backned</text>
      </svg>
    </div>
    """
