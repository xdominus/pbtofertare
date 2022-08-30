import React from 'react';
import { Page, Image, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

export default function QuotePDF({ currency, refference, product, data, fitting, user }) {
    const styles = StyleSheet.create({
        page: {
            fontSize: '9px',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px 40px',
            backgroundColor: 'white'
        },
        headerImage: {
            height: '80px',
            width: '100%',
            objectFit: 'contain',
            display: 'flex',
            margin: '0 auto'
        },
        header: {
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            title: {
                fontSize: '24px',
                fontWeight: '600'
            }
        },
        orderDetails: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        price: {
            margin: '2px 0',
            width: '150px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        priceTotal: {
            fontSize: '12px'
        },
        divider: {
            margin: '10px 0',
            borderBottom: '1px solid #ddd'
        }
    });

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
        <Document>
            <Page size="A4" style={styles.page} wrap>
                <Image src="/images/pdf-logo.png" alt="" style={styles.headerImage} />
                <View style={styles.header}>
                    <Text style={styles.header.title}>OFERTA DE PRET</Text>
                    <Text>Stimate domnule/doamna {refference}</Text>
                    <Text>Va prezentam oferta noastra de pret:</Text>
                </View>

                <View style={styles.divider} />

                {data &&
                    data.quoteItems.map((e, i) => (
                        <View key={i}>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: '100%'
                                }}
                            >
                                <View>
                                    <Text style={{ fontSize: '11px', fontWeight: '600' }}>
                                        F{i + 1} / {e.Bucati} BUC
                                    </Text>
                                    <Text>{product}</Text>
                                </View>

                                <View>
                                    {e.Inaltime && <Text>Inaltime: {e.Inaltime}mm</Text>}
                                    {e.Latime && <Text>Latime: {e.Latime}mm</Text>}
                                    {e.Lungime && <Text>Lungime: {e.Lungime}mm</Text>}
                                    {e.MetriiPatrati && <Text>Metrii patrati: {e.MetriiPatrati} m2</Text>}
                                    {e.Material && <Text>Material: {e.Material}</Text>}
                                    {e.Model && <Text>Material: {e.Model}</Text>}
                                    {e.Caseta && e.Caseta === 'Da' && <Text>Caseta si ghidaje: Da</Text>}
                                    {e.Cureluse && <Text>Cureluse: {e.Cureluse} buc</Text>}
                                    {e.Fermoare && <Text>Fermoare: {e.Fermoare} buc</Text>}
                                    {e.Culoare && <Text>Culoare: {e.Culoare}</Text>}
                                    {e.Actionare && <Text>Actionare: {e.Actionare}</Text>}
                                </View>

                                <View style={{ marginTop: 'auto' }}>
                                    <View style={styles.price}>
                                        <Text>Pret unitar:</Text>
                                        <Text>
                                            {Number(e.Pret * e.Adaos).toFixed(2)} {currency ? 'EURO' : 'RON'}
                                        </Text>
                                    </View>
                                    <View style={styles.price}>
                                        <Text>Valoare totala:</Text>
                                        <Text>
                                            {Number(e.Pret * e.Adaos * e.Bucati).toFixed(2)} {currency ? 'EURO' : 'RON'}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.divider} />
                        </View>
                    ))}

                <View style={styles.orderDetails}>
                    <View>
                        <Text>Total bucati: {pieces}</Text>
                        <Text>Montaj: {fitting === 'Da' ? 'Inclus in pret' : fitting}</Text>
                    </View>
                    <View>
                        <View style={styles.price}>
                            <Text>Valoare Lucrare: </Text>
                            <Text>
                                {Number(totalValue).toFixed(2)} {currency ? 'EURO' : 'RON'}
                            </Text>
                        </View>
                        <View style={styles.price}>
                            <Text>Cota TVA 19%:</Text>
                            <Text>
                                {Number(totalValue * 1.19 - totalValue).toFixed(2)} {currency ? 'EURO' : 'RON'}
                            </Text>
                        </View>
                        <View
                            style={{
                                width: '100%',
                                margin: '1px 0',
                                borderBottom: '1px solid #ddd'
                            }}
                        />
                        <View style={styles.price}>
                            <Text style={styles.priceTotal}>Total:</Text>
                            <Text style={styles.priceTotal}>
                                {Number(totalValue * 1.19).toFixed(2)} {currency ? 'EURO' : 'RON'}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: '25px' }}>
                    <Text>Modalitate de plata:</Text>
                    <Text>- avans 60% din valoarea lucrarii contractate</Text>
                    <Text>- 40% la terminarea montajului</Text>
                    <Text>- reducere 4% pentru achitarea integrala(valabil pentru ofertele cu montaj)</Text>
                </View>

                <View style={{ marginTop: '20px' }}>
                    <Text style={{ marginBottom: '2px' }}>Cu respect,</Text>
                    {user && user === 'Ionut' && (
                        <View style={{ display: 'flex', flexDirection: 'column' }}>
                            <Text>Ionut Nita</Text>
                            <Text>+40 123 456 789</Text>
                        </View>
                    )}
                    {user && user === 'Claudiu' && (
                        <View style={{ display: 'flex', flexDirection: 'column' }}>
                            <Text>Claudiu Miron</Text>
                            <Text>+40 123 456 789</Text>
                        </View>
                    )}
                    {user && user === 'Adi' && (
                        <View style={{ display: 'flex', flexDirection: 'column' }}>
                            <Text>Adrian Ciucu</Text>
                            <Text>+40 123 456 789</Text>
                        </View>
                    )}
                </View>

                <View style={{ marginTop: '20px' }}>
                    <Text style={{ fontSize: '12px' }}>PROMOTION BUSINESS TEAM SRL</Text>
                    <View style={{ margin: '2px 0' }} />

                    <Text>Email:</Text>
                    <Text>pbtromania@gmail.com</Text>
                    <Text>ofertare@pbtromania.ro</Text>
                    <Text>office@pbtromania.ro</Text>
                    <View style={{ margin: '2px 0' }} />

                    <Text>Website:</Text>
                    <Text>https://www.pbtromania.ro</Text>
                    <Text>https://www.producatortermopane.com</Text>
                    <View style={{ margin: '2px 0' }} />

                    <Text>Locatie:</Text>
                    <Text>Soseaua Tudor Vladimirescu 393</Text>
                    <Text>Domnesti, Ilfov</Text>
                </View>
            </Page>
        </Document>
    );
}
