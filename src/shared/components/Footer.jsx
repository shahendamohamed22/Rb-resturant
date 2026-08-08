function Footer() {
    return (
        <footer style={{ background: 'var(--maroon-950)', color: 'var(--cream-50)' }} className="py-4">
            <div className="container d-flex align-items-center justify-content-between">
                <div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--gold-400)' }}>
                        R Burger
                    </h2>
                    <p className="mb-1" style={{ color: 'var(--ink-600)' }}>Republic Restaurant</p>
                    <p style={{ color: 'var(--ink-600)' }}>© 2026 All rights reserved</p>
                </div>

                <div>
                    <p className="mb-1">Contact Us</p>
                    <p className="mb-1" style={{ color: 'var(--gold-200)' }}>Sohag: 010-8023-4407</p>
                    <p className="mb-3" style={{ color: 'var(--gold-200)' }}>Girga: 010-8022-4406</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;