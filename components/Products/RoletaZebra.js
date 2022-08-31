import React, { useState, useContext } from 'react';
import {
    Divider,
    Switch,
    FormControl,
    FormLabel,
    FormControlLabel,
    TextField,
    RadioGroup,
    Radio,
    Button
} from '@mui/material';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Store } from '../../utils/StateProvider';
import PDFMockup from '../Dynamic/PDFMockup';
import QuotePDF from '../Dynamic/QuotePDF';

export default function RoletaZebra() {
    const { state, dispatch } = useContext(Store);

    const [currency, setCurrency] = useState(false);
    const [refference, setReffecence] = useState('');
    const [fitting, setFitting] = useState('');
    const [user, setUser] = useState('');

    const handleForm = (e) => {
        e.preventDefault();
        let data = new FormData(e.target);
        let dataArr = [];

        for (let pair of data.entries()) {
            dataArr.push([pair[0], pair[1]]);
        }

        dispatch({
            type: 'ADD_PRODUCT',
            payload: {
                key: state.quote.quoteItems.length,
                product: state.selectedItem,
                ...dataArr.reduce((accumulator, value) => {
                    return { ...accumulator, [value[0]]: value[1] };
                }, {})
            }
        });

        return false;
    };

    return (
        <div className="product-container container space-y-4">
            <div className="flex justify-between items-center bg-white shadow p-5">
                <div>
                    <h1 className="product-title">Roleta Zebra</h1>
                    <div className="flex space-x-2">
                        <h4>Obtinere pret:</h4>
                        <a
                            href="mailto:office@jaluzele-rulouri.ro"
                            className="underline text-blue-400"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            office@jaluzele-rulouri.ro
                        </a>
                    </div>
                </div>

                <div className="flex flex-row items-center space-x-10">
                    <TextField
                        type="text"
                        name="Referinta"
                        label="Referinta proiect"
                        variant="filled"
                        onChange={(e) => setReffecence(e.target.value)}
                        className="w-96"
                    />

                    <div className="curreny-container">
                        <div className="flex items-center">
                            <h6>RON</h6>
                            <Switch onChange={(e) => setCurrency(e.target.checked)} />
                            <h6>EURO</h6>
                        </div>
                    </div>
                </div>
            </div>

            <form onSubmit={handleForm} className="bg-white shadow p-5 space-y-5">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                    <TextField className="grow" type="number" name="Inaltime" label="Inaltime" variant="filled" />
                    <TextField className="grow" type="number" name="Latime" label="Latime" variant="filled" />
                    <TextField className="grow" type="text" name="Material" label="Material" variant="filled" />
                    <TextField className="grow" type="number" name="Bucati" label="Bucati" variant="filled" />
                    <TextField
                        className="grow"
                        type="number"
                        name="Pret"
                        id="price"
                        label="Pret"
                        variant="filled"
                        inputProps={{
                            step: 0.01
                        }}
                    />
                    <TextField
                        className="grow"
                        type="number"
                        name="Adaos"
                        label="Adaos (%)"
                        variant="filled"
                        inputProps={{
                            step: 0.01
                        }}
                    />
                </div>

                <div className="flex justify-between">
                    <div className="flex space-x-10">
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Actionare</FormLabel>
                            <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="Actionare">
                                <FormControlLabel value="Electric" control={<Radio />} label="Electric" />
                                <FormControlLabel value="Manual" control={<Radio />} label="Manual" />
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Caseta si ghidaje</FormLabel>
                            <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="Caseta">
                                <FormControlLabel value="Da" control={<Radio />} label="Da" />
                                <FormControlLabel value="Nu" control={<Radio />} label="Nu" />
                            </RadioGroup>
                        </FormControl>
                    </div>

                    <div className="mt-auto">
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            type="submit"
                            className="mui-contained-secondary"
                        >
                            Adauga
                        </Button>
                    </div>
                </div>
            </form>

            {state.quote && state.quote.quoteItems.length >= 1 && (
                <div className="pdf-container bg-white shadow p-5 space-y-5">
                    <PDFMockup
                        currency={currency}
                        refference={refference}
                        product={state.selectedItem}
                        data={state.quote}
                        fitting={fitting}
                        user={user}
                    />

                    <Divider />

                    <div className="flex justify-between">
                        <div className="flex divide-x">
                            <div className="pr-2">
                                <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label">Montaj</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="Montaj"
                                        onChange={(e) => setFitting(e.target.value)}
                                        row
                                    >
                                        <FormControlLabel value="Da" control={<Radio />} label="Da" />
                                        <FormControlLabel value="Nu" control={<Radio />} label="Nu" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div className="pl-4">
                                <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label">Oferta realizata de:</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="by_user"
                                        onChange={(e) => setUser(e.target.value)}
                                        row
                                    >
                                        <FormControlLabel value="Ionut" control={<Radio />} label="Ionut" />
                                        <FormControlLabel value="Claudiu" control={<Radio />} label="Claudiu" />
                                        <FormControlLabel value="Adi" control={<Radio />} label="Adi" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>

                        {user && (
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                type="submit"
                                className="mui-contained-secondary my-auto"
                            >
                                <PDFDownloadLink
                                    document={
                                        <QuotePDF
                                            currency={currency}
                                            refference={refference}
                                            product={state.selectedItem}
                                            data={state.quote}
                                            fitting={fitting}
                                            user={user}
                                        />
                                    }
                                    fileName={`OF_${state.selectedItem}_${refference}.pdf`}
                                    className=""
                                >
                                    {({ blob, url, loading, error }) =>
                                        loading ? 'Incarcare document...' : 'Descarca oferta'
                                    }
                                </PDFDownloadLink>
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}