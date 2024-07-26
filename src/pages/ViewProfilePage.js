import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { FaStar } from 'react-icons/fa';

import defaultProfileImage from '../images/1675484954544_800x800.webp';
import '../styles/ViewProfilePage.css';

const ViewProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating] = useState(Math.floor(Math.random() * 5) + 1);

  useEffect(() => {
    const fetchProfile = async () => {
      const db = getFirestore();
      try {
        const userDoc = await getDoc(doc(db, 'users', id));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          userData.image = userData.image || defaultProfileImage;
          setProfile(userData);
        } else {
          setError('User not found');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('Failed to fetch user details.');
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">EduSwap</Link>
        </div>
        <ul className="navbar-nav">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/explore">Explore</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </nav>

      <div className="profile-page">
        <div className="profile-header">
          <div className="profile-image-container">
            <img src={profile.image} alt={profile.name} className="profile-image" />
          </div>
          <div className="profile-details">
            <h1>{profile.name || "Sai Satvik"}</h1>
            <div className="profile-rating">
              {Array(rating).fill(0).map((_, i) => (
                <FaStar key={i} color="#ffd700" />
              ))}
            </div>
            <p><strong>Role:</strong> {profile.role || "Student"}</p>
            <p><strong>Institution:</strong> {profile.institution || "XYZ University"}</p>
            <p><strong>Year & Branch:</strong> {profile.year || "Unknown"} - {profile.branch || "Unknown"}</p>
            <button className="send-request-button">Send Request to Learn</button>
          </div>
        </div>

        <div className="profile-info">
          <div className="profile-bio">
            <h3>Bio</h3>
            <p>{profile.bio || "Enthusiastic learner with a passion for technology and science."}</p>
          </div>
          <div className="profile-row">
            <div className="profile-section">
              <h3>Skills</h3>
              <ul className="profile-list">
                {Array.isArray(profile.skills) && profile.skills.length > 0 ? (
                  profile.skills.map((skill, index) => <li key={index}>{skill}</li>)
                ) : (
                  <li>No skills listed.</li>
                )}
              </ul>
            </div>
            <div className="profile-section">
              <h3>Experience</h3>
              <p>{profile.experience || "No experience listed."}</p>
            </div>
            <div className="profile-section">
              <h3>Projects</h3>
              <ul className="profile-list">
                {Array.isArray(profile.projects) && profile.projects.length > 0 ? (
                  profile.projects.map((project, index) => <li key={index}>{project}</li>)
                ) : (
                  <li>No projects listed.</li>
                )}
              </ul>
            </div>
            <div className="profile-section">
              <h3>Certifications</h3>
              <ul className="profile-list">
                {Array.isArray(profile.certifications) && profile.certifications.length > 0 ? (
                  profile.certifications.map((cert, index) => <li key={index}>{cert}</li>)
                ) : (
                  <li>No certifications listed.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfilePage;
