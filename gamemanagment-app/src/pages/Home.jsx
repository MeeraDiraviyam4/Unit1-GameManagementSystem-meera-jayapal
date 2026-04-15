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
        <h2>RSVP, Track Scores and Manage Tournaments.</h2>
      </div>
    </section>
  );
}

export default Home;