// App.js
import React from 'react';
import BillDetails from './components/BillDetails';
import ItemList from './components/ItemList';
import TotalAmount from './components/TotalAmount';
import { PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 20,
    },
    table: {
        display: 'table',
        width: 'auto',
        marginBottom: 10,
        borderStyle: 'solid',
        borderColor: '#000',
        borderWidth: 1,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    tableCol: {
        width: '20%',
        borderRightWidth: 1,
        borderRightColor: '#000',
        padding: 5,
    },
    tableCell: {
        textAlign: 'center',
    },
    header: {
        backgroundColor: '#f0f0f0',
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 20,
    },
});

const MyDocument = ({ items, totalAmount, tax, taxAmount, totalWithTax }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text>Invoice</Text>
            <View style={styles.table}>
                <View style={[styles.tableRow, styles.header]}>
                    {['Sno', 'Item', 'Quantity', 'Price', 'Amount'].map((header, index) => (
                        <View style={styles.tableCol} key={index}>
                            <Text style={styles.tableCell}>{header}</Text>
                        </View>
                    ))}
                </View>
                {items.map((item, index) => (
                    <View style={styles.tableRow} key={index}>
                        {[index + 1, item.item, item.quantity, `$${parseFloat(item.price).toFixed(2)}`, `$${(item.price * item.quantity).toFixed(2)}`].map((value, idx) => (
                            <View style={styles.tableCol} key={idx}>
                                <Text style={styles.tableCell}>{value}</Text>
                            </View>
                        ))}
                    </View>
                ))}
            </View>
            <View style={styles.footer}>
                <Text>Total Amount: ${totalAmount.toFixed(2)}</Text>
                <Text>Tax ({tax}%): ${taxAmount.toFixed(2)}</Text>
                <Text>Total with Tax: ${totalWithTax.toFixed(2)}</Text>
            </View>
        </Page>
    </Document>
);

const App = () => {
    const [items, setItems] = React.useState([]);
    const [tax, setTax] = React.useState(10);

    const handleAddItem = (item) => {
        setItems([...items, item]);
    };

    const handleDeleteItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };

    const handleUpdateItem = (index, key, value) => {
        const updatedItems = [...items];
        updatedItems[index][key] = value;
        setItems(updatedItems);
    };

    const calculateTotalAmount = () => {
        return items.reduce(
            (total, item) => total + item.quantity * item.price,
            0
        );
    };

    const totalAmount = calculateTotalAmount();
    const taxAmount = totalAmount * (tax / 100);
    const totalWithTax = totalAmount + taxAmount;

    return (
        <div className="bg-light text-center p-5">
            <h1>Invoice Generator</h1>
            <BillDetails onAddItem={handleAddItem} />
            <ItemList items={items} onDeleteItem={handleDeleteItem} onUpdateItem={handleUpdateItem} />
            <TotalAmount items={items} tax={tax} total={calculateTotalAmount()} />
            {items.length > 0 && (
                <PDFDownloadLink 
                    document={<MyDocument items={items} totalAmount={totalAmount} tax={tax} taxAmount={taxAmount} totalWithTax={totalWithTax} />} 
                    fileName="invoice.pdf"
                    className='btn btn-primary'
                >
                    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
                </PDFDownloadLink>
            )}
        </div>
    );
};

export default App;
