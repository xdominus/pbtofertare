import React, { useState, useEffect, useContext } from 'react';
import { Modal, Divider } from '@mui/material';
import { Store } from '../../utils/StateProvider';
import { Button } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    boxShadow: '0 5px 25px rgba(0, 0, 0, 0.4)',
    width: 400,
    padding: '20px'
};

export default function PDFMockup({ currency, refference, product, data, fitting, user }) {
    const { state, dispatch } = useContext(Store);
    const {
        selectedItem,
        quote: { quoteItems }
    } = state;

    const [showModal, setShowModal] = useState({ state: false, product: null });

    const pieces =
        data &&
        data.quoteItems
            .map((e, i) => e.Bucati)
            .map(function (elt) {
                // assure the value can be converted into an integer
                return /^\d+$/.test(elt) ? parseInt(elt) : 0;
            })
            .reduce(function (a, b) {
                // sum all resulting numbers
                return a + b;
            });

    const totalValue =
        data &&
        data.quoteItems
            .map((e, i) => e.Pret * e.Adaos * e.Bucati)
            .reduce(function (a, b) {
                return a + b;
            });

    useEffect(() => {
        // console.log(state.quote.quoteItems);
    }, [state.quote.quoteItems]);

    const handleModified = (e) => {
        e.preventDefault();
        let data = new FormData(e.target);
        let dataArr = [];

        for (let pair of data.entries()) {
            dataArr.push([pair[0], pair[1]]);
        }

        dispatch({
            type: 'UPDATE_PRODUCT',
            payload: {
                key: showModal.product,
                product: state.selectedItem,
                ...dataArr.reduce((accumulator, value) => {
                    return { ...accumulator, [value[0]]: value[1] };
                }, {})
            }
        });

        setShowModal({ state: false, product: null });
        return false;
    };

    return (
        <React.Fragment>
            <div>
                <img src="/images/pdf-logo.png" alt="" className="h-24 mx-auto object-contain" />
                <div className="text-center">
                    <h2 className="text-3xl uppercase font-semibold tracking-wider">oferta de pret</h2>
                    <h4>
                        Stimate domnule/doamna <strong>{refference}</strong>
                    </h4>
                    <h4>Va prezentam oferta noastra de pret:</h4>
                </div>

                <div className="border-b my-5" />

                {data &&
                    data.quoteItems.map((e, i) => (
                        <React.Fragment key={i}>
                            <div className="grid grid-cols-11 gap-5">
                                <div className="col-span-3 flex space-x-5">
                                    <div className="my-auto">
                                        <h2 className="text-2xl font-semibold">
                                            F{i + 1} / {e.Bucati} BUC
                                        </h2>
                                        <h2 className="text-lg">{product}</h2>
                                    </div>
                                </div>

                                <div className="col-span-3">
                                    {e.Inaltime && <p>Inaltime: {e.Inaltime}mm</p>}
                                    {e.Latime && <p>Latime: {e.Latime}mm</p>}
                                    {e.Lungime && <p>Lungime: {e.Lungime}mm</p>}
                                    {e.MetriiPatrati && <p>Metrii patrati: {e.MetriiPatrati} m2</p>}
                                    {e.Caseta && e.Caseta === 'Da' && <p>Caseta si ghidaje: Da</p>}
                                    {e.Model && <p>Model: {e.Model}</p>}
                                    {e.Vitrare && <p>Vitrare: {e.Vitrare}</p>}
                                    {e.Material && <p>Material: {e.Material}</p>}
                                    {e.Cureluse && <p>Cureluse: {e.Cureluse} buc</p>}
                                    {e.Fermoare && <p>Fermoare: {e.Fermoare} buc</p>}
                                    {e.Culoare && <p>Culoare: {e.Culoare}</p>}
                                    {e.Actionare && <p>Actionare: {e.Actionare}</p>}
                                </div>

                                <div className="col-span-3 mt-auto">
                                    <div>
                                        Pret unitar: {Number(e.Pret * e.Adaos).toFixed(2)} {currency ? 'EURO' : 'RON'}
                                    </div>
                                    <div>
                                        Valoare totala: {Number(e.Pret * e.Adaos * e.Bucati).toFixed(2)}{' '}
                                        {currency ? 'EURO' : 'RON'}
                                    </div>
                                </div>

                                <div className="col-span-2 my-auto flex justify-center space-x-2">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        className="mui-contained-primary "
                                        onClick={() => setShowModal({ state: true, product: e.key })}
                                    >
                                        Modifica
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        className="mui-contained-secondary"
                                        onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: e.key })}
                                    >
                                        Sterge
                                    </Button>
                                </div>

                                {/* Modal */}
                                <Modal
                                    open={showModal.product === e.key ? true : false}
                                    onClose={() => setShowModal(false)}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <div style={style}>
                                        <h4 className="text-2xl">{e.product}</h4>
                                        <Divider className="mb-5" />

                                        <form onSubmit={handleModified} className="space-y-2">
                                            {state.quote.quoteItems
                                                .filter((item) => item.key === showModal.product)
                                                .map((e, i) =>
                                                    Object.entries(e)
                                                        .slice(2, e.length)
                                                        .map((p, x) => (
                                                            <label htmlFor={e[0]} key={x}>
                                                                <span>{p[0]}</span>
                                                                <input
                                                                    type="text"
                                                                    name={p[0]}
                                                                    defaultValue={p[1]}
                                                                    className="border p-1 my-2 w-full"
                                                                />
                                                            </label>
                                                        ))
                                                )}

                                            <div className="flex justify-center space-x-5 pt-4">
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    className="mui-contained-primary"
                                                    type="submit"
                                                >
                                                    Modifica
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="danger"
                                                    size="small"
                                                    className="mui-contained-danger"
                                                    onClick={() => setShowModal(false)}
                                                >
                                                    Renunta
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                </Modal>
                            </div>
                            <div className="border-b my-5" />
                        </React.Fragment>
                    ))}

                <div className="flex justify-between">
                    <div>
                        <p>Montaj: {fitting === 'Da' ? 'Inclus in pret' : 'Fara Montaj'}</p>
                        <p>Total bucati: {pieces}</p>
                    </div>
                    <div className="w-60">
                        <div className="flex justify-between">
                            <p>Valoare lucrare: </p>
                            <p>
                                {Number(totalValue).toFixed(2)} {currency ? 'EURO' : 'RON'}
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p>Cota TVA 19%:</p>
                            <p>
                                {Number(totalValue * 1.19 - totalValue).toFixed(2)} {currency ? 'EURO' : 'RON'}
                            </p>
                        </div>

                        <div className="border-b my-1" />
                        <div className="flex justify-between">
                            <p className="text-lg font-medium">Total:</p>
                            <p className="text-lg font-medium">
                                {Number(totalValue * 1.19).toFixed(2)} {currency ? 'EURO' : 'RON'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="my-8" />

                <div>
                    <p>Modalitate de plata:</p>
                    <p>- avans 60% din valoarea lucrarii contractate</p>
                    <p>- 40% la terminarea montajului(sau a intrarea in posesie a produselor)</p>
                    <p>- reducere 4% pentru achitarea integrala(valabil pentru ofertele cu montaj)</p>
                </div>

                <div className="my-6" />

                <p className="mb-1">Cu respect,</p>
                {user && user === 'Ionut' && (
                    <div>
                        <p>Ionut Nita</p>
                        <p>+40 123 456 789</p>
                    </div>
                )}
                {user && user === 'Claudiu' && (
                    <div>
                        <p>Claudiu Miron</p>
                        <p>+40 123 456 789</p>
                    </div>
                )}
                {user && user === 'Adi' && (
                    <div>
                        <p>Adrian Ciucu</p>
                        <p>+40 123 456 789</p>
                    </div>
                )}

                <div className="my-6" />

                <div className="space-y-1">
                    <p className="text-lg">Promotion Business Team SRL</p>
                    <div>
                        <p>Email:</p>
                        <div className="pl-4">
                            <p>pbtromania@gmail.com</p>
                            <p>ofertare@pbtromania.ro</p>
                            <p>office@pbtromania.ro</p>
                        </div>
                    </div>
                    <div>
                        <p>Website:</p>
                        <div className="pl-4">
                            <p>https://www.pbtromania.ro</p>
                            <p>https://www.producatortermopane.com</p>
                        </div>
                    </div>
                    <div>
                        <p>Locatie:</p>
                        <p className="pl-4">Tudor Vladimirescu 393, Domnesti, Ilfov</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
