import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProfilePage.css';
import logo from '../images/logo.jpg'; // Update the path to your logo

const ProfilePage = () => {
  // Dummy profile data
  const profile = {
    name: 'Irfan',
    title: 'Btech 3rd Year',
    skills: ['JavaScript', 'React', 'Node.js'],
    experience: [
      { role: 'Frontend Developer', company: 'Company A', duration: 'Jan 2020 - Dec 2022' },
      { role: 'Backend Developer', company: 'Company B', duration: 'Jan 2018 - Dec 2019' }
    ],
    certifications: ['Certified React Developer', 'AWS Certified Solutions Architect'],
    projects: [
      { title: 'Project A', description: 'A project description' },
      { title: 'Project B', description: 'Another project description' }
    ]
  };

  return (
    <div className="dashboard">
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
      <header className="dashboard-header">
        <h1>Welcome, {user.displayName}!</h1>
        <div className="image-slider">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className={index === currentIndex ? 'visible' : 'hidden'}
            />
          ))}
        </div>
      </header>
      <main className="dashboard-main">
        <section className="dashboard-overview">
          <h2>Your Skills</h2>
          <ul>
            {user.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>
        <section className="dashboard-notifications">
          <h2>Notifications</h2>
          <ul>
            {user.notifications.map((notification, index) => (
              <li key={index}>{notification}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
