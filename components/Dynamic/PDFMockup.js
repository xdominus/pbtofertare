import React, { useContext } from 'react';
import { Store } from '../../utils/StateProvider';
import { Button } from '@mui/material';

export default function PDFMockup({ currency, refference, product, data, fitting, user }) {
    const { state, dispatch } = useContext(Store);
    const {
        quote: { quoteItems }
    } = state;

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

    return (
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
                        <div className="grid grid-cols-10 gap-5">
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

                            <div className="col-span-1 my-auto flex justify-center">
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
    );
}
