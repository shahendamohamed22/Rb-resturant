function HeroSection() {
    function scrollTo(id) {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    return (
        <section
            id="home"
            style={{
                background: 'radial-gradient(circle at 25% 20%, var(--maroon-700), var(--maroon-950) 70%)',
                color: 'var(--cream-50)',
                padding: '60px 20px',
            }}
        >
            <div className="container">
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 60 }}>
                    A burger bite <span style={{ color: 'var(--gold-400)' }}>your way,</span>
                    <br />
                    delivered while you track it
                </h1>
                <p style={{ color: 'var(--gold-200)', maxWidth: 480, fontSize: 18 }}>
                    Pick your branch, order from the menu, or build your own burger piece by piece —
                    and watch it arrive live.
                </p>
                <div className="d-flex gap-3 mt-4">
                    <button
                        className="btn"
                        style={{ background: 'var(--gold-500)', color: 'var(--maroon-950)', fontWeight: 800, borderRadius: 999, padding: '10px 24px' }}
                        onClick={() => scrollTo('builder')}
                    >
                        Build Your Burger Now
                    </button>
                    <button
                        className="btn"
                        style={{ border: '1.5px solid var(--gold-300)', color: 'var(--gold-300)', fontWeight: 800, borderRadius: 999, padding: '10px 24px' }}
                        onClick={() => scrollTo('menu')}
                    >
                        View Menu
                    </button>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;