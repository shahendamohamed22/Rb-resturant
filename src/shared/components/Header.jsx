import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { selectCartCount } from '../../features/cart/cartSlice';
import { useBranchesQuery } from '../../features/branches/useBranchesQuery';
import { setSelectedBranch } from '../../features/branches/branchSlice';
import { useTranslation } from 'react-i18next';
import { toggleLanguage } from '../../features/languages/languageSlice';
import { Link } from 'react-router-dom';

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
      <div className="container-lg d-flex align-items-center justify-content-between py-3">

        {/* Logo — always visible */}
        <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: 44, height: 44, background: 'var(--gold-500)', fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--maroon-950)' }}
          >
            R
          </div>
          <span className='d-none d-lg-block' style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--gold-400)' }}>
            R Burger
          </span>
        </Link>

        {/* Desktop nav links — hidden on mobile (d-none), shown from md breakpoint up */}
        <nav className="d-none d-md-flex align-items-center gap-4">
          <Link to="/" style={{ color: 'var(--cream-50)', fontWeight: 700, textDecoration: 'none' }}>Home</Link>
          <Link to="/menu" style={{ color: 'var(--cream-50)', fontWeight: 700, textDecoration: 'none' }}>Menu</Link>
          <Link to="/builder" style={{ color: 'var(--cream-50)', fontWeight: 700, textDecoration: 'none' }}>Build</Link>
          <Link to="/orders" style={{ color: 'var(--cream-50)', fontWeight: 700, textDecoration: 'none' }}>Orders</Link>
          <Link to="/branches" style={{ color: 'var(--cream-50)', fontWeight: 700, textDecoration: 'none' }}>Branches</Link>
        </nav>

        {/* Right side: branch selector + cart + login — always visible */}
        <div className="d-flex align-items-center gap-2">
          {branches && (
            <select
              className="branch-select form-select form-select-sm"
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
            {/* {currentLang === 'ar' ? 'English' : 'العربي'} */}
            <i className='fa-solid fa-earth fs-3'></i>
          </button>

          {/* Cart button — hidden on mobile, shown in bottom nav instead */}
          <button
            className="btn btn-sm position-relative fs-6"
            style={{ background: 'var(--gold-500)', color: 'var(--maroon-950)', borderRadius: 999, fontWeight: 800 }}
            onClick={onCartClick}
          >
            <i className="fa-solid fa-cart-shopping"></i>
            <span className='d-none d-md-inline-block' >Cart</span> 
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
            className="btn btn-sm fs-6"
            style={{ border: '1.5px solid rgba(255,255,255,.25)', color: 'var(--gold-300)', borderRadius: 999, fontWeight: 800 }}
            onClick={onAccountClick}
          >
            <i className="fa-solid fa-user"></i>
             <span className='d-md-inline-block d-none'>{fullName ? fullName.split(' ')[0] : 'Login'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;