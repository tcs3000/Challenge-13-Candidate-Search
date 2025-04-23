import { useEffect, useState } from "react";

interface Candidate {
  name: string;
  login: string;
  location: string;
  avatar_url: string;
  email: string;
  html_url: string;
  company: string;
}

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/saved")
      .then((res) => res.json())
      .then((data) => {
        setCandidates(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch candidates:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main>
      <h1>Potential Candidates</h1>
      {loading ? (
        <p>Loading...</p>
      ) : candidates.length === 0 ? (
        <p>No candidates have been accepted.</p>
      ) : (
        <div className="candidate-list">
          {candidates.map((candidate) => (
            <div key={candidate.login} className="candidate-card">
              <img
                src={candidate.avatar_url}
                alt={`${candidate.name}'s avatar`}
                className="candidate-avatar"
              />
              <div className="candidate-details">
                <h2>{candidate.name}</h2>
                <p>
                  <strong>Username:</strong>{" "}
                  <a href={candidate.html_url} target="_blank" rel="noreferrer">
                    {candidate.login}
                  </a>
                </p>
                <p><strong>Email:</strong> {candidate.email || "Not provided"}</p>
                <p><strong>Company:</strong> {candidate.company || "Not listed"}</p>
                <p><strong>Location:</strong> {candidate.location || "Unknown"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default SavedCandidates;
