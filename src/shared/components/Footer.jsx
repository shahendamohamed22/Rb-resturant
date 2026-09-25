import { useBranchesQuery } from '../../features/branches/useBranchesQuery';

function Footer() {
    const { data: branches = [] } = useBranchesQuery();
    return (
        <footer style={{ background: 'var(--maroon-950)', color: 'var(--cream-50)' }} className="py-5">
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
                    {branches.map((branch) => (
                        <p key={branch.id} className="mb-1" style={{ color: 'var(--gold-200)' }}>
                            {branch.nameEn}: {branch.hotlinePhones}
                        </p>
                    ))}
                </div>
            </div>
        </footer>
    );
}

export default Footer;