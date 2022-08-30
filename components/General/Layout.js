import React from 'react';
import Head from 'next/head';

import Navigation from '../Navigation';

export default function Layout({ title, description, pageID, children }) {
    return (
        <React.Fragment>
            <Head>
                <title>{title ? `${title} | PBT Ofertare` : 'PBT Ofertare'}</title>
                {description && <meta name="description" content={description} />}
            </Head>

            <div className={`page-${pageID}`}>
                <div className="flex">
                    <Navigation />

                    <div className="grow">
                        <div className="bg-white border-b" style={{ height: '73px' }} />
                        <React.Fragment>{children}</React.Fragment>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
