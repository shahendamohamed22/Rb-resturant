import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useBuilderOptionsQuery } from './useBuilderOptionsQuery';
import { addItem } from '../cart/cartSlice';

function BuilderSection() {
    const { data: groups, isLoading, error } = useBuilderOptionsQuery();
    const dispatch = useDispatch();

    const [selections, setSelections] = useState({
        bun: null,
        patty: null,
        cheese: null,
        sauce: null,
        toppings: [],
    });

    useEffect(() => {
        if (!groups) return;
        const defaults = {};
        groups.forEach((group) => {
            if (group.isSingleSelect) {
                defaults[group.groupKey] = group.options[0]?.id ?? null;
            }
        });
        setSelections((prev) => ({ ...prev, ...defaults }));
    }, [groups]);

    if (isLoading) return <section id="builder" className="container py-5"><p>Loading...</p></section>;
    if (error) return <section id="builder" className="container py-5"><p>Something went wrong.</p></section>;

    const getGroup = (key) => groups.find((g) => g.groupKey === key);
    const getOption = (key, id) => getGroup(key)?.options.find((o) => o.id === id);

    const selectSingle = (groupKey, optionId) => {
        setSelections((prev) => ({ ...prev, [groupKey]: optionId }));
    };

    const toggleTopping = (optionId) => {
        setSelections((prev) => {
            const has = prev.toppings.includes(optionId);
            return {
                ...prev,
                toppings: has
                    ? prev.toppings.filter((id) => id !== optionId)
                    : [...prev.toppings, optionId],
            };
        });
    };

    const computePrice = () => {
        let total = 0;
        ['bun', 'patty', 'cheese', 'sauce'].forEach((key) => {
            const opt = getOption(key, selections[key]);
            if (opt) total += opt.extraPrice;
        });
        selections.toppings.forEach((id) => {
            const opt = getOption('toppings', id);
            if (opt) total += opt.extraPrice;
        });
        return total;
    };

    const price = computePrice();

    const hasCheese = getOption('cheese', selections.cheese)?.nameEn !== 'No Cheese';
    const hasDoublePatty = getOption('patty', selections.patty)?.nameEn === 'Beef Double';
    const hasToppings = selections.toppings.length > 0;

    const handleAddCustomBurger = () => {
        const bunOpt = getOption('bun', selections.bun);
        const pattyOpt = getOption('patty', selections.patty);
        const cheeseOpt = getOption('cheese', selections.cheese);
        const sauceOpt = getOption('sauce', selections.sauce);
        const toppingOpts = selections.toppings.map((id) => getOption('toppings', id));

        const descEn = [
            bunOpt?.nameEn,
            pattyOpt?.nameEn,
            cheeseOpt?.nameEn,
            `Sauce ${sauceOpt?.nameEn}`,
            ...toppingOpts.map((t) => t.nameEn),
        ].filter(Boolean).join(' | ');

        const descAr = [
            bunOpt?.nameAr,
            pattyOpt?.nameAr,
            cheeseOpt?.nameAr,
            `صوص ${sauceOpt?.nameAr}`,
            ...toppingOpts.map((t) => t.nameAr),
        ].filter(Boolean).join(' | ');

        dispatch(addItem({
            menuItemId: null,
            nameAr: 'برجرك المميز 🔥',
            nameEn: 'Your Signature Burger 🔥',
            descAr,
            descEn,
            price,
        }));
    };

    const renderGroup = (key, label, single) => {
        const group = getGroup(key);
        if (!group) return null;
        return (
            <div className="mb-4">
                <h5>{label}</h5>
                <div className="d-flex flex-wrap gap-2">
                    {group.options.map((opt) => {
                        const isSelected = single
                            ? selections[key] === opt.id
                            : selections.toppings.includes(opt.id);
                        return (
                            <button
                                key={opt.id}
                                type="button"
                                className="btn btn-sm py-2 px-3 mt-1"
                                style={{
                                    borderRadius: 999,
                                    border: '1.5px solid var(--line)',
                                    background: isSelected ? 'var(--gold-500)' : 'transparent',
                                    color: isSelected ? 'var(--maroon-950)' : 'white',
                                    fontWeight: 700,
                                }}
                                onClick={() => single ? selectSingle(key, opt.id) : toggleTopping(opt.id)}
                            >
                                {opt.nameEn} <small>+{opt.extraPrice}</small>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <section id="builder" className="py-5 container" >
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--maroon-800)' }}>
                Build Your Burger
            </h2>
            <p className='text-muted'>Pick your burger ingredients and watch it build in front of you, with the price updating instantly</p>
            <div className=" p-5 rounded-5" style={{ background: 'var(--maroon-950)' }}>

                {/* ===== Visual Stack ===== */}
                <div className='row gy-5'>
                    <div className='col-md-6' style={{ color: 'var(--cream-50)' }}>
                        <div style={{ color: 'var(--cream-50)' }}>
                            {renderGroup('bun', 'Bun', true)}
                            {renderGroup('patty', 'Patty', true)}
                            {renderGroup('cheese', 'Cheese', true)}
                            {renderGroup('sauce', 'Sauce', true)}
                            {renderGroup('toppings', 'Toppings (choose more than one)', false)}
                        </div>

                        <button
                            className="btn w-100 mt-3"
                            style={{ background: 'var(--gold-500)', color: 'var(--maroon-950)', fontWeight: 800, padding: 14 }}
                            onClick={handleAddCustomBurger}
                        >
                            Add my burger to cart — {price} EGP
                        </button>
                    </div>

                    <div className="col-md-5 d-flex flex-column align-items-center justify-content-center mb-4">
                        <div
                            style={{
                                width: 200, height: 60, borderRadius: '80px 80px 16px 16px',
                                background: 'linear-gradient(180deg,#E8A94E,#C97C28)',
                                transition: 'all .25s ease',
                            }}
                        />
                        <div
                            style={{
                                width: 220, height: hasToppings ? 22 : 0, marginTop: hasToppings ? -6 : 0,
                                background: '#6FAF4E', borderRadius: 14, overflow: 'hidden',
                                transition: 'all .25s ease',
                            }}
                        />
                        <div
                            style={{
                                width: 210, height: hasCheese ? 16 : 0, marginTop: hasCheese ? -6 : 0,
                                background: '#F6C445', overflow: 'hidden',
                                transition: 'all .25s ease',
                            }}
                        />
                        <div
                            style={{
                                width: 206, height: hasDoublePatty ? 22 : 0, marginTop: hasDoublePatty ? -6 : 0,
                                background: 'linear-gradient(180deg,#7A4B32,#4E2E1D)', borderRadius: 14, overflow: 'hidden',
                                transition: 'all .25s ease',
                            }}
                        />
                        <div
                            style={{
                                width: 206, height: 24, marginTop: -6,
                                background: 'linear-gradient(180deg,#8a5a3c,#5c3822)', borderRadius: 14,
                                transition: 'all .25s ease',
                            }}
                        />
                        <div
                            style={{
                                width: 206, height: 8, marginTop: -3,
                                background: '#B23A2E', borderRadius: 4,
                                transition: 'all .25s ease',
                            }}
                        />
                        <div
                            style={{
                                width: 208, height: 38, marginTop: -3,
                                background: 'linear-gradient(180deg,#D89649,#B06E27)', borderRadius: '10px 10px 40px 40px',
                            }}
                        />
                        <div className="text-center mb-4" style={{ color: 'var(--cream-50)' }}>
                            <small>Total</small>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, color: 'var(--gold-400)' }}>
                                {price} EGP
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BuilderSection;