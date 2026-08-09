import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateOrderStage, markDriverAssigned } from '../orders/ordersSlice';
import { logout } from '../auth/authSlice';

function DriverApp() {
  const dispatch = useDispatch();
  const fullName = useSelector((state) => state.auth.fullName);
  const allOrders = useSelector((state) => state.orders.items);

  const [activeTab, setActiveTab] = useState('new'); // 'new' | 'active' | 'completed'
  const [readyToDeliver, setReadyToDeliver] = useState({}); // { [orderId]: true }

  const newOrders = allOrders.filter((o) => !o.driverAssigned && o.stage <= 1);
  const activeOrders = allOrders.filter((o) => o.driverAssigned && o.stage < 3);
  const completedOrders = allOrders.filter((o) => o.stage === 3);

  const handleReceive = (orderId) => {
    dispatch(updateOrderStage({ orderId, stage: 1 }));
    dispatch(markDriverAssigned(orderId));
    setActiveTab('active');
  };

  const handleStartDelivery = (orderId) => {
    dispatch(updateOrderStage({ orderId, stage: 2 }));
    // simulate driving time before "delivered" button becomes available
    setTimeout(() => {
      setReadyToDeliver((prev) => ({ ...prev, [orderId]: true }));
    }, 8000);
  };

  const handleDeliver = (orderId) => {
    dispatch(updateOrderStage({ orderId, stage: 3 }));
    setActiveTab('completed');
  };

  const handleLogout = () => dispatch(logout());

  const tabs = [
    { key: 'new', label: 'طلبات جديدة', count: newOrders.length },
    { key: 'active', label: 'طلباتي الجارية', count: activeOrders.length },
    { key: 'completed', label: 'المكتملة', count: completedOrders.length },
  ];

  return (
    <div dir="rtl" style={{ minHeight: '100vh', background: 'var(--cream-50)' }}>
      {/* هيدر الدرايفر */}
      <header style={{ background: 'var(--maroon-950)', color: 'var(--cream-50)' }} className="py-3 mb-4">
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-400)', margin: 0 }}>
              R Burger — المندوب
            </h4>
            <small style={{ color: 'var(--gold-200)' }}>أهلًا، {fullName}</small>
          </div>
          <button
            className="btn btn-sm"
            style={{ border: '1.5px solid rgba(255,255,255,.3)', color: 'var(--gold-300)' }}
            onClick={handleLogout}
          >
            تسجيل خروج
          </button>
        </div>
      </header>

      <div className="container pb-5">
        {/* بانر تنبيه */}
        <div
          className="p-3 mb-4 text-center"
          style={{ background: 'var(--gold-200)', borderRadius: 'var(--radius-card)', color: 'var(--ink-900)' }}
        >
          ✏️ دي معاينة مستقلة لواجهة المندوب. دلوقتي الطلبات هنا بيانات تجريبية مش متصلة بموقع العميل فعليًا؛
          لما ندمج الواجهتين واحد بتسجيل دخول واحد (عميل / مندوب)، أي تحديث هنا هيظهر لحظيًا في تطبيق العميل.
        </div>

        {/* كروت الإحصائيات */}
        <div className="row g-3 mb-4">
          <div className="col-4">
            <div className="p-3 text-center bg-white" style={{ borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-card)' }}>
              <h3 style={{ color: 'var(--maroon-800)', fontFamily: 'var(--font-display)' }}>{completedOrders.length}</h3>
              <small className="text-muted">مكتملة اليوم</small>
            </div>
          </div>
          <div className="col-4">
            <div className="p-3 text-center bg-white" style={{ borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-card)' }}>
              <h3 style={{ color: 'var(--maroon-800)', fontFamily: 'var(--font-display)' }}>{activeOrders.length}</h3>
              <small className="text-muted">طلبات جارية</small>
            </div>
          </div>
          <div className="col-4">
            <div className="p-3 text-center bg-white" style={{ borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-card)' }}>
              <h3 style={{ color: 'var(--maroon-800)', fontFamily: 'var(--font-display)' }}>{newOrders.length}</h3>
              <small className="text-muted">طلبات جديدة</small>
            </div>
          </div>
        </div>

        {/* التابات */}
        <div className="d-flex justify-content-center-start gap-2 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className="btn"
              style={{
                borderRadius: 999,
                fontWeight: 700,
                background: activeTab === tab.key ? 'var(--maroon-800)' : 'transparent',
                color: activeTab === tab.key ? '#fff' : 'var(--maroon-800)',
                border: '1.5px solid var(--maroon-800)',
              }}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* محتوى التابة: طلبات جديدة */}
        {activeTab === 'new' && (
          newOrders.length === 0 ? (
            <p className="text-muted text-center">مفيش طلبات جديدة دلوقتي, تابع من هنا اول ما يوصلك طلب.</p>
          ) : (
            newOrders.map((order) => (
              <div key={order.orderId} className="p-3 mb-3 bg-white" style={{ borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-card)' }}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge" style={{ background: 'var(--gold-300)', color: 'var(--maroon-950)' }}>جاهز للاستلام</span>
                  <h5 className="mb-0">طلب #{order.orderNumber} — فرع {order.branchName || 'سوهاج'}</h5>
                </div>
                <p className="mb-1 text-muted">📍 {order.deliveryAddress || 'العنوان غير متوفر'}</p>
                <p className="mb-1 text-muted">
                  {order.items?.map((i) => `${i.quantity}× ${i.nameAr || i.nameEn}`).join(' — ')}
                </p>
                <p className="mb-3 text-muted">👤 العميل: {order.customerName} — 📱 {order.customerPhone}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    className="btn"
                    style={{ background: 'var(--blue-600)', color: '#fff' }}
                    onClick={() => handleReceive(order.orderId)}
                  >
                    📄 استلمت الطلب من الفرع
                  </button>
                  <strong style={{ color: 'var(--maroon-800)' }}>{order.total} ج.م</strong>
                </div>
              </div>
            ))
          )
        )}

        {/* محتوى التابة: طلباتي الجارية */}
        {activeTab === 'active' && (
          activeOrders.length === 0 ? (
            <p className="text-muted text-center">مفيش طلبات شغالة عندك دلوقتي.</p>
          ) : (
            activeOrders.map((order) => (
              <div key={order.orderId} className="p-3 mb-3 bg-white" style={{ borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-card)' }}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge" style={{ background: 'var(--blue-600)' }}>
                    {order.stage === 1 ? 'مستلم من الفرع' : 'في الطريق'}
                  </span>
                  <h5 className="mb-0">طلب #{order.orderNumber}</h5>
                </div>
                <p className="mb-3 text-muted">📍 {order.deliveryAddress || 'العنوان غير متوفر'}</p>

                {order.stage === 1 && (
                  <button
                    className="btn w-100"
                    style={{ background: 'var(--gold-500)', color: 'var(--maroon-950)', fontWeight: 700 }}
                    onClick={() => handleStartDelivery(order.orderId)}
                  >
                    🛵 بدء التوصيل
                  </button>
                )}

                {order.stage === 2 && (
                  readyToDeliver[order.orderId] ? (
                    <button
                      className="btn w-100"
                      style={{ background: 'var(--green-600)', color: '#fff', fontWeight: 700 }}
                      onClick={() => handleDeliver(order.orderId)}
                    >
                      ✅ تم التسليم للعميل
                    </button>
                  ) : (
                    <p className="text-center text-muted mb-0">🚴‍♂️ في الطريق للعميل...</p>
                  )
                )}
              </div>
            ))
          )
        )}

        {/* محتوى التابة: المكتملة */}
        {activeTab === 'completed' && (
          completedOrders.length === 0 ? (
            <p className="text-muted text-center">لسه معملتش تسليم النهاردة.</p>
          ) : (
            completedOrders.map((order) => (
              <div key={order.orderId} className="d-flex justify-content-between align-items-center p-3 mb-2" style={{ background: '#fff', borderRadius: 'var(--radius-card)', opacity: 0.7 }}>
                <h6 className="mb-0">طلب #{order.orderNumber}</h6>
                <span className="badge" style={{ background: 'var(--green-600)' }}>تم التسليم</span>
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
}

export default DriverApp;