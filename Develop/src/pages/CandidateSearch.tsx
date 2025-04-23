import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';


interface Candidate {
  name: string;
  login: string;
  location: string;
  avatar_url: string;
  email: string;
  html_url: string;
  company: string;
}

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await searchGithub(); 
        setCandidates(res);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching candidates:', error);
        setMessage("Failed to load candidates.");
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const handleAccept = async () => {
    const candidate = candidates[currentIndex];
    try {
      await fetch("/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(candidate)
      });
    } catch (err) {
      console.error("Error saving candidate:", err);
    }
    moveToNext();
  };

  const handleReject = () => {
    moveToNext();
  };

  const moveToNext = () => {
    if (currentIndex + 1 < candidates.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setMessage("No more candidates available.");
    }
  };

  const candidate = candidates[currentIndex];

  return (
    <main>
      <h1>Candidate Search</h1>
      {loading ? (
        <p>Loading...</p>
      ) : message ? (
        <p>{message}</p>
      ) : (
        <div className="candidate-card">
          <img
            src={candidate.avatar_url}
            alt={`${candidate.name}'s avatar`}
            className="candidate-avatar"
          />
          <div className="candidate-details">
            <h2>{candidate.name || "No name provided"}</h2>
            <p><strong>Username:</strong> <a href={candidate.html_url} target="_blank">{candidate.login}</a></p>
            <p><strong>Email:</strong> {candidate.email || "N/A"}</p>
            <p><strong>Company:</strong> {candidate.company || "N/A"}</p>
            <p><strong>Location:</strong> {candidate.location || "N/A"}</p>
            <div style={{ marginTop: "1rem" }}>
              <button onClick={handleAccept}>+</button>
              <button onClick={handleReject} style={{ marginLeft: "1rem" }}>-</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CandidateSearch;
