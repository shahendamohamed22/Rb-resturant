import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { selectCartCount } from '../../features/cart/cartSlice';
import { useTranslation } from 'react-i18next';

function BottomNav({ onCartClick }) {
  const navigate = useNavigate();
  const cartCount = useSelector(selectCartCount);
  const { t } = useTranslation();

  const items = [
    { icon: 'fa-house', label: "Home", path: '/' },
    { icon: 'fa-utensils', label: "Menu", path: '/menu' },
    { icon: 'fa-burger', label: "Builder", path: '/builder' },
    { icon: 'fa-receipt', label: "Orders", path: '/orders' },
    { icon: 'fa-shop', label: "Branches", path: '/branches' },
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
        <NavLink
          key={item.label}
          to={item.path}
          className="btn d-flex flex-column align-items-center justify-content-center position-relative"
          style={({isActive})=>( { color: isActive ?  "var(--gold-300)" : "var(--cream-50)" , background: 'none', border: 'none', fontSize: 11 })}
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
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomNav;