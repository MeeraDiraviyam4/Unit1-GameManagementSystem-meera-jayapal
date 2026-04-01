function Card({ title, member }) {
  return (
    <section className="card">
      {title && <h2>{title}</h2>}
      {member}
    </section>
  );
}

export default Card;