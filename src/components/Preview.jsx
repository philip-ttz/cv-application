import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./styles/preview.css";

export default function Preview({
  personal,
  educationList,
  experienceList,
  skillsList,
}) {
  const previewRef = React.useRef();

  const handleDownloadPDF = async () => {
    const element = previewRef.current;
    const canvas = await html2canvas(element, {
      scale: 2, // hohe Qualität
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Canvas auf A4 skalieren
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("cv-preview.pdf");
  };
  return (
    <div className="preview-container">
      <div className="preview-toolbar">
        <button onClick={handleDownloadPDF} className="download-btn">
          Download PDF
        </button>
      </div>
      <div ref={previewRef} className="preview-wrapper">
        <header className="preview-header">
          <h1>
            {personal.firstName || "First Name"}{" "}
            {personal.lastName || "Last Name"}
          </h1>
          <p className="contact-info">
            {personal.address && <span>{personal.address}</span>}
            {personal.phone && <span> | {personal.phone}</span>}
            {personal.email && <span> | {personal.email}</span>}
          </p>
        </header>

        {educationList.length > 0 && (
          <section className="preview-section">
            <h2>Education</h2>
            {educationList.map((edu, index) => (
              <div key={index} className="preview-entry">
                <p className="entry-title">{edu.school || "School"}</p>
                <p>{edu.degree || "Degree"}</p>
                <p className="entry-duration">{edu.duration || ""}</p>
              </div>
            ))}
          </section>
        )}

        {experienceList.length > 0 && (
          <section className="preview-section">
            <h2>Experience</h2>
            {experienceList.map((exp, index) => (
              <div key={index} className="preview-entry">
                <p className="entry-title">{exp.company || "Company"}</p>
                <p>{exp.position || "Position"}</p>
                <p className="entry-duration">{exp.duration || ""}</p>
              </div>
            ))}
          </section>
        )}

        {skillsList.length > 0 && (
          <section className="preview-section">
            <h2>Skills</h2>
            <ul className="skills-list">
              {skillsList.map((skill, index) => (
                <li key={index}>{skill.skills || "-"}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
