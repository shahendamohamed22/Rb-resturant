import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMenuQuery } from './useMenuQuery';
import { addItem } from '../cart/cartSlice';

function MenuSection() {
    const { data: menu, isLoading, error } = useMenuQuery(1);
    const dispatch = useDispatch();
    const [activeCategory, setActiveCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleAdd = (item) => {
        dispatch(addItem({
            menuItemId: item.id,
            nameAr: item.nameAr,
            nameEn: item.nameEn,
            descAr: item.descriptionAr,
            descEn: item.descriptionEn,
            price: item.price,
        }));
    };

    if (isLoading) return <section id="menu" className="container py-5"><p>Loading...</p></section>;
    if (error) return <section id="menu" className="container py-5"><p>Something went wrong.</p></section>;

    // default to the first category once data arrives
    const currentKey = activeCategory ?? menu[0]?.categoryKey;
    const currentCategory = menu.find((c) => c.categoryKey === currentKey);

    const query = searchQuery.trim().toLowerCase();

    const displayedItems = query
        ? menu.flatMap((category) => category.items).filter((item) =>
            item.nameEn?.toLowerCase().includes(query) ||
            item.nameAr?.includes(searchQuery.trim())
        )
        : currentCategory?.items || [];

    return (
        <section id="menu" className="container py-5">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                <div>
                    <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--maroon-800)' }}>Menu</h2>
                    <p className='text-muted'>Prices vary based on the branch selected above</p>
                </div>
                <div className="" style={{ maxWidth: 400, position: 'relative' }}>
                    <i
                        className="fa-solid fa-magnifying-glass"
                        style={{
                            position: 'absolute',
                            left: 14,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--ink-600)'
                        }}
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search for a burger, chicken..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ paddingLeft: 40, borderRadius: 999 }}
                    />
                </div>
            </div>
            {/* ===== Category Tabs ===== */}
            <div className="d-flex flex-wrap gap-2 mb-4 mt-3">
                {menu.map((category) => (
                    <button
                        key={category.categoryKey}
                        type="button"
                        className="btn"
                        style={{
                            borderRadius: 999,
                            fontWeight: 700,
                            background: currentKey === category.categoryKey ? 'var(--maroon-800)' : 'transparent',
                            color: currentKey === category.categoryKey ? '#fff' : 'var(--maroon-800)',
                            border: '1.5px solid var(--maroon-800)',
                        }}
                        onClick={() => setActiveCategory(category.categoryKey)}
                    >
                        {category.labelEn}
                    </button>
                ))}
            </div>

            {/* ===== Items for the active category only ===== */}
            {currentCategory && (
                <div className="row">
                    {displayedItems.map((item) => (
                        <div key={item.id} className="col-6 col-md-4 col-lg-3 mb-3">
                            <div className="card h-100 overflow-hidden" style={{ borderRadius: 'var(--radius-card)', }}>
                                <img
                                    src={item.imageUrl || `https://picsum.photos/seed/${item.id}/400/300`}
                                    alt={item.nameEn}
                                    style={{ width: '100%', height: 160, objectFit: 'cover' }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5>{item.nameEn}</h5>
                                    <p className="text-muted small">{item.descriptionEn}</p>
                                    <p style={{ fontFamily: 'var(--font-display)', color: 'var(--maroon-800)' }}>
                                        {item.price} EGP
                                    </p>
                                    <button
                                        className="btn mt-auto"
                                        style={{ background: 'var(--maroon-800)', color: '#fff' }}
                                        onClick={() => handleAdd(item)}
                                    >
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );

}

export default MenuSection;