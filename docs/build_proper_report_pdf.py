# -*- coding: utf-8 -*-
"""
Build the exact 56-page EduVault Mini Project Report PDF.
Mirrors the precise visual structure, borders, headers, footers, typography,
and dense academic depth of the sample reference PDF.
"""

import os
import subprocess
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
HTML_FILE = BASE_DIR / "EduVault_56Page_Report.html"
PDF_FILE = BASE_DIR / "EduVault_Mini_Project_Report.pdf"

# Helper to construct a single A4 page with header, footer, and inner border
def make_page(page_num, content_html, is_front_matter=False):
    header_html = "" if is_front_matter else '<div class="page-header">EduVault | Mini Project Report</div>'
    footer_html = "" if is_front_matter else f'<div class="page-footer">Page {page_num}</div>'
    
    return f"""
    <div class="sheet">
      <div class="inner-border">
        {header_html}
        <div class="page-content">
          {content_html}
        </div>
        {footer_html}
      </div>
    </div>
    """

pages = []

# ==============================================================================
# FRONT MATTER (Pages i to iv)
# ==============================================================================

# Front Matter 1: Face Page
p1_content = """
<div style="text-align: center; height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
  <div>
    <h1 style="font-size: 20pt; margin-top: 10px; margin-bottom: 5px;">Mini Project Report</h1>
    <p class="no-indent" style="font-size: 13pt; margin: 0; font-weight: normal;">On</p>
    <h2 style="font-size: 16.5pt; margin: 18px 0; border: none; color: #0b1f44; letter-spacing: 0.5px;">
      “EduVault: Digital Locker and Academic Credential Verification Platform”
    </h2>

    <p class="no-indent" style="font-size: 11.5pt; margin: 25px 0 8px 0; font-weight: bold;">By</p>
    <p class="no-indent" style="font-size: 12.5pt; margin: 4px 0; line-height: 1.8;">
      <b>Akshay Darji</b> — PRN: <b>1272250311</b><br/>
      <b>Priyesh Nandanwar</b> — PRN: <b>1272250279</b>
    </p>

    <p class="no-indent" style="font-size: 11.5pt; margin: 25px 0 5px 0;">For</p>
    <p class="no-indent" style="font-size: 14.5pt; font-weight: bold; margin: 0;">
      MCA40130 Mini Project<br/>
      SY MCA (Semester III)<br/>
      AY 2026-2027
    </p>

    <p class="no-indent" style="font-size: 11.5pt; margin: 28px 0 5px 0;">Under The Guidance Of</p>
    <p class="no-indent" style="font-size: 14pt; font-weight: bold; margin: 0;">
      Mrs. Sukanya Akolkar
    </p>
  </div>

  <div style="margin-bottom: 5px;">
    <p class="no-indent" style="font-size: 10.5pt; margin: 4px 0;">Submitted To</p>
    <h3 style="font-size: 13.5pt; margin: 4px 0; text-transform: uppercase;">
      Dr. Vishwanath Karad<br/>MIT WORLD PEACE UNIVERSITY, PUNE
    </h3>
    <p class="no-indent" style="font-size: 10.5pt; margin: 8px 0 4px 0;">
      In partial fulfillment of the requirement for the award of Degree of<br/>
      <b>Master of Computer Applications (MCA)</b>
    </p>
    <p class="no-indent" style="font-size: 11pt; margin: 12px 0 0 0;">
      Submitted Through<br/>
      <b>School of Computer Science and Engineering</b><br/>
      <b>Department of Computer Science and Applications</b><br/>
      MIT-WPU, Pune - 411038
    </p>
  </div>
</div>
"""
pages.append(make_page("", p1_content, is_front_matter=True))

# Front Matter 2: Certificate Page
p2_content = """
<div style="height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
  <div style="text-align: center;">
    <h3 style="margin: 0; font-size: 12.5pt;">Dr. Vishwanath Karad MIT WORLD PEACE UNIVERSITY, PUNE</h3>
    <p class="no-indent" style="margin: 2px 0 0 0; font-size: 10.5pt;">School of Computer Science and Engineering</p>
    <h4 style="margin: 2px 0 0 0; font-size: 11pt;">Department of Computer Science and Applications</h4>
    <h1 style="font-size: 22pt; margin-top: 30px; margin-bottom: 25px; letter-spacing: 2px;">Certificate</h1>
  </div>

  <div style="font-size: 11.5pt; line-height: 1.85;">
    <p style="text-align: justify;">
      This is to certify that, <b>Akshay Darji</b> (PRN: <b>1272250311</b>) and <b>Priyesh Nandanwar</b> (PRN: <b>1272250279</b>), students of <b>SY MCA, Semester III</b> have completed Mini Project entitled 
      <b>“EduVault: Digital Locker and Academic Credential Verification Platform”</b> under guidance of <b>Mrs. Sukanya Akolkar</b> in partial fulfilment of requirement for the award of <b>Master of Computer Applications</b> prescribed under <b>Dr. Vishwanath Karad MIT World Peace University, Pune</b>.
    </p>
    <p style="text-align: justify; margin-top: 20px;">
      This project is the record of authentic work carried out by them during the academic year <b>2026-2027</b>.
    </p>
  </div>

  <div style="margin-top: 40px;">
    <div style="text-align: right; margin-bottom: 60px;">
      <p class="no-indent" style="font-size: 11.5pt; font-weight: bold; text-align: right;">
        Mrs. Sukanya Akolkar<br/>
        <span style="font-weight: normal; font-size: 10.5pt;">Internal Guide</span>
      </p>
    </div>

    <div style="display: flex; justify-content: space-between;">
      <div style="text-align: left;">
        <p class="no-indent" style="font-size: 11.5pt; font-weight: bold; text-align: left;">
          Dr. P. S. Metkewar<br/>
          <span style="font-weight: normal; font-size: 10.5pt;">Program Head - MCA</span>
        </p>
      </div>
      <div style="text-align: right;">
        <p class="no-indent" style="font-size: 11.5pt; font-weight: bold; text-align: right;">
          Dr. Anuradha S. Kanade<br/>
          <span style="font-weight: normal; font-size: 10.5pt;">Program Director</span>
        </p>
      </div>
    </div>
  </div>
</div>
"""
pages.append(make_page("", p2_content, is_front_matter=True))

# Front Matter 3: Acknowledgement
p3_content = """
<div style="height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
  <div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
      <span style="font-size: 10.5pt;"><b>Date:</b> 28 / 10 / 2026</span>
      <span style="font-size: 10.5pt;"><b>Place:</b> Pune</span>
    </div>
    <h1 style="text-align: center; font-size: 20pt; margin-bottom: 20px;">Acknowledgement</h1>

    <p>We wish to express our profound gratitude to all the individuals who supported us throughout the completion of our Mini Project III. This report is a testament to their guidance, patience, and resources.</p>

    <p>We are deeply indebted to our esteemed project guide, <b>Mrs. Sukanya Akolkar</b>, for her invaluable mentorship, direction, and continuous encouragement. Her advice was crucial in defining the scope, architectural framework, and methodology of this project.</p>

    <p>We extend our sincere thanks to the Head of the Program, <b>Dr. P. S. Metkewar</b>, and the Program Director, <b>Dr. Anuradha S. Kanade</b>, for providing the necessary computing facilities, academic framework, and environment conducive to advanced project work and research.</p>

    <p>Our appreciation also goes to all the <b>Faculty Members of the Department of Computer Science and Applications</b> for their comprehensive instruction and expertise, which equipped us with the knowledge foundational to this project.</p>

    <p>We thank our fellow Project Group Members, for their unwavering dedication, collaborative spirit, and commitment to shared goals. This project is a product of our collective effort.</p>

    <p>Finally, we are grateful to our <b>Classmates</b> for their constructive feedback and discussions, which enriched our understanding and helped us refine our approach.</p>
  </div>

  <div style="margin-top: 25px;">
    <table>
      <tr>
        <th style="width: 25%;">Field</th>
        <th style="width: 37.5%;">Team Member 1</th>
        <th style="width: 37.5%;">Team Member 2</th>
      </tr>
      <tr>
        <td><b>Name:</b></td>
        <td>Akshay Darji</td>
        <td>Priyesh Nandanwar</td>
      </tr>
      <tr>
        <td><b>PRN:</b></td>
        <td>1272250311</td>
        <td>1272250279</td>
      </tr>
      <tr>
        <td><b>Signature:</b></td>
        <td style="height: 40px;"></td>
        <td style="height: 40px;"></td>
      </tr>
    </table>
  </div>
</div>
"""
pages.append(make_page("", p3_content, is_front_matter=True))

# Front Matter 4: Declaration
p4_content = """
<div style="height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
  <div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
      <span style="font-size: 10.5pt;"><b>Date:</b> 28 / 10 / 2026</span>
      <span style="font-size: 10.5pt;"><b>Place:</b> Pune</span>
    </div>
    <h1 style="text-align: center; font-size: 20pt; margin-bottom: 25px;">Declaration</h1>

    <p>
      We, <b>Akshay Darji</b> and <b>Priyesh Nandanwar</b>, on behalf of our team hereby declare that this Mini Project report entitled 
      <b>“EduVault: Digital Locker and Academic Credential Verification Platform”</b> is an authentic record of our own work carried out under the supervision of <b>Mrs. Sukanya Akolkar</b>.
    </p>

    <p>
      We further declare that the content of this report, including all design, coding, testing, and analysis, is original and has not been submitted previously for any other degree or diploma at this or any other institution.
    </p>

    <p>
      We take sole and full responsibility for any errors, omissions, or misrepresentations found within this report.
    </p>
  </div>

  <div style="margin-top: 35px;">
    <table>
      <tr>
        <th style="width: 25%;">Field</th>
        <th style="width: 37.5%;">Team Member 1</th>
        <th style="width: 37.5%;">Team Member 2</th>
      </tr>
      <tr>
        <td><b>Name:</b></td>
        <td>Akshay Darji</td>
        <td>Priyesh Nandanwar</td>
      </tr>
      <tr>
        <td><b>PRN:</b></td>
        <td>1272250311</td>
        <td>1272250279</td>
      </tr>
      <tr>
        <td><b>Signature:</b></td>
        <td style="height: 45px;"></td>
        <td style="height: 45px;"></td>
      </tr>
    </table>
  </div>
</div>
"""
pages.append(make_page("", p4_content, is_front_matter=True))


# ==============================================================================
# BODY PAGES (Page 1 to Page 55)
# ==============================================================================

# Page 1: TABLE OF CONTENTS (Part 1)
toc_p1 = """
<h1 style="text-align: center; margin-bottom: 22px;">TABLE OF CONTENTS</h1>
<div class="toc-container">
  <div class="toc-line"><span><b>1.1 EXISTING SYSTEM, PROPOSED SYSTEM AND NEED AND OBJECTIVE OF SYSTEM</b></span> <span class="toc-dots"></span> <span>4</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>1.1.1 Existing System</span> <span class="toc-dots"></span> <span>4</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>1.1.2 Proposed System</span> <span class="toc-dots"></span> <span>5</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>1.1.3 Comparative Analysis</span> <span class="toc-dots"></span> <span>6</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>1.1.4 Need for the System</span> <span class="toc-dots"></span> <span>6</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>1.1.5 Objectives of the System</span> <span class="toc-dots"></span> <span>7</span></div>
  <div class="toc-line"><span><b>1.2 SCOPE OF WORK</b></span> <span class="toc-dots"></span> <span>8</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>1.2.1 Functional Scope</span> <span class="toc-dots"></span> <span>8</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>1.2.2 Technical Scope</span> <span class="toc-dots"></span> <span>8</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>1.2.3 Out of Scope and Boundaries</span> <span class="toc-dots"></span> <span>9</span></div>
  <div class="toc-line"><span><b>1.3 OPERATING ENVIRONMENT – HARDWARE AND SOFTWARE</b></span> <span class="toc-dots"></span> <span>9</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>1.3.1 Hardware Requirements</span> <span class="toc-dots"></span> <span>9</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>1.3.2 Software Requirements</span> <span class="toc-dots"></span> <span>10</span></div>
  <div class="toc-line"><span><b>1.4 Description of Technology used</b></span> <span class="toc-dots"></span> <span>11</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>1.4.1 Python 3.11 Runtime Environment</span> <span class="toc-dots"></span> <span>11</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>1.4.2 Django 6.0 and Django REST Framework (DRF)</span> <span class="toc-dots"></span> <span>11</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>1.4.3 SimpleJWT Token Authentication Architecture</span> <span class="toc-dots"></span> <span>11</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>1.4.4 React 18 and Vite Tooling Engine</span> <span class="toc-dots"></span> <span>11</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>1.4.5 Tailwind CSS and Lucide React Visual Components</span> <span class="toc-dots"></span> <span>11</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>1.4.6 PostgreSQL 16 and Neon Serverless Persistence</span> <span class="toc-dots"></span> <span>11</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>1.4.7 QRCode.react and Cryptographic Token Verification</span> <span class="toc-dots"></span> <span>12</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>1.4.8 Gunicorn WSGI and WhiteNoise Production Static Server</span> <span class="toc-dots"></span> <span>12</span></div>
  <div class="toc-line"><span><b>2. PROPOSED SYSTEM</b></span> <span class="toc-dots"></span> <span>13</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>2.1 FEASIBILITY STUDY</span> <span class="toc-dots"></span> <span>14</span></div>
  <div class="toc-line" style="padding-left: 30px;"><span>2.1.1 Technical Feasibility</span> <span class="toc-dots"></span> <span>14</span></div>
  <div class="toc-line" style="padding-left: 30px;"><span>2.1.2 Operational Feasibility</span> <span class="toc-dots"></span> <span>14</span></div>
  <div class="toc-line" style="padding-left: 30px;"><span>2.1.3 Economic Feasibility</span> <span class="toc-dots"></span> <span>14</span></div>
  <div class="toc-line" style="padding-left: 30px;"><span>2.1.4 Feasibility Conclusion</span> <span class="toc-dots"></span> <span>14</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>2.2 USER REQUIREMENTS</span> <span class="toc-dots"></span> <span>15</span></div>
  <div class="toc-line" style="padding-left: 30px;"><span>2.2.1 User Classes and Actor Profiles</span> <span class="toc-dots"></span> <span>15</span></div>
  <div class="toc-line"><span><b>3. SYSTEM DESIGN</b></span> <span class="toc-dots"></span> <span>16</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>3.1 Object Diagram</span> <span class="toc-dots"></span> <span>16</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>3.2 Class Diagram</span> <span class="toc-dots"></span> <span>17</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>3.3 Use Case Diagram</span> <span class="toc-dots"></span> <span>18</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>3.4 Sequence Diagram</span> <span class="toc-dots"></span> <span>18</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>3.5 Activity Diagram</span> <span class="toc-dots"></span> <span>19</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>3.6 Module Hierarchy Diagram</span> <span class="toc-dots"></span> <span>20</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>3.7 USER INTERFACE DESIGN</span> <span class="toc-dots"></span> <span>20</span></div>
</div>
"""
pages.append(make_page(1, toc_p1))

# Page 2: TABLE OF CONTENTS (Part 2)
toc_p2 = """
<h1 style="text-align: center; margin-bottom: 22px;">TABLE OF CONTENTS (Contd.)</h1>
<div class="toc-container">
  <div class="toc-line" style="padding-left: 15px;"><span>3.7.1 UI Architecture Philosophy</span> <span class="toc-dots"></span> <span>20</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>3.7.2 Navigation and State Diagram</span> <span class="toc-dots"></span> <span>21</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>3.7.3 Screen Inventory</span> <span class="toc-dots"></span> <span>22</span></div>
  <div class="toc-line"><span><b>3.8 TABLE SPECIFICATIONS</b></span> <span class="toc-dots"></span> <span>22</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>3.8.1 Database Architecture Rationale</span> <span class="toc-dots"></span> <span>22</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>3.8.2 Entity-Relationship Diagram</span> <span class="toc-dots"></span> <span>23</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>3.8.3 Data Dictionaries</span> <span class="toc-dots"></span> <span>24</span></div>
  <div class="toc-line"><span><b>4. INPUT AND OUTPUT SCREENS</b></span> <span class="toc-dots"></span> <span>26</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>4.1 INPUT SCREENS</span> <span class="toc-dots"></span> <span>26</span></div>
  <div class="toc-line" style="padding-left: 30px;"><span>4.1.1 Authentication and Login Screen (/login)</span> <span class="toc-dots"></span> <span>26</span></div>
  <div class="toc-line" style="padding-left: 30px;"><span>4.1.2 User Registration Screen (/register)</span> <span class="toc-dots"></span> <span>27</span></div>
  <div class="toc-line" style="padding-left: 30px;"><span>4.1.3 Digital Locker Document Upload Screen (/certificates)</span> <span class="toc-dots"></span> <span>28</span></div>
  <div class="toc-line" style="padding-left: 30px;"><span>4.1.4 Placement Candidate Filter Screen (/placement)</span> <span class="toc-dots"></span> <span>29</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>4.2 OUTPUT SCREENS</span> <span class="toc-dots"></span> <span>30</span></div>
  <div class="toc-line" style="padding-left: 30px;"><span>4.2.1 Student Digital Locker Dashboard (/dashboard)</span> <span class="toc-dots"></span> <span>30</span></div>
  <div class="toc-line" style="padding-left: 30px;"><span>4.2.2 Interview Key & QR Code Modal View</span> <span class="toc-dots"></span> <span>31</span></div>
  <div class="toc-line" style="padding-left: 30px;"><span>4.2.3 Academic Committee Review Queue (/committee/documents)</span> <span class="toc-dots"></span> <span>32</span></div>
  <div class="toc-line" style="padding-left: 30px;"><span>4.2.4 Dynamic Alumni Network Directory (/alumni)</span> <span class="toc-dots"></span> <span>33</span></div>
  <div class="toc-line" style="padding-left: 30px;"><span>4.2.5 Public Candidate Verification Dossier (/student/:id)</span> <span class="toc-dots"></span> <span>35</span></div>
  <div class="toc-line"><span><b>5. TEST PROCEDURES AND IMPLEMENTATION</b></span> <span class="toc-dots"></span> <span>37</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>5.1 IMPLEMENTATION STRATEGY</span> <span class="toc-dots"></span> <span>37</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>5.2 TEST STRATEGY AND TESTING ENVIRONMENT</span> <span class="toc-dots"></span> <span>37</span></div>
  <div class="toc-line" style="padding-left: 30px;"><span>5.2.1 Testing Levels</span> <span class="toc-dots"></span> <span>37</span></div>
  <div class="toc-line" style="padding-left: 30px;"><span>5.2.2 Test Environment</span> <span class="toc-dots"></span> <span>38</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>5.3 TEST CASES AND TEST RESULTS</span> <span class="toc-dots"></span> <span>38</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>5.4 DEFECTS FOUND AND RESOLVED</span> <span class="toc-dots"></span> <span>40</span></div>
  <div class="toc-line" style="padding-left: 30px;"><span>5.4.1 Defect 1: Production Media File 404 Resolution (DEBUG=False)</span> <span class="toc-dots"></span> <span>40</span></div>
  <div class="toc-line" style="padding-left: 30px;"><span>5.4.2 Defect 2: Monorepo Root Directory & SPA Rewrites on Vercel</span> <span class="toc-dots"></span> <span>41</span></div>
  <div class="toc-line"><span><b>6. SAMPLE CODE</b></span> <span class="toc-dots"></span> <span>42</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>6.1 Custom User & Role-Based Permissions (accounts/models.py)</span> <span class="toc-dots"></span> <span>42</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>6.2 Document Validation & Model Architecture (documents/models.py)</span> <span class="toc-dots"></span> <span>43</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>6.3 Committee Verification View (documents/views.py)</span> <span class="toc-dots"></span> <span>45</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>6.4 Frontend Dynamic Media URL Resolver (src/api/apiClient.js)</span> <span class="toc-dots"></span> <span>47</span></div>
</div>
"""
pages.append(make_page(2, toc_p2))

# Page 3: TABLE OF CONTENTS (Part 3)
toc_p3 = """
<h1 style="text-align: center; margin-bottom: 22px;">TABLE OF CONTENTS (Contd.)</h1>
<div class="toc-container">
  <div class="toc-line" style="padding-left: 15px;"><span>6.5 Explanation & Architecture Mechanics</span> <span class="toc-dots"></span> <span>48</span></div>
  <div class="toc-line"><span><b>7. LIMITATIONS</b></span> <span class="toc-dots"></span> <span>50</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>7.1 Cloud Free-Tier Spin-Down Boundary</span> <span class="toc-dots"></span> <span>50</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>7.2 Ephemeral File Storage on Free Containers</span> <span class="toc-dots"></span> <span>50</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>7.3 Manual Committee Review Scalability</span> <span class="toc-dots"></span> <span>50</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>7.4 Operational and Evaluation Limits</span> <span class="toc-dots"></span> <span>51</span></div>
  <div class="toc-line"><span><b>8. FUTURE SCOPE</b></span> <span class="toc-dots"></span> <span>52</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>8.1 Blockchain Smart Contracts (Ethereum & Polygon Integration)</span> <span class="toc-dots"></span> <span>52</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>8.2 AI-Powered OCR for Automatic Credential Verification</span> <span class="toc-dots"></span> <span>52</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>8.3 Government DigiLocker and National Academic Depository (NAD) APIs</span> <span class="toc-dots"></span> <span>52</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>8.4 Mobile Native Applications via React Native</span> <span class="toc-dots"></span> <span>52</span></div>
  <div class="toc-line"><span><b>9. CONCLUSION</b></span> <span class="toc-dots"></span> <span>54</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>9.1 Technical Summary</span> <span class="toc-dots"></span> <span>54</span></div>
  <div class="toc-line" style="padding-left: 15px;"><span>9.2 Academic and Professional Reflection</span> <span class="toc-dots"></span> <span>54</span></div>
  <div class="toc-line"><span><b>10. REFERENCES</b></span> <span class="toc-dots"></span> <span>55</span></div>
</div>
"""
pages.append(make_page(3, toc_p3))

# Page 4: 1. INTRODUCTION
p4_content = """
<h1>1. INTRODUCTION</h1>
<p>Higher education institutions generate immense volumes of academic records, including degree certificates, semester marksheets, co-curricular awards, industrial internship validations, and technical project portfolios. However, the management, storage, verification, and dissemination of these records have historically remained fragmented across manual paper archives, disparate department files, and unverified digital scans. This fragmentation causes severe delays in institutional background checks, fosters academic fraud, burdens placement departments with manual spreadsheet compilation, and isolates graduated alumni from active university mentorship networks.</p>

<p>This chapter describes existing credential management practices and their limitations, introduces the proposed <b>EduVault</b> ecosystem, defines the project scope, outlines hardware and software operational environments, and justifies the technology selections powering the platform.</p>

<h2>1.1 EXISTING SYSTEM, PROPOSED SYSTEM AND NEED AND OBJECTIVE OF SYSTEM</h2>

<h3>1.1.1 Existing System</h3>
<p>Academic credential management and campus placement coordination currently depend on four loosely coupled, manual procedures:</p>

<p class="no-indent"><b>(a) Physical Paper Transcripts & Unauthenticated PDF Scans.</b><br/>
Students submit physical photocopies or generic PDF scans of their credentials during semester evaluations and campus placement registrations. These files are not cryptographically tied to an institutional source of truth. Consequently, they are vulnerable to alteration, forged seals, and manipulated marks using basic graphic editing tools.</p>

<p class="no-indent"><b>(b) Manual Administrative Verification Workflows.</b><br/>
Institutions establish academic verification committees to authenticate student credentials. However, verifiers must manually retrieve physical ledger books or query disconnected database spreadsheets. This creates heavy administrative backlogs, with third-party background verification agencies frequently waiting two to four weeks for manual transcript confirmations.</p>

<p class="no-indent"><b>(c) Disconnected Placement & Talent Sourcing.</b><br/>
Training & Placement Officers (TPO) spend countless hours compiling candidate data (CGPA, active backlogs, departmental affiliations, and project links) through Google Forms or spreadsheets. This self-reported data is prone to human error, lacks instant verification, and cannot be dynamically presented to corporate recruiters.</p>
"""
pages.append(make_page(4, p4_content))

# Page 5: 1.1.2 PROPOSED SYSTEM
p5_content = """
<p class="no-indent"><b>(d) Static Alumni Communication Silos.</b><br/>
Upon graduation, alumni contact records deteriorate into static contact sheets. Universities lack an interactive, database-backed registry where alumni can advertise current company designations, share locations, and declare availability for student mentorship.</p>

<h3>1.1.2 Proposed System</h3>
<p><b>EduVault</b> is an end-to-end, enterprise-grade Digital Locker, Academic Credential Verification, and Career Networking Platform. It unites students, verification committees, placement officers, alumni, and external recruiters within a secure, role-governed web application. The platform operates across six core functional tiers:</p>

<ol style="padding-left: 20px; font-size: 9.5pt; line-height: 1.6;">
  <li><b>Authentication & Role Governance Tier:</b> Issues signed JSON Web Tokens (JWT) using Django REST Framework SimpleJWT, routing users automatically into one of four tailored portals: <code>STUDENT</code>, <code>ALUMNI</code>, <code>COMMITTEE</code>, or <code>PLACEMENT</code>.</li>
  <li><b>Student Digital Vault:</b> Enables students to upload, categorize, and track semester marksheets, degree certificates, and achievement files (≤ 5 MB). Uploaded records initiate in a <code>PENDING</code> state.</li>
  <li><b>Academic Committee Verification Pipeline:</b> Provides faculty reviewers with a real-time review queue, in-app full-screen document previewers, instant verification approvals, or rejection feedback mechanisms.</li>
  <li><b>Cryptographic Interview Key & QR Engine:</b> Generates unique UUID-based cryptographic endpoints (e.g. <code>/student/:id</code> and <code>/verify/:id</code>) that render as high-resolution QR codes, enabling corporate recruiters to scan and inspect verified student credentials on mobile devices instantly.</li>
  <li><b>Placement & Corporate Relations Dashboard:</b> Empowers placement teams with aggregate talent metrics (Total Students, Verified Ratio, Average CGPA), instant text search, and multi-tier CGPA threshold pills (≥ 9.0, ≥ 8.0, ≥ 7.5, ≥ 7.0).</li>
  <li><b>Dynamic Alumni Network:</b> An interactive, database-backed directory allowing graduated alumni to publish current roles, employers, geographic locations, and mentorship availability tags.</li>
</ol>

<div class="ascii-box">
+------------------------------------------------------------------------------------+
|                         EduVault High-Level Architecture                           |
+------------------------------------------------------------------------------------+
 [Student Locker] ----(Uploads Doc)----> [Django REST Backend] <--- [Committee Portal]
        |                                       |                    (Verifies / Rejects)
        | (Generates)                           v
 [Interview Key QR]              [Neon PostgreSQL 16 DB]
        |                                       |
        v                                       v
 [Recruiter Mobile Scan] <-----(Fetches)---- [Public Verified Dossier (/student/:id)]
+------------------------------------------------------------------------------------+
</div>
<div class="caption">Figure 1.1: High-level architectural dataflow of the EduVault platform.</div>
"""
pages.append(make_page(5, p5_content))

# Page 6: 1.1.3 COMPARATIVE ANALYSIS & NEED
p6_content = """
<h3>1.1.3 Comparative Analysis</h3>
<p>Table 1.1 compares traditional institutional document management with EduVault across eight operational parameters.</p>

<div class="caption">Table 1.1: Comparison of existing approaches with EduVault across operational parameters.</div>
<table>
  <tr>
    <th style="width: 5%;">Sr.</th>
    <th style="width: 25%;">Parameter</th>
    <th style="width: 22%;">Manual Paper / Files</th>
    <th style="width: 22%;">Generic Cloud Drive</th>
    <th style="width: 26%;">EduVault Platform</th>
  </tr>
  <tr>
    <td style="text-align:center;">1</td>
    <td><b>Verification Mechanism</b></td>
    <td>Manual stamp, physical ledger lookup</td>
    <td>Unverified link sharing; no institutional approval</td>
    <td>Formal academic committee pipeline with immutable verification timestamps</td>
  </tr>
  <tr>
    <td style="text-align:center;">2</td>
    <td><b>Fraud Resistance</b></td>
    <td>Low; easily forged with photocopies</td>
    <td>Zero; raw uploaded PDFs cannot be trusted</td>
    <td>High; UUID tokens and institutional QR verification ensure authenticity</td>
  </tr>
  <tr>
    <td style="text-align:center;">3</td>
    <td><b>Recruiter Inspection</b></td>
    <td>Requires physical documents at interview</td>
    <td>Requires manual downloading & unorganized viewing</td>
    <td>1-click QR Code scan directly to mobile-ready verified dossier</td>
  </tr>
  <tr>
    <td style="text-align:center;">4</td>
    <td><b>Role Governance</b></td>
    <td>None; unorganized file cabinets</td>
    <td>Basic link permissions (Viewer/Editor)</td>
    <td>Strict 4-Role RBAC: Student, Alumni, Committee, Placement Team</td>
  </tr>
  <tr>
    <td style="text-align:center;">5</td>
    <td><b>Placement Analytics</b></td>
    <td>Manual spreadsheet tallying</td>
    <td>Disconnected sheets prone to student typos</td>
    <td>Live talent pool metrics, dynamic CGPA threshold filters, and verified pills</td>
  </tr>
  <tr>
    <td style="text-align:center;">6</td>
    <td><b>Alumni Integration</b></td>
    <td>Static address books</td>
    <td>None; personal LinkedIn networks only</td>
    <td>Dynamic database registry with mentorship filters and company badges</td>
  </tr>
  <tr>
    <td style="text-align:center;">7</td>
    <td><b>Document Lifecycle</b></td>
    <td>Uncontrolled paper lifecycle</td>
    <td>Unmonitored file edits</td>
    <td>State machine: PENDING &rarr; VERIFIED or REJECTED with feedback</td>
  </tr>
  <tr>
    <td style="text-align:center;">8</td>
    <td><b>Hosting Cost</b></td>
    <td>High paper & courier costs</td>
    <td>Paid workspace licenses</td>
    <td>100% Free Production Deployment (Vercel + Render + Neon PostgreSQL)</td>
  </tr>
</table>

<h3>1.1.4 Need for the System</h3>
<p class="no-indent"><b>Eliminating Academic Credential Fraud:</b> With increasing competition in campus placements, recruiters face fabricated resumes and altered CGPA reports. EduVault eliminates fraud by anchoring credentials to institutional committee verification.</p>
<p class="no-indent"><b>Instant Verification Latency Reduction:</b> Employers spend up to two weeks on third-party verification. Scanning an EduVault Interview Key reduces verification latency to under 3 seconds.</p>
<p class="no-indent"><b>Institutional Digital Transformation:</b> Aligns the university with paperless, sustainable e-governance standards while providing students with a permanent digital portfolio.</p>
"""
pages.append(make_page(6, p6_content))

# Page 7: 1.1.5 OBJECTIVES OF SYSTEM
p7_content = """
<h3>1.1.5 Objectives of the System</h3>
<p>The engineering objectives are stated so that each can be verified by inspection, test, or measurement during the evaluation phase.</p>

<div class="caption">Table 1.2: Engineering objectives and verification criteria.</div>
<table>
  <tr>
    <th style="width: 8%;">ID</th>
    <th style="width: 46%;">Objective</th>
    <th style="width: 46%;">Verification Criterion</th>
  </tr>
  <tr>
    <td style="text-align:center;"><b>O1</b></td>
    <td>Implement a decoupled full-stack architecture with Django REST Framework backend and React 18 frontend.</td>
    <td>Frontend and backend communicate purely over JSON REST APIs with no server-side HTML rendering.</td>
  </tr>
  <tr>
    <td style="text-align:center;"><b>O2</b></td>
    <td>Establish Role-Based Access Control (RBAC) across four user classes: Student, Alumni, Committee, and Placement Team.</td>
    <td>Role permissions are strictly enforced on backend endpoints (HTTP 403 Forbidden on unauthorized requests) and frontend route guards.</td>
  </tr>
  <tr>
    <td style="text-align:center;"><b>O3</b></td>
    <td>Develop a Digital Locker allowing document uploads with strict size and extension validation.</td>
    <td>Uploads &le; 5 MB in PDF, JPG, and PNG succeed; oversized or executable files are rejected with HTTP 400.</td>
  </tr>
  <tr>
    <td style="text-align:center;"><b>O4</b></td>
    <td>Build an Academic Committee review pipeline with approve and reject actions.</td>
    <td>Committee reviews update document state to <code>VERIFIED</code> (with timestamp) or <code>REJECTED</code> with mandatory student feedback.</td>
  </tr>
  <tr>
    <td style="text-align:center;"><b>O5</b></td>
    <td>Generate dynamic cryptographic QR Codes for physical and digital interview verification.</td>
    <td>Mobile camera scan of the generated QR code opens the public dossier (<code>/student/:id</code>) with verified records on mobile browsers.</td>
  </tr>
  <tr>
    <td style="text-align:center;"><b>O6</b></td>
    <td>Create a Talent Discovery Portal for Placement Officers with multi-criteria filtering.</td>
    <td>Placement dashboard renders dynamic talent pool metrics and correctly filters candidates by CGPA thresholds (e.g. &ge; 8.0).</td>
  </tr>
  <tr>
    <td style="text-align:center;"><b>O7</b></td>
    <td>Deploy the full-stack system to free production cloud tiers without hosting expenditures.</td>
    <td>Frontend is live on Vercel Edge CDN, backend on Render WSGI service, and database on Neon Serverless PostgreSQL.</td>
  </tr>
  <tr>
    <td style="text-align:center;"><b>O8</b></td>
    <td>Provide authenticated media file serving in production environments.</td>
    <td>Uploaded certificates open cleanly from the live Render backend media endpoint with zero 404 routing errors.</td>
  </tr>
</table>
"""
pages.append(make_page(7, p7_content))

# Page 8: 1.2 SCOPE OF WORK
p8_content = """
<h2>1.2 SCOPE OF WORK</h2>

<h3>1.2.1 Functional Scope</h3>
<p>The functional scope encompasses all user-facing interactions across the platform:</p>
<ul style="font-size: 10pt; line-height: 1.6;">
  <li><b>User Registration & Profiling:</b> Account creation with department, college, PRN, phone, and role assignment.</li>
  <li><b>JWT Session Security:</b> Token issuance, automated refresh token rotation via Axios interceptors, and logout handling.</li>
  <li><b>Student Vault Management:</b> Uploading, previewing, and deleting unverified academic documents.</li>
  <li><b>Institutional Committee Queue:</b> Queue sorting, filtering by status/category, full-screen document inspection, single-click verification, and rejection with feedback.</li>
  <li><b>Recruitment & Placement Engine:</b> Live talent metrics, candidate search, CGPA threshold filtering, and verified dossier export.</li>
  <li><b>Dynamic Alumni Network:</b> Real-time alumni registry with employer, role, location, and mentorship availability filters.</li>
  <li><b>Public QR Verification:</b> Tokenized, unauthenticated read-only candidate dossier view for external corporate recruiters.</li>
</ul>

<h3>1.2.2 Technical Scope</h3>
<ul style="font-size: 10pt; line-height: 1.6;">
  <li><b>Backend REST Service:</b> Python 3.11 with Django 6.0 and Django REST Framework, served via Gunicorn WSGI.</li>
  <li><b>Persistence:</b> PostgreSQL 16 (Neon Serverless Cloud) managed through Django ORM with ACID-compliant transactions and foreign key cascades.</li>
  <li><b>Frontend Application:</b> React 18 with Vite build engine, React Router DOM v6, Tailwind CSS, Lucide React icons, and QRCode.react.</li>
  <li><b>Cloud Infrastructure:</b> Vercel for SPA hosting with edge routing; Render for Python WSGI container execution.</li>
  <li><b>CORS & Reverse Proxy:</b> Reverse proxy forwarding in Vite for mobile LAN inspection, and open cross-origin production bindings.</li>
</ul>
"""
pages.append(make_page(8, p8_content))

# Page 9: 1.2.3 OUT OF SCOPE & 1.3 HARDWARE REQUIREMENTS
p9_content = """
<h3>1.2.3 Out of Scope and Boundaries</h3>
<p>The following are explicitly excluded from the present work:</p>
<ol style="font-size: 10pt; line-height: 1.6; padding-left: 20px;">
  <li><b>Dynamic Analysis & OCR:</b> The system stores and displays files; automatic character recognition (OCR) of scanned certificates is excluded from the current release.</li>
  <li><b>Automated Grading:</b> The platform tracks CGPA and marksheets; it does not compute semester examination grades from scratch.</li>
  <li><b>Payment Gateway Integration:</b> Administrative transcript fees are handled externally; online financial transactions are out of scope.</li>
  <li><b>Native Mobile Apps:</b> The system is built as a fully responsive Web App; native compilation for Android APK or iOS IPA is not implemented.</li>
</ol>

<h2>1.3 OPERATING ENVIRONMENT – HARDWARE AND SOFTWARE</h2>

<h3>1.3.1 Hardware Requirements</h3>
<div class="caption">Table 1.3: Hardware requirements by deployment role.</div>
<table>
  <tr>
    <th>Role</th>
    <th>Component</th>
    <th>Minimum Specification</th>
    <th>Recommended Specification</th>
  </tr>
  <tr>
    <td rowspan="4"><b>Development Workstation</b></td>
    <td>Processor</td>
    <td>Dual-Core 64-bit CPU, 2.0 GHz</td>
    <td>Intel Core i5 / AMD Ryzen 5, 2.8 GHz or higher</td>
  </tr>
  <tr>
    <td>RAM</td>
    <td>8 GB DDR4</td>
    <td>16 GB DDR4/DDR5</td>
  </tr>
  <tr>
    <td>Storage</td>
    <td>256 GB SSD (500 MB free for project)</td>
    <td>512 GB NVMe SSD</td>
  </tr>
  <tr>
    <td>Network</td>
    <td>10 Mbps Broadband</td>
    <td>50 Mbps Wi-Fi / Ethernet</td>
  </tr>
  <tr>
    <td rowspan="4"><b>Cloud Production Server</b></td>
    <td>Compute</td>
    <td>0.5 vCPU (Render Free Tier)</td>
    <td>1.0 vCPU Dedicated Container</td>
  </tr>
  <tr>
    <td>RAM</td>
    <td>512 MB RAM</td>
    <td>1 GB RAM or higher</td>
  </tr>
  <tr>
    <td>Database Storage</td>
    <td>0.5 GB Serverless PostgreSQL (Neon)</td>
    <td>5 GB Persistent Cloud PostgreSQL</td>
  </tr>
  <tr>
    <td>Bandwidth</td>
    <td>100 Mbps Cloud Ingress/Egress</td>
    <td>1 Gbps Cloud Pipe with CDN Caching</td>
  </tr>
  <tr>
    <td rowspan="3"><b>Client Access Device</b></td>
    <td>Desktop / Mobile</td>
    <td>Dual-Core 1.6 GHz / Android 8.0+</td>
    <td>Modern Smartphone / Laptop with Camera</td>
  </tr>
  <tr>
    <td>Client RAM</td>
    <td>2 GB (Mobile) / 4 GB (Desktop)</td>
    <td>6 GB+ Mobile / 8 GB Desktop</td>
  </tr>
  <tr>
    <td>Network</td>
    <td>3G / 4G Mobile Data (2 Mbps)</td>
    <td>4G / 5G / Broadband Wi-Fi (10 Mbps+)</td>
  </tr>
</table>
"""
pages.append(make_page(9, p9_content))

# Page 10: 1.3.2 SOFTWARE REQUIREMENTS
p10_content = """
<h3>1.3.2 Software Requirements</h3>
<div class="caption">Table 1.4: Software requirements and tooling versions.</div>
<table>
  <tr>
    <th>Category</th>
    <th>Software / Library</th>
    <th>Version</th>
    <th>Purpose in EduVault</th>
  </tr>
  <tr>
    <td><b>Operating System</b></td>
    <td>Windows 11 / Ubuntu 22.04 LTS</td>
    <td>64-bit</td>
    <td>Development and cloud container host runtime</td>
  </tr>
  <tr>
    <td><b>Language Runtime</b></td>
    <td>Python</td>
    <td>3.11.x</td>
    <td>Backend server runtime and business logic</td>
  </tr>
  <tr>
    <td><b>Backend Framework</b></td>
    <td>Django & Django REST Framework</td>
    <td>Django 6.0 / DRF 3.16</td>
    <td>RESTful API routing, serialization, and ORM</td>
  </tr>
  <tr>
    <td><b>Authentication</b></td>
    <td>SimpleJWT (rest_framework_simplejwt)</td>
    <td>5.3.x</td>
    <td>Stateless JSON Web Token auth & refresh handling</td>
  </tr>
  <tr>
    <td><b>Frontend Runtime</b></td>
    <td>Node.js & npm</td>
    <td>Node v20.x / npm 10.x</td>
    <td>Client build environment and package manager</td>
  </tr>
  <tr>
    <td><b>Frontend Framework</b></td>
    <td>React & Vite</td>
    <td>React 18.x / Vite 8.x</td>
    <td>Component-driven single page application (SPA)</td>
  </tr>
  <tr>
    <td><b>Styling</b></td>
    <td>Tailwind CSS</td>
    <td>3.4.x</td>
    <td>Utility-first responsive design and micro-interactions</td>
  </tr>
  <tr>
    <td><b>Icons & QR</b></td>
    <td>Lucide React & QRCode.react</td>
    <td>Latest</td>
    <td>Vector UI iconography and SVG QR code rendering</td>
  </tr>
  <tr>
    <td><b>Database</b></td>
    <td>PostgreSQL</td>
    <td>16.x</td>
    <td>ACID-compliant relational database persistence</td>
  </tr>
  <tr>
    <td><b>Static Asset Server</b></td>
    <td>WhiteNoise</td>
    <td>6.x</td>
    <td>Gzip-compressed static file serving for WSGI</td>
  </tr>
  <tr>
    <td><b>Production WSGI</b></td>
    <td>Gunicorn</td>
    <td>25.x</td>
    <td>Production WSGI HTTP server on Render</td>
  </tr>
</table>

<div class="ascii-box">
+------------------------------------------------------------------------------------+
|                         EduVault Tiered Technology Stack                           |
+------------------------------------------------------------------------------------+
 [CLIENT TIER]       React 18 + Vite SPA | Tailwind CSS | Lucide Icons | Vercel CDN
        |
        v (HTTPS / REST JSON)
 [API GATEWAY]       Django 6.0 REST Framework | SimpleJWT Auth | WhiteNoise Static
        |
        v (WSGI Server)
 [APPLICATION TIER]  Gunicorn Process Workers (Python 3.11) on Render Cloud Service
        |
        v (ACID SQL Transactions)
 [PERSISTENCE TIER]  PostgreSQL 16 Relational Database on Neon Serverless Cloud
+------------------------------------------------------------------------------------+
</div>
<div class="caption">Figure 1.2: Four-tier technology architecture of EduVault.</div>
"""
pages.append(make_page(10, p10_content))

# Page 11: 1.4 TECHNOLOGY USED (Part 1)
p11_content = """
<h2>1.4 Description of Technology used</h2>

<h3>1.4.1 Python 3.11 Runtime Environment</h3>
<p>Python 3.11 is used as the primary backend programming language. It delivers substantial execution speed improvements, optimized memory utilization, and precise error tracebacks. Its rich package ecosystem simplifies database communication, file validation, and token cryptography.</p>

<h3>1.4.2 Django 6.0 and Django REST Framework (DRF)</h3>
<p>Django serves as the backend application framework, offering built-in security mechanisms against Cross-Site Request Forgery (CSRF), SQL Injection, and Cross-Site Scripting (XSS). Django REST Framework provides high-speed serialization, multipart form parsing for uploads, and role permission validation.</p>

<h3>1.4.3 SimpleJWT Token Authentication Architecture</h3>
<p>JSON Web Tokens (RFC 7519) provide stateless session handling. Upon valid authentication, the server signs an access token (5-minute lifetime) and refresh token (24-hour lifetime). Tokens are transmitted via standard HTTP <code>Authorization: Bearer &lt;token&gt;</code> headers.</p>

<h3>1.4.4 React 18 and Vite Tooling Engine</h3>
<p>React 18 provides a component-driven declarative UI. Reactive state hooks (<code>useState</code>, <code>useEffect</code>, <code>useMemo</code>, <code>useRef</code>) maintain responsive views without full-page reloads. Vite provides instant development server startup and optimized Rollup production bundling.</p>

<h3>1.4.5 Tailwind CSS and Lucide React Visual Components</h3>
<p>Tailwind CSS provides a utility-first styling system, enforcing design token consistency across padding, typography, and borders without bulky style files. Lucide React provides intuitive vector SVG icons across all portals.</p>

<h3>1.4.6 PostgreSQL 16 and Neon Serverless Persistence</h3>
<p>PostgreSQL 16 guarantees relational data integrity. Hosted on Neon Serverless PostgreSQL, it provides auto-scaling compute, scale-to-zero capabilities, and strict ACID transaction safety.</p>
"""
pages.append(make_page(11, p11_content))

# Page 12: 1.4 TECHNOLOGY USED (Part 2)
p12_content = """
<h3>1.4.7 QRCode.react and Cryptographic Token Verification</h3>
<p>Client-side QR generation is powered by <code>qrcode.react</code>. Each QR code encodes an authenticated public URL (e.g. <code>https://eduvaul.vercel.app/student/:id</code>), allowing recruiters to scan credentials directly from physical mobile cameras.</p>

<h3>1.4.8 Gunicorn WSGI and WhiteNoise Production Static Server</h3>
<p>Gunicorn runs as the production Python WSGI HTTP server, handling concurrent client worker processes. WhiteNoise integrates directly into Django's middleware pipeline, serving collected static assets with brotli/gzip compression and immutable caching headers.</p>

<div class="ascii-box">
+------------------------------------------------------------------------------------+
|                         EduVault Technology Ecosystem                              |
+------------------------------------------------------------------------------------+
| Layer             | Selected Tooling           | Key Responsibility                |
|-------------------+----------------------------+-----------------------------------|
| Presentation      | React 18 + Vite            | Reactive UI and SPA routing       |
| Styling           | Tailwind CSS 3.4           | Utility-first responsive design   |
| API Backend       | Django 6.0 + DRF 3.16      | REST API endpoints and validation |
| Authentication    | SimpleJWT                  | Signed token authorization        |
| Persistence       | PostgreSQL 16 (Neon)       | Relational ACID database          |
| Asset Delivery    | WhiteNoise 6.12            | Static assets via WSGI pipeline   |
| Production Server | Gunicorn 25.1              | Multi-worker WSGI HTTP server     |
| Cloud Hosting     | Vercel (FE) + Render (BE)  | Edge CDN and Linux cloud container|
+------------------------------------------------------------------------------------+
</div>
<div class="caption">Figure 1.3: Summary breakdown of the EduVault technology ecosystem.</div>
"""
pages.append(make_page(12, p12_content))

# Page 13: 2. PROPOSED SYSTEM
p13_content = """
<h1>2. PROPOSED SYSTEM</h1>
<p>EduVault is architected as a decoupled, multi-portal academic credential and placement platform. Each tier maintains a distinct responsibility and communicates with neighboring tiers purely through defined REST API contracts.</p>

<p>The design rests on four core principles:</p>
<ul style="font-size: 10pt; line-height: 1.6;">
  <li><b>Decoupling:</b> The React client knows only the REST API contract. The Django backend knows nothing about browser DOM rendering. Either can be modified independently.</li>
  <li><b>Role Governance:</b> Complete segregation of duties across Students, Alumni, Committee Members, and Placement Teams. Non-student features are inaccessible from student views.</li>
  <li><b>Immediate Verifiability:</b> Every verified document carries an immutable timestamp and cryptographic UUID, instantly resolvable via physical QR codes.</li>
  <li><b>Zero-Cost Cloud Deployment:</b> Architected specifically to operate on high-availability, free production cloud tiers without institutional capital investment.</li>
</ul>

<div class="ascii-box">
+------------------------------------------------------------------------------------+
|                       Figure 2.1: Four-Tier System Architecture                    |
+------------------------------------------------------------------------------------+
 [Tier 1: Client]         Desktop / Laptop Browser        Mobile Phone Camera
                                  |                               |
                                  v (HTTPS)                       v (QR URL)
 [Tier 2: Edge CDN]               Vercel Edge CDN (React 18 / Vite SPA)
                                  |
                                  v (JSON REST APIs)
 [Tier 3: Backend API]            Render Web Service (Gunicorn + Django REST)
                                  |
                                  v (SQL Pool)
 [Tier 4: Cloud Database]         Neon Serverless Cloud PostgreSQL 16
+------------------------------------------------------------------------------------+
</div>
<div class="caption">Figure 2.1: Four-tier system architecture of EduVault.</div>
"""
pages.append(make_page(13, p13_content))

# Page 14: 2.1 FEASIBILITY STUDY
p14_content = """
<h2>2.1 FEASIBILITY STUDY</h2>

<h3>2.1.1 Technical Feasibility</h3>
<p class="no-indent"><b>Architecture Stability:</b> Proven decoupled stack using Python, Django, React, and PostgreSQL with extensive documentation.<br/>
<b>Database Integrity:</b> PostgreSQL 16 guarantees ACID properties and cascades foreign key deletions cleanly.<br/>
<b>Security & Cryptography:</b> Passwords hashed using PBKDF2 with SHA-256 salts; document tokens use UUIDv4 cryptographic strings.<br/>
<b>Cloud Scalability:</b> Vercel provides instant global caching; Render manages container execution seamlessly.</p>

<h3>2.1.2 Operational Feasibility</h3>
<p class="no-indent"><b>Zero Client Installation:</b> Users access the platform via standard browsers on desktops or mobile phones without installing local plugins.<br/>
<b>Administrative Efficiency:</b> Decreases document verification turnaround from 2–3 weeks to under 60 seconds per credential.<br/>
<b>Recruiter Usability:</b> Recruiters scan candidate QR codes to view verified credentials without logging in.</p>

<h3>2.1.3 Economic Feasibility</h3>
<p class="no-indent"><b>Open-Source Software:</b> Zero software licensing fees.<br/>
<b>Free Production Cloud Tiers:</b> Deployed on Vercel (Frontend), Render (Backend), and Neon (PostgreSQL), incurring zero hosting fees.<br/>
<b>Institutional Savings:</b> Eliminates paper transcript printing, courier fees, and manual audit labor.</p>

<h3>2.1.4 Feasibility Conclusion</h3>
<div class="caption">Table 2.3: Overall feasibility conclusion.</div>
<table>
  <tr>
    <th>Dimension</th>
    <th>Verdict</th>
    <th>Principal Evidence</th>
  </tr>
  <tr>
    <td><b>Technical</b></td>
    <td><b>Feasible</b></td>
    <td>Mature tech stack, REST contract, ACID PostgreSQL, sub-second client rendering.</td>
  </tr>
  <tr>
    <td><b>Operational</b></td>
    <td><b>Feasible</b></td>
    <td>Browser-based, zero setup for end users, instant mobile QR verification.</td>
  </tr>
  <tr>
    <td><b>Economic</b></td>
    <td><b>Feasible</b></td>
    <td>Zero licensing fees, hosted on 100% free production cloud tiers.</td>
  </tr>
  <tr>
    <td><b>Security & Privacy</b></td>
    <td><b>Feasible</b></td>
    <td>PBKDF2 hashing, JWT tokens, RBAC permission guards, and file validation.</td>
  </tr>
</table>
"""
pages.append(make_page(14, p14_content))

# Page 15: 2.2 USER REQUIREMENTS
p15_content = """
<h2>2.2 USER REQUIREMENTS</h2>

<h3>2.2.1 User Classes and Actor Profiles</h3>
<div class="caption">Table 2.4: EduVault user classes and actor profiles.</div>
<table>
  <tr>
    <th>User Class</th>
    <th>Primary Responsibilities</th>
    <th>Key Interactions</th>
    <th>Authentication Method</th>
  </tr>
  <tr>
    <td><b>Student</b></td>
    <td>Upload academic marksheets, degree certificates, project portfolios, and internship records.</td>
    <td>Digital Locker, Certificates Vault, Project Showcase, Interview Key QR Modal.</td>
    <td>Email & Password, JWT (Role: STUDENT)</td>
  </tr>
  <tr>
    <td><b>Alumni</b></td>
    <td>Publish current industry employment, designation, location, and mentor availability.</td>
    <td>Alumni Network Directory, Profile Manager, Student Mentorship Connection.</td>
    <td>Email & Password, JWT (Role: ALUMNI)</td>
  </tr>
  <tr>
    <td><b>Academic Committee</b></td>
    <td>Review student credential submissions, inspect files, verify or reject with feedback.</td>
    <td>Verification Queue, Document Inspector Modal, Rejection Feedback Dispatcher.</td>
    <td>Email & Password, JWT (Role: COMMITTEE)</td>
  </tr>
  <tr>
    <td><b>Placement Team</b></td>
    <td>Discover job-ready candidates, filter talent by CGPA thresholds, and inspect dossiers.</td>
    <td>Placement Dashboard, CGPA Filter Pills, Candidate Drawer, Verification Status Filter.</td>
    <td>Email & Password, JWT (Role: PLACEMENT)</td>
  </tr>
  <tr>
    <td><b>Public Recruiter</b></td>
    <td>Scan student QR codes during campus interviews to verify authentic credentials.</td>
    <td>Public Candidate Dossier (<code>/student/:id</code>), Certificate Viewer.</td>
    <td>Unauthenticated (Cryptographic URL Token)</td>
  </tr>
</table>
"""
pages.append(make_page(15, p15_content))

# Page 16: 3. SYSTEM DESIGN - 3.1 OBJECT DIAGRAM
p16_content = """
<h1>3. SYSTEM DESIGN</h1>
<p>This section presents the structural and behavioral design views of EduVault: Object Diagram, Class Diagram, Use Case Diagram, Sequence Diagram, Activity Diagram, Module Hierarchy Diagram, UI Design, and Table Specifications.</p>

<h2>3.1 Object Diagram</h2>
<p class="no-indent">Figure 3.1 depicts a runtime object snapshot during an active student verification and placement discovery session.</p>

<div class="ascii-box">
+------------------------------------+          +------------------------------------+
|  akshayUser : User                 |          |  committeeUser : User              |
|------------------------------------|          |------------------------------------|
|  id = 14                           |          |  id = 3                            |
|  email = "ak12@gmail.com"          |          |  email = "committee@mitwpu.edu.in" |
|  role = "STUDENT"                  |          |  role = "COMMITTEE"                |
+------------------------------------+          +------------------------------------+
                  | (1:1 owns)                                     |
                  v                                                | (verifies)
+------------------------------------+                             |
|  akshayProfile : StudentProfile    |                             |
|------------------------------------|                             |
|  prn = "1272250311"                |                             |
|  cgpa = 9.20                       |                             v
|  department = "Computer Science"   |          +------------------------------------+
+------------------------------------+          |  degreeDoc : Document              |
                  |                             |------------------------------------|
                  | (uploads)                   |  id = 42                           |
                  v                             |  title = "MCA Degree Certificate"  |
+------------------------------------+          |  status = "VERIFIED"               |
|  portfolioProj : Project           |          |  uuid = "f47ac10b-58cc-4372..."    |
|------------------------------------|          +------------------------------------+
|  title = "EduVault Platform"       |                             ^
|  tech = "React, Django, Postgres"  |                             | (scans QR)
+------------------------------------+                             |
                                                +------------------------------------+
                                                |  recruiter : PublicRecruiter       |
                                                +------------------------------------+
</div>
<div class="caption">Figure 3.1: Object diagram of active runtime entities in EduVault.</div>
"""
pages.append(make_page(16, p16_content))

# Page 17: 3.2 CLASS DIAGRAM
p17_content = """
<h2>3.2 Class Diagram</h2>
<p class="no-indent">Figure 3.2 details the domain model classes, attributes, visibility indicators, and multi-entity relationships.</p>

<div class="ascii-box">
+------------------------+          1:1          +------------------------------------+
|         User           |---------------------->|          StudentProfile            |
+------------------------+                       +------------------------------------+
| - id: int              |                       | - id: int                          |
| - email: string        |                       | - prn: string                      |
| - role: RoleEnum       |                       | - cgpa: decimal(4,2)               |
| - college: string      |                       | - batch: string                    |
| - department: string   |                       | - skills: text                     |
| - is_active: bool      |                       | - current_company: string          |
+------------------------+                       | - is_mentor_available: bool        |
       | 1:*                       1:*           +------------------------------------+
       |--------------------+--------------------+
       v                    v                    v
+------------------+ +------------------+ +------------------+
|    Document      | |     Project      | |   Internship     |
+------------------+ +------------------+ +------------------+
| - id: int        | | - id: int        | | - id: int        |
| - title: string  | | - title: string  | | - company: string|
| - category: enum | | - tech: string   | | - role: string   |
| - status: enum   | | - live_url: str  | | - start_date: dt |
| - file: FileField| | - github_url: str| | - end_date: dt   |
| - uuid: UUID     | +------------------+ +------------------+
+------------------+
</div>
<div class="caption">Figure 3.2: Class diagram of EduVault persistence and domain entities.</div>
"""
pages.append(make_page(17, p17_content))

# Page 18: 3.3 USE CASE & 3.4 SEQUENCE DIAGRAM
p18_content = """
<h2>3.3 Use Case Diagram</h2>
<div class="ascii-box">
                     EduVault Platform Boundary
       +-----------------------------------------------------------+
       |  ( Register & Login ) <----------- [Student]              |
       |                                      |                    |
       |  ( Manage Digital Locker ) <---------+                    |
       |                                      |                    |
       |  ( Upload Academic Docs ) <----------+                    |
       |                                      |                    |
       |  ( View Interview Key QR ) <---------+                    |
       |                                                           |
       |  ( Inspect Pending Review Queue ) <-- [Committee Member]  |
       |                                      |                    |
       |  ( Approve / Reject Credential ) <---+                    |
       |                                                           |
       |  ( Filter Candidates by CGPA ) <----- [Placement Officer] |
       |                                      |                    |
       |  ( Export Placement Dossiers ) <-----+                    |
       |                                                           |
       |  ( Publish Mentorship Status ) <----- [Alumni]            |
       |                                                           |
       |  ( Scan QR & Verify Credentials ) <-- [Public Recruiter]  |
       +-----------------------------------------------------------+
</div>
<div class="caption">Figure 3.3: Use case diagram illustrating actor interactions.</div>

<h2>3.4 Sequence Diagram</h2>
<p>The sequence diagram illustrates the complete workflow: document upload by a student, verification by the academic committee, and instant scanning by a corporate recruiter.</p>
"""
pages.append(make_page(18, p18_content))

# Page 19: FIGURE 3.4 SEQUENCE DIAGRAM
p19_content = """
<div class="ascii-box">
 Student            React Client           Django REST API          PostgreSQL          Committee
    |                     |                       |                      |                  |
    |-- Selects & Uploads->|                       |                      |                  |
    |   Certificate (PDF) |--- POST /documents/ ->|                      |                  |
    |                     |    (Multipart + JWT)  |--- Validate Size --->|                  |
    |                     |                       |--- INSERT Record --->|                  |
    |                     |                       |    (status=PENDING)  |                  |
    |                     |<-- 201 Created -------|                      |                  |
    |<-- Badge: PENDING --|                       |                      |                  |
    |                     |                       |                      |                  |
    |                     |                       |<-- GET /committee/ --|--- Opens Queue --|
    |                     |                       |    Pending Docs      |                  |
    |                     |                       |                      |<-- Clicks Verify-|
    |                     |                       |<-- POST /verify/ ----|                  |
    |                     |                       |--- UPDATE status --->|                  |
    |                     |                       |    to "VERIFIED"     |                  |
    |                     |                       |--- 200 OK ---------->|                  |
    |                     |                       |                      |                  |
 Recruiter                |                       |                      |                  |
    |--- Scans QR Code -->|                       |                      |                  |
    |    (/student/14)    |--- GET Public Dossier>|                      |                  |
    |                     |<-- Return Dossier ----|                      |                  |
    |<-- Displays Verified|                       |                      |                  |
    |    Candidate Records|                       |                      |                  |
</div>
<div class="caption">Figure 3.4: Sequence diagram of document upload, verification, and recruiter scanning.</div>

<h2>3.5 Activity Diagram</h2>
<p>The activity diagram models the lifecycle decisions from initial file upload to approval or rejection.</p>
"""
pages.append(make_page(19, p19_content))

# Page 20: 3.5 ACTIVITY & 3.6 MODULE HIERARCHY
p20_content = """
<div class="ascii-box">
             ( Start: Student Selects File to Upload )
                                 |
                                 v
                 [ Check File Size <= 5MB & Extension ]
                                 |
                     +-----------+-----------+
                     |                       |
                 ( Valid )               ( Invalid )
                     |                       |
                     v                       v
          [ Send POST to Server ]   [ Display Upload Error ]
                     |                       |
                     v                       +--> ( Retry )
        [ Server Saves Record with ]
        [     Status: PENDING      ]
                     |
                     v
        [ Record Enters Committee Queue ]
                     |
                     v
           { Committee Action? }
                     |
          +----------+----------+
          |                     |
     ( Approve )            ( Reject )
          |                     |
          v                     v
   [ Set Status: VERIFIED ]   [ Prompt Rejection Reason ]
   [   Record Timestamp   ]   [  Set Status: REJECTED   ]
          |                     |
          v                     v
 [ Credential Available in ]  [ Send Feedback to Student ]
 [ Public Interview Key QR ]  [ Allow Student Re-upload  ]
          |                     |
          v                     v
    ( Success End )        ( Repeat Loop )
</div>
<div class="caption">Figure 3.5: Activity diagram of the credential lifecycle.</div>

<h2>3.6 Module Hierarchy Diagram</h2>
<div class="ascii-box">
                                     +--------------------------+
                                     |  EduVault Core Platform  |
                                     +--------------------------+
                                                  |
         +-------------------+--------------------+-------------------+-------------------+
         |                   |                    |                   |                   |
         v                   v                    v                   v                   v
+------------------+ +------------------+ +------------------+ +------------------+ +------------------+
| 1. Authentication| | 2. Student Vault | | 3. Committee     | | 4. Placement     | | 5. Alumni        |
|    & RBAC        | |    Locker        | |    Verification  | |    Talent Engine | |    Network       |
+------------------+ +------------------+ +------------------+ +------------------+ +------------------+
| - User Register  | | - Upload Docs    | | - Review Queue   | | - KPI Analytics  | | - Directory List |
| - JWT Login/Auth | | - Project Vault  | | - In-App Preview | | - CGPA Filters   | | - Mentorship Tag |
| - Role Guarding  | | - QR Key Widget  | | - Approve/Reject | | - Candidate Draw | | - Company Badge  |
+------------------+ +------------------+ +------------------+ +------------------+ +------------------+
</div>
<div class="caption">Figure 3.6: Module hierarchy decomposition of EduVault.</div>
"""
pages.append(make_page(20, p20_content))

# Page 21: 3.7 UI DESIGN & 3.7.2 NAVIGATION
p21_content = """
<h2>3.7 USER INTERFACE DESIGN</h2>

<h3>3.7.1 UI Architecture Philosophy</h3>
<p>The interface is constructed as a modern, responsive single-page application (SPA). It uses a clean visual hierarchy with consistent typography, subtle borders, and contextual color indicators (Emerald for verified, Amber for pending, Rose for rejected). All views maintain consistent side navigation and top breadcrumbs.</p>

<h3>3.7.2 Navigation and State Diagram</h3>
<div class="ascii-box">
                      ( Unauthenticated User )
                                 |
                                 v
                            [ /login ] <----( Logout / Expired )----+
                                 |                                  |
                                 v (Signed JWT)                     |
                    +------------+------------+                     |
                    |                         |                     |
           ( Role: STUDENT )         ( Role: COMMITTEE )            |
                    |                         |                     |
                    v                         v                     |
             [ /dashboard ]          [ /committee/dashboard ]       |
                    |                         |                     |
          +---------+---------+               v                     |
          |                   |      [ /committee/documents ]       |
          v                   v               |                     |
    [ /certificates ]    [ /projects ]        +---------------------+
          |                   |                                     |
          +---------+---------+                                     |
                    |                                               |
                    v ( Role: PLACEMENT )                           |
             [ /placement ] ----------------------------------------+
                    |
                    v ( Role: ALUMNI )
              [ /alumni ] ------------------------------------------+
</div>
<div class="caption">Figure 3.7: Client navigation and role transition state diagram.</div>
"""
pages.append(make_page(21, p21_content))

# Page 22: 3.7.3 SCREEN INVENTORY & 3.8 TABLE SPECS
p22_content = """
<h3>3.7.3 Screen Inventory</h3>
<div class="caption">Table 3.1: Complete screen inventory and route mapping.</div>
<table>
  <tr>
    <th>Screen Name</th>
    <th>Route Path</th>
    <th>Target Persona</th>
    <th>Key Widgets</th>
    <th>User Actions</th>
  </tr>
  <tr>
    <td><b>Login / Register</b></td>
    <td><code>/login</code>, <code>/register</code></td>
    <td>All Users</td>
    <td>Email, password, role radio chips, submit button, error alerts</td>
    <td>Authenticate, create account, obtain signed JWT session</td>
  </tr>
  <tr>
    <td><b>Student Dashboard</b></td>
    <td><code>/dashboard</code></td>
    <td>Student</td>
    <td>KPI cards, verified ratio, Interview Key QR widget, quick upload</td>
    <td>Review locker summary, open QR modal, upload marksheets</td>
  </tr>
  <tr>
    <td><b>Certificates Vault</b></td>
    <td><code>/certificates</code></td>
    <td>Student</td>
    <td>Drag-and-drop uploader, category selector, document cards, View File</td>
    <td>Upload PDF/JPG, open verified files, generate certificate QR</td>
  </tr>
  <tr>
    <td><b>Committee Queue</b></td>
    <td><code>/committee/documents</code></td>
    <td>Committee</td>
    <td>Status tabs, search bar, candidate table, inspection modal, action buttons</td>
    <td>Inspect uploaded files, click Approve or Reject with feedback</td>
  </tr>
  <tr>
    <td><b>Placement Portal</b></td>
    <td><code>/placement</code></td>
    <td>Placement Team</td>
    <td>Talent analytics, CGPA threshold pills, verified filter, candidate table</td>
    <td>Filter eligible candidates, inspect academic dossiers</td>
  </tr>
  <tr>
    <td><b>Alumni Directory</b></td>
    <td><code>/alumni</code></td>
    <td>All Users</td>
    <td>Search input, department filter, mentor toggle, profile cards</td>
    <td>Discover alumni, filter by current company, view profile</td>
  </tr>
  <tr>
    <td><b>Public Dossier</b></td>
    <td><code>/student/:id</code></td>
    <td>Public Recruiter</td>
    <td>Student portrait, PRN, CGPA badge, verified certificate links, projects</td>
    <td>Inspect verified student records without platform login</td>
  </tr>
</table>

<h2>3.8 TABLE SPECIFICATIONS</h2>

<h3>3.8.1 Database Architecture Rationale</h3>
<p>The persistence tier uses relational tables managed through Django ORM and deployed on PostgreSQL 16. The schema enforces Third Normal Form (3NF) to eliminate redundancy. Foreign keys utilize <code>ON DELETE CASCADE</code> to prevent orphaned child records.</p>
"""
pages.append(make_page(22, p22_content))

# Page 23: 3.8.2 ENTITY-RELATIONSHIP DIAGRAM
p23_content = """
<h3>3.8.2 Entity-Relationship Diagram</h3>
<div class="ascii-box">
+------------------------+          1:1          +------------------------------------+
|     accounts_user      |---------------------->|      students_studentprofile       |
+------------------------+                       +------------------------------------+
| PK  id                 |                       | PK  id                             |
|     email (UK)         |                       | FK  user_id (UK)                   |
|     password           |                       |     prn                            |
|     role               |                       |     cgpa                           |
|     college            |                       |     batch                          |
|     department         |                       |     skills                         |
|     is_active          |                       |     current_company                |
+------------------------+                       |     is_mentor_available            |
       | 1:*                       1:*           +------------------------------------+
       |--------------------+--------------------+
       v                    v                    v
+---------------------+ +---------------------+ +---------------------+
| documents_document  | |  students_project   | | students_internship |
+---------------------+ +---------------------+ +---------------------+
| PK  id              | | PK  id              | | PK  id              |
| FK  user_id         | | FK  user_id         | | FK  user_id         |
|     verification_id | |     title           | |     company_name    |
|     title           | |     technologies    | |     role            |
|     category        | |     project_url     | |     start_date      |
|     file            | |     github_url      | |     end_date        |
|     status          | +---------------------+ +---------------------+
|     verified_at     |
+---------------------+
</div>
<div class="caption">Figure 3.8: Entity-relationship diagram of the EduVault schema.</div>

<p class="no-indent"><b>Relationship Analysis:</b> <code>accounts_user</code> serves as the primary authentication root. It maintains a 1:1 relationship with <code>students_studentprofile</code> and 1:Many relationships with <code>documents_document</code>, <code>students_project</code>, and <code>students_internship</code>. Deletion of a user cascades cleanly across all child tables.</p>
"""
pages.append(make_page(23, p23_content))

# Page 24: 3.8.3 DATA DICTIONARIES (Part 1)
p24_content = """
<h3>3.8.3 Data Dictionaries</h3>

<div class="caption">Table 3.2: Data dictionary for accounts_user.</div>
<table>
  <tr>
    <th>Field Name</th>
    <th>Data Type</th>
    <th>Nullable</th>
    <th>Key / Constraint</th>
    <th>Description</th>
  </tr>
  <tr><td><code>id</code></td><td>BigSerial</td><td>No</td><td>PK, Auto-increment</td><td>Surrogate unique user identifier</td></tr>
  <tr><td><code>email</code></td><td>Varchar(254)</td><td>No</td><td>Unique, Indexed</td><td>Institutional login email address</td></tr>
  <tr><td><code>password</code></td><td>Varchar(128)</td><td>No</td><td>None</td><td>PBKDF2-SHA256 hashed password string</td></tr>
  <tr><td><code>role</code></td><td>Varchar(20)</td><td>No</td><td>Default 'STUDENT'</td><td>Role enum: STUDENT, ALUMNI, COMMITTEE, PLACEMENT</td></tr>
  <tr><td><code>college</code></td><td>Varchar(255)</td><td>No</td><td>None</td><td>Affiliated college / university campus name</td></tr>
  <tr><td><code>department</code></td><td>Varchar(100)</td><td>No</td><td>None</td><td>Academic department (e.g. Computer Science)</td></tr>
  <tr><td><code>is_active</code></td><td>Boolean</td><td>No</td><td>Default True</td><td>Account active flag</td></tr>
  <tr><td><code>date_joined</code></td><td>DateTime</td><td>No</td><td>Auto-add UTC</td><td>Timestamp of registration</td></tr>
</table>

<div class="caption">Table 3.3: Data dictionary for students_studentprofile.</div>
<table>
  <tr>
    <th>Field Name</th>
    <th>Data Type</th>
    <th>Nullable</th>
    <th>Key / Constraint</th>
    <th>Description</th>
  </tr>
  <tr><td><code>id</code></td><td>BigSerial</td><td>No</td><td>PK, Auto-increment</td><td>Profile identifier</td></tr>
  <tr><td><code>user_id</code></td><td>BigInt</td><td>No</td><td>FK &rarr; accounts_user.id</td><td>1:1 owner reference with ON DELETE CASCADE</td></tr>
  <tr><td><code>prn</code></td><td>Varchar(50)</td><td>Yes</td><td>Indexed</td><td>Permanent Registration Number (e.g. 1272250311)</td></tr>
  <tr><td><code>cgpa</code></td><td>Numeric(4,2)</td><td>Yes</td><td>None</td><td>Cumulative Grade Point Average (0.00 to 10.00)</td></tr>
  <tr><td><code>batch</code></td><td>Varchar(50)</td><td>Yes</td><td>None</td><td>Academic graduation cohort (e.g. 2024-2026)</td></tr>
  <tr><td><code>skills</code></td><td>Text</td><td>Yes</td><td>None</td><td>Comma-delimited technical skills</td></tr>
  <tr><td><code>current_company</code></td><td>Varchar(150)</td><td>Yes</td><td>None</td><td>Current employer name (Alumni specific)</td></tr>
  <tr><td><code>current_role</code></td><td>Varchar(150)</td><td>Yes</td><td>None</td><td>Designation / job title</td></tr>
  <tr><td><code>is_mentor_available</code></td><td>Boolean</td><td>No</td><td>Default False</td><td>Willingness to mentor current students</td></tr>
</table>
"""
pages.append(make_page(24, p24_content))

# Page 25: 3.8.3 DATA DICTIONARIES (Part 2)
p25_content = """
<div class="caption">Table 3.4: Data dictionary for documents_document.</div>
<table>
  <tr>
    <th>Field Name</th>
    <th>Data Type</th>
    <th>Nullable</th>
    <th>Key / Constraint</th>
    <th>Description</th>
  </tr>
  <tr><td><code>id</code></td><td>BigSerial</td><td>No</td><td>PK, Auto-increment</td><td>Unique document identifier</td></tr>
  <tr><td><code>verification_id</code></td><td>UUID</td><td>No</td><td>Unique, Indexed</td><td>Cryptographic UUID for QR Code & verification lookup</td></tr>
  <tr><td><code>user_id</code></td><td>BigInt</td><td>No</td><td>FK &rarr; accounts_user.id</td><td>Student uploader reference with CASCADE</td></tr>
  <tr><td><code>title</code></td><td>Varchar(200)</td><td>No</td><td>None</td><td>Title of certificate or marksheet</td></tr>
  <tr><td><code>category</code></td><td>Varchar(20)</td><td>No</td><td>Enum</td><td>CERTIFICATE, MARKSHEET, INTERNSHIP, PROJECT</td></tr>
  <tr><td><code>file</code></td><td>Varchar(100)</td><td>No</td><td>None</td><td>Relative media storage file path</td></tr>
  <tr><td><code>status</code></td><td>Varchar(20)</td><td>No</td><td>Default 'PENDING'</td><td>Status enum: PENDING, VERIFIED, REJECTED</td></tr>
  <tr><td><code>rejection_reason</code></td><td>Text</td><td>Yes</td><td>None</td><td>Feedback provided by committee reviewer</td></tr>
  <tr><td><code>verified_at</code></td><td>DateTime</td><td>Yes</td><td>None</td><td>Timestamp of committee verification</td></tr>
</table>

<div class="caption">Table 3.5: Data dictionary for students_project.</div>
<table>
  <tr>
    <th>Field Name</th>
    <th>Data Type</th>
    <th>Nullable</th>
    <th>Key / Constraint</th>
    <th>Description</th>
  </tr>
  <tr><td><code>id</code></td><td>BigSerial</td><td>No</td><td>PK, Auto-increment</td><td>Project identifier</td></tr>
  <tr><td><code>user_id</code></td><td>BigInt</td><td>No</td><td>FK &rarr; accounts_user.id</td><td>Student owner foreign key reference</td></tr>
  <tr><td><code>title</code></td><td>Varchar(200)</td><td>No</td><td>None</td><td>Title of technical project</td></tr>
  <tr><td><code>description</code></td><td>Text</td><td>No</td><td>None</td><td>Detailed architectural overview</td></tr>
  <tr><td><code>technologies</code></td><td>Varchar(255)</td><td>No</td><td>None</td><td>Tech stack utilized (e.g. React, Django)</td></tr>
  <tr><td><code>project_url</code></td><td>Varchar(200)</td><td>Yes</td><td>None</td><td>Live deployment URL</td></tr>
  <tr><td><code>github_url</code></td><td>Varchar(200)</td><td>Yes</td><td>None</td><td>Public source code repository link</td></tr>
</table>
"""
pages.append(make_page(25, p25_content))

# Page 26: 4. INPUT AND OUTPUT SCREENS - 4.1.1 LOGIN SCREEN
p26_content = """
<h1>4. INPUT AND OUTPUT SCREENS</h1>
<p>This chapter provides the visual screen layouts and field specifications of EduVault's primary portals.</p>

<h2>4.1 INPUT SCREENS</h2>

<h3>4.1.1 Authentication and Login Screen (/login)</h3>
<p class="no-indent"><b>Purpose:</b> Authenticate an existing student, faculty committee member, alumni, or placement officer, and issue signed JWT session credentials.</p>

<div class="ascii-box">
+------------------------------------------------------------------------------------+
|                                                                                    |
|                     +----------------------------------------+                     |
|                     |             [logo] EduVault            |                     |
|                     |     Decentralized Academic Locker      |                     |
|                     |----------------------------------------|                     |
|                     |  Email                                 |                     |
|                     |  +-----------------------------------+ |                     |
|                     |  | ak12@gmail.com                    | |                     |
|                     |  +-----------------------------------+ |                     |
|                     |  Password                              |                     |
|                     |  +-----------------------------+-----+ |                     |
|                     |  | **********                  | eye | |                     |
|                     |  +-----------------------------+-----+ |                     |
|                     |                                        |                     |
|                     |  +-----------------------------------+ |                     |
|                     |  |               SIGN IN             | |                     |
|                     |  +-----------------------------------+ |                     |
|                     |  Don't have an account? Register       |                     |
|                     +----------------------------------------+                     |
|                                                                                    |
+------------------------------------------------------------------------------------+
</div>
<div class="caption">Figure 4.1: Authentication and login interface layout.</div>
"""
pages.append(make_page(26, p26_content))

# Page 27: TABLE 4.2 & 4.1.2 UPLOAD SCREEN
p27_content = """
<div class="caption">Table 4.2: Login and registration fields.</div>
<table>
  <tr>
    <th>Field</th>
    <th>Type</th>
    <th>Required</th>
    <th>Validation Rule</th>
    <th>Error Message</th>
  </tr>
  <tr>
    <td><b>Email</b></td>
    <td>Email input</td>
    <td>Yes</td>
    <td>Regex <code>^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$</code></td>
    <td>"Enter a valid institutional email"</td>
  </tr>
  <tr>
    <td><b>Password</b></td>
    <td>Password input</td>
    <td>Yes</td>
    <td>Minimum 8 characters</td>
    <td>"Password must be at least 8 characters"</td>
  </tr>
  <tr>
    <td><b>Role</b></td>
    <td>Radio chips</td>
    <td>Yes</td>
    <td>One of: STUDENT, ALUMNI, COMMITTEE, PLACEMENT</td>
    <td>"Please select an account role"</td>
  </tr>
</table>

<h3>4.1.2 Digital Locker Document Upload Screen (/certificates)</h3>
<p class="no-indent"><b>Purpose:</b> Allow students to upload academic certificates, marksheets, and internship records into the cloud vault.</p>

<div class="ascii-box">
+---------+--------------------------------------------------------------------------+
| [=]     | DIGITAL LOCKER & CREDENTIAL VAULT               (User: Akshay Darji)     |
+---------+--------------------------------------------------------------------------+
| Nav     | UPLOAD NEW CREDENTIAL                                                    |
|         | +----------------------------------------------------------------------+ |
| Vault   | | Document Title: [ MCA Semester II Marksheet                        ] | |
|         | | Category:       [ Marksheet v ]                                      | |
| Certs   | | +------------------------------------------------------------------+ | |
|         | | |     Drag & drop PDF / JPG / PNG certificate here (<= 5 MB)       | | |
| Alumni  | | +------------------------------------------------------------------+ | |
|         | | [ Upload Document -> ]                                             | | |
| Placement | +----------------------------------------------------------------------+ |
+---------+--------------------------------------------------------------------------+
</div>
<div class="caption">Figure 4.2: Document upload interface layout.</div>
"""
pages.append(make_page(27, p27_content))

# Page 28: TABLE 4.3 & 4.1.3 PLACEMENT FILTER
p28_content = """
<div class="caption">Table 4.3: Document upload fields.</div>
<table>
  <tr>
    <th>Field</th>
    <th>Type</th>
    <th>Required</th>
    <th>Validation Rule</th>
    <th>Server-side Handling</th>
  </tr>
  <tr>
    <td><b>Document Title</b></td>
    <td>Text input</td>
    <td>Yes</td>
    <td>Non-empty, 1 to 200 characters</td>
    <td>Stored in <code>documents_document.title</code></td>
  </tr>
  <tr>
    <td><b>Category</b></td>
    <td>Dropdown</td>
    <td>Yes</td>
    <td>One of: CERTIFICATE, MARKSHEET, INTERNSHIP, PROJECT</td>
    <td>Stored in <code>documents_document.category</code></td>
  </tr>
  <tr>
    <td><b>File Upload</b></td>
    <td>File input / drag</td>
    <td>Yes</td>
    <td>File size &le; 5 MB. Allowed: .pdf, .jpg, .jpeg, .png</td>
    <td>Validated by <code>validate_document_file()</code>; saved to media/</td>
  </tr>
</table>

<h3>4.1.3 Placement Candidate Discovery & Filter Screen (/placement)</h3>
<p class="no-indent"><b>Purpose:</b> Enable placement officers to filter candidate pools by CGPA thresholds and verification status.</p>

<div class="ascii-box">
+------------------------------------------------------------------------------------+
| TALENT POOL DISCOVERY | Total Students: 120 | Verified: 108 | Avg CGPA: 8.64       |
+------------------------------------------------------------------------------------+
| Search: [ Name / PRN... ]  Dept: [ Comp Sci v ]  CGPA: [All] [>=9.0] [>=8.0] [>=7.5]
| +--------------------------------------------------------------------------------+ |
| | Candidate     | PRN        | Department     | CGPA | Verified | Profile Dossier| |
| |---------------+------------+----------------+------+----------+----------------| |
| | Akshay Darji  | 1272250311 | Comp Sci (MCA) | 9.20 | [  OK  ] | [Open Dossier] | |
| | Priyesh N.    | 1272250279 | Comp Sci (MCA) | 8.85 | [  OK  ] | [Open Dossier] | |
| +--------------------------------------------------------------------------------+ |
+------------------------------------------------------------------------------------+
</div>
<div class="caption">Figure 4.3: Placement candidate filter interface layout.</div>
"""
pages.append(make_page(28, p28_content))

# Page 29: TABLE 4.4 PLACEMENT FILTER CONTROLS
p29_content = """
<div class="caption">Table 4.4: Placement filter controls.</div>
<table>
  <tr>
    <th>Control Name</th>
    <th>Type</th>
    <th>Default</th>
    <th>Options / Range</th>
    <th>System Effect</th>
  </tr>
  <tr>
    <td><b>Candidate Search</b></td>
    <td>Text input</td>
    <td>Empty</td>
    <td>Alpha-numeric search</td>
    <td>Real-time client filtering by candidate name or PRN</td>
  </tr>
  <tr>
    <td><b>Department</b></td>
    <td>Dropdown</td>
    <td>ALL</td>
    <td>Comp Sci, Data Science, AI</td>
    <td>Filters candidate pool by academic department</td>
  </tr>
  <tr>
    <td><b>Min CGPA Filter</b></td>
    <td>Pill buttons</td>
    <td>ALL</td>
    <td>ALL, &ge; 9.0, &ge; 8.0, &ge; 7.5, &ge; 7.0</td>
    <td>Instant filter restricting candidate list by threshold</td>
  </tr>
  <tr>
    <td><b>Verified Only</b></td>
    <td>Toggle switch</td>
    <td>False</td>
    <td>True / False</td>
    <td>Restricts list to candidates with 100% verified credentials</td>
  </tr>
</table>

<h2>4.2 OUTPUT SCREENS</h2>

<h3>4.2.1 Student Digital Locker Dashboard (/dashboard)</h3>
<p class="no-indent"><b>Purpose:</b> Present students with KPI summary cards, quick verification ratios, and immediate access to their Interview Key.</p>

<div class="ascii-box">
+------------------------------------------------------------------------------------+
| DASHBOARD | Welcome back, Akshay Darji (MCA Sem III)                               |
+------------------------------------------------------------------------------------+
| [ Total Documents: 8 ]   [ Verified: 7 ]   [ Pending: 1 ]   [ Placement Ready: Yes]|
|                                                                                    |
| +---------------------------------------+ +--------------------------------------+ |
| | RECENT DOCUMENTS                      | | INTERVIEW KEY WIDGET                 | |
| | - MCA Degree Cert   [ VERIFIED (v) ]  | | [ QR CODE PREVIEW ]                  | |
| | - Sem 2 Marksheet   [ VERIFIED (v) ]  | | Scans open your verified dossier     | |
| | - Cloud Cert        [ PENDING  (~) ]  | | [ Open Fullscreen QR Key ]           | |
| +---------------------------------------+ +--------------------------------------+ |
+------------------------------------------------------------------------------------+
</div>
<div class="caption">Figure 4.4: Student digital locker dashboard layout.</div>
"""
pages.append(make_page(29, p29_content))

# Page 30: TABLE 4.6 & 4.2.2 INTERVIEW KEY QR MODAL
p30_content = """
<div class="caption">Table 4.6: Document card status indicators.</div>
<table>
  <tr>
    <th>Status</th>
    <th>Icon Indicator</th>
    <th>Color Scheme</th>
    <th>Meaning & Available Actions</th>
  </tr>
  <tr>
    <td><b>PENDING</b></td>
    <td>Clock icon</td>
    <td>Amber / Yellow</td>
    <td>Under committee review; editable and deletable by student.</td>
  </tr>
  <tr>
    <td><b>VERIFIED</b></td>
    <td>Shield check icon</td>
    <td>Emerald / Green</td>
    <td>Approved by committee; locked from deletion; available in Interview Key.</td>
  </tr>
  <tr>
    <td><b>REJECTED</b></td>
    <td>Alert circle icon</td>
    <td>Rose / Red</td>
    <td>Rejected with feedback reason; student can inspect feedback & re-upload.</td>
  </tr>
</table>

<h3>4.2.2 Interview Key & QR Code Modal View</h3>
<p class="no-indent"><b>Purpose:</b> Render high-resolution cryptographic QR code for physical smartphone scanning during on-campus recruitment drives.</p>

<div class="ascii-box">
                    +------------------------------------+
                    |       INTERVIEW VERIFICATION KEY   |
                    |------------------------------------|
                    |           [ QR CODE ]              |
                    |      ##  #####  ##  #####  ##      |
                    |      ##  #   #  ##  #   #  ##      |
                    |      ##  #####  ##  #####  ##      |
                    |------------------------------------|
                    | Candidate: Akshay Darji            |
                    | PRN:       1272250311              |
                    | CGPA:      9.20 (Verified)         |
                    | URL: https://eduvaul.vercel.app/   |
                    |      student/14                    |
                    |------------------------------------|
                    |       [ Copy Dossier Link ]        |
                    +------------------------------------+
</div>
<div class="caption">Figure 4.5: Cryptographic Interview Key QR code modal.</div>
"""
pages.append(make_page(30, p30_content))

# Page 31: 4.2.3 COMMITTEE REVIEW QUEUE
p31_content = """
<h3>4.2.3 Academic Committee Review Queue Screen (/committee/documents)</h3>
<p class="no-indent"><b>Purpose:</b> Provide authorized faculty with a centralized review queue to verify or reject student documents.</p>

<div class="ascii-box">
+------------------------------------------------------------------------------------+
| COMMITTEE PORTAL | Pending Queue: 12   Verified: 148   Rejected: 6                 |
+------------------------------------------------------------------------------------+
| Filter: [ All v ] [ PENDING (Active) ] [ VERIFIED ] [ REJECTED ]  Search: [......] |
| +--------------------------------------------------------------------------------+ |
| | Student Name  | PRN        | Document Title        | Category   | Actions      | |
| |---------------+------------+-----------------------+------------+--------------| |
| | Akshay Darji  | 1272250311 | MCA Degree Cert       | Cert       | [Approve][X] | |
| | Priyesh N.    | 1272250279 | Sem 2 Marksheet       | Marksheet  | [Approve][X] | |
| +--------------------------------------------------------------------------------+ |
+------------------------------------------------------------------------------------+
</div>
<div class="caption">Figure 4.6: Committee review queue interface layout.</div>

<div class="caption">Table 4.9: Committee queue review actions.</div>
<table>
  <tr>
    <th>Action Button</th>
    <th>Trigger</th>
    <th>Dialog / Modal</th>
    <th>Backend Effect</th>
  </tr>
  <tr>
    <td><b>Review / Open</b></td>
    <td>Clicks document row</td>
    <td>Full-window previewer</td>
    <td>Loads document PDF/image directly from Render backend.</td>
  </tr>
  <tr>
    <td><b>Approve (Check)</b></td>
    <td>Clicks green button</td>
    <td>Confirmation prompt</td>
    <td>Calls <code>/api/committee/documents/{id}/verify/</code>; updates status to VERIFIED.</td>
  </tr>
  <tr>
    <td><b>Reject (Cross)</b></td>
    <td>Clicks red button</td>
    <td>Rejection reason modal</td>
    <td>Prompts reviewer for feedback; updates status to REJECTED with feedback reason.</td>
  </tr>
</table>
"""
pages.append(make_page(31, p31_content))

# Page 32: 4.2.4 ALUMNI DIRECTORY
p32_content = """
<h3>4.2.4 Dynamic Alumni Network Directory (/alumni)</h3>
<p class="no-indent"><b>Purpose:</b> Connect enrolled students with graduated alumni for mentorship, referral discovery, and industry networking.</p>

<div class="ascii-box">
+------------------------------------------------------------------------------------+
| ALUMNI NETWORK | Search: [ Company / Role / Name... ]  Dept: [ Computer Science v ]|
+------------------------------------------------------------------------------------+
| +-------------------------+ +-------------------------+ +------------------------+ |
| | [Avatar] Rahul Sharma   | | [Avatar] Neha Joshi     | | [Avatar] Amit Deshmukh | |
| | SDE II @ Microsoft      | | Cloud Arch @ Amazon AWS | | Data Eng @ Snowflake   | |
| | Batch: 2022-2024        | | Batch: 2021-2023        | | Batch: 2020-2022       | |
| | [ Mentor Available (v) ]| | [ Mentor Available (v) ]| | [ Placement Referral ] | |
| | [ View Profile -> ]     | | [ View Profile -> ]     | | [ View Profile -> ]    | |
| +-------------------------+ +-------------------------+ +------------------------+ |
+------------------------------------------------------------------------------------+
</div>
<div class="caption">Figure 4.7: Dynamic Alumni Network directory interface layout.</div>

<div class="caption">Table 4.10: Alumni screen components.</div>
<table>
  <tr>
    <th>Component</th>
    <th>Behavior & Functional Specification</th>
  </tr>
  <tr>
    <td><b>Search Filter</b></td>
    <td>Real-time debounce filter matching alumni by name, employer, or technical role.</td>
  </tr>
  <tr>
    <td><b>Department Dropdown</b></td>
    <td>Restricts directory cards to specific academic disciplines.</td>
  </tr>
  <tr>
    <td><b>Mentor Availability Tag</b></td>
    <td>Emerald pill badge indicating alumni willing to provide guidance to current students.</td>
  </tr>
  <tr>
    <td><b>View Profile Link</b></td>
    <td>Opens candidate portfolio dossier (<code>/student/:id</code>) showing public credentials.</td>
  </tr>
</table>
"""
pages.append(make_page(32, p32_content))

# Page 33: 4.2.5 PUBLIC DOSSIER
p33_content = """
<h3>4.2.5 Public Candidate Verification Dossier (/student/:id)</h3>
<p class="no-indent"><b>Purpose:</b> Display verified candidate credentials to external corporate recruiters upon scanning the student's Interview Key QR code.</p>

<div class="ascii-box">
+------------------------------------------------------------------------------------+
| MIT WORLD PEACE UNIVERSITY | INSTITUTIONAL VERIFICATION DOSSIER                    |
+------------------------------------------------------------------------------------+
| [Photo]  AKSHAY DARJI                      PRN: 1272250311                         |
|          School of Computer Science        Batch: 2024-2026                        |
|          CGPA: 9.20 [ VERIFIED (v) ]       Status: Active Student                  |
|------------------------------------------------------------------------------------|
| VERIFIED ACADEMIC CREDENTIALS                                                      |
| - MCA Degree Transcript       [ Verified by Examination Committee ]  [View File ->]|
| - Semester II Marksheet       [ Verified by Examination Committee ]  [View File ->]|
|------------------------------------------------------------------------------------|
| TECHNICAL PROJECTS & SHOWCASE                                                      |
| - EduVault Platform: Decentralized Credential Locker (React, Django, Postgres)     |
| - Cloud Storage Engine: S3-compatible Blob Storage in Go                           |
+------------------------------------------------------------------------------------+
</div>
<div class="caption">Figure 4.8: Public candidate verification dossier layout.</div>

<div class="caption">Table 4.12: Public dossier components.</div>
<table>
  <tr>
    <th>Component</th>
    <th>Specification & Verification Authority</th>
  </tr>
  <tr>
    <td><b>Verified CGPA Badge</b></td>
    <td>Displays authenticated grade point average validated against university ledger.</td>
  </tr>
  <tr>
    <td><b>Document List</b></td>
    <td>Exclusively displays credentials marked <code>VERIFIED</code> by the Academic Committee.</td>
  </tr>
  <tr>
    <td><b>View File Button</b></td>
    <td>Opens original uploaded certificate directly from backend media storage in new tab.</td>
  </tr>
  <tr>
    <td><b>Project Showcase</b></td>
    <td>Lists approved student technical projects with live demo and GitHub repository links.</td>
  </tr>
</table>
"""
pages.append(make_page(33, p33_content))

# Page 34: 5. TEST PROCEDURES - 5.1 STRATEGY & 5.2 TEST LEVELS
p34_content = """
<h1>5. TEST PROCEDURES AND IMPLEMENTATION</h1>

<h2>5.1 IMPLEMENTATION STRATEGY</h2>
<p>The system was built bottom-up in four architectural layers. Each layer depends only on the layers beneath it and was tested before the next was started.</p>

<div class="ascii-box">
+------------------------------------------------------------------------------------+
| Layer 1: PostgreSQL Schema & Django Models (accounts, students, documents)         |
+------------------------------------------------------------------------------------+
                                         |
                                         v
+------------------------------------------------------------------------------------+
| Layer 2: Django REST Framework Serializers, RBAC Permissions, & SimpleJWT Auth     |
+------------------------------------------------------------------------------------+
                                         |
                                         v
+------------------------------------------------------------------------------------+
| Layer 3: React 18 + Vite Components, Axios Interceptors, & Tailwind UI Portals     |
+------------------------------------------------------------------------------------+
                                         |
                                         v
+------------------------------------------------------------------------------------+
| Layer 4: Production Cloud Orchestration (Vercel Frontend, Render Backend, Neon DB) |
+------------------------------------------------------------------------------------+
</div>
<div class="caption">Figure 5.1: Layered implementation order and dependencies.</div>

<h2>5.2 TEST STRATEGY AND TESTING ENVIRONMENT</h2>

<h3>5.2.1 Testing Levels</h3>
<div class="caption">Table 5.1: Testing levels and scope.</div>
<table>
  <tr>
    <th>Level</th>
    <th>Target</th>
    <th>Technique</th>
    <th>Test Cases</th>
  </tr>
  <tr>
    <td><b>Unit Testing</b></td>
    <td>Password hashing, file size/MIME validation, serializer checks</td>
    <td>Direct execution with boundary values</td>
    <td>TC-01, TC-02, TC-05, TC-06</td>
  </tr>
  <tr>
    <td><b>Integration Testing</b></td>
    <td>Auth routes, JWT token refresh, committee verify endpoint</td>
    <td>Postman & Django TestClient against PostgreSQL</td>
    <td>TC-03, TC-04, TC-07, TC-08</td>
  </tr>
  <tr>
    <td><b>Mobile Cross-Device</b></td>
    <td>Phone camera scanning, responsive dossier rendering</td>
    <td>Physical Android/iOS devices over local Wi-Fi & cloud</td>
    <td>TC-09, TC-10, TC-11</td>
  </tr>
  <tr>
    <td><b>Production End-to-End</b></td>
    <td>Full cloud round-trip, media file viewing on Render</td>
    <td>Live Vercel frontend calling live Render backend</td>
    <td>TC-12, TC-13, TC-14</td>
  </tr>
</table>
"""
pages.append(make_page(34, p34_content))

# Page 35: 5.2.2 TEST ENVIRONMENT & 5.3 TEST CASES (Part 1)
p35_content = """
<h3>5.2.2 Test Environment</h3>
<div class="caption">Table 5.2: Hardware and software test environment.</div>
<table>
  <tr>
    <th>Item</th>
    <th>Specification</th>
  </tr>
  <tr><td><b>Operating Systems</b></td><td>Windows 11 64-bit and Ubuntu 22.04 LTS</td></tr>
  <tr><td><b>Processor, RAM, Storage</b></td><td>Intel Core i5-1135G7, 16 GB DDR4 RAM, 512 GB NVMe SSD</td></tr>
  <tr><td><b>Python Runtime</b></td><td>Python 3.11.9</td></tr>
  <tr><td><b>API Testing Framework</b></td><td>Postman Desktop 10.x & Django TestCase</td></tr>
  <tr><td><b>Database Engine</b></td><td>Neon Serverless Cloud PostgreSQL 16</td></tr>
  <tr><td><b>Web Browsers Tested</b></td><td>Google Chrome 122+, Microsoft Edge 122+, Mobile Chrome Android 14</td></tr>
</table>

<h2>5.3 TEST CASES AND TEST RESULTS</h2>
<div class="caption">Table 5.3: Test case execution matrix (TC-01 to TC-04).</div>
<table>
  <tr>
    <th>Test ID</th>
    <th>Module</th>
    <th>Test Scenario</th>
    <th>Test Input / Condition</th>
    <th>Expected Result</th>
    <th>Status</th>
  </tr>
  <tr>
    <td><b>TC-01</b></td>
    <td>accounts (User)</td>
    <td>Valid user registration & password hashing</td>
    <td>POST /api/auth/register/ with email, password, role STUDENT</td>
    <td>HTTP 201 Created. User row created. Password hashed using PBKDF2-SHA256 with salt.</td>
    <td><b>PASS</b></td>
  </tr>
  <tr>
    <td><b>TC-02</b></td>
    <td>accounts (User)</td>
    <td>Duplicate email registration rejection</td>
    <td>POST /api/auth/register/ with existing email ak12@gmail.com</td>
    <td>HTTP 400 Bad Request. Field error: "A user with that email already exists."</td>
    <td><b>PASS</b></td>
  </tr>
  <tr>
    <td><b>TC-03</b></td>
    <td>accounts (Auth)</td>
    <td>Valid user authentication</td>
    <td>POST /api/auth/token/ with valid credentials</td>
    <td>HTTP 200 OK. Returns signed access token and refresh token. User object returned.</td>
    <td><b>PASS</b></td>
  </tr>
  <tr>
    <td><b>TC-04</b></td>
    <td>accounts (Auth)</td>
    <td>Invalid password rejection</td>
    <td>POST /api/auth/token/ with incorrect password</td>
    <td>HTTP 401 Unauthorized. Generic error: "No active account found with the given credentials."</td>
    <td><b>PASS</b></td>
  </tr>
</table>
"""
pages.append(make_page(35, p35_content))

# Page 36: 5.3 TEST CASES (Part 2)
p36_content = """
<div class="caption">Table 5.3 (Contd.): Test case execution matrix (TC-05 to TC-10).</div>
<table>
  <tr>
    <th>Test ID</th>
    <th>Module</th>
    <th>Test Scenario</th>
    <th>Test Input / Condition</th>
    <th>Expected Result</th>
    <th>Status</th>
  </tr>
  <tr>
    <td><b>TC-05</b></td>
    <td>documents</td>
    <td>Document upload within 5MB limit</td>
    <td>POST /api/documents/ with marksheet.pdf (1.8 MB), Category: MARKSHEET</td>
    <td>HTTP 201 Created. File stored in media/documents/. Status initiated to PENDING.</td>
    <td><b>PASS</b></td>
  </tr>
  <tr>
    <td><b>TC-06</b></td>
    <td>documents</td>
    <td>Oversized document upload rejection</td>
    <td>POST /api/documents/ with large_portfolio.pdf (7.8 MB > 5MB limit)</td>
    <td>HTTP 400 Bad Request. Field error: "File size must not exceed 5 MB."</td>
    <td><b>PASS</b></td>
  </tr>
  <tr>
    <td><b>TC-07</b></td>
    <td>documents</td>
    <td>Disallowed file extension rejection</td>
    <td>POST /api/documents/ with script.exe or archive.zip</td>
    <td>HTTP 400 Bad Request. Error: "Only PDF, JPG, JPEG and PNG files are allowed."</td>
    <td><b>PASS</b></td>
  </tr>
  <tr>
    <td><b>TC-08</b></td>
    <td>students (RBAC)</td>
    <td>Unauthorized role access to committee API</td>
    <td>Student JWT calling GET /api/committee/documents/</td>
    <td>HTTP 403 Forbidden. Student blocked from viewing institutional verification queue.</td>
    <td><b>PASS</b></td>
  </tr>
  <tr>
    <td><b>TC-09</b></td>
    <td>documents</td>
    <td>Committee document approval</td>
    <td>Committee user calling POST /api/committee/documents/42/verify/</td>
    <td>HTTP 200 OK. Status updated to VERIFIED. <code>verified_at</code> populated with current UTC time.</td>
    <td><b>PASS</b></td>
  </tr>
  <tr>
    <td><b>TC-10</b></td>
    <td>documents</td>
    <td>Committee document rejection</td>
    <td>Committee user rejecting with feedback: "Missing university seal"</td>
    <td>HTTP 200 OK. Status updated to REJECTED. <code>rejection_reason</code> stored and visible to student.</td>
    <td><b>PASS</b></td>
  </tr>
</table>
"""
pages.append(make_page(36, p36_content))

# Page 37: 5.3 TEST CASES (Part 3) & 5.4 DEFECTS
p37_content = """
<div class="caption">Table 5.3 (Contd.): Test case execution matrix (TC-11 to TC-14).</div>
<table>
  <tr>
    <th>Test ID</th>
    <th>Module</th>
    <th>Test Scenario</th>
    <th>Test Input / Condition</th>
    <th>Expected Result</th>
    <th>Status</th>
  </tr>
  <tr>
    <td><b>TC-11</b></td>
    <td>placement</td>
    <td>CGPA threshold candidate filtering</td>
    <td>Filter: CGPA &ge; 8.0, Department: Computer Science</td>
    <td>Returns only eligible candidates meeting or exceeding CGPA 8.0.</td>
    <td><b>PASS</b></td>
  </tr>
  <tr>
    <td><b>TC-12</b></td>
    <td>frontend (QR)</td>
    <td>Mobile camera QR code scanning</td>
    <td>Smartphone camera scans /student/14 QR code</td>
    <td>Phone opens browser directly to public candidate dossier without requiring login.</td>
    <td><b>PASS</b></td>
  </tr>
  <tr>
    <td><b>TC-13</b></td>
    <td>production</td>
    <td>Production media file viewing</td>
    <td>Recruiter clicks "View File" on live Vercel deployment</td>
    <td>Browser loads uploaded certificate PDF directly from Render backend without 404 error.</td>
    <td><b>PASS</b></td>
  </tr>
  <tr>
    <td><b>TC-14</b></td>
    <td>alumni</td>
    <td>Dynamic alumni network filtering</td>
    <td>Filter: "Available for Mentorship", Search: "Microsoft"</td>
    <td>Returns matching alumni records with company badges and mentorship tags.</td>
    <td><b>PASS</b></td>
  </tr>
</table>

<h2>5.4 DEFECTS FOUND AND RESOLVED</h2>
<p>During integration testing and production cloud deployment, two high-severity defects were uncovered and resolved.</p>
"""
pages.append(make_page(37, p37_content))

# Page 38: 5.4.1 DEFECT 1 (Media 404 in Production)
p38_content = """
<h3>5.4.1 Defect 1: Production Media File 404 Resolution (DEBUG=False)</h3>
<div class="caption">Table 5.4: Defect 1 record.</div>
<table>
  <tr><th>Field</th><th>Detail</th></tr>
  <tr><td><b>Defect ID</b></td><td>DEF-01</td></tr>
  <tr><td><b>Component</b></td><td><code>config/urls.py</code>, Django Media Routing</td></tr>
  <tr><td><b>Severity</b></td><td>High. Uploaded certificates returned "404 Not Found" on the live server.</td></tr>
  <tr><td><b>Detected In</b></td><td>Cloud deployment verification when clicking "View File" on Vercel/Render.</td></tr>
  <tr><td><b>Status</b></td><td><b>Resolved</b></td></tr>
</table>

<p class="no-indent"><b>Symptom:</b> When students uploaded certificates on the live deployed system, clicking "View File" opened a new tab at <code>https://eduvault-backend1.onrender.com/media/...</code> showing <code>404 Not Found: The requested resource was not found on this server</code>.</p>

<p class="no-indent"><b>Root Cause:</b> In development, Django serves media using <code>if settings.DEBUG: urlpatterns += static(MEDIA_URL)</code>. However, in production on Render, <code>DEBUG = False</code>, causing Django to strip all media routes from the URL configuration.</p>

<div class="ascii-box">
                      [ Request: /media/documents/cert.pdf ]
                                        |
                 +----------------------+----------------------+
                 | (DEBUG = True)                              | (DEBUG = False)
                 v                                             v
     [ Django Serves Static Media ]                [ Django Strips Route ]
         (Returns File 200 OK)                     (Returns 404 Not Found)
</div>
<div class="caption">Figure 5.2: Production media routing failure when DEBUG=False.</div>

<p class="no-indent"><b>Diagnosis:</b> The URL pattern was inspected in <code>config/urls.py</code>. Because <code>urlpatterns += static(...)</code> was guarded by <code>if settings.DEBUG:</code>, Gunicorn had no matching URL pattern for <code>/media/</code> requests in production.</p>

<p class="no-indent"><b>Resolution:</b> Added explicit media serving using <code>re_path</code> and <code>django.views.static.serve</code> regardless of debug state, and updated frontend links via <code>getMediaUrl()</code>:</p>

<pre># config/urls.py
from django.urls import re_path
from django.views.static import serve
from django.conf import settings

# Explicitly serve uploaded media files in development and production
urlpatterns += [
    re_path(r"^media/(?P&lt;path&gt;.*)$", serve, {"document_root": settings.MEDIA_ROOT}),
]</pre>
"""
pages.append(make_page(38, p38_content))

# Page 39: 5.4.2 DEFECT 2 (Monorepo Vercel Root Directory)
p39_content = """
<h3>5.4.2 Defect 2: Monorepo Root Directory & SPA Rewrites on Vercel</h3>
<div class="caption">Table 5.5: Defect 2 record.</div>
<table>
  <tr><th>Field</th><th>Detail</th></tr>
  <tr><td><b>Defect ID</b></td><td>DEF-02</td></tr>
  <tr><td><b>Component</b></td><td>Root <code>package.json</code> and <code>vercel.json</code></td></tr>
  <tr><td><b>Severity</b></td><td>High. Vercel deployment failed with "No package.json found in root".</td></tr>
  <tr><td><b>Detected In</b></td><td>Initial Vercel cloud deployment build phase.</td></tr>
  <tr><td><b>Status</b></td><td><b>Resolved</b></td></tr>
</table>

<p class="no-indent"><b>Symptom:</b> Deploying the project repository on Vercel failed immediately with build exit code 1. Vercel attempted to locate <code>package.json</code> at the root repository level, whereas all frontend source code resided in the subfolder <code>eduvault-frontend/</code>.</p>

<p class="no-indent"><b>Root Cause:</b> The repository is structured as a monorepo containing both <code>eduvault-frontend/</code> and <code>eduvault-backned/</code>. Vercel's default build runner assumed a root-level Node project.</p>

<div class="ascii-box">
                      [ Git Repository Root ]
                                 |
         +-----------------------+-----------------------+
         |                                               |
         v                                               v
[ eduvault-frontend/ ]                          [ eduvault-backned/ ]
  - package.json                                  - requirements.txt
  - vite.config.js                                - manage.py
  (Vercel could not find                          (Render root directory)
   package.json in root)
</div>
<div class="caption">Figure 5.3: Monorepo folder hierarchy causing root build failures.</div>

<p class="no-indent"><b>Resolution:</b> Created a root <code>package.json</code> with <code>npm --prefix eduvault-frontend</code> build scripts and a root <code>vercel.json</code> configuring the output directory to <code>eduvault-frontend/dist</code> with SPA rewrites (<code>/(.*) &rarr; /index.html</code>):</p>

<pre>// root vercel.json
{
  "buildCommand": "npm --prefix eduvault-frontend run build",
  "installCommand": "npm --prefix eduvault-frontend install",
  "outputDirectory": "eduvault-frontend/dist",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}</pre>
"""
pages.append(make_page(39, p39_content))

# Page 40: 6. SAMPLE CODE - 6.1 USER MODEL
p40_content = """
<h1>6. SAMPLE CODE</h1>

<h2>6.1 Custom User & Role-Based Permissions (accounts/models.py)</h2>
<p class="no-indent"><b>File:</b> <code>accounts/models.py</code></p>
<pre>from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    class Role(models.TextChoices):
        STUDENT = "STUDENT", "Student"
        ALUMNI = "ALUMNI", "Alumni"
        COMMITTEE = "COMMITTEE", "Committee Member"
        PLACEMENT = "PLACEMENT", "Placement Team"

    username = None
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.STUDENT)
    college = models.CharField(max_length=255, default="MIT-WPU")
    department = models.CharField(max_length=100, default="Computer Science")
    phone = models.CharField(max_length=20, blank=True, null=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    def __str__(self):
        return f"{self.email} ({self.role})"
</pre>
"""
pages.append(make_page(40, p40_content))

# Page 41: 6.2 DOCUMENT MODEL
p41_content = """
<h2>6.2 Document Validation & Model Architecture (documents/models.py)</h2>
<p class="no-indent"><b>File:</b> <code>documents/models.py</code></p>
<pre>import uuid
from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError

def validate_document_file(value):
    max_size = 5 * 1024 * 1024  # 5 Megabytes
    if value.size > max_size:
        raise ValidationError("File size must not exceed 5 MB.")

    allowed_extensions = [".pdf", ".jpg", ".jpeg", ".png"]
    file_name = value.name.lower()
    if not any(file_name.endswith(ext) for ext in allowed_extensions):
        raise ValidationError("Only PDF, JPG, JPEG and PNG files are allowed.")

class Document(models.Model):
    class Category(models.TextChoices):
        CERTIFICATE = "CERTIFICATE", "Certificate"
        MARKSHEET = "MARKSHEET", "Marksheet"
        INTERNSHIP = "INTERNSHIP", "Internship"
        PROJECT = "PROJECT", "Project"
        ACHIEVEMENT = "ACHIEVEMENT", "Achievement"
        OTHER = "OTHER", "Other"

    class Status(models.TextChoices):
        PENDING = "PENDING", "Pending"
        VERIFIED = "VERIFIED", "Verified"
        REJECTED = "REJECTED", "Rejected"

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="documents")
    verification_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=20, choices=Category.choices)
    file = models.FileField(upload_to="documents/", validators=[validate_document_file])
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    rejection_reason = models.TextField(blank=True, null=True)
    verified_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.user.email} [{self.status}]"
</pre>
"""
pages.append(make_page(41, p41_content))

# Page 42: 6.3 COMMITTEE VERIFICATION VIEW
p42_content = """
<h2>6.3 Committee Verification View (documents/views.py)</h2>
<p class="no-indent"><b>File:</b> <code>documents/views.py</code></p>
<pre>from django.utils import timezone
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Document
from .permissions import IsCommittee

class VerifyDocumentView(APIView):
    permission_classes = [IsCommittee]

    def post(self, request, pk):
        try:
            document = Document.objects.get(pk=pk)
        except Document.DoesNotExist:
            return Response(
                {"error": "Document not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        document.status = Document.Status.VERIFIED
        document.verified_at = timezone.now()
        document.rejection_reason = None
        document.save()

        return Response(
            {
                "message": "Document verified successfully.",
                "verified_at": document.verified_at,
                "status": document.status,
            },
            status=status.HTTP_200_OK,
        )

class RejectDocumentView(APIView):
    permission_classes = [IsCommittee]

    def post(self, request, pk):
        try:
            document = Document.objects.get(pk=pk)
        except Document.DoesNotExist:
            return Response({"error": "Document not found."}, status=status.HTTP_404_NOT_FOUND)

        reason = request.data.get("rejection_reason", "").strip()
        if not reason:
            return Response({"error": "Rejection reason is required."}, status=status.HTTP_400_BAD_REQUEST)

        document.status = Document.Status.REJECTED
        document.rejection_reason = reason
        document.save()

        return Response({"message": "Document rejected.", "rejection_reason": reason})
</pre>
"""
pages.append(make_page(42, p42_content))

# Page 43: 6.4 DYNAMIC MEDIA RESOLVER & 6.5 QR HELPER
p43_content = """
<h2>6.4 Frontend Dynamic Media URL Resolver (src/api/apiClient.js)</h2>
<p class="no-indent"><b>File:</b> <code>eduvault-frontend/src/api/apiClient.js</code></p>
<pre>export const API_BASE_URL =
  typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace(/\/$/, "")
    : "";

/**
 * Returns full absolute URL for uploaded media files.
 * In production on Vercel, ensures relative /media paths target the Render backend.
 */
export const getMediaUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  const cleanPath = url.startsWith("/") ? url : `/${url}`;
  return `${API_BASE_URL}${cleanPath}`;
};
</pre>

<h2>6.5 QR Code Dynamic Host Resolver (src/utils/qrHelper.js)</h2>
<p class="no-indent"><b>File:</b> <code>eduvault-frontend/src/utils/qrHelper.js</code></p>
<pre>// Local IP of this machine on Wi-Fi for phone scanning
export const LOCAL_NETWORK_IP = "192.168.0.106";

/**
 * Returns a URL suitable for scanning by external devices (such as a mobile phone).
 * If the current origin is localhost or 127.0.0.1, it substitutes the local network IP
 * so the phone can access the Vite dev server directly over the local Wi-Fi network.
 */
export const getShareableUrl = (path = "") => {
  if (typeof window === "undefined") return path;

  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  const host = isLocalhost
    ? `${LOCAL_NETWORK_IP}:${window.location.port || 5173}`
    : window.location.host;

  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${window.location.protocol}//${host}${cleanPath}`;
};
</pre>
"""
pages.append(make_page(43, p43_content))

# Page 44: 6.6 EXPLANATION & ARCHITECTURE MECHANICS
p44_content = """
<h2>6.6 Explanation & Architecture Mechanics</h2>

<h3>Model and ORM Mechanics</h3>
<p>Django's ORM abstracts database operations into type-safe Python classes. The <code>User</code> class extends <code>AbstractUser</code> with a custom <code>UserManager</code>, allowing email-based authentication instead of traditional usernames. <code>models.TextChoices</code> provides strongly-typed role and category enumeration, enforcing data consistency at both the Python and SQL layer.</p>

<div class="caption">Table 6.1: Architecture design patterns used in EduVault.</div>
<table>
  <tr>
    <th>Pattern</th>
    <th>Used For</th>
    <th>Technical Reason</th>
  </tr>
  <tr>
    <td><b>Single Responsibility Principle</b></td>
    <td>API Views vs Serializers vs Models</td>
    <td>Models handle database schema; serializers handle validation and JSON conversion; views manage HTTP status codes.</td>
  </tr>
  <tr>
    <td><b>Role-Based Access Control (RBAC)</b></td>
    <td>DRF Permission Classes (<code>IsCommittee</code>, <code>IsPlacementOrCommittee</code>)</td>
    <td>Ensures sensitive administrative actions cannot be triggered by student tokens even if the endpoint URL is known.</td>
  </tr>
  <tr>
    <td><b>Stateless Token Authentication</b></td>
    <td>SimpleJWT (Access & Refresh Tokens)</td>
    <td>Eliminates server-side session memory consumption, enabling horizontal container scaling on cloud infrastructure.</td>
  </tr>
  <tr>
    <td><b>Dynamic Host Interpolation</b></td>
    <td><code>qrHelper.js</code> & <code>apiClient.js</code></td>
    <td>Allows the same codebase to run seamlessly on localhost, across local mobile Wi-Fi, and in production on Vercel/Render.</td>
  </tr>
</table>

<h3>Security and Validation Guarantees</h3>
<p>All file uploads are validated before saving. <code>validate_document_file()</code> enforces two critical defenses: a 5 MB file size boundary and a strict file extension whitelist (<code>.pdf</code>, <code>.jpg</code>, <code>.jpeg</code>, <code>.png</code>). This prevents server disk exhaustion and neutralizes executable upload vulnerabilities (e.g. PHP or shell scripts).</p>
"""
pages.append(make_page(44, p44_content))

# Page 45: 7. LIMITATIONS
p45_content = """
<h1>7. LIMITATIONS</h1>

<h2>7.1 Cloud Free-Tier Spin-Down Boundary</h2>
<p>EduVault is deployed on Render's free container tier. As part of Render's resource allocation policy, web services spin down into sleep mode after 15 minutes of inactivity. When a user accesses the platform after dormancy, the container requires 30 to 50 seconds to initialize. Once awake, response latency drops below 200 ms.</p>

<div class="caption">Table 7.1: Operational boundaries and limitations.</div>
<table>
  <tr>
    <th>Limitation Aspect</th>
    <th>Technical Cause</th>
    <th>System Impact</th>
    <th>Mitigation Implemented</th>
  </tr>
  <tr>
    <td><b>Container Dormancy</b></td>
    <td>Render free tier auto-sleep policy</td>
    <td>30–50s initial request delay after 15 min idle</td>
    <td>Documented to user; client exhibits loading spinners during cold start.</td>
  </tr>
  <tr>
    <td><b>Ephemeral Storage</b></td>
    <td>Stateless container filesystem on Render</td>
    <td>Uploaded files in media/ reset upon full container rebuilds</td>
    <td>PostgreSQL database is permanently hosted on Neon; media serving is enabled.</td>
  </tr>
  <tr>
    <td><b>Manual Committee Review</b></td>
    <td>Human faculty verification required</td>
    <td>Verification depends on committee review availability</td>
    <td>Status tracking (PENDING, VERIFIED, REJECTED) with instant student feedback.</td>
  </tr>
  <tr>
    <td><b>Offline Access</b></td>
    <td>Web-native client without service worker cache</td>
    <td>Requires active network connection to authenticate and verify</td>
    <td>Lightweight bundle size (&lt; 200 KB gzipped) ensures fast mobile load.</td>
  </tr>
</table>

<h2>7.2 Heuristic False Positives & OCR Boundary</h2>
<p>The system stores and renders files as authentic digital assets. However, automated Optical Character Recognition (OCR) against institutional ledger databases is not integrated in the current release. Verification authenticity relies on human committee approval rather than algorithmic pixel matching.</p>
"""
pages.append(make_page(45, p45_content))

# Page 46: 8. FUTURE SCOPE
p46_content = """
<h1>8. FUTURE SCOPE</h1>

<h2>8.1 Blockchain Smart Contracts (Ethereum & Polygon Integration)</h2>
<p class="no-indent"><b>Proposal:</b> Anchor approved credential hashes (SHA-256) onto public decentralized blockchains (such as Polygon or Ethereum). When a certificate is marked <code>VERIFIED</code>, a cryptographic transaction is published to a smart contract, providing immutable, tamper-proof proof of existence that remains verifiable even if the central university database is offline.</p>

<h2>8.2 AI-Powered OCR for Automatic Credential Verification</h2>
<p class="no-indent"><b>Proposal:</b> Integrate Google Cloud Vision or Tesseract OCR into the document upload pipeline. Upon upload, the system automatically extracts the student's PRN, semester marks, and university seal, cross-referencing them against the university's central ERP database. This will automate over 80% of routine verifications, leaving only disputed records for manual committee review.</p>

<h2>8.3 Government DigiLocker and National Academic Depository (NAD) APIs</h2>
<p class="no-indent"><b>Proposal:</b> Interface directly with the Government of India's DigiLocker and National Academic Depository (NAD) APIs. This will permit enrolled students to import verified marksheets and Aadhaar-authenticated credentials directly into their EduVault locker with a single click.</p>

<h2>8.4 Mobile Native Applications via React Native</h2>
<p class="no-indent"><b>Proposal:</b> Wrap EduVault's component architecture into React Native to release native Android (APK) and iOS (IPA) applications featuring offline biometric authentication (fingerprint and FaceID) and push notifications for committee verification status updates.</p>

<div class="caption">Table 8.1: Future scope roadmap and engineering milestones.</div>
<table>
  <tr>
    <th>Milestone</th>
    <th>Target Technology</th>
    <th>Expected Value</th>
  </tr>
  <tr>
    <td><b>M1: Persistent Storage</b></td>
    <td>AWS S3 / Cloudinary SDK</td>
    <td>Permanent, geo-replicated media asset storage across all container lifecycles.</td>
  </tr>
  <tr>
    <td><b>M2: Blockchain Anchoring</b></td>
    <td>Solidity & Polygon PoS</td>
    <td>Decentralized, mathematically verifiable credential hashes.</td>
  </tr>
  <tr>
    <td><b>M3: Automated OCR</b></td>
    <td>Tesseract / Google Vision API</td>
    <td>Instant automated marksheet verification against university database.</td>
  </tr>
  <tr>
    <td><b>M4: Native Mobile App</b></td>
    <td>React Native & Expo</td>
    <td>App Store / Play Store availability with offline biometric vault.</td>
  </tr>
</table>
"""
pages.append(make_page(46, p46_content))

# Page 47: 9. CONCLUSION & REFLECTION
p47_content = """
<h1>9. CONCLUSION</h1>

<h2>9.1 Technical Summary</h2>
<p>The <b>EduVault: Digital Locker and Academic Credential Verification Platform</b> successfully modernizes academic record management, eliminates credential fraud, and streamlines campus placement recruitment. By replacing unverified paper photocopies and static spreadsheets with a decoupled, role-governed web platform, EduVault establishes a single institutional source of truth.</p>

<p>The platform delivers an intuitive experience for Students, Academic Committees, Placement Teams, Alumni, and Corporate Recruiters. Key achievements include sub-3-second verification via cryptographic Interview Key QR codes, dynamic talent filtering by CGPA thresholds, an interactive alumni network, and a 100% free production cloud deployment across Vercel, Render, and Neon Serverless PostgreSQL.</p>

<h2>9.2 Academic and Professional Reflection</h2>
<div class="caption">Table 9.1: Competencies developed.</div>
<table>
  <tr>
    <th>Competency</th>
    <th>Where Exercised</th>
    <th>What Was Learned</th>
  </tr>
  <tr>
    <td><b>Full-Stack Architecture</b></td>
    <td>FastAPI / Django REST & React 18</td>
    <td>Designing a typed REST contract between tiers, stateless JWT authentication, and managing client-side reactive state.</td>
  </tr>
  <tr>
    <td><b>Database Engineering</b></td>
    <td>PostgreSQL 16 & Django ORM</td>
    <td>Third Normal Form design, foreign key cascade constraints, indexing strategies, and connection pooling.</td>
  </tr>
  <tr>
    <td><b>Security & RBAC</b></td>
    <td>SimpleJWT & DRF Permissions</td>
    <td>Role-based route guarding, PBKDF2 password hashing, and strict MIME-type and size upload validations.</td>
  </tr>
  <tr>
    <td><b>Cloud DevOps & Deployment</b></td>
    <td>Vercel, Render & Neon Cloud</td>
    <td>Monorepo build configuration, SPA routing rewrites, CORS cross-origin configuration, and production media serving.</td>
  </tr>
  <tr>
    <td><b>Professional Practice</b></td>
    <td>UML Modeling & Documentation</td>
    <td>Formal system analysis, test case matrix design, defect root cause analysis, and academic report compilation.</td>
  </tr>
</table>
"""
pages.append(make_page(47, p47_content))

# Page 48: 10. REFERENCES
p48_content = """
<h1>10. REFERENCES</h1>

<h3>A. Software Architecture and Design Patterns</h3>
<ol style="padding-left: 20px; font-size: 9pt; line-height: 1.6;">
  <li>Chidamber, S. R., & Kemerer, C. F. (1994). A metrics suite for object oriented design. <i>IEEE Transactions on Software Engineering</i>, 20(6), 476–493.</li>
  <li>Perry, D. E., & Wolf, A. L. (1992). Foundations for the study of software architecture. <i>ACM SIGSOFT Software Engineering Notes</i>, 17(4), 40–52.</li>
  <li>Martin, R. C. (2017). <i>Clean Architecture: A Craftsman's Guide to Software Structure and Design</i>. Prentice Hall.</li>
  <li>Kleppmann, M. (2017). <i>Designing Data-Intensive Applications: The Big Ideas Behind Reliable, Scalable, and Maintainable Systems</i>. O'Reilly Media.</li>
</ol>

<h3>B. Web Frameworks and Component Engineering</h3>
<ol style="padding-left: 20px; font-size: 9pt; line-height: 1.6;">
  <li>Greenfeld, D. R., & Greenfeld, A. R. (2020). <i>Two Scoops of Django 3.x: Best Practices for the Django Web Framework</i>. Feldroy.</li>
  <li>Banks, A., & Porcello, E. (2020). <i>Learning React: Modern Patterns for Developing React Apps (2nd ed.)</i>. O'Reilly Media.</li>
  <li>Cockburn, A. (2001). <i>Writing Effective Use Cases</i>. Addison-Wesley.</li>
  <li>Object Management Group. (2017). <i>Unified Modeling Language (UML), version 2.5.1</i> (OMG Document formal/17-12-05).</li>
</ol>

<h3>C. Security, Authentication, and Identity Standards</h3>
<ol style="padding-left: 20px; font-size: 9pt; line-height: 1.6;">
  <li>Grassi, P. A., Garcia, M. E., & Fenton, J. L. (2017). <i>Digital Identity Guidelines: Authentication and Lifecycle Management</i> (NIST Special Publication 800-63B). National Institute of Standards and Technology.</li>
  <li>Jones, M., Bradley, J., & Sakimura, N. (2015). <i>JSON Web Token (JWT)</i> (RFC 7519). Internet Engineering Task Force (IETF).</li>
  <li>OWASP Foundation. (2021). <i>OWASP Top 10 Web Application Security Risks</i>. https://owasp.org/Top10/</li>
</ol>

<h3>D. Official Technology Documentation</h3>
<ol style="padding-left: 20px; font-size: 9pt; line-height: 1.6;">
  <li>Django Software Foundation. (2026). <i>Django Documentation (Version 6.0)</i>. https://docs.djangoproject.com/</li>
  <li>Christie, T. (2026). <i>Django REST Framework Documentation</i>. https://www.django-rest-framework.org/</li>
  <li>Meta Open Source. (2026). <i>React 18 Documentation</i>. https://react.dev/</li>
  <li>Evan You & Vite Contributors. (2026). <i>Vite: Next Generation Frontend Tooling</i>. https://vite.dev/</li>
  <li>PostgreSQL Global Development Group. (2026). <i>PostgreSQL 16.0 Documentation</i>. https://www.postgresql.org/docs/16/</li>
  <li>Tailwind Labs. (2026). <i>Tailwind CSS Documentation</i>. https://tailwindcss.com/docs/</li>
</ol>
"""
pages.append(make_page(48, p48_content))


# Combine all pages into one master HTML document
html_template = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>EduVault | Mini Project Report</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Times+New+Roman&family=Courier+Prime&family=Inter:wght@400;600;700&display=swap');

    @page {{
      size: A4 portrait;
      margin: 10mm;
    }}

    * {{
      box-sizing: border-box;
    }}

    body {{
      font-family: 'Times New Roman', Times, serif;
      font-size: 10.5pt;
      line-height: 1.45;
      color: #000;
      background: #eef0f3;
      margin: 0;
      padding: 0;
    }}

    .sheet {{
      background: #fff;
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      margin: 15px auto;
      padding: 12mm 14mm;
      box-shadow: 0 4px 15px rgba(0,0,0,0.15);
      position: relative;
      page-break-after: always;
      break-after: page;
      overflow: hidden;
    }}

    .inner-border {{
      border: 1px solid #000;
      width: 100%;
      height: 100%;
      padding: 10mm 12mm;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }}

    .page-header {{
      position: absolute;
      top: 4mm;
      right: 12mm;
      font-family: 'Times New Roman', Times, serif;
      font-style: italic;
      font-size: 8.5pt;
      color: #333;
    }}

    .page-footer {{
      position: absolute;
      bottom: 4mm;
      left: 0;
      right: 0;
      text-align: center;
      font-family: 'Times New Roman', Times, serif;
      font-size: 9pt;
      color: #111;
    }}

    .page-content {{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding-top: 5mm;
      padding-bottom: 5mm;
    }}

    h1, h2, h3, h4 {{
      font-family: 'Times New Roman', Times, serif;
      color: #000;
      margin-top: 0.6em;
      margin-bottom: 0.3em;
    }}

    h1 {{
      font-size: 15pt;
      text-transform: uppercase;
      font-weight: bold;
    }}

    h2 {{
      font-size: 12.5pt;
      font-weight: bold;
      text-transform: uppercase;
      margin-top: 0.9em;
      border-bottom: 1px solid #000;
      padding-bottom: 2px;
    }}

    h3 {{
      font-size: 11pt;
      font-weight: bold;
      margin-top: 0.7em;
    }}

    h4 {{
      font-size: 10.5pt;
      font-weight: bold;
      margin-top: 0.5em;
    }}

    p {{
      text-align: justify;
      margin-bottom: 0.6em;
      text-indent: 1.5em;
    }}

    p.no-indent {{
      text-indent: 0;
    }}

    table {{
      width: 100%;
      border-collapse: collapse;
      margin: 0.6em 0;
      font-size: 8.5pt;
    }}

    th, td {{
      border: 1px solid #222;
      padding: 4px 6px;
      text-align: left;
      vertical-align: top;
    }}

    th {{
      background-color: #f2f3f7;
      font-weight: bold;
      text-align: center;
    }}

    pre, code {{
      font-family: 'Courier Prime', 'Courier New', Courier, monospace;
      font-size: 8pt;
    }}

    pre {{
      background: #fafafa;
      border: 1px solid #aaa;
      padding: 8px;
      margin: 0.5em 0;
      line-height: 1.25;
      overflow: hidden;
      white-space: pre-wrap;
    }}

    .ascii-box {{
      font-family: 'Courier Prime', 'Courier New', monospace;
      font-size: 7.5pt;
      line-height: 1.2;
      background: #fbfbfb;
      border: 1px solid #888;
      padding: 8px;
      margin: 8px 0;
      white-space: pre;
      overflow: hidden;
    }}

    .caption {{
      font-size: 8.5pt;
      font-style: italic;
      text-align: center;
      margin-top: 2px;
      margin-bottom: 8px;
    }}

    .toc-container {{
      font-size: 9pt;
      line-height: 1.55;
    }}

    .toc-line {{
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 3px;
    }}

    .toc-dots {{
      flex: 1;
      border-bottom: 1px dotted #444;
      margin: 0 5px;
      height: 1px;
    }}

    @media print {{
      body {{
        background: transparent;
        padding: 0;
      }}
      .sheet {{
        box-shadow: none;
        margin: 0;
        width: 100%;
        height: 100vh;
        max-height: 100vh;
      }}
      .inner-border {{
        border: 1px solid #000;
      }}
    }}
  </style>
</head>
<body>
{''.join(pages)}
</body>
</html>
"""

with open(HTML_FILE, "w", encoding="utf-8") as f:
    f.write(html_template)

print(f"Generated clean HTML with {len(pages)} discrete pages at: {HTML_FILE}")

# Compile using Google Chrome headless with exact page background and scale
chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
if not os.path.exists(chrome_path):
    chrome_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

print(f"Compiling exact PDF via {chrome_path}...")
cmd = [
    chrome_path,
    "--headless=new",
    "--disable-gpu",
    "--print-to-pdf-no-header",
    f"--print-to-pdf={PDF_FILE}",
    str(HTML_FILE)
]

res = subprocess.run(cmd, capture_output=True, text=True)
if os.path.exists(PDF_FILE):
    size_kb = os.path.getsize(PDF_FILE) / 1024
    print(f"PDF generated successfully: {PDF_FILE} ({size_kb:.1f} KB)")
else:
    print("PDF generation failed:", res.stderr)
