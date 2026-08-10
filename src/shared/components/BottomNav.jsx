import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartCount } from '../../features/cart/cartSlice';
import { useTranslation } from 'react-i18next';

function BottomNav({ onCartClick }) {
  const navigate = useNavigate();
  const cartCount = useSelector(selectCartCount);
  const { t } = useTranslation();
  
  const items = [
    { icon: 'fa-house', label: t("nav_home"), action: () => navigate('/') },
    { icon: 'fa-utensils', label: t("nav_menu"), action: () => navigate('/menu') },
    { icon: 'fa-burger', label: t("nav_builder"), action: () => navigate('/builder') },
    { icon: 'fa-receipt', label: t("nav_orders"), action: () => navigate('/orders') },
    { icon: 'fa-shop', label: t("nav_branches"), action: () => navigate('/branches') },
  ];

  return (
    <nav
      className="d-flex d-md-none justify-content-around align-items-center"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 64,
        background: 'var(--maroon-950)',
        borderTop: '1px solid rgba(255,255,255,.1)',
        zIndex: 70,
      }}
    >
      {items.map((item) => (
        <button
          key={item.label}
          onClick={item.action}
          className="btn d-flex flex-column align-items-center justify-content-center position-relative"
          style={{ color: 'var(--gold-300)', background: 'none', border: 'none', fontSize: 11 }}
        >
          <i className={`fa-solid ${item.icon}`} style={{ fontSize: 18 }}></i>
          <span>{item.label}</span>
          {item.badge > 0 && (
            <span
              className="position-absolute badge rounded-pill"
              style={{ top: 0, right: 8, background: 'var(--gold-500)', color: 'var(--maroon-950)', fontSize: 9 }}
            >
              {item.badge}
            </span>
          )}
        </button>
      ))}
    </nav>
  );
}

export default BottomNav;