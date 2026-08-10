import { useDispatch } from 'react-redux';
import { useMenuQuery } from './useMenuQuery';
import { addItem } from '../cart/cartSlice';

function HomeMenu() {
    const { data: menu, isLoading, error } = useMenuQuery(1);
    const dispatch = useDispatch();

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

    return (
        <section id="menu">
                {menu.map((category, index) => (
                    <div key={category.categoryKey} className="menu-category py-5" style={{
                        background: index % 2 ? 'var(--gold-200)' : 'var(--cream-50)'
                    }}>
                        <div className="container">
                            <h3 className="menu-category-title">{category.labelEn}</h3>

                            <div className="menu-items row g-3">
                                {category.items.map((item) => (
                                    <div key={item.id} className='col-12 col-md-6'>
                                        <div className="menu-item p-3">
                                            <div className="menu-item-img position-relative">
                                                <img
                                                    src={item.imageUrl || `https://picsum.photos/seed/${item.id}/150/150`}
                                                    alt={item.nameEn}
                                                    
                                                />
                                            </div>

                                            <div className="menu-item-info">
                                                <div className="d-flex justify-content-between align-items-start gap-3">
                                                    <h5>{item.nameEn}</h5>
                                                    <span>{item.price} EGP</span>
                                                </div>
                                                <p>{item.descriptionEn}</p>
                                            </div>

                                            <button
                                                className="menu-add"
                                                onClick={() => handleAdd(item)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </section>
    );
}

export default HomeMenu;

