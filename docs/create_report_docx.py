import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, hex_color):
    shading_elm = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{hex_color}"/>')
    cell._tc.get_or_add_tcPr().append(shading_elm)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def style_table(table, header_bg="F0F4F8"):
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    for i, row in enumerate(table.rows):
        # Prevent row split across pages
        trPr = row._tr.get_or_add_trPr()
        trPr.append(OxmlElement('w:cantSplit'))
        
        if i == 0:
            trPr.append(OxmlElement('w:tblHeader'))
            for cell in row.cells:
                set_cell_background(cell, header_bg)
                for p in cell.paragraphs:
                    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
                    for r in p.runs:
                        r.font.bold = True
                        r.font.size = Pt(9.5)
                        r.font.name = "Times New Roman"
        else:
            for cell in row.cells:
                for p in cell.paragraphs:
                    for r in p.runs:
                        r.font.size = Pt(9.5)
                        r.font.name = "Times New Roman"

def add_header_footer(doc):
    for s in doc.sections:
        s.top_margin = Inches(0.8)
        s.bottom_margin = Inches(0.8)
        s.left_margin = Inches(0.9)
        s.right_margin = Inches(0.8)
        
        # Header
        header = s.header
        hp = header.paragraphs[0]
        hp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        hrun = hp.add_run("EduVault: Digital Locker | Mini Project Report")
        hrun.font.name = "Times New Roman"
        hrun.font.size = Pt(8.5)
        hrun.font.italic = True
        hrun.font.color.rgb = RGBColor(100, 100, 100)

def main():
    doc = docx.Document()
    add_header_footer(doc)

    # Styles
    normal_style = doc.styles['Normal']
    normal_style.font.name = 'Times New Roman'
    normal_style.font.size = Pt(11.5)
    normal_style.font.color.rgb = RGBColor(17, 17, 17)
    normal_style.paragraph_format.line_spacing = 1.25
    normal_style.paragraph_format.space_after = Pt(4)

    # Helper functions
    def p(text="", bold=False, italic=False, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_before=0, space_after=4, size=11.5):
        para = doc.add_paragraph()
        para.alignment = align
        para.paragraph_format.space_before = Pt(space_before)
        para.paragraph_format.space_after = Pt(space_after)
        if text:
            r = para.add_run(text)
            r.font.name = 'Times New Roman'
            r.font.size = Pt(size)
            r.font.bold = bold
            r.font.italic = italic
        return para

    def h1(text):
        return p(text, bold=True, align=WD_ALIGN_PARAGRAPH.LEFT, space_before=16, space_after=6, size=16)

    def h2(text):
        return p(text, bold=True, align=WD_ALIGN_PARAGRAPH.LEFT, space_before=12, space_after=4, size=13.5)

    def h3(text):
        return p(text, bold=True, align=WD_ALIGN_PARAGRAPH.LEFT, space_before=10, space_after=3, size=12)

    def caption(text):
        return p(text, bold=True, italic=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=6, space_after=4, size=9.5)

    def code_box(code_text):
        table = doc.add_table(rows=1, cols=1)
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        cell = table.cell(0, 0)
        set_cell_background(cell, "F8F9FA")
        set_cell_margins(cell, top=120, bottom=120, left=160, right=160)
        p_cell = cell.paragraphs[0]
        p_cell.paragraph_format.line_spacing = 1.15
        p_cell.paragraph_format.space_after = Pt(0)
        r = p_cell.add_run(code_text)
        r.font.name = "Courier New"
        r.font.size = Pt(8.5)
        p("", space_before=0, space_after=4)

    # ========================================================
    # PAGE 1: FACE PAGE
    # ========================================================
    p("Mini Project Report", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=20, space_after=4, size=22)
    p("On", italic=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=0, space_after=6, size=14)
    p("“EduVault: Digital Locker and Academic Credential Verification Platform”", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=4, space_after=18, size=17)
    
    p("By", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=14, space_after=4, size=12)
    p("Akshay Darji — PRN: 1272250311", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=2, space_after=2, size=13)
    p("Priyesh Nandanwar — PRN: 1272250279", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=2, space_after=18, size=13)

    p("For", align=WD_ALIGN_PARAGRAPH.CENTER, space_before=12, space_after=2, size=12)
    p("MCA40130 Mini Project", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=2, space_after=2, size=15)
    p("SY MCA (Semester III)", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=2, space_after=2, size=13)
    p("Academic Year: 2026-2027", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=2, space_after=18, size=13)

    p("Under The Guidance Of", align=WD_ALIGN_PARAGRAPH.CENTER, space_before=14, space_after=2, size=12)
    p("Mrs. Sukanya Akolkar", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=2, space_after=22, size=14)

    p("Submitted To", align=WD_ALIGN_PARAGRAPH.CENTER, space_before=10, space_after=2, size=11)
    p("Dr. Vishwanath Karad\nMIT WORLD PEACE UNIVERSITY, PUNE", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=2, space_after=6, size=14)
    p("In partial fulfillment of the requirement for the award of Degree of\nMaster of Computer Applications (MCA)", align=WD_ALIGN_PARAGRAPH.CENTER, space_before=2, space_after=10, size=11.5)
    p("Submitted Through\nSchool of Computer Science and Engineering\nDepartment of Computer Science and Applications\nMIT-WPU, Pune - 411038", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=4, space_after=0, size=11)

    doc.add_page_break()

    # ========================================================
    # PAGE 2: CERTIFICATE
    # ========================================================
    p("Dr. Vishwanath Karad MIT WORLD PEACE UNIVERSITY, PUNE", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=0, space_after=2, size=13)
    p("School of Computer Science and Engineering", align=WD_ALIGN_PARAGRAPH.CENTER, space_before=0, space_after=2, size=11.5)
    p("Department of Computer Science and Applications", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=0, space_after=18, size=12)
    
    p("Certificate", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=10, space_after=25, size=24)

    cert_p = p(
        "This is to certify that, Akshay Darji (PRN: 1272250311) and Priyesh Nandanwar (PRN: 1272250279), students of "
        "SY MCA, Semester III have completed Mini Project entitled “EduVault: Digital Locker and Academic Credential "
        "Verification Platform” under guidance of Mrs. Sukanya Akolkar in partial fulfilment of requirement for the award "
        "of Master of Computer Applications prescribed under Dr. Vishwanath Karad MIT World Peace University, Pune.\n\n"
        "This project is the record of authentic work carried out by them during the academic year 2026-2027.",
        align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_before=10, space_after=35, size=12
    )
    cert_p.paragraph_format.line_spacing = 1.4

    # Signatures
    p("Mrs. Sukanya Akolkar\nInternal Guide\nDepartment of Computer Science and Applications\nMIT-WPU, Pune", bold=True, align=WD_ALIGN_PARAGRAPH.RIGHT, space_before=30, space_after=40, size=11.5)

    sign_t = doc.add_table(rows=1, cols=2)
    sign_t.alignment = WD_TABLE_ALIGNMENT.CENTER
    c1, c2 = sign_t.cell(0, 0), sign_t.cell(0, 1)
    p1 = c1.paragraphs[0]
    p1.add_run("Dr. P. S. Metkewar\n").bold = True
    p1.add_run("Program Head - MCA\nSchool of Computer Science & Engg.\nMIT-WPU, Pune")
    p2 = c2.paragraphs[0]
    p2.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p2.add_run("Dr. Anuradha S. Kanade\n").bold = True
    p2.add_run("Program Director\nSchool of Computer Science & Engg.\nMIT-WPU, Pune")

    doc.add_page_break()

    # ========================================================
    # PAGE 3: ACKNOWLEDGEMENT
    # ========================================================
    p("Date: 27 / 10 / 2026                                                                                     Place: Pune", bold=True, align=WD_ALIGN_PARAGRAPH.LEFT, space_before=0, space_after=15, size=11)
    p("Acknowledgement", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=10, space_after=20, size=22)

    p("I wish to express our profound gratitude to all the individuals who supported us throughout the completion of our Mini Project III. This report is a testament to their guidance, patience, and resources.")
    p("We are deeply indebted to our esteemed project guide, Mrs. Sukanya Akolkar, for their invaluable mentorship, direction, and encouragement. Their advice was crucial in defining the scope and methodology of this project.")
    p("We extend our sincere thanks to the Head of the Program, Dr. P. S. Metkewar, and the Program Director, Dr. Anuradha S. Kanade, for providing the necessary facilities, academic framework, and environment conducive to advanced project work and research.")
    p("Our appreciation also goes to all the Faculty Members of the Department of Computer Science and Applications for their comprehensive instruction and expertise, which equipped us with the knowledge foundational to this project.")
    p("We thank our fellow Project Group Members, for their unwavering dedication, collaborative spirit, and commitment to shared goals. This project is a product of our collective effort.")
    p("Finally, we are grateful to our Classmates for their constructive feedback and discussions, which enriched our understanding and helped us refine our approach.")

    p("", space_before=10, space_after=5)
    ack_t = doc.add_table(rows=4, cols=3)
    ack_t.rows[0].cells[0].paragraphs[0].text = "Field"
    ack_t.rows[0].cells[1].paragraphs[0].text = "Member 1"
    ack_t.rows[0].cells[2].paragraphs[0].text = "Member 2"
    ack_t.rows[1].cells[0].paragraphs[0].text = "Name:"
    ack_t.rows[1].cells[1].paragraphs[0].text = "Akshay Darji"
    ack_t.rows[1].cells[2].paragraphs[0].text = "Priyesh Nandanwar"
    ack_t.rows[2].cells[0].paragraphs[0].text = "PRN:"
    ack_t.rows[2].cells[1].paragraphs[0].text = "1272250311"
    ack_t.rows[2].cells[2].paragraphs[0].text = "1272250279"
    ack_t.rows[3].cells[0].paragraphs[0].text = "Signature:"
    ack_t.rows[3].cells[1].paragraphs[0].text = ""
    ack_t.rows[3].cells[2].paragraphs[0].text = ""
    style_table(ack_t)

    doc.add_page_break()

    # ========================================================
    # PAGE 4: DECLARATION
    # ========================================================
    p("Date: 27 / 10 / 2026                                                                                     Place: Pune", bold=True, align=WD_ALIGN_PARAGRAPH.LEFT, space_before=0, space_after=15, size=11)
    p("Declaration", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=10, space_after=20, size=22)

    p("We, Akshay Darji and Priyesh Nandanwar, on behalf of our team hereby declare that this Mini Project report entitled “EduVault: Digital Locker and Academic Credential Verification Platform” is an authentic record of our own work carried out under the supervision of Mrs. Sukanya Akolkar.")
    p("We further declare that the content of this report, including all design, coding, testing, and analysis, is original and has not been submitted previously for any other degree or diploma at this or any other institution.")
    p("We take sole and full responsibility for any errors, omissions, or misrepresentations found within this report.")

    p("", space_before=15, space_after=5)
    dec_t = doc.add_table(rows=4, cols=3)
    dec_t.rows[0].cells[0].paragraphs[0].text = "Field"
    dec_t.rows[0].cells[1].paragraphs[0].text = "Member 1"
    dec_t.rows[0].cells[2].paragraphs[0].text = "Member 2"
    dec_t.rows[1].cells[0].paragraphs[0].text = "Name:"
    dec_t.rows[1].cells[1].paragraphs[0].text = "Akshay Darji"
    dec_t.rows[1].cells[2].paragraphs[0].text = "Priyesh Nandanwar"
    dec_t.rows[2].cells[0].paragraphs[0].text = "PRN:"
    dec_t.rows[2].cells[1].paragraphs[0].text = "1272250311"
    dec_t.rows[2].cells[2].paragraphs[0].text = "1272250279"
    dec_t.rows[3].cells[0].paragraphs[0].text = "Signature:"
    dec_t.rows[3].cells[1].paragraphs[0].text = ""
    dec_t.rows[3].cells[2].paragraphs[0].text = ""
    style_table(dec_t)

    doc.add_page_break()

    # ========================================================
    # TABLE OF CONTENTS
    # ========================================================
    p("TABLE OF CONTENTS", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=5, space_after=15, size=18)

    toc_items = [
        ("1.1 EXISTING SYSTEM, PROPOSED SYSTEM AND NEED AND OBJECTIVE OF SYSTEM", "4"),
        ("     1.1.1 Existing System", "4"),
        ("     1.1.2 Proposed System", "5"),
        ("     1.1.3 Comparative Analysis", "6"),
        ("     1.1.4 Need for the System", "6"),
        ("     1.1.5 Objectives of the System", "7"),
        ("1.2 SCOPE OF WORK", "8"),
        ("     1.2.1 Functional Scope", "8"),
        ("     1.2.2 Technical Scope", "8"),
        ("     1.2.3 Out of Scope and Boundaries", "9"),
        ("1.3 OPERATING ENVIRONMENT – HARDWARE AND SOFTWARE", "9"),
        ("     1.3.1 Hardware Requirements", "9"),
        ("     1.3.2 Software Requirements", "10"),
        ("1.4 DESCRIPTION OF TECHNOLOGY USED", "11"),
        ("     1.4.1 Python 3.11 Runtime Environment", "11"),
        ("     1.4.2 Django 6.0 and Gunicorn WSGI Server", "11"),
        ("     1.4.3 Django REST Framework & SimpleJWT", "11"),
        ("     1.4.4 React 18 & Vite Tooling", "11"),
        ("     1.4.5 Tailwind CSS Utility-First Framework", "11"),
        ("     1.4.6 PostgreSQL 16 & Neon Serverless Persistence", "12"),
        ("     1.4.7 QRCode.react & Cryptographic Verification Engine", "12"),
        ("     1.4.8 WhiteNoise Static Serving & Cloud Deployment", "12"),
        ("2. PROPOSED SYSTEM", "13"),
        ("2.1 FEASIBILITY STUDY", "14"),
        ("     2.1.1 Technical Feasibility", "14"),
        ("     2.1.2 Operational Feasibility", "14"),
        ("     2.1.3 Economic Feasibility", "14"),
        ("     2.1.4 Feasibility Conclusion", "14"),
        ("2.2 USER REQUIREMENTS", "15"),
        ("     2.2.1 User Classes and Actor Profiles", "15"),
        ("3. SYSTEM DESIGN", "16"),
        ("     3.1 Object Diagram", "16"),
        ("     3.2 Class Diagram", "17"),
        ("     3.3 Use Case Diagram", "18"),
        ("     3.4 Sequence Diagram", "18"),
        ("     3.5 Activity Diagram", "19"),
        ("     3.6 Module Hierarchy Diagram", "20"),
        ("     3.7 USER INTERFACE DESIGN", "20"),
        ("     3.8 TABLE SPECIFICATIONS", "22"),
        ("4. INPUT AND OUTPUT SCREENS", "26"),
        ("     4.1 INPUT SCREENS", "26"),
        ("     4.2 OUTPUT SCREENS", "30"),
        ("5. TEST PROCEDURES AND IMPLEMENTATION", "37"),
        ("     5.1 IMPLEMENTATION STRATEGY", "37"),
        ("     5.2 TEST STRATEGY AND TESTING ENVIRONMENT", "37"),
        ("     5.3 TEST CASES AND TEST RESULTS", "38"),
        ("     5.4 DEFECTS FOUND AND RESOLVED", "40"),
        ("6. SAMPLE CODE", "42"),
        ("7. LIMITATIONS", "50"),
        ("8. FUTURE SCOPE", "52"),
        ("9. CONCLUSION", "54"),
        ("10. REFERENCES", "55"),
    ]

    for title, pg in toc_items:
        tp = doc.add_paragraph()
        tp.paragraph_format.line_spacing = 1.15
        tp.paragraph_format.space_after = Pt(2.5)
        # Left text
        r1 = tp.add_run(title)
        r1.font.name = "Times New Roman"
        r1.font.size = Pt(10.5)
        if title.strip().startswith(("1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "9.", "10.")):
            r1.font.bold = True
        
        # Dots filler
        dots_count = max(5, 75 - len(title))
        r_dots = tp.add_run(" " + "." * dots_count + " ")
        r_dots.font.color.rgb = RGBColor(120, 120, 120)
        
        # Page
        r2 = tp.add_run(pg)
        r2.font.bold = True
        r2.font.size = Pt(10.5)

    doc.add_page_break()

    # ========================================================
    # 1. INTRODUCTION
    # ========================================================
    h1("1. INTRODUCTION")
    p("Academic credential management, verification, and placement screening across higher educational institutions continue to face severe inefficiencies due to legacy paper-bound workflows and unauthenticated digital assets. Higher education institutions handle tens of thousands of degrees, marksheets, certificates, and internship letters annually. When students apply for placement recruitment or higher education abroad, background screening agencies and corporate HR departments spend weeks attempting to verify the validity of photocopies and unverified PDFs. EduVault addresses this systemic vulnerability by serving as a secure, decentralized digital locker and cryptographic verification platform.")
    p("This chapter examines the existing institutional procedures and their inherent vulnerabilities, details the architecture of the proposed EduVault platform, defines the system scope, specifies the hardware and software operating environment, and provides a technical justification for every chosen technology in the stack.")

    h2("1.1 EXISTING SYSTEM, PROPOSED SYSTEM AND NEED AND OBJECTIVE OF SYSTEM")
    h3("1.1.1 Existing System")
    p("The contemporary academic ecosystem operates across fragmented administrative silos. Existing workflows fall into four primary mechanisms:")
    p("(a) Physical Photocopies and Attested Transcripts. Students obtain paper marksheets, physically visit institutional offices for authorized rubber stamps and signatures, and submit paper bundles during campus drives. Paper certificates degrade, are easily lost or damaged, and incur ongoing storage and courier costs.")
    p("(b) Unauthenticated Scans and Vulnerability to Alteration. Students frequently share electronic PDF scans via email. However, non-cryptographic PDF documents can be altered using modern editing tools to forge marks, alter names, or generate counterfeit graduation certificates. Recruiters cannot determine authenticity from visual inspection alone.")
    p("(c) Disconnected Placement Operations. Campus placement cells (Training & Placement Offices) spend days manually compiling, verifying, and formatting candidate spreadsheets (CGPA, active backlogs, achievements, and project links). These spreadsheets are static and prone to student self-reporting errors.")
    p("(d) Static and Inaccessible Alumni Directories. Institutions maintain stagnant Excel databases of graduated alumni. Students looking for career mentorship or job referrals have no real-time platform to discover alumni by employer, role, or mentorship availability.")

    h3("1.1.2 Proposed System")
    p("EduVault is a role-governed, cloud-native Digital Locker and Academic Credential Verification Platform. The system decouples presentation, business logic, and database persistence into an asynchronous client-server architecture supporting four distinct institutional roles:")
    p("1. Student Vault: Provides students with a digital locker to upload marksheets, certificates, internships, and project portfolios. Features an instant cryptographic Interview Key that compiles approved credentials into a verified QR code for mobile scanning.")
    p("2. Academic Verification Committee: A dedicated institutional validation queue where faculty reviewers inspect original uploads via an in-app viewer, approve genuine records, or reject invalid submissions with actionable feedback.")
    p("3. Campus Placement & Corporate Relations Portal: A recruiter-facing portal offering real-time candidate search, department filtering, and CGPA thresholds (e.g. >= 9.0, >= 8.0) directly linked to verified dossiers.")
    p("4. Dynamic Alumni Network: An interactive directory where graduated alumni can update their current employer, designation, location, and toggle a public mentorship availability badge.")
    p("5. Public Verification Gateway: Open, secure endpoints allowing corporate interviewers to scan QR codes or open unique links (/student/:id or /verify/:verification_id) to view authenticated dossiers on mobile or desktop without login credentials.")

    code_box("""+----------------------------------------------------------------------------------------------------+
|                                    EduVault Architecture Flow                                      |
+----------------------------------------------------------------------------------------------------+
| [Student] --------> (Uploads PDF <= 5MB) -------> [Pending Queue] -------> [Academic Committee]   |
|                                                                                    |               |
|                                                                                    v               |
| [Recruiter] <------ (Mobile QR Scan) <---------- [Verified Dossier] <------ (Approves Credential) |
|      |                                                    ^                                        |
|      +------------> [Placement Portal] -------------------+                                        |
+----------------------------------------------------------------------------------------------------+""")
    caption("Figure 1.1: High-level architectural workflow of the EduVault platform.")

    h3("1.1.3 Comparative Analysis")
    caption("Table 1.1: Comparison of existing credential verification methods with EduVault.")
    comp_t = doc.add_table(rows=7, cols=5)
    headers = ["Sr.", "Parameter", "Manual Paper Records", "Generic Cloud Storage (Drive)", "EduVault Platform"]
    for j, h in enumerate(headers):
        comp_t.rows[0].cells[j].paragraphs[0].text = h
    rows_data = [
        ("1", "Credential Authenticity", "Vulnerable to physical forgery and fake stamps.", "Unverified self-uploaded files; no authority seal.", "Cryptographically locked; verified exclusively by university committee."),
        ("2", "Verification Speed", "1 to 3 weeks via postal mail or administrative visits.", "Immediate access to file, but validity remains unverified.", "Instantaneous (< 1 second) via dynamic QR code camera scan."),
        ("3", "Role Governance", "Manual file access registers in registrar office.", "Binary sharing link (view/edit); no institutional roles.", "Strict 4-tier RBAC (Student, Alumni, Committee, Placement)."),
        ("4", "Placement Integration", "Manual Excel compilation by faculty coordinators.", "Students provide resume links in forms; errors common.", "Live filterable talent pool with verified CGPA thresholds."),
        ("5", "Audit Trail & Rejection", "Informal verbal or paper return; no digital record.", "None.", "Immutable timestamps, reviewer identity, and feedback logs."),
        ("6", "Mobile Usability", "Requires carrying heavy physical folders.", "Requires installing drive apps and folder navigation.", "Universal camera scan opens clean, zero-app mobile dossier."),
    ]
    for i, r_data in enumerate(rows_data):
        for j, val in enumerate(r_data):
            comp_t.rows[i+1].cells[j].paragraphs[0].text = val
    style_table(comp_t)

    h3("1.1.4 Need for the System")
    p("Eradicating Academic Fraud: The proliferation of fraudulent degrees in corporate recruitment places severe legal and financial liabilities on hiring organizations. EduVault provides an authoritative, unalterable record directly certified by academic institutions.")
    p("Streamlining Placement Drives: Placement teams face immense time pressure during campus seasons. EduVault enables recruiters to evaluate authenticated student resumes, project repositories, and verified marks in a unified window.")
    p("Alumni-Student Engagement: Colleges struggle to maintain active alumni networks. EduVault provides students with direct access to mentors working in industry.")

    h3("1.1.5 Objectives of the System")
    caption("Table 1.2: Engineering objectives and verification criteria.")
    obj_t = doc.add_table(rows=9, cols=3)
    obj_t.rows[0].cells[0].paragraphs[0].text = "ID"
    obj_t.rows[0].cells[1].paragraphs[0].text = "Objective"
    obj_t.rows[0].cells[2].paragraphs[0].text = "Verification Criterion"
    objs = [
        ("O1", "Implement Role-Based Access Control (RBAC) across four user classes: Student, Alumni, Committee, and Placement Team.", "All endpoints enforce permissions; unauthorized access returns HTTP 403 Forbidden with automatic frontend bounce-back."),
        ("O2", "Develop a secure digital locker supporting multi-category document upload (PDF, JPG, PNG <= 5 MB) with MIME validation.", "Uploads rejected if file exceeds 5 MB or uses illegal extensions; valid files saved with status PENDING."),
        ("O3", "Build an interactive Academic Committee Queue with in-app PDF preview, approval execution, and rejection feedback.", "Committee reviews documents; approval sets status VERIFIED with timestamp; rejection dispatches feedback to student."),
        ("O4", "Generate dynamic, cryptographic Interview Key QR codes linking physical interview sessions to live student dossiers.", "Scanning QR code via mobile camera loads candidate profile (/student/:id) with verified badges and credentials."),
        ("O5", "Deliver a Placement Talent Pool portal with real-time CGPA threshold filtering and verified credential filters.", "Placement officers filter candidate pool by department and CGPA (>= 9.0, >= 8.0, >= 7.5); table renders matching candidates."),
        ("O6", "Build a live database-backed Alumni Network with search, department filtering, and mentorship availability toggles.", "Alumni directory fetches real records; live search debounces input; profile links open verified alumni dossiers."),
        ("O7", "Ensure production media routing so uploaded certificates can be viewed directly from cloud web services.", "'View File' button resolves full backend API media URL; browser displays PDF/image directly in a new tab."),
        ("O8", "Deploy full-stack architecture to 100% free production cloud tiers (Vercel, Render, and Neon Serverless PostgreSQL).", "Application accessible globally over HTTPS with zero operational software hosting costs."),
    ]
    for i, (oid, obj, crit) in enumerate(objs):
        obj_t.rows[i+1].cells[0].paragraphs[0].text = oid
        obj_t.rows[i+1].cells[1].paragraphs[0].text = obj
        obj_t.rows[i+1].cells[2].paragraphs[0].text = crit
    style_table(obj_t)

    # 1.2 SCOPE OF WORK
    h2("1.2 SCOPE OF WORK")
    h3("1.2.1 Functional Scope")
    p("User Authentication & Profile Lifecycle: Registration and login with JWT access and refresh tokens. Dedicated profile management for students (PRN, CGPA, Batch, Skills, Bio) and alumni (Company, Designation, Location, Mentorship toggle).")
    p("Document Vault Management: Secure uploading, category assignment (Certificate, Marksheet, Internship, Project, Achievement, Other), status tracking (Pending, Verified, Rejected), and document deletion safeguards for pending items.")
    p("Committee Verification Pipeline: Filterable review queue, in-app modal document previewer supporting PDFs and image formats, single-click approval, and granular rejection feedback dispatch.")
    p("Campus Placement Talent Engine: Aggregate metrics (Total Candidates, Drive Eligible, Avg CGPA), multi-parameter search, CGPA threshold pills, and candidate profile drawers.")
    p("Dynamic Alumni Directory: Searchable alumni cards with company badges, designation tags, and mentorship contact points.")
    p("Public Verification Gateway: Open, unauthenticated dossier view (/student/:id) and direct certificate verification page (/verify/:id) for corporate interviewers.")

    h3("1.2.2 Technical Scope")
    p("Backend Architecture: Python 3.11 with Django 6.0 and Django REST Framework, utilizing Gunicorn as the production WSGI application server.")
    p("Database Persistence: PostgreSQL 16 hosted on Neon Serverless Cloud, managed via Django ORM with full ACID compliance and foreign key cascade constraints.")
    p("Frontend Client: React 18 SPA built with Vite bundler, utilizing Tailwind CSS for utility-first styling and Lucide React icons.")
    p("Cryptographic Generation: UUIDv4 tokens generated per document, compiled into client-side rendered QR codes using qrcode.react and QRServer API.")
    p("Cloud Infrastructure: Vercel for frontend SPA edge delivery; Render for backend container hosting; Neon for serverless PostgreSQL database.")

    h3("1.2.3 Out of Scope and Boundaries")
    p("1. Automated OCR Document Verification: The system does not automatically parse scanned text using AI/OCR. Verification relies on authorized human committee inspection.")
    p("2. Payment Gateway Integration: Fee collection for official transcript issuance is excluded from this release.")
    p("3. Native Mobile App Store Packages: The system is delivered as a fully responsive web application and does not include compiled native iOS (.ipa) or Android (.apk) binaries.")
    p("4. Direct University ERP Integration: The system does not execute automated bi-directional synchronization with external legacy university ERP databases.")

    # 1.3 OPERATING ENVIRONMENT
    h2("1.3 OPERATING ENVIRONMENT – HARDWARE AND SOFTWARE")
    h3("1.3.1 Hardware Requirements")
    caption("Table 1.3: Hardware requirements by deployment role.")
    hw_t = doc.add_table(rows=11, cols=4)
    hw_headers = ["Role", "Component", "Minimum Specification", "Recommended Specification"]
    for j, h in enumerate(hw_headers):
        hw_t.rows[0].cells[j].paragraphs[0].text = h
    hw_data = [
        ("Development Workstation", "Processor", "Dual-Core 64-bit CPU, 2.0 GHz (x86-64)", "Quad-Core Intel Core i5/i7 (11th Gen+) or AMD Ryzen 5/7"),
        ("Development Workstation", "RAM", "8 GB", "16 GB DDR4/DDR5"),
        ("Development Workstation", "Storage", "256 GB SSD (5 GB free space)", "512 GB NVMe SSD"),
        ("Development Workstation", "Network", "10 Mbps broadband connection", "50 Mbps+ Wi-Fi / Ethernet connection"),
        ("Cloud Production Server", "Compute", "0.5 vCPU (Render Free Tier)", "1 vCPU shared, 512 MB RAM container"),
        ("Cloud Production Server", "Database Compute", "0.25 vCPU Serverless Neon compute", "Autoscaling Neon compute with 0.5 GB storage"),
        ("Cloud Production Server", "Network Bandwidth", "100 Mbps cloud interface", "Global Edge CDN with SSL termination"),
        ("End-User Client Device", "Processor", "Dual-Core 1.5 GHz mobile or desktop CPU", "Modern smartphone (Octa-Core) or laptop"),
        ("End-User Client Device", "Display & Input", "Screen resolution 360 x 640 px (mobile)", "Full HD 1920 x 1080 px display, camera for QR scanning"),
        ("End-User Client Device", "Network", "3G / 4G cellular data (2 Mbps)", "4G / 5G / Broadband Wi-Fi (10 Mbps+)"),
    ]
    for i, r in enumerate(hw_data):
        for j, val in enumerate(r):
            hw_t.rows[i+1].cells[j].paragraphs[0].text = val
    style_table(hw_t)

    h3("1.3.2 Software Requirements")
    caption("Table 1.4: Software requirements.")
    sw_t = doc.add_table(rows=14, cols=4)
    sw_headers = ["Category", "Software Tool", "Version / Specification", "Purpose in Project"]
    for j, h in enumerate(sw_headers):
        sw_t.rows[0].cells[j].paragraphs[0].text = h
    sw_data = [
        ("Operating System", "Windows 11 / Ubuntu Linux", "64-bit OS", "Primary development, debugging, and testing environment"),
        ("Backend Language", "Python", "3.11.x", "Backend application logic, model definitions, and validation"),
        ("Web Framework", "Django", "6.0.x", "Core web framework, ORM, CSRF, and security middleware"),
        ("API Framework", "Django REST Framework", "3.16.x", "RESTful API routing, serializers, and multipart form parsing"),
        ("Authentication", "SimpleJWT", "5.3.x", "JSON Web Token (JWT) issue, validation, and token refresh"),
        ("WSGI Server", "Gunicorn", "25.x", "Production WSGI HTTP server running on Render"),
        ("Static Server", "WhiteNoise", "6.12.x", "Serving compiled Django static assets with compression"),
        ("Frontend Runtime", "Node.js & npm", "Node v20.x, npm 10.x", "Frontend package management and tooling execution"),
        ("Frontend Library", "React.js", "18.x", "Declarative component architecture and UI reactivity"),
        ("Frontend Bundler", "Vite", "8.x", "Ultra-fast development server and production Rollup bundler"),
        ("Styling Framework", "Tailwind CSS", "3.4.x", "Utility-first CSS styling and responsive grid layouts"),
        ("Database Server", "PostgreSQL", "16.x (Neon Serverless)", "Persistent cloud relational database storage"),
        ("Version Control", "Git & GitHub", "Git 2.40+", "Source code versioning and automated CI/CD deployments"),
    ]
    for i, r in enumerate(sw_data):
        for j, val in enumerate(r):
            sw_t.rows[i+1].cells[j].paragraphs[0].text = val
    style_table(sw_t)

    code_box("""+----------------------------------------------------------------------------------------------------+
|                                    Three-Tier Architectural Stack                                  |
+----------------------------------------------------------------------------------------------------+
|  CLIENT TIER:        React 18 SPA + Vite + Tailwind CSS + Lucide React + QRCode.react (Vercel Edge)|
|                                               | HTTPS / REST JSON                                  |
|  APPLICATION TIER:   Django 6.0 REST Framework + SimpleJWT + Gunicorn + WhiteNoise (Render Linux)   |
|                                               | SQL (psycopg2-binary)                              |
|  DATABASE TIER:      PostgreSQL 16 (Neon Serverless Cloud Database Engine)                         |
+----------------------------------------------------------------------------------------------------+""")
    caption("Figure 1.2: Technology stack of EduVault organized by architectural tier.")

    # 1.4 TECH DETAILS
    h2("1.4 DESCRIPTION OF TECHNOLOGY USED")
    h3("1.4.1 Python 3.11 Runtime Environment")
    p("Python 3.11 serves as the primary backend programming language for EduVault. It introduces substantial performance enhancements over prior versions through the Specialized Adaptive Interpreter (PEP 659), delivering up to 25% faster execution. Python provides clean, readable syntax, robust type-hinting, native datetime handling, and an extensive ecosystem of enterprise web packages.")

    h3("1.4.2 Django 6.0 and Gunicorn WSGI Server")
    p("Django 6.0 is a battle-tested, high-level Python web framework designed on the Model-View-Controller (MVC) architectural pattern. Django provides an integrated Object-Relational Mapper (ORM) that prevents SQL injection attacks through parameterized queries. It automatically manages database schema migrations, enforces session security, and includes cross-site scripting (XSS) filters. In production on Render, Gunicorn (Green Unicorn) acts as a pre-fork worker WSGI server capable of handling multiple concurrent requests efficiently.")

    h3("1.4.3 Django REST Framework & SimpleJWT")
    p("Django REST Framework empowers the backend with flexible, serializable RESTful API endpoints. DRF provides model serializers that translate complex ORM querysets into clean JSON payloads and validate incoming multipart form data. Authentication is handled using rest_framework_simplejwt, which issues cryptographically signed JSON Web Tokens (RFC 7519). The architecture separates short-lived access tokens (15-minute lifespan) from long-lived refresh tokens (7-day lifespan), ensuring secure, stateless session management.")

    h3("1.4.4 React 18 & Vite Tooling")
    p("The user interface is built as a Single-Page Application (SPA) using React 18 and Vite. React's virtual DOM and reactive hooks (useState, useEffect, useMemo, useRef) enable instant UI updates without whole-page refreshes. Vite replaces legacy Webpack bundlers, utilizing native browser ES modules (ESM) to provide sub-second hot module replacement (HMR) during development and lightning-fast Rollup builds for production deployment.")

    h3("1.4.5 Tailwind CSS Utility-First Framework")
    p("Tailwind CSS is an industry-leading utility-first CSS framework. Rather than writing arbitrary custom CSS classes, interface components compose utility classes directly in JSX. Tailwind's modern color palette, spacing scale, and responsive prefixes (sm:, md:, lg:, xl:) ensure consistent design across desktop monitors, laptops, tablets, and smartphones.")

    h3("1.4.6 PostgreSQL 16 & Neon Serverless Persistence")
    p("PostgreSQL 16 is an advanced open-source Object-Relational Database Management System (RDBMS). It provides full ACID (Atomicity, Consistency, Isolation, Durability) transactional compliance, ensuring that operations such as user registration and document status transitions never leave the database in an inconsistent state. EduVault uses Neon Serverless PostgreSQL, an autoscaling cloud database service with zero maintenance overhead, automated failover, and high concurrent query throughput.")

    h3("1.4.7 QRCode.react & Cryptographic Verification Engine")
    p("To enable frictionless physical-to-digital credential inspection during in-person interviews, EduVault incorporates client-side QR generation. Each student profile and verified credential generates an immutable public URL encoded into a high-density matrix barcode. Using qrcode.react and the QRServer API, the system renders vector SVG and PNG barcodes on screen. An interviewer simply points any smartphone camera at the student's screen to load the official verified dossier on their mobile browser.")

    h3("1.4.8 WhiteNoise Static Serving & Cloud Deployment")
    p("In standard Django deployments, serving static assets (CSS, JS, images) requires configuring a separate web server like Nginx. EduVault utilizes WhiteNoise, a lightweight Python middleware that integrates directly into the WSGI pipeline. WhiteNoise manages static asset serving with gzip and Brotli compression, generating unique content hashes for immutable caching headers. The application is deployed across global edge networks via Vercel (frontend) and Render (backend).")

    # ========================================================
    # 2. PROPOSED SYSTEM
    # ========================================================
    h1("2. PROPOSED SYSTEM")
    p("EduVault is designed as a decoupled, service-oriented platform organized into four tiers. Each tier carries a distinct responsibility and communicates with its peers exclusively through authenticated REST contracts:")
    p("• Decoupling: The React client knows only the REST contract and receives JSON responses. The Django backend operates independently of client view presentation. Either tier can be refactored or updated without breaking the other.")
    p("• Asynchronous Execution: Document uploading, status verification, and search filtering execute asynchronously via REST APIs, keeping the client interface responsive.")
    p("• Strict Role Isolation: Role guards evaluate permissions on every endpoint. Students cannot inspect committee review queues; committee members cannot manipulate placement thresholds.")

    h2("2.1 FEASIBILITY STUDY")
    h3("2.1.1 Technical Feasibility")
    caption("Table 2.1: Technical feasibility assessment.")
    tf_t = doc.add_table(rows=5, cols=2)
    tf_t.rows[0].cells[0].paragraphs[0].text = "Factor"
    tf_t.rows[0].cells[1].paragraphs[0].text = "Assessment"
    tf_data = [
        ("Asynchronous REST Architecture", "Django REST Framework with Axios on the React client provides non-blocking HTTP interactions. File uploads and queries execute smoothly without thread starvation."),
        ("Zero-Dependency Frontend", "React SPA runs purely in standard web browsers. Users require no proprietary software, browser plugins, or native desktop installations."),
        ("MIME & File Size Control", "Strict backend validators restrict uploaded files to PDF, JPG, and PNG formats with a 5 MB ceiling, protecting against server disk exhaustion and malicious scripts."),
        ("Cross-Device Portability", "Responsive Tailwind CSS ensures seamless rendering on mobile screens. QR code engine generates standards-compliant barcodes readable by all smartphone cameras."),
    ]
    for i, (f, a) in enumerate(tf_data):
        tf_t.rows[i+1].cells[0].paragraphs[0].text = f
        tf_t.rows[i+1].cells[1].paragraphs[0].text = a
    style_table(tf_t)

    h3("2.1.2 Operational Feasibility")
    caption("Table 2.2: Operational feasibility assessment.")
    of_t = doc.add_table(rows=4, cols=2)
    of_t.rows[0].cells[0].paragraphs[0].text = "Factor"
    of_t.rows[0].cells[1].paragraphs[0].text = "Assessment"
    of_data = [
        ("Administrative Efficiency", "Replaces physical stamping of marksheets with a single-click verification portal. Verification turnaround decreases from 2 weeks to under 30 seconds."),
        ("User Adoption", "Intuitive, clean UI with clear visual badges (Pending, Verified, Rejected). Requires zero specialized training for faculty or students."),
        ("Recruiter Convenience", "Interviewers view pre-verified academic data by scanning candidate QR codes, eliminating paperwork and manual verification delays."),
    ]
    for i, (f, a) in enumerate(of_data):
        of_t.rows[i+1].cells[0].paragraphs[0].text = f
        of_t.rows[i+1].cells[1].paragraphs[0].text = a
    style_table(of_t)

    h3("2.1.3 Economic Feasibility")
    p("EduVault incurs zero software licensing costs by using open-source frameworks. The production architecture runs on 100% free cloud tiers (Vercel, Render, and Neon), eliminating server procurement and maintenance expenses while saving colleges substantial paper archiving and verification labor costs.")

    h3("2.1.4 Feasibility Conclusion")
    p("The system is technically viable, operationally beneficial, and economically zero-cost, confirming full feasibility for institutional deployment.")

    h2("2.2 USER REQUIREMENTS")
    h3("2.2.1 User Classes and Actor Profiles")
    caption("Table 2.3: User classes and privilege profiles.")
    uc_t = doc.add_table(rows=5, cols=5)
    uc_headers = ["Attribute", "Student", "Alumni", "Committee Member", "Placement Officer"]
    for j, h in enumerate(uc_headers):
        uc_t.rows[0].cells[j].paragraphs[0].text = h
    uc_data = [
        ("Description", "Enrolled student managing personal academic credentials", "Graduated student providing industry mentoring", "Faculty member tasked with certifying credentials", "Officer managing campus placement recruitment"),
        ("Key Responsibilities", "Upload marksheets, maintain project portfolio, share Interview Key QR", "Maintain professional profile, update company and role, mentor students", "Inspect pending uploads, verify genuine records, reject invalid files", "Filter talent pool by CGPA and department, review verified dossiers"),
        ("Primary Interfaces", "Student Dashboard, Digital Locker, Certificates, Vault Key", "Alumni Network, Profile Editor, Public Dossier", "Committee Dashboard, Review Queue, In-App PDF Viewer", "Placement Dashboard, Candidate Filter, Talent Pool Drawer"),
        ("Authentication", "Email + Password (JWT, role: STUDENT)", "Email + Password (JWT, role: ALUMNI)", "Email + Password (JWT, role: COMMITTEE)", "Email + Password (JWT, role: PLACEMENT)"),
    ]
    for i, r in enumerate(uc_data):
        for j, val in enumerate(r):
            uc_t.rows[i+1].cells[j].paragraphs[0].text = val
    style_table(uc_t)

    # ========================================================
    # 3. SYSTEM DESIGN
    # ========================================================
    h1("3. SYSTEM DESIGN")
    p("This section presents the architectural and design models of EduVault: Object Diagram, Class Diagram, Use Case Diagram, Sequence Diagram, Activity Diagram, Module Hierarchy Diagram, UI Design, and Table Specifications.")

    h2("3.1 Object Diagram")
    p("Figure 3.1 depicts a runtime snapshot of instantiated objects during an active verification session:")
    code_box("""+-----------------------------------+               +--------------------------------------+
|        akshayUser: User           |  owns         |    akshayProfile: StudentProfile     |
| id: 14                            |-------------->| id: 7                                |
| email: "ak12@gmail.com"           |               | prn: "1272250311"                    |
| role: "STUDENT"                   |               | department: "Computer Science"       |
| first_name: "Akshay"              |               | cgpa: 9.20                           |
+-----------------------------------+               +--------------------------------------+
                  |
                  | uploads
                  v
+-----------------------------------+               +--------------------------------------+
|        degreeDoc: Document        |<--------------|        committeeUser: User           |
| id: 42                            |   verifies    | id: 3                                |
| title: "Degree Certificate"       |               | email: "committee@mitwpu.edu.in"     |
| category: "CERTIFICATE"           |               | role: "COMMITTEE"                    |
| status: "VERIFIED"                |               +--------------------------------------+
| verification_id: "f47ac10b..."    |
+-----------------------------------+""")
    caption("Figure 3.1: Object diagram of runtime entities during academic verification.")

    h2("3.2 Class Diagram")
    code_box("""+-----------------------------------------+                 +-----------------------------------------+
|                  User                   | 1             1 |              StudentProfile             |
+-----------------------------------------+---------------->+-----------------------------------------+
| - id: int                               |                 | - id: int                               |
| - email: EmailField                     |                 | - user_id: int                          |
| - role: CharField (Enum)                |                 | - prn: CharField                        |
| - college: CharField                    |                 | - roll_number: CharField                |
| - department: CharField                 |                 | - cgpa: DecimalField                    |
| - is_active: boolean                    |                 | - batch: CharField                      |
| - date_joined: DateTime                 |                 | - skills: TextField                     |
+-----------------------------------------+                 | - current_company: CharField            |
| + check_password(raw_password): bool    |                 | - current_role: CharField               |
| + get_full_name(): string               |                 | - is_mentor_available: boolean          |
+-----------------------------------------+                 +-----------------------------------------+
                     | 1
                     |
                     | *
                     v
+-----------------------------------------+
|                Document                 |
+-----------------------------------------+
| - id: int                               |
| - verification_id: UUIDField            |
| - title: CharField                      |
| - category: CharField (Enum)            |
| - file: FileField                       |
| - status: CharField (PENDING, VERIFIED) |
| - rejection_reason: TextField           |
| - verified_at: DateTime                 |
| - created_at: DateTime                  |
+-----------------------------------------+
| + clean(): void                         |
+-----------------------------------------+""")
    caption("Figure 3.2: Class diagram of the database models and entities.")

    h2("3.3 Use Case Diagram")
    code_box("""       (Student)                 (Committee)               (Placement Officer)           (Recruiter)
           |                          |                             |                         |
    +------+------+            +------+------+               +------+------+                  |
    |             |            |             |               |             |                  |
    v             v            v             v               v             v                  v
[Upload Doc] [Share QR]   [Review Queue] [Verify Doc]    [Filter CGPA] [View Dossier]    [Scan QR Key]""")
    caption("Figure 3.3: Use case interaction model across actors.")

    h2("3.4 Sequence Diagram")
    code_box("""Student              React Frontend            Django REST API           PostgreSQL           Recruiter
   |                        |                         |                      |                    |
   |-- 1. Selects File ---->|                         |                      |                    |
   |-- 2. Click "Upload" -->|                         |                      |                    |
   |                        |-- 3. POST multipart --->|                      |                    |
   |                        |      (with JWT)         |-- 4. INSERT record ->|                    |
   |                        |                         |      (status:PENDING)|                    |
   |                        |                         |<- 5. Success 201 ----|                    |
   |                        |<- 6. Render Pending ----|                      |                    |
   |                                                                                              |
   |               Committee Member Reviews Document                                              |
   |                        |-- 7. GET pending list ->|                      |                    |
   |                        |<- 8. Return queue ------|                      |                    |
   |                        |-- 9. POST verify ------>|                      |                    |
   |                        |                         |-- 10. UPDATE status->|                    |
   |                        |<- 11. Status: VERIFIED -|       to 'VERIFIED'  |                    |
   |                                                                                              |
   |               Recruiter Scans Interview Key QR                                               |
   |                        |                                                                     |
   |                        |<==================== 12. Scans QR Code =============================|
   |                        |-- 13. GET /public/student/14 ----------------->|                    |
   |                        |<- 14. Return Authenticated Student Dossier ----|                    |
   |                        |==================== 15. Displays Verified Profile ================>|""")
    caption("Figure 3.4: Sequence diagram of document upload, verification, and QR lookup.")

    h2("3.5 Activity Diagram")
    code_box("""                    ( Start: Student Selects File )
                                   |
                                   v
                    [ Validate Size <= 5MB & Extension ]
                                   |
                    +--------------+--------------+
                    |                             |
             [ Invalid ]                     [ Valid ]
                    |                             |
                    v                             v
           ( Display Error )              [ Upload to API ]
                    |                             |
                    +<------- (Re-upload) <-------+
                                                  |
                                                  v
                                     [ Save Status: PENDING ]
                                                  |
                                                  v
                                     [ Committee Reviews File ]
                                                  |
                                   +--------------+--------------+
                                   |                             |
                              [ Approve ]                   [ Reject ]
                                   |                             |
                                   v                             v
                       [ Set Status: VERIFIED ]      [ Set Status: REJECTED ]
                       [ Record Timestamp ]          [ Save Feedback Reason ]
                                   |                             |
                                   v                             v
                       [ Generate QR Key ]           [ Notify Student in UI ]
                                   |                             |
                                ( End ) <------------------------+""")
    caption("Figure 3.5: Activity diagram of the credential submission and review lifecycle.")

    h2("3.6 Module Hierarchy Diagram")
    code_box("""                                     +---------------------------+
                                     |      EduVault System      |
                                     +---------------------------+
                                                   |
         +-----------------+-----------------------+-----------------------+-----------------+
         |                 |                       |                       |                 |
         v                 v                       v                       v                 v
+-----------------+ +-----------------+ +---------------------+ +---------------------+ +-----------------+
| Authentication  | | Student Vault   | | Academic Committee  | | Placement Relations | | Alumni Network  |
| - JWT Tokens    | | - Doc Upload    | | - Pending Queue     | | - Candidate Filter  | | - Search Engine |
| - Role RBAC     | | - Portfolio     | | - In-App PDF View   | | - CGPA Thresholds   | | - Mentor Toggle |
| - Profile Init  | | - QR Generator  | | - Verification Exec | | - Talent Analytics  | | - Dossier Links |
+-----------------+ +-----------------+ +---------------------+ +---------------------+ +-----------------+""")
    caption("Figure 3.6: Top-down modular decomposition of EduVault platform.")

    h2("3.7 USER INTERFACE DESIGN")
    h3("3.7.1 UI Architecture Philosophy")
    p("The interface is architected around a single persistent shell featuring a collapsible navigation sidebar and responsive content canvas. The design language utilizes a curated palette with vibrant indigo accents, slate neutral backgrounds, high-contrast typography, and intuitive micro-interactions.")

    h3("3.7.2 Navigation and State Diagram")
    code_box("""             [ /login ] -------- (Valid Credentials) --------> [ Role Evaluation ]
                 ^                                                      |
                 |                                      +---------------+---------------+
                 |                                      |               |               |
                 |                                      v               v               v
                 |                                 [ STUDENT ]    [ COMMITTEE ]   [ PLACEMENT ]
                 |                                      |               |               |
                 |                                      v               v               v
                 +--- (Logout / 401 Unauthorized) --- [ Vault ]     [ Queue ]      [ Talent ]""")
    caption("Figure 3.7: Navigation state diagram and role routing.")

    h3("3.7.3 Screen Inventory")
    caption("Table 3.2: Complete screen inventory and route mapping.")
    si_t = doc.add_table(rows=9, cols=4)
    si_headers = ["Screen Name", "Route Path", "Target Role", "Key UI Components"]
    for j, h in enumerate(si_headers):
        si_t.rows[0].cells[j].paragraphs[0].text = h
    si_data = [
        ("Login & Register", "/login, /register", "Public / All", "Email field, password input with show toggle, role selector cards, submit button."),
        ("Student Dashboard", "/dashboard", "Student", "KPI metric cards (Total Docs, Verified, Pending), recent activity feed, quick action buttons."),
        ("Certificates Vault", "/certificates", "Student", "Drag-and-drop file uploader, category dropdown, document grid, 'View File', 'Share / QR'."),
        ("Committee Queue", "/committee/documents", "Committee", "Search input, status tabs (Pending, Verified, Rejected), in-app PDF preview modal, verify/reject actions."),
        ("Placement Talent Pool", "/placement", "Placement Team", "Total student counter, eligible counter, department dropdown, CGPA threshold filter pills (>=8.0, >=7.5)."),
        ("Alumni Directory", "/alumni", "All Users", "Search bar, company pills, mentorship availability filter, alumni profile cards."),
        ("Public Candidate Dossier", "/student/:id", "Public / Recruiter", "Student bio, verified CGPA badge, institutional seal, approved documents list with view links."),
        ("Certificate Verification", "/verify/:id", "Public / Recruiter", "Cryptographic verification badge, issue date, issuer name, tamper-evident document details."),
    ]
    for i, r in enumerate(si_data):
        for j, val in enumerate(r):
            si_t.rows[i+1].cells[j].paragraphs[0].text = val
    style_table(si_t)

    # 3.8 TABLE SPECIFICATIONS
    h2("3.8 TABLE SPECIFICATIONS")
    h3("3.8.1 Database Architecture Rationale")
    p("EduVault uses PostgreSQL 16 hosted on Neon Serverless Cloud. The schema is normalized to Third Normal Form (3NF) to eliminate data redundancy. Foreign key constraints with ON DELETE CASCADE ensure referential integrity.")

    h3("3.8.2 Data Dictionaries")
    caption("Table 3.3: Data dictionary for accounts_user.")
    u_t = doc.add_table(rows=11, cols=5)
    dict_headers = ["Field Name", "Data Type", "Nullable", "Key / Constraint", "Description"]
    for j, h in enumerate(dict_headers):
        u_t.rows[0].cells[j].paragraphs[0].text = h
    u_data = [
        ("id", "BigSerial", "No", "Primary Key", "Surrogate identifier of user account"),
        ("email", "VarChar(254)", "No", "Unique, Indexed", "Institutional or personal login email"),
        ("password", "VarChar(128)", "No", "None", "PBKDF2-SHA256 password hash"),
        ("first_name", "VarChar(150)", "No", "None", "User's first name"),
        ("last_name", "VarChar(150)", "No", "None", "User's last name"),
        ("role", "VarChar(20)", "No", "Default: STUDENT", "Enum: STUDENT, ALUMNI, COMMITTEE, PLACEMENT"),
        ("college", "VarChar(255)", "No", "Default: MIT-WPU", "Associated university / institute name"),
        ("department", "VarChar(100)", "No", "None", "Enrolled academic department"),
        ("is_active", "Boolean", "No", "Default: True", "Account active flag"),
        ("date_joined", "DateTime", "No", "Default: NOW", "Timestamp of user registration"),
    ]
    for i, r in enumerate(u_data):
        for j, val in enumerate(r):
            u_t.rows[i+1].cells[j].paragraphs[0].text = val
    style_table(u_t)

    caption("Table 3.4: Data dictionary for students_studentprofile.")
    sp_t = doc.add_table(rows=10, cols=5)
    for j, h in enumerate(dict_headers):
        sp_t.rows[0].cells[j].paragraphs[0].text = h
    sp_data = [
        ("id", "BigSerial", "No", "Primary Key", "Profile record ID"),
        ("user_id", "BigInt", "No", "FK -> accounts_user.id (1:1)", "Reference to owner user"),
        ("prn", "VarChar(50)", "Yes", "Indexed", "Permanent Registration Number"),
        ("cgpa", "Decimal(4,2)", "Yes", "None", "Cumulative Grade Point Average"),
        ("batch", "VarChar(50)", "Yes", "None", "Academic graduation batch (e.g. 2024-2026)"),
        ("skills", "Text", "Yes", "None", "Comma-separated technical competencies"),
        ("current_company", "VarChar(150)", "Yes", "None", "Employer name (Alumni specific)"),
        ("current_role", "VarChar(150)", "Yes", "None", "Job designation / title"),
        ("is_mentor_available", "Boolean", "No", "Default: False", "Willingness to mentor current students"),
    ]
    for i, r in enumerate(sp_data):
        for j, val in enumerate(r):
            sp_t.rows[i+1].cells[j].paragraphs[0].text = val
    style_table(sp_t)

    caption("Table 3.5: Data dictionary for documents_document.")
    doc_t = doc.add_table(rows=10, cols=5)
    for j, h in enumerate(dict_headers):
        doc_t.rows[0].cells[j].paragraphs[0].text = h
    doc_data = [
        ("id", "BigSerial", "No", "Primary Key", "Internal document identifier"),
        ("verification_id", "UUID", "No", "Unique, Indexed", "Cryptographic UUID for public verification lookup"),
        ("user_id", "BigInt", "No", "FK -> accounts_user.id", "Owner student reference"),
        ("title", "VarChar(200)", "No", "None", "Document title (e.g., Semester III Marksheet)"),
        ("category", "VarChar(20)", "No", "Enum", "CERTIFICATE, MARKSHEET, INTERNSHIP, PROJECT"),
        ("file", "VarChar(100)", "No", "None", "Relative path in media/documents directory"),
        ("status", "VarChar(20)", "No", "Default: PENDING", "Enum: PENDING, VERIFIED, REJECTED"),
        ("rejection_reason", "Text", "Yes", "None", "Feedback provided by committee on rejection"),
        ("verified_at", "DateTime", "Yes", "None", "Timestamp of committee verification approval"),
    ]
    for i, r in enumerate(doc_data):
        for j, val in enumerate(r):
            doc_t.rows[i+1].cells[j].paragraphs[0].text = val
    style_table(doc_t)

    # ========================================================
    # 4. INPUT AND OUTPUT SCREENS
    # ========================================================
    h1("4. INPUT AND OUTPUT SCREENS")
    h2("4.1 INPUT SCREENS")
    h3("4.1.1 Authentication & Login Screen (/login)")
    code_box("""+----------------------------------------------------------------------------------------------------+
|                                      EduVault: Secure Access Portal                                |
+----------------------------------------------------------------------------------------------------+
|                                  +------------------------------------+                            |
|                                  |  [Lock Icon]  EduVault Sign In     |                            |
|                                  |  Institutional Credential Vault    |                            |
|                                  | ---------------------------------- |                            |
|                                  |  Email Address                     |                            |
|                                  |  +-------------------------------+ |                            |
|                                  |  | ak12@gmail.com                | |                            |
|                                  |  +-------------------------------+ |                            |
|                                  |  Password                          |                            |
|                                  |  +-------------------------+-----+ |                            |
|                                  |  | ****************        |show | |                            |
|                                  |  +-------------------------+-----+ |                            |
|                                  |  +-------------------------------+ |                            |
|                                  |  |        SIGN IN TO VAULT       | |                            |
|                                  |  +-------------------------------+ |                            |
|                                  |  Need an account? Register Here    |                            |
|                                  +------------------------------------+                            |
+----------------------------------------------------------------------------------------------------+""")

    h3("4.1.2 Document Upload & Vault Locker (/certificates)")
    code_box("""+----------------------------------------------------------------------------------------------------+
| [Sidebar] | DIGITAL CREDENTIAL VAULT                                                               |
| Dashboard | +------------------------------------------------------------------------------------+ |
| Locker    | | Upload Document                                                                    | |
| Certs     | | Title: [ Sem III Marksheet ]   Category: [ MARKSHEET v ]                           | |
| Key [QR]  | | +--------------------------------------------------------------------------------+ | |
| Profile   | | | [Upload Cloud] Drag & drop PDF, JPG, or PNG (Max 5MB)                          | | |
|           | | +--------------------------------------------------------------------------------+ | |
|           | | [ UPLOAD AND SUBMIT TO COMMITTEE ]                                                 | |
|           | +------------------------------------------------------------------------------------+ |
|           | ACTIVE LOCKER CREDENTIALS                                                              |
|           | +------------------------------------------------------------------------------------+ |
|           | | Sem III Marksheet     [MARKSHEET]    [Status: VERIFIED]   [View File]  [Share / QR]| |
|           | | Python Masterclass    [CERTIFICATE]  [Status: PENDING]    [View File]  [Delete]    | |
|           | +------------------------------------------------------------------------------------+ |
+----------------------------------------------------------------------------------------------------+""")

    h3("4.1.3 Placement Talent Search & Eligibility Filter (/placement)")
    code_box("""+----------------------------------------------------------------------------------------------------+
| PLACEMENT & CORPORATE RELATIONS TALENT ENGINE                                                      |
| [Total Pool: 142]   [Drive Eligible: 98]   [Avg CGPA: 8.42]   [Verified Credentials: 89%]          |
|----------------------------------------------------------------------------------------------------|
| Search: [ Akshay...         ]   Department: [ Computer Science v ]   Min CGPA: [ >= 8.0 v ]         |
| +---------------------+--------------+--------+---------------+--------------------+-------------+ |
| | Candidate Name      | PRN          | CGPA   | Department    | Credentials Status | Dossier     | |
| +---------------------+--------------+--------+---------------+--------------------+-------------+ |
| | Akshay Darji        | 1272250311   | 9.20   | Comp Science  | [5 VERIFIED]       | [Open View] | |
| | Priyesh Nandanwar   | 1272250279   | 8.85   | Comp Science  | [4 VERIFIED]       | [Open View] | |
| +---------------------+--------------+--------+---------------+--------------------+-------------+ |
+----------------------------------------------------------------------------------------------------+""")

    h2("4.2 OUTPUT SCREENS")
    h3("4.2.1 Committee Verification Queue (/committee/documents)")
    code_box("""+----------------------------------------------------------------------------------------------------+
| ACADEMIC COMMITTEE VERIFICATION QUEUE                                    [Filter: PENDING v]       |
| +---------------------+-----------------------+-------------+-------------+----------------------+ |
| | Student Name        | Document Title        | Category    | Upload Date | Actions              | |
| +---------------------+-----------------------+-------------+-------------+----------------------+ |
| | Akshay Darji        | Sem III Marksheet     | MARKSHEET   | 27 Oct 2026 | [Preview] [Verify] [X| |
| | Priyesh Nandanwar   | Cloud Computing Cert  | CERTIFICATE | 27 Oct 2026 | [Preview] [Verify] [X| |
| +---------------------+-----------------------+-------------+-------------+----------------------+ |
+----------------------------------------------------------------------------------------------------+""")

    h3("4.2.2 Public Candidate Verification Dossier (/student/:id)")
    code_box("""+----------------------------------------------------------------------------------------------------+
| [MIT-WPU SEAL]  OFFICIAL INSTITUTIONAL VERIFICATION DOSSIER                                       |
|                                                                                                    |
| Candidate: Akshay Darji              PRN: 1272250311             Verified CGPA: [ 9.20 / 10.0 ]    |
| Department: Computer Science         Batch: 2024-2026            Status: INSTITUTIONALLY VERIFIED  |
| -------------------------------------------------------------------------------------------------- |
| VERIFIED CREDENTIALS:                                                                              |
|  [v] Degree Transcript - Verified by Committee (27 Oct 2026)                  [View Official File] |
|  [v] AWS Certified Cloud Practitioner - Verified (15 Aug 2026)                [View Official File] |
| -------------------------------------------------------------------------------------------------- |
| TECHNICAL SHOWCASE:                                                                                |
|  - EduVault: Decentralized Digital Locker Platform (Django, React, Vite, Postgres)                 |
+----------------------------------------------------------------------------------------------------+""")

    # ========================================================
    # 5. TEST PROCEDURES AND IMPLEMENTATION
    # ========================================================
    h1("5. TEST PROCEDURES AND IMPLEMENTATION")
    h2("5.1 IMPLEMENTATION STRATEGY")
    p("The system was built following a layered, test-driven approach. The data layer (PostgreSQL models and migrations) was implemented and verified first, followed by the API serializers and business logic layer, and finally the reactive React frontend.")

    h2("5.2 TEST STRATEGY AND TESTING ENVIRONMENT")
    h3("5.2.1 Testing Levels")
    caption("Table 5.1: Testing levels and scope.")
    tlevels = doc.add_table(rows=5, cols=4)
    tl_headers = ["Level", "Target Module", "Technique", "Associated Test Cases"]
    for j, h in enumerate(tl_headers):
        tlevels.rows[0].cells[j].paragraphs[0].text = h
    tl_data = [
        ("Unit Testing", "Model validators, password hashing, file size limits", "Direct function execution with boundary inputs", "TC-01, TC-05, TC-06, TC-07"),
        ("Integration Testing", "Django REST API endpoints, JWT authentication", "Automated HTTP client tests against test database", "TC-02, TC-03, TC-04, TC-08"),
        ("Workflow Testing", "Committee approval & rejection lifecycle", "Simulated multi-role user state transitions", "TC-09, TC-10, TC-11"),
        ("Cross-Device Testing", "Physical smartphone camera QR Code scanning", "Mobile Safari & Chrome QR camera resolution", "TC-12, TC-13"),
    ]
    for i, r in enumerate(tl_data):
        for j, val in enumerate(r):
            tlevels.rows[i+1].cells[j].paragraphs[0].text = val
    style_table(tlevels)

    h3("5.2.2 Test Environment")
    caption("Table 5.2: Hardware and software test environment.")
    te_t = doc.add_table(rows=7, cols=2)
    te_t.rows[0].cells[0].paragraphs[0].text = "Item"
    te_t.rows[0].cells[1].paragraphs[0].text = "Specification"
    te_data = [
        ("Operating Systems", "Windows 11 64-bit & Ubuntu Linux 22.04 LTS"),
        ("Host Processor & Memory", "Intel Core i5-1135G7 @ 2.40 GHz, 16 GB DDR4 RAM"),
        ("Backend Runtimes", "Python 3.11, Django 6.0, Django REST Framework 3.16"),
        ("Frontend Runtimes", "Node.js v20.x, React 18, Vite 8"),
        ("Database Engine", "PostgreSQL 16 (Neon Serverless Cloud)"),
        ("Mobile Test Devices", "Samsung Galaxy S22 (Android 14), Apple iPhone 14 (iOS 17)"),
    ]
    for i, (item, spec) in enumerate(te_data):
        te_t.rows[i+1].cells[0].paragraphs[0].text = item
        te_t.rows[i+1].cells[1].paragraphs[0].text = spec
    style_table(te_t)

    h2("5.3 TEST CASES AND TEST RESULTS")
    caption("Table 5.3: Test case matrix.")
    tc_table = doc.add_table(rows=14, cols=7)
    tc_headers = ["Test ID", "Module", "Test Scenario", "Test Input / Condition", "Expected Result", "Actual Result", "Status"]
    for j, h in enumerate(tc_headers):
        tc_table.rows[0].cells[j].paragraphs[0].text = h
    tc_data = [
        ("TC-01", "Auth", "Valid User Registration", "Name: 'Akshay Darji', Email: 'ak12@gmail.com', Role: STUDENT", "User created, password hashed with PBKDF2-SHA256, HTTP 201", "User record created, HTTP 201 Created", "PASS"),
        ("TC-02", "Auth", "Duplicate Email Registration", "Submit registration with email already in database", "HTTP 400 Bad Request: 'user with email already exists'", "Returned HTTP 400 with duplicate email validation", "PASS"),
        ("TC-03", "Auth", "Valid JWT Login", "Valid email and correct password", "HTTP 200 with signed Access and Refresh JWT tokens", "Received tokens; user stored in localStorage", "PASS"),
        ("TC-04", "Auth", "Invalid Password Rejection", "Valid email with incorrect password", "HTTP 401 Unauthorized: 'No active account found'", "Returned HTTP 401 Unauthorized", "PASS"),
        ("TC-05", "Documents", "Valid PDF Document Upload", "File: marksheet.pdf (1.8 MB), Category: MARKSHEET", "HTTP 201 Created; status set to PENDING", "File saved, status PENDING, UUID generated", "PASS"),
        ("TC-06", "Documents", "Oversized Upload Rejection", "File: portfolio.pdf (8.4 MB > 5 MB limit)", "HTTP 400 Bad Request: 'File size must not exceed 5 MB'", "Rejected by validator with HTTP 400", "PASS"),
        ("TC-07", "Documents", "Disallowed File Extension", "File: script.exe or archive.zip", "HTTP 400: 'Only PDF, JPG, JPEG, and PNG files allowed'", "Rejected with format validation message", "PASS"),
        ("TC-08", "RBAC", "Student Role Access Guard", "Student JWT requesting /api/committee/documents/", "HTTP 403 Forbidden; client redirects to /dashboard", "HTTP 403 Forbidden enforced by IsCommittee", "PASS"),
        ("TC-09", "Committee", "Document Verification", "Committee user clicks 'Verify' on Document ID: 42", "Status changes to VERIFIED; verified_at recorded", "Document marked VERIFIED in database", "PASS"),
        ("TC-10", "Committee", "Document Rejection", "Committee inputs reason: 'Blurry scan; seal missing'", "Status changes to REJECTED; reason stored", "Status REJECTED; reason shown on student UI", "PASS"),
        ("TC-11", "Placement", "Candidate CGPA Filtering", "Filter: CGPA >= 8.0, Department: Computer Science", "Renders only candidates with CGPA >= 8.0", "Table correctly filtered to eligible candidates", "PASS"),
        ("TC-12", "QR Key", "Mobile QR Scan Lookup", "Smartphone scans QR code from student certificates page", "Mobile browser opens /student/:id dossier", "Dossier loaded cleanly on phone screen", "PASS"),
        ("TC-13", "Production", "Media File Viewing Link", "User clicks 'View File' on cloud deployment", "Browser resolves Render media URL and opens file", "Document opens directly in new browser tab", "PASS"),
    ]
    for i, r in enumerate(tc_data):
        for j, val in enumerate(r):
            tc_table.rows[i+1].cells[j].paragraphs[0].text = val
    style_table(tc_table)

    h2("5.4 DEFECTS FOUND AND RESOLVED")
    h3("5.4.1 Defect 1: Production Media File 404 Resolution via re_path & serve")
    caption("Table 5.4: Defect record for DEF-01.")
    d1_t = doc.add_table(rows=5, cols=2)
    d1_t.rows[0].cells[0].paragraphs[0].text = "Field"
    d1_t.rows[0].cells[1].paragraphs[0].text = "Detail"
    d1_data = [
        ("ID", "DEF-01"),
        ("Component", "config/urls.py, Django Media Routing"),
        ("Severity", "High. Uploaded student certificates returned 404 Not Found on cloud deployment."),
        ("Status", "Resolved."),
    ]
    for i, (f, d) in enumerate(d1_data):
        d1_t.rows[i+1].cells[0].paragraphs[0].text = f
        d1_t.rows[i+1].cells[1].paragraphs[0].text = d
    style_table(d1_t)

    p("Symptom: When students uploaded certificates and clicked 'View File', the browser returned '404: Not Found - The requested resource was not found on this server.'")
    p("Root Cause: By default, Django serves media files only when settings.DEBUG = True using urlpatterns += static(settings.MEDIA_URL). On the production Render deployment, DEBUG was set to False, causing Django to disable the media routes entirely.")
    p("Resolution: Updated config/urls.py to explicitly route media requests through django.views.static.serve using re_path across all environments:")
    code_box("""from django.urls import re_path
from django.views.static import serve
from django.conf import settings

# Explicitly enable media file serving in production
urlpatterns += [
    re_path(r"^media/(?P<path>.*)$", serve, {"document_root": settings.MEDIA_ROOT}),
]""")

    h3("5.4.2 Defect 2: Monorepo Root Directory Build Configuration on Vercel")
    caption("Table 5.5: Defect record for DEF-02.")
    d2_t = doc.add_table(rows=5, cols=2)
    d2_t.rows[0].cells[0].paragraphs[0].text = "Field"
    d2_t.rows[0].cells[1].paragraphs[0].text = "Detail"
    d2_data = [
        ("ID", "DEF-02"),
        ("Component", "Vercel Deployment Pipeline, Root Directory Resolution"),
        ("Severity", "High. Vercel deployment failed on first build."),
        ("Status", "Resolved."),
    ]
    for i, (f, d) in enumerate(d2_data):
        d2_t.rows[i+1].cells[0].paragraphs[0].text = f
        d2_t.rows[i+1].cells[1].paragraphs[0].text = d
    style_table(d2_t)

    p("Symptom: The Vercel build failed with: 'No package.json found in root directory.'")
    p("Root Cause: The repository is structured as a monorepo containing both eduvault-frontend/ and eduvault-backned/. Vercel's default working directory was set to ./ rather than the frontend folder.")
    p("Resolution: Created root-level package.json and vercel.json files that instruct Vercel to install dependencies and execute the build within eduvault-frontend/, pointing the output directory directly to eduvault-frontend/dist.")

    # ========================================================
    # 6. SAMPLE CODE
    # ========================================================
    h1("6. SAMPLE CODE")
    h2("6.1 CUSTOM USER MODEL & ROLE GOVERNANCE (accounts/models.py)")
    code_box("""from django.contrib.auth.models import AbstractUser, BaseUserManager
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
    REQUIRED_FIELDS = ["first_name", "last_name"]""")

    h2("6.2 DOCUMENT VALIDATION & ENCRYPTION MODEL (documents/models.py)")
    code_box("""import uuid
from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError

def validate_document_file(value):
    max_size = 5 * 1024 * 1024  # 5 MB
    if value.size > max_size:
        raise ValidationError("File size must not exceed 5 MB.")
    allowed_extensions = [".pdf", ".jpg", ".jpeg", ".png"]
    if not any(value.name.lower().endswith(ext) for ext in allowed_extensions):
        raise ValidationError("Only PDF, JPG, JPEG, and PNG files are allowed.")

class Document(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="documents")
    verification_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=20)
    file = models.FileField(upload_to="documents/", validators=[validate_document_file])
    status = models.CharField(max_length=20, default="PENDING")
    rejection_reason = models.TextField(blank=True, null=True)
    verified_at = models.DateTimeField(blank=True, null=True)""")

    h2("6.3 COMMITTEE VERIFICATION & REJECTION VIEW (documents/views.py)")
    code_box("""from django.utils import timezone
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
            return Response({"error": "Document not found."}, status=status.HTTP_404_NOT_FOUND)

        document.status = "VERIFIED"
        document.verified_at = timezone.now()
        document.rejection_reason = None
        document.save()
        return Response({"message": "Document verified successfully.", "verified_at": document.verified_at}, status=status.HTTP_200_OK)""")

    h2("6.4 DYNAMIC API MEDIA RESOLVER (src/api/apiClient.js)")
    code_box("""export const API_BASE_URL =
  typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace(/\/$/, "")
    : "";

export const getMediaUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  const cleanPath = url.startsWith("/") ? url : `/${url}`;
  return `${API_BASE_URL}${cleanPath}`;
};""")

    h3("Explanation of Implementation Mechanics")
    p("Role-Based Permission Enforcement: Permissions are checked at the REST API view level using custom DRF permission classes (IsCommittee, IsPlacementOrCommittee) which inspect the authenticated JWT claims. If an unauthorized role attempts access, Django immediately terminates the request with HTTP 403 Forbidden without database query overhead.")
    p("Stateless JWT Token Lifecycle: User credentials are exchanged for HMAC-SHA256 signed tokens. The client stores tokens in browser memory and attaches the bearer token to the HTTP Authorization header for every subsequent API request.")

    # ========================================================
    # 7. LIMITATIONS
    # ========================================================
    h1("7. LIMITATIONS")
    h2("7.1 Render Free-Tier Spin-Down (Cold Starts)")
    caption("Table 7.1: Operational limitation on free cloud hosting.")
    lim_t = doc.add_table(rows=4, cols=2)
    lim_t.rows[0].cells[0].paragraphs[0].text = "Aspect"
    lim_t.rows[0].cells[1].paragraphs[0].text = "Detail"
    lim_data = [
        ("Cause", "Render's free tier spins down idle web service containers after 15 minutes of inactivity to preserve compute resources."),
        ("Symptom", "The initial HTTP request sent after dormancy requires 30 to 50 seconds while the container initializes and launches Gunicorn."),
        ("Mitigation", "In a commercial production environment, upgrading to Render Starter ($7/mo) or AWS Elastic Beanstalk provides 100% active uptime."),
    ]
    for i, (a, d) in enumerate(lim_data):
        lim_t.rows[i+1].cells[0].paragraphs[0].text = a
        lim_t.rows[i+1].cells[1].paragraphs[0].text = d
    style_table(lim_t)

    h2("7.2 Ephemeral Container Storage vs. Persistent RDBMS")
    p("On Render free instances, the local container filesystem is ephemeral: while the PostgreSQL database on Neon is permanent, locally stored media files in media/ reset if the container restarts. In enterprise production, media storage must be delegated to dedicated object stores (e.g. Amazon S3 or Cloudinary).")

    h2("7.3 Manual Committee Review Dependency")
    p("Credential verification currently relies on authorized human faculty inspection. Automated AI-based OCR cross-referencing against university records is not yet incorporated.")

    h2("7.4 Operational and Evaluation Limits")
    p("The system requires an active internet connection to execute authentication and verification. An offline Progressive Web App (PWA) cache mode is not currently enabled.")

    # ========================================================
    # 8. FUTURE SCOPE
    # ========================================================
    h1("8. FUTURE SCOPE")
    caption("Table 8.1: Roadmap and future engineering enhancements.")
    fut_t = doc.add_table(rows=5, cols=4)
    fut_headers = ["Feature Area", "Proposal", "Integration Mechanism", "Value to Institution"]
    for j, h in enumerate(fut_headers):
        fut_t.rows[0].cells[j].paragraphs[0].text = h
    fut_data = [
        ("Decentralized Blockchain Verification", "Anchor SHA-256 cryptographic hashes of approved certificates onto Polygon or Ethereum smart contracts.", "Web3.py library communicating with an institutional smart contract during committee verification.", "Guarantees permanent, tamper-proof, decentralized credential verification independent of hosting uptime."),
        ("Persistent Object Storage", "Delegate media uploads to Amazon S3 buckets or Cloudinary CDN.", "Django-storages package configured with S3 bucket credentials and pre-signed access URLs.", "Eliminates container disk storage limits and provides high-speed media delivery across global CDNs."),
        ("AI-Powered Automated OCR", "Integrate Google Cloud Vision / Tesseract OCR to extract student PRN, names, and grades automatically.", "Background processing task cross-referencing extracted OCR tokens against university registrar databases.", "Automates 80% of routine marksheets, alerting committee members only to anomalies and discrepancies."),
        ("National Academic Depository (NAD) Integration", "Interface with the Government of India's National Academic Depository (NAD) and DigiLocker APIs.", "OAuth2 integration permitting direct import of officially verified DigiLocker graduation transcripts.", "Full compliance with national digital education standards and instant credential onboarding."),
    ]
    for i, r in enumerate(fut_data):
        for j, val in enumerate(r):
            fut_t.rows[i+1].cells[j].paragraphs[0].text = val
    style_table(fut_t)

    # ========================================================
    # 9. CONCLUSION
    # ========================================================
    h1("9. CONCLUSION")
    h2("9.1 Technical Summary")
    p("The EduVault: Digital Locker and Academic Credential Verification Platform successfully modernizes academic record keeping, eradicates credential fraud, streamlines campus placement operations, and fosters dynamic alumni relations. By architecting a robust, decoupled full-stack platform utilizing Django REST Framework, React 18, Vite, Tailwind CSS, and Neon Serverless PostgreSQL, the system establishes a secure, single source of institutional truth.")
    p("The platform delivers instant physical-to-digital validation through dynamic Interview Key QR Codes, provides dedicated role governance for students, alumni, faculty, and recruiters, and operates seamlessly on zero-cost cloud infrastructure (Vercel and Render). EduVault demonstrates that institutional operations can be made transparent, instantaneous, and accessible worldwide.")

    h2("9.2 Academic and Professional Reflection")
    caption("Table 9.1: Technical competencies developed during project implementation.")
    comp_t2 = doc.add_table(rows=5, cols=3)
    c2_headers = ["Competency Area", "Where It Was Exercised", "Key Learning & Engineering Insight"]
    for j, h in enumerate(c2_headers):
        comp_t2.rows[0].cells[j].paragraphs[0].text = h
    c2_data = [
        ("Full-Stack System Architecture", "Designing decoupled REST contract between React SPA and Django backend.", "Separating presentation from persistence; managing client build pipelines with Vite and Rollup."),
        ("Security & Role-Based Governance", "SimpleJWT token lifecycle, custom DRF permissions (IsCommittee, IsPlacement).", "Defense-in-depth principles: never relying on frontend route guards alone; enforcing role checks at every API layer."),
        ("Relational Database Modeling", "PostgreSQL schema design, Third Normal Form (3NF), cascade constraints.", "Maintaining data integrity and high query throughput across user, document, and profile entities."),
        ("Production Cloud Deployment", "Deploying monorepo across Vercel (frontend) and Render (WSGI Gunicorn + WhiteNoise).", "Configuring 12-factor cloud apps, resolving CORS origins, and setting dynamic media routing rules."),
    ]
    for i, r in enumerate(c2_data):
        for j, val in enumerate(r):
            comp_t2.rows[i+1].cells[j].paragraphs[0].text = val
    style_table(comp_t2)

    # ========================================================
    # 10. REFERENCES
    # ========================================================
    h1("10. REFERENCES")
    h3("A. Software Architecture & System Design")
    p("1. Martin Kleppmann, Designing Data-Intensive Applications: The Big Ideas Behind Reliable, Scalable, and Maintainable Systems, O'Reilly Media, 2017.", space_after=2)
    p("2. Robert C. Martin, Clean Architecture: A Craftsman's Guide to Software Structure and Design, Prentice Hall, 2017.", space_after=2)
    p("3. Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides, Design Patterns: Elements of Reusable Object-Oriented Software, Addison-Wesley, 1994.", space_after=6)

    h3("B. Backend & API Engineering")
    p("1. Daniel Roy Greenfeld & Audrey Roy Greenfeld, Two Scoops of Django 3.x: Best Practices for the Django Web Framework, Two Scoops Press, 2020.", space_after=2)
    p("2. Django Software Foundation, Django 6.0 Documentation, 2026. https://docs.djangoproject.com/en/6.0/", space_after=2)
    p("3. Tom Christie et al., Django REST Framework Documentation, 2026. https://www.django-rest-framework.org/", space_after=6)

    h3("C. Frontend & Web Standards")
    p("1. Alex Banks & Eve Porcello, Learning React: Modern Patterns for Developing React Apps (2nd Edition), O'Reilly Media, 2020.", space_after=2)
    p("2. React Core Team, React 18 Documentation & Architecture Guides, 2024. https://react.dev/", space_after=2)
    p("3. Evan You & Vite Contributors, Vite: Next Generation Frontend Tooling, 2026. https://vite.dev/", space_after=2)
    p("4. Adam Wathan et al., Tailwind CSS Documentation, 2026. https://tailwindcss.com/docs", space_after=6)

    h3("D. Security & Identity Standards")
    p("1. National Institute of Standards and Technology (NIST), Digital Identity Guidelines: Authentication and Lifecycle Management (SP 800-63B), 2017.", space_after=2)
    p("2. Michael B. Jones, John Bradley, and Nat Sakimura, JSON Web Token (JWT) Standards (RFC 7519), Internet Engineering Task Force (IETF), 2015.", space_after=2)
    p("3. OWASP Foundation, OWASP Top 10 Web Application Security Risks, 2021. https://owasp.org/www-project-top-ten/", space_after=6)

    # Save
    out_path = os.path.join(r"d:\projects\eduvault antigravity\docs", "EduVault_Mini_Project_Report.docx")
    doc.save(out_path)
    print(f"Successfully generated Word document: {out_path}")

if __name__ == "__main__":
    main()
