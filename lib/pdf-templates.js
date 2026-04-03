// PDF Templates for Village Financial Documents
// Based on Kabupaten Banjarnegara format

import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Helper function
function formatRupiah(angka) {
  if (!angka) return '0';
  return new Intl.NumberFormat('id-ID').format(angka);
}

// Styles
const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: 'Helvetica' },
  kopContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingBottom: 10, borderBottom: '3px solid black' },
  kopLogo: { width: 70, height: 70, marginRight: 15 },
  kopText: { flex: 1, textAlign: 'center' },
  kopPemkab: { fontSize: 11, fontWeight: 'bold', marginBottom: 2 },
  kopKecamatan: { fontSize: 11, fontWeight: 'bold', marginBottom: 2 },
  kopDesa: { fontSize: 12, fontWeight: 'bold', marginBottom: 2 },
  kopAlamat: { fontSize: 8, marginBottom: 1 },
  docTitle: { fontSize: 12, fontWeight: 'bold', textAlign: 'center', textDecoration: 'underline', marginBottom: 5 },
  docSubtitle: { fontSize: 10, textAlign: 'center', marginBottom: 15 },
  table: { width: '100%', marginBottom: 15 },
  tableRow: { flexDirection: 'row', borderBottom: '1px solid #000' },
  tableHeader: { backgroundColor: '#e5e5e5', fontWeight: 'bold' },
  tableCell: { padding: 5, fontSize: 9, borderRight: '1px solid #000', flex: 1 },
  tableCellLast: { padding: 5, fontSize: 9, flex: 1 },
  ttdContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, paddingHorizontal: 20 },
  ttdBox: { width: '40%', textAlign: 'center' },
  ttdRole: { fontSize: 10, fontWeight: 'bold', marginBottom: 50 },
  ttdName: { fontSize: 10, fontWeight: 'bold', textDecoration: 'underline' },
  ttdNip: { fontSize: 8 },
  content: { marginBottom: 10, lineHeight: 1.5 },
  label: { fontSize: 10, marginBottom: 3 },
  value: { fontSize: 10, marginBottom: 8 },
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, textAlign: 'center', fontSize: 8, color: '#666' },
  pageNumber: { position: 'absolute', bottom: 30, right: 40, fontSize: 8 },
});

// ========== TEMPLATE 1: BERITA ACARA SERAH TERIMA ==========
export const BeritaAcaraTemplate = (props) => {
  const data = props.data || {};
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.kopContainer}>
          <Image style={styles.kopLogo} src="/logo.png" />
          <View style={styles.kopText}>
            <Text style={styles.kopPemkab}>PEMERINTAH KABUPATEN BANJARNEGARA</Text>
            <Text style={styles.kopKecamatan}>KECAMATAN {(data.kecamatan || '').toUpperCase()}</Text>
            <Text style={styles.kopDesa}>DESA {(data.namaDesa || '').toUpperCase()}</Text>
            <Text style={styles.kopAlamat}>{data.alamat || 'Alamat Desa'}</Text>
          </View>
        </View>

        <Text style={styles.docTitle}>BERITA ACARA SERAH TERIMA</Text>
        <Text style={styles.docSubtitle}>Nomor: {data.nomorDokumen || '....../......../2026'}</Text>

        <View style={styles.content}>
          <Text style={styles.label}>Pada hari ini {data.hari || '..................'}, tanggal {data.tanggal || '........'} bulan {data.bulan || '........'} tahun {data.tahun || '2026'}, telah dilaksanakan serah terima:</Text>
        </View>

        <View style={styles.content}>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>A. PIHAK PERTAMA (Yang Menyerahkan):</Text>
          <Text style={styles.value}>Nama: {data.pihakPertamaNama || '............................'}</Text>
          <Text style={styles.value}>Jabatan: {data.pihakPertamaJabatan || '............................'}</Text>
        </View>

        <View style={styles.content}>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>B. PIHAK KEDUA (Yang Menerima):</Text>
          <Text style={styles.value}>Nama: {data.pihakKeduaNama || '............................'}</Text>
          <Text style={styles.value}>Jabatan: {data.pihakKeduaJabatan || '............................'}</Text>
        </View>

        <View style={styles.content}>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>C. BARANG/JASA YANG DISERAHKAN:</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell, { flex: 0.5 }]}>No</Text>
              <Text style={styles.tableCell}>Uraian Barang/Jasa</Text>
              <Text style={[styles.tableCell, { flex: 0.8 }]}>Volume</Text>
              <Text style={[styles.tableCellLast, { flex: 1.2 }]}>Keterangan</Text>
            </View>
            {(data.items || []).map((item, i) => (
              <View key={i} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 0.5 }]}>{i + 1}</Text>
                <Text style={styles.tableCell}>{item.uraian}</Text>
                <Text style={[styles.tableCell, { flex: 0.8 }]}>{item.volume}</Text>
                <Text style={[styles.tableCellLast, { flex: 1.2 }]}>{item.keterangan}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.label}>Demikian berita acara serah terima ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.</Text>
        </View>

        <View style={styles.ttdContainer}>
          <View style={styles.ttdBox}>
            <Text style={styles.ttdRole}>PIHAK PERTAMA</Text>
            <Text style={styles.ttdName}>{data.pihakPertamaNama || '............................'}</Text>
            <Text style={styles.ttdNip}>{data.pihakPertamaNip || 'NIP. ............................'}</Text>
          </View>
          <View style={styles.ttdBox}>
            <Text>{data.tempat || 'Desa'}, {data.tanggal || '........'} {data.bulan || '........'} {data.tahun || '2026'}</Text>
            <Text style={styles.ttdRole}>PIHAK KEDUA</Text>
            <Text style={styles.ttdName}>{data.pihakKeduaNama || '............................'}</Text>
            <Text style={styles.ttdNip}>{data.pihakKeduaNip || 'NIP. ............................'}</Text>
          </View>
        </View>

        <Text style={styles.footer} fixed>Dokumen ini dicetak oleh Sistem Verifikasi Keuangan Desa</Text>
      </Page>
    </Document>
  );
};

// Export all templates
export const Templates = {
  beritaAcara: BeritaAcaraTemplate,
};
