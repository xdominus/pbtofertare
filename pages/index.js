import React, { useState, useEffect, useContext } from 'react';
import Layout from '../components/General/Layout';
import { Store } from '../utils/StateProvider';
import {
    PlasaPlisse,
    RulouFolieNecasetat,
    RulouFolieCasetat,
    FolieCapseBride,
    RoletaTextila,
    RoletaZebra,
    JaluzeleVerticale,
    PanelOrnamental
} from '../components/Products';

export default function Home() {
    const { state, dispatch } = useContext(Store);
    const { selectedItem } = state;

    const handleProduct = () => {
        switch (state.selectedItem) {
            case 'Plasa Plisse':
                return <PlasaPlisse />;
            case 'Rulou de Folie Necasetat':
                return <RulouFolieNecasetat />;
            case 'Rulou de Folie Casetat':
                return <RulouFolieCasetat />;
            case 'Folie cu Capse si Bride':
                return <FolieCapseBride />;
            case 'Roleta Textila':
                return <RoletaTextila />;
            case 'Roleta Zebra':
                return <RoletaZebra />;
            case 'Jaluzele Verticale':
                return <JaluzeleVerticale />;
            case 'Panel Ornamental':
                return <PanelOrnamental />;

            default:
                break;
        }
    };

    return (
        <Layout>
            <div className="p-5 pb-16">{handleProduct()}</div>
        </Layout>
    );
}
