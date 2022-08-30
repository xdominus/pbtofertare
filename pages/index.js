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
            case 'Panel Ornamental':
                return <PanelOrnamental />;

            default:
                break;
        }
    };

    return (
        <Layout>
            <div className="pb-16">
                <div className="container p-5">{handleProduct()}</div>
            </div>
        </Layout>
    );
}
