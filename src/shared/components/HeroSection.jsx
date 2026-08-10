import { useNavigate } from 'react-router-dom';
import burgerImg from "../../../attached_assets/burger-hero.png";
import HomeMenu from '../../features/menu/HomeMenu';
import { useTranslation } from 'react-i18next';

function HeroSection() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <>
            <section
                style={{
                    background: 'radial-gradient(circle at 25% 20%, var(--maroon-700), var(--maroon-950) 70%)',
                    color: 'var(--cream-50)',
                    padding: '60px 20px',
                }}
            >
                <div className="container py-3">
                    <div className='row align-items-center'>

                        <div className='col-md-7'>
                            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: "var(--hero-title-size)" }}>
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
                                    onClick={() => navigate('/builder')}
                                >
                                    Build Your Burger Now
                                </button>
                                <button
                                    className="btn"
                                    style={{ border: '1.5px solid var(--gold-300)', color: 'var(--gold-300)', fontWeight: 800, borderRadius: 999, padding: '10px 24px' }}
                                    onClick={() => navigate('/menu')}
                                >
                                    View Menu
                                </button>
                            </div>
                        </div>
                        <div className='col-md-5'>
                            <img src={burgerImg} alt="Burger" style={{ maxWidth: '100%' }} />
                        </div>
                    </div>
                </div>
            </section>

            <HomeMenu />
        </>
    );
}

export default HeroSection;