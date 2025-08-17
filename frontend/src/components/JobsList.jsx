import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // 👈 مهم

export default function JobsList() {
  const { t, i18n } = useTranslation();      // 👈 يعرّف t
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/api/jobs/")
      .then(res => {
        if (Array.isArray(res.data)) {
          setJobs(res.data);
        } else {
          setJobs(res.data.results || []);
        }
      })
      .catch(err => {
        console.error("Error fetching jobs:", err);
        setError(i18n.language === "ar" ? "فشل تحميل الوظائف" : "Failed to load jobs");
      });
  }, [i18n.language]);

  if (error) return <div>{error}</div>;
  if (!jobs.length) return <div>{i18n.language === "ar" ? "لا توجد وظائف حالياً" : "No jobs right now."}</div>;

  return (
    <div className="container mt-5" style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
      <h2>{t("jobsTitle")}</h2>
      {jobs.map(job => (
        <div key={job.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{job.title}</h5>
            <p className="text-muted">{job.location}</p>
            <p className="mb-3" style={{ whiteSpace: "pre-wrap" }}>{job.description}</p>
            <Link className="btn btn-primary" to={`/apply/${job.id}`}>
              {t("applyNow")}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
