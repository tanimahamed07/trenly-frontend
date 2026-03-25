import { TOrder } from "@/types/order";

export const generateInvoice = async (order: TOrder) => {
  if (typeof window === "undefined") return;

  const { pdf, Document, Page, Text, View, StyleSheet } =
    await import("@react-pdf/renderer");

  const item = order.itemId as any;

  const styles = StyleSheet.create({
    page: { padding: 40, fontFamily: "Helvetica" },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 30,
    },
    brand: { fontSize: 24, fontFamily: "Helvetica-Bold", color: "#4F46E5" },
    brandSub: { fontSize: 10, color: "#6B7280", marginTop: 4 },
    invoiceTitle: {
      fontSize: 20,
      fontFamily: "Helvetica-Bold",
      textAlign: "right",
    },
    invoiceMeta: {
      fontSize: 10,
      color: "#6B7280",
      textAlign: "right",
      marginTop: 4,
    },
    divider: { borderBottom: "1px solid #E5E7EB", marginVertical: 20 },
    tableHeader: {
      flexDirection: "row",
      backgroundColor: "#4F46E5",
      padding: "10 12",
      borderRadius: 4,
    },
    tableRow: {
      flexDirection: "row",
      padding: "10 12",
      borderBottom: "1px solid #F3F4F6",
    },
    tableHeaderText: {
      color: "#FFFFFF",
      fontSize: 10,
      fontFamily: "Helvetica-Bold",
    },
    tableText: { fontSize: 10, color: "#374151" },
    col1: { flex: 3 },
    col2: { flex: 1, textAlign: "center" },
    col3: { flex: 1, textAlign: "right" },
    totalRow: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: 16,
    },
    totalBox: {
      backgroundColor: "#F5F3FF",
      padding: "10 16",
      borderRadius: 6,
      flexDirection: "row",
      gap: 12,
    },
    totalLabel: {
      fontSize: 12,
      fontFamily: "Helvetica-Bold",
      color: "#4F46E5",
    },
    totalValue: {
      fontSize: 12,
      fontFamily: "Helvetica-Bold",
      color: "#111827",
    },
    badge: {
      padding: "4 10",
      borderRadius: 4,
      fontSize: 9,
      fontFamily: "Helvetica-Bold",
    },
    footer: {
      position: "absolute",
      bottom: 30,
      left: 40,
      right: 40,
      textAlign: "center",
    },
    footerText: { fontSize: 9, color: "#9CA3AF" },
  });

  const statusColor: Record<string, string> = {
    paid: "#D1FAE5",
    unpaid: "#FEE2E2",
    pending: "#FEF3C7",
  };

  const InvoiceDoc = (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>TRENDLY</Text>
            <Text style={styles.brandSub}>Sirajganj & Dhaka, Bangladesh</Text>
            <Text style={styles.brandSub}>support@trendly.com</Text>
          </View>
          <View>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.invoiceMeta}>
              #{order._id.slice(-8).toUpperCase()}
            </Text>
            <Text style={styles.invoiceMeta}>
              {new Date(order.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Table */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, styles.col1]}>Product</Text>
          <Text style={[styles.tableHeaderText, styles.col2]}>Qty</Text>
          <Text style={[styles.tableHeaderText, styles.col2]}>Unit Price</Text>
          <Text style={[styles.tableHeaderText, styles.col3]}>Total</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={[styles.tableText, styles.col1]}>
            {item?.title || "Product"}
          </Text>
          <Text style={[styles.tableText, styles.col2]}>{order.quantity}</Text>
          <Text style={[styles.tableText, styles.col2]}>
            ${order.price.toFixed(2)}
          </Text>
          <Text style={[styles.tableText, styles.col3]}>
            ${(order.price * order.quantity).toFixed(2)}
          </Text>
        </View>

        {/* Total */}
        <View style={styles.totalRow}>
          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Grand Total:</Text>
            <Text style={styles.totalValue}>
              ${(order.price * order.quantity).toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Payment Status Badge */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 10,
          }}
        >
          <Text
            style={[
              styles.badge,
              {
                backgroundColor: statusColor[order.paymentStatus] || "#F3F4F6",
              },
            ]}
          >
            Payment: {order.paymentStatus.toUpperCase()}
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Thank you for shopping with Trendly! For support:
            support@trendly.com
          </Text>
        </View>
      </Page>
    </Document>
  );

  const blob = await pdf(InvoiceDoc).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Invoice_${order._id.slice(-6).toUpperCase()}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
};
