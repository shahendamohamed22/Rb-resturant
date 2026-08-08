import { useSelector } from 'react-redux';
import { selectCartCount } from '../../features/cart/cartSlice';

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function BottomNav({ onCartClick }) {
  const cartCount = useSelector(selectCartCount);

  const items = [
    { icon: 'fa-house', label: 'Home', action: () => scrollTo('home') },
    { icon: 'fa-utensils', label: 'Menu', action: () => scrollTo('menu') },
    { icon: 'fa-burger', label: 'Builder', action: () => scrollTo('builder') },
    { icon: 'fa-receipt', label: 'Orders', action: () => scrollTo('orders') },
    { icon: 'fa-cart-shopping', label: 'Cart', action: onCartClick, badge: cartCount },
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