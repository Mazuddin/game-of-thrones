import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div
        className="background"
        style={{
          backgroundImage: `url(${require('./components/img/house.jpg')})`,
        }}
      ></div>

      <section className="section__container">
        {/* Logo */}
        <img
          src={require('./components/img/logo.png')}
          alt="Logo"
        />
      </section>
    </div>
  );
}

export default Home;
