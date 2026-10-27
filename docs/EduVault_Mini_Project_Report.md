# Mini Project Report
## On
# **EduVault: Digital Locker and Academic Credential Verification Platform**

**By**
- **Member 1:** Akshay Darji — **PRN:** 1272250311
- **Member 2:** Priyesh Nandanwar — **PRN:** 1272250279

**For**
### **MCA40130 Mini Project**
### **SY MCA (Semester III)**
### **Academic Year: 2026-2027**

**Under the Guidance of**
### **Mrs. Sukanya Akolkar**

**Submitted To**
### **Dr. Vishwanath Karad MIT WORLD PEACE UNIVERSITY, PUNE**
*Technology, Research, Social Innovation & Partnerships*

In partial fulfillment of the requirement for the award of the Degree of  
**Master of Computer Applications (MCA)**

**Submitted Through**
### **School of Computer Science and Engineering**
### **Department of Computer Science and Applications**
**MIT-WPU, Kothrud, Pune - 411038**

---

# **Certificate**

This is to certify that, **Akshay Darji** (PRN: 1272250311) and **Priyesh Nandanwar** (PRN: 1272250279), students of **SY MCA, Semester III** have completed the Mini Project entitled:

> ### **“EduVault: Digital Locker and Academic Credential Verification Platform”**

under the guidance of **Mrs. Sukanya Akolkar** in partial fulfillment of the requirement for the award of the degree of **Master of Computer Applications** prescribed under **Dr. Vishwanath Karad MIT World Peace University, Pune**.

This project is the record of authentic work carried out by them during the academic year **2026-2027**.

<br/>

**Mrs. Sukanya Akolkar**  
*Internal Guide*  
Department of Computer Science and Applications  
MIT-WPU, Pune  

<br/>

| | |
| :--- | :--- |
| **Dr. P. S. Metkewar** | **Dr. Anuradha S. Kanade** |
| *Program Head - MCA* | *Program Director* |
| School of Computer Science and Engineering | School of Computer Science and Engineering |
| MIT-WPU, Pune | MIT-WPU, Pune |

---

# **Acknowledgement**

**Date:** 27 / 10 / 2026  
**Place:** Pune  

We wish to express our profound gratitude to all the individuals who supported us throughout the completion of our **Mini Project III (MCA40130)**. This report is a testament to their guidance, patience, and valuable resources.

We are deeply indebted to our esteemed project guide, **Mrs. Sukanya Akolkar**, for her invaluable mentorship, direction, and continuous encouragement. Her advice was crucial in defining the scope, architectural framework, and methodology of this project.

We extend our sincere thanks to the Head of the Program, **Dr. P. S. Metkewar**, and the Program Director, **Dr. Anuradha S. Kanade**, for providing the necessary computing facilities, academic framework, and an environment conducive to advanced project development and research.

Our appreciation also goes to all the **Faculty Members of the Department of Computer Science and Applications** for their comprehensive instruction, technical insights, and expertise, which equipped us with the knowledge foundational to this project.

We thank our fellow classmates for their constructive feedback, user testing, and stimulating discussions, which enriched our understanding and helped us refine our system.

| Name | PRN | Signature |
| :--- | :--- | :--- |
| **Akshay Darji** | 1272250311 | ___________________________ |
| **Priyesh Nandanwar** | 1272250279 | ___________________________ |

---

# **Declaration**

**Date:** 27 / 10 / 2026  
**Place:** Pune  

We, **Akshay Darji** and **Priyesh Nandanwar**, on behalf of our project team, hereby declare that this Mini Project report entitled:

> ### **“EduVault: Digital Locker and Academic Credential Verification Platform”**

is an authentic record of our own original work carried out under the supervision of **Mrs. Sukanya Akolkar**.

We further declare that the content of this report, including all system architecture, user interface design, backend API development, database design, cryptographic verification workflows, and testing, is original and has not been submitted previously for any other degree, diploma, or certificate at this or any other institution.

We take sole and full responsibility for any errors, omissions, or misrepresentations found within this report.

| Name | PRN | Signature |
| :--- | :--- | :--- |
| **Akshay Darji** | 1272250311 | ___________________________ |
| **Priyesh Nandanwar** | 1272250279 | ___________________________ |

---

# **TABLE OF CONTENTS**

- **1.1 EXISTING SYSTEM, PROPOSED SYSTEM AND NEED AND OBJECTIVE OF SYSTEM** (Page 4)
  - 1.1.1 Existing System (Page 4)
  - 1.1.2 Proposed System (Page 5)
  - 1.1.3 Comparative Analysis (Page 6)
  - 1.1.4 Need for the System (Page 6)
  - 1.1.5 Objectives of the System (Page 7)
- **1.2 SCOPE OF WORK** (Page 8)
  - 1.2.1 Functional Scope (Page 8)
  - 1.2.2 Technical Scope (Page 8)
  - 1.2.3 Out of Scope and Boundaries (Page 9)
- **1.3 OPERATING ENVIRONMENT – HARDWARE AND SOFTWARE** (Page 9)
  - 1.3.1 Hardware Requirements (Page 9)
  - 1.3.2 Software Requirements (Page 10)
- **1.4 DESCRIPTION OF TECHNOLOGY USED** (Page 11)
  - 1.4.1 Python 3.11 Runtime Environment (Page 11)
  - 1.4.2 Django 6.0 and Gunicorn WSGI Server (Page 11)
  - 1.4.3 Django REST Framework & SimpleJWT (Page 11)
  - 1.4.4 React 18 & Vite Tooling (Page 11)
  - 1.4.5 Tailwind CSS Utility-First Framework (Page 11)
  - 1.4.6 PostgreSQL 16 & Neon Serverless Persistence (Page 12)
  - 1.4.7 QRCode.react & Cryptographic Verification Engine (Page 12)
  - 1.4.8 WhiteNoise Static Serving & Cloud Deployment (Page 12)
- **2. PROPOSED SYSTEM** (Page 13)
  - **2.1 FEASIBILITY STUDY** (Page 14)
    - 2.1.1 Technical Feasibility (Page 14)
    - 2.1.2 Operational Feasibility (Page 14)
    - 2.1.3 Economic Feasibility (Page 14)
    - 2.1.4 Feasibility Conclusion (Page 14)
  - **2.2 USER REQUIREMENTS** (Page 15)
    - 2.2.1 User Classes and Actor Profiles (Page 15)
- **3. SYSTEM DESIGN** (Page 16)
  - 3.1 Object Diagram (Page 16)
  - 3.2 Class Diagram (Page 17)
  - 3.3 Use Case Diagram (Page 18)
  - 3.4 Sequence Diagram (Page 18)
  - 3.5 Activity Diagram (Page 19)
  - 3.6 Module Hierarchy Diagram (Page 20)
  - **3.7 USER INTERFACE DESIGN** (Page 20)
    - 3.7.1 UI Architecture Philosophy (Page 20)
    - 3.7.2 Navigation and State Diagram (Page 21)
    - 3.7.3 Screen Inventory (Page 22)
  - **3.8 TABLE SPECIFICATIONS** (Page 22)
    - 3.8.1 Database Architecture Rationale (Page 22)
    - 3.8.2 Entity-Relationship Diagram (Page 23)
    - 3.8.3 Data Dictionaries (Page 24)
- **4. INPUT AND OUTPUT SCREENS** (Page 26)
  - **4.1 INPUT SCREENS** (Page 26)
    - 4.1.1 Authentication & Login Screen (/login) (Page 26)
    - 4.1.2 Document Upload & Vault Locker (/certificates) (Page 27)
    - 4.1.3 Placement Talent Search & Eligibility Filter (/placement) (Page 29)
  - **4.2 OUTPUT SCREENS** (Page 30)
    - 4.2.1 Committee Verification Queue (/committee/documents) (Page 30)
    - 4.2.2 Public Candidate Verification Dossier (/student/:id) (Page 31)
    - 4.2.3 Interview Key Cryptographic QR Modal (/certificates) (Page 32)
    - 4.2.4 Dynamic Alumni Directory (/alumni) (Page 33)
    - 4.2.5 Direct Certificate Public Audit Screen (/verify/:id) (Page 35)
- **5. TEST PROCEDURES AND IMPLEMENTATION** (Page 37)
  - 5.1 IMPLEMENTATION STRATEGY (Page 37)
  - 5.2 TEST STRATEGY AND TESTING ENVIRONMENT (Page 37)
    - 5.2.1 Testing Levels (Page 37)
    - 5.2.2 Test Environment (Page 38)
  - 5.3 TEST CASES AND TEST RESULTS (Page 38)
  - **5.4 DEFECTS FOUND AND RESOLVED** (Page 40)
    - 5.4.1 Defect 1: Production Media File 404 Resolution via re_path & serve (Page 40)
    - 5.4.2 Defect 2: Monorepo Root Directory Build Configuration on Vercel (Page 41)
- **6. SAMPLE CODE** (Page 42)
  - 6.1 CUSTOM USER MODEL & ROLE GOVERNANCE (accounts/models.py) (Page 42)
  - 6.2 DOCUMENT VALIDATION & ENCRYPTION MODEL (documents/models.py) (Page 44)
  - 6.3 COMMITTEE VERIFICATION & REJECTION VIEW (documents/views.py) (Page 46)
  - 6.4 DYNAMIC API MEDIA RESOLVER (src/api/apiClient.js) (Page 47)
  - Explanation of Implementation Mechanics (Page 48)
- **7. LIMITATIONS** (Page 50)
  - 7.1 Render Free-Tier Spin-Down (Cold Starts) (Page 50)
  - 7.2 Ephemeral Container Storage vs. Persistent RDBMS (Page 50)
  - 7.3 Manual Committee Review Dependency (Page 50)
  - 7.4 Operational and Evaluation Limits (Page 51)
- **8. FUTURE SCOPE** (Page 52)
  - 8.1 Decentralized Blockchain Verification (Ethereum / Polygon) (Page 52)
  - 8.2 Persistent Object Storage (Amazon S3 / Cloudinary) (Page 52)
  - 8.3 AI-Powered OCR Credential Verification (Page 52)
  - 8.4 National Academic Depository (NAD) & DigiLocker API Integration (Page 52)
- **9. CONCLUSION** (Page 54)
  - 9.1 Technical Summary (Page 54)
  - 9.2 Academic and Professional Reflection (Page 54)
- **10. REFERENCES** (Page 55)

---

*(Please open and view the print-ready version with formal borders, running headers, running footers, and pixel-perfect A4 typography in [`docs/EduVault_Mini_Project_Report.html`](file:///d:/projects/eduvault%20antigravity/docs/EduVault_Mini_Project_Report.html)).*
