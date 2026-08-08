import { useBranchesQuery } from './useBranchesQuery';

function BranchesSection() {
    const { data: branches, isLoading, error } = useBranchesQuery();

    if (isLoading) return <section id="branches" className="container py-5"><p>Loading...</p></section>;
    if (error) return <section id="branches" className="container py-5"><p>Something went wrong.</p></section>;

    return (
        <section id="branches" className="container py-5">
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--maroon-800)' }}>
                Our Branches
            </h2>
            <p className='text-muted'>Choose the closest one to you</p>

            <div className="row">
                {branches.map((branch) => (
                    <div key={branch.id} className="col-md-4 mb-3">
                        <div
                            className="p-4 h-100"
                            style={{
                                background: 'white',
                                borderRadius: 'var(--radius-card)',
                                boxShadow: 'var(--shadow-card)',
                            }}
                        >
                            <h4 className='' style={{ color: 'var(--maroon-800)' }}>{branch.nameEn}</h4>
                            <div className='mt-4'>
                                <p className='text-muted'>Delivery and pickup</p>
                                <p className="text-muted">hotLine: {branch.hotLine}</p>
                                <p className="text-muted">Average delivery: {branch.etaMinMinutes}–{branch.etaMaxMinutes} min </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section >
    );
}

export default BranchesSection;