function Home() {
  return (
    <section
      className="home-hero"
      style={{
        backgroundImage: `url('/images/Game.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div>
        <h1>Organize tennis & pickleball</h1>
        <p>RSVP, Track Scores and Manage Tournaments.</p>
      </div>
    </section>
  );
}

export default Home;