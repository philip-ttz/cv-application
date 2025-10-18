import { useState } from "react";
import "../styles/App.css";
import Navbar from "./Navbar.jsx";
import Personal from "./Personal.jsx";
import Preview from "./Preview.jsx";

function App() {
  const [activeTab, setActiveTab] = useState("Personal");

  const [personal, setPersonal] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
  });
  const [education, setEducation] = useState({
    school: "",
    degree: "",
    duration: "",
  });
  const [experience, setExperience] = useState({
    company: "",
    position: "",
    duration: "",
  });
  const [skills, setSkills] = useState({
    skills: "",
  });

  const [educationEntries, setEducationEntries] = useState([]);
  const [experienceEntries, setExperienceEntries] = useState([]);
  const [skillsEntries, setSkillsEntries] = useState([]);

  return (
    <>
      <div className="app">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="content">
          {activeTab === "Personal" && (
            <Personal
              title="Personal Information"
              data={personal}
              setData={setPersonal}
              onSubmit={(formData) => {
                console.log("Personal Form submitted:", formData);
              }}
            />
          )}
          {activeTab === "Education" && (
            <Personal
              title="Education"
              data={education}
              setData={setEducation}
              entries={educationEntries}
              setEntries={setEducationEntries}
            />
          )}
          {activeTab === "Experience" && (
            <Personal
              title="Experience"
              data={experience}
              setData={setExperience}
              entries={experienceEntries}
              setEntries={setExperienceEntries}
            />
          )}
          {activeTab === "Skills" && (
            <Personal
              title="Skills"
              data={skills}
              setData={setSkills}
              entries={skillsEntries}
              setEntries={setSkillsEntries}
            />
          )}
        </div>
      </div>
      <Preview
        personal={personal}
        educationList={educationEntries}
        experienceList={experienceEntries}
        skillsList={skillsEntries}
      />
    </>
  );
}

export default App;
