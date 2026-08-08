import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { selectCartCount } from '../../features/cart/cartSlice';
import { useBranchesQuery } from '../../features/branches/useBranchesQuery';
import { setSelectedBranch } from '../../features/branches/branchSlice';
import { useTranslation } from 'react-i18next';
import { toggleLanguage } from '../../features/languages/languageSlice';

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function Header({ onCartClick, onAccountClick }) {
  const { t } = useTranslation();
  const currentLang = useSelector((state) => state.language.current);
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const fullName = useSelector((state) => state.auth.fullName);
  const { data: branches } = useBranchesQuery();
  const selectedBranch = useSelector((state) => state.branch.selectedBranch);

  useEffect(() => {
    if (branches && branches.length > 0 && !selectedBranch) {
      dispatch(setSelectedBranch(branches[0]));
    }
  }, [branches, selectedBranch, dispatch]);

  const handleBranchChange = (e) => {
    const branch = branches.find((b) => b.id === Number(e.target.value));
    if (branch) dispatch(setSelectedBranch(branch));
  };

  return (
    <header style={{ background: 'var(--maroon-950)', color: 'var(--cream-50)', position: 'sticky', top: 0, zIndex: 60 }}>
      <div className="container d-flex align-items-center justify-content-between py-2">

        {/* Logo — always visible */}
        <div role="button" onClick={() => scrollTo('home')} className="d-flex align-items-center gap-2">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: 44, height: 44, background: 'var(--gold-500)', fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--maroon-950)' }}
          >
            R
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--gold-400)' }}>
            R Burger
          </span>
        </div>

        {/* Desktop nav links — hidden on mobile (d-none), shown from md breakpoint up */}
        <nav className="d-none d-md-flex align-items-center gap-4">
          <span role="button" onClick={() => scrollTo('menu')} style={{ color: 'var(--cream-50)', fontWeight: 700 }}>Menu</span>
          <span role="button" onClick={() => scrollTo('builder')} style={{ color: 'var(--cream-50)', fontWeight: 700 }}>Builder</span>
          <span role="button" onClick={() => scrollTo('orders')} style={{ color: 'var(--cream-50)', fontWeight: 700 }}>Orders</span>
          <span role="button" onClick={() => scrollTo('branches')} style={{ color: 'var(--cream-50)', fontWeight: 700 }}>Branches</span>
        </nav>

        {/* Right side: branch selector + cart + login — always visible */}
        <div className="d-flex align-items-center gap-2">
          {branches && (
            <select
              className="form-select form-select-sm"
              style={{ width: 85, borderRadius: 999 }}
              value={selectedBranch?.id || ''}
              onChange={handleBranchChange}
            >
              {branches.map((b) => (
                <option key={b.id} value={b.id}>{b.nameEn}</option>
              ))}
            </select>
          )}
          <button
            className="btn btn-sm"
            style={{ border: '1.5px solid rgba(255,255,255,.25)', color: 'var(--gold-300)', borderRadius: 999, fontWeight: 700 }}
            onClick={() => dispatch(toggleLanguage())}
          >
            {currentLang === 'ar' ? 'English' : 'العربي'}
          </button>

          {/* Cart button — hidden on mobile, shown in bottom nav instead */}
          <button
            className="btn btn-sm position-relative d-none d-md-inline-block"
            style={{ background: 'var(--gold-500)', color: 'var(--maroon-950)', borderRadius: 999, fontWeight: 800 }}
            onClick={onCartClick}
          >
            <i className="fa-solid fa-cart-shopping"></i> Cart
            {cartCount > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                style={{ background: 'var(--maroon-950)', color: 'var(--gold-400)' }}
              >
                {cartCount}
              </span>
            )}
          </button>

          <button
            className="btn btn-sm"
            style={{ border: '1.5px solid rgba(255,255,255,.25)', color: 'var(--gold-300)', borderRadius: 999, fontWeight: 800 }}
            onClick={onAccountClick}
          >
            <i className="fa-solid fa-user"></i> {fullName ? fullName.split(' ')[0] : 'Login'}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;