import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import api from '../../shared/api/axiosClient';
import { ENDPOINTS } from '../../shared/api/endpoints';
import { logout } from '../auth/authSlice';
import {
  useDriverNewOrdersQuery,
  useDriverMyOrdersQuery,
  useReceiveOrderMutation,
  useShipOrderMutation,
  useDeliverOrderMutation,
} from './useDriverOrdersQueries';

const STAGE_PREPARING = 1;
const STAGE_ON_THE_WAY = 2;
const STAGE_AWAITING_CONFIRMATION = 3;

function formatApiError(err) {
  const data = err.response?.data;
  if (!data) return 'حصل خطأ، حاول تاني.';
  if (data.errors) {
    return Object.values(data.errors).flat().join(' — ');
  }
  return data.title || 'حصل خطأ، حاول تاني.';
}

function DriverApp() {
  const dispatch = useDispatch();
  const fullName = useSelector((state) => state.auth.fullName);
  const refreshToken = useSelector((state) => state.auth.refreshToken);

  const [activeTab, setActiveTab] = useState('new'); // 'new' | 'active' | 'completed'
  const [actionError, setActionError] = useState('');

  const { data: newOrders = [], isLoading: newLoading } = useDriverNewOrdersQuery();
  const { data: activeOrders = [], isLoading: mineLoading } = useDriverMyOrdersQuery('active');
  const { data: completedOrders = [] } = useDriverMyOrdersQuery('completed');

  const receiveMutation = useReceiveOrderMutation();
  const shipMutation = useShipOrderMutation();
  const deliverMutation = useDeliverOrderMutation();

  const handleReceive = (orderId) => {
    setActionError('');
    receiveMutation.mutate({ orderId, status: STAGE_PREPARING }, {
      onSuccess: () => setActiveTab('active'),
      onError: (err) => setActionError(formatApiError(err)),
    });
  };

  const handleStartDelivery = (orderId) => {
    setActionError('');
    shipMutation.mutate({ orderId, status: STAGE_ON_THE_WAY }, {
      onError: (err) => setActionError(formatApiError(err)),
    });
  };

  const handleArrived = (orderId) => {
    setActionError('');
    deliverMutation.mutate({ orderId, status: STAGE_AWAITING_CONFIRMATION }, {
      onError: (err) => setActionError(formatApiError(err)),
    });
  };

  const handleLogout = async () => {
    try {
      await api.post(ENDPOINTS.logout, { refreshToken });
    } catch (err) {
      console.error('LOGOUT ERROR:', err);
    } finally {
      dispatch(logout());
    }
  };

  const tabs = [
    { key: 'new', label: 'طلبات جديدة', count: newOrders.length },
    { key: 'active', label: 'طلباتي الجارية', count: activeOrders.length },
    { key: 'completed', label: 'المكتملة', count: completedOrders.length },
  ];

  return (
    <div dir="rtl" style={{ minHeight: '100vh', background: 'var(--cream-50)' }}>
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
        {actionError && (
          <div className="p-2 mb-3 text-center text-danger" style={{ background: '#F3DCDC', borderRadius: 10, fontSize: 13 }}>
            {actionError}
          </div>
        )}

        <div className="row g-3 mb-4">
          <div className="col-4">
            <div className="p-3 text-center bg-white" style={{ borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-card)' }}>
              <h3 style={{ color: 'var(--maroon-800)', fontFamily: 'var(--font-display)' }}>{completedOrders.length}</h3>
              <small className="text-muted">مكتملة</small>
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
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {activeTab === 'new' && (
          newLoading ? (
            <p className="text-muted text-center">جاري التحميل...</p>
          ) : newOrders.length === 0 ? (
            <p className="text-muted text-center">مفيش طلبات جديدة دلوقتي, تابع من هنا اول ما يوصلك طلب.</p>
          ) : (
            newOrders.map((order) => (
              <div key={order.orderId} className="p-3 mb-3 bg-white" style={{ borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-card)' }}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge" style={{ background: 'var(--gold-300)', color: 'var(--maroon-950)' }}>جاهز للاستلام</span>
                  <h5 className="mb-0">طلب #{order.orderNumber}</h5>
                </div>
                <p className="mb-1 text-muted">📍 {order.customerAddress || 'العنوان غير متوفر'}</p>
                {order.notes && <p className="mb-1 text-muted">📝 {order.notes}</p>}
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <button
                    className="btn"
                    style={{ background: 'var(--blue-600)', color: '#fff' }}
                    disabled={receiveMutation.isPending}
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

        {activeTab === 'active' && (
          mineLoading ? (
            <p className="text-muted text-center">جاري التحميل...</p>
          ) : activeOrders.length === 0 ? (
            <p className="text-muted text-center">مفيش طلبات شغالة عندك دلوقتي.</p>
          ) : (
            activeOrders.map((order) => (
              <div key={order.orderId} className="p-3 mb-3 bg-white" style={{ borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-card)' }}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge" style={{ background: 'var(--blue-600)' }}>
                    {order.stage === STAGE_PREPARING && 'تم الاستلام'}
                    {order.stage === STAGE_ON_THE_WAY && 'في الطريق'}
                    {order.stage === STAGE_AWAITING_CONFIRMATION && 'وصلت — في انتظار تأكيد العميل'}
                  </span>
                  <h5 className="mb-0">طلب #{order.orderNumber}</h5>
                </div>
                <p className="mb-1 text-muted">📍 {order.customerAddress || 'العنوان غير متوفر'}</p>
                {order.customerPhone && <p className="mb-3 text-muted">📱 {order.customerPhone}</p>}

                {order.stage === STAGE_PREPARING && (
                  <button
                    className="btn w-100"
                    style={{ background: 'var(--gold-500)', color: 'var(--maroon-950)', fontWeight: 700 }}
                    disabled={shipMutation.isPending}
                    onClick={() => handleStartDelivery(order.orderId)}
                  >
                    🛵 بدء التوصيل
                  </button>
                )}

                {order.stage === STAGE_ON_THE_WAY && (
                  <button
                    className="btn w-100"
                    style={{ background: 'var(--green-600)', color: '#fff', fontWeight: 700 }}
                    disabled={deliverMutation.isPending}
                    onClick={() => handleArrived(order.orderId)}
                  >
                    ✅ وصلت للعميل
                  </button>
                )}

                {order.stage === STAGE_AWAITING_CONFIRMATION && (
                  <p className="text-center text-muted mb-0" style={{ fontSize: 13 }}>
                    مستني العميل يأكد الاستلام من تطبيقه...
                  </p>
                )}
              </div>
            ))
          )
        )}

        {activeTab === 'completed' && (
          completedOrders.length === 0 ? (
            <p className="text-muted text-center">لسه معملتش تسليم.</p>
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