// src/pages/Reports.jsx
// PART 1

import { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";

import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import PageHeader from "../components/common/PageHeader";

import { getProperties } from "../services/propertyService";
import { getUnits } from "../services/unitService";
import { getTenants } from "../services/tenantService";
import { getAllTransactions } from "../services/transactionService";
import { getAllExpenses } from "../services/expenseService";

import {
  getReportSettings,
  saveReportSettings,
} from "../services/reportService";

export default function Reports() {
  const properties = getProperties();
  const units = getUnits();
  const tenants = getTenants();
  const transactions = getAllTransactions();
  const expenses = getAllExpenses();

  const [settings, setSettings] = useState(
    getReportSettings()
  );

  useEffect(() => {
    saveReportSettings(settings);
  }, [settings]);

  const report = useMemo(() => {
    const totalIncome = transactions.reduce(
      (sum, transaction) =>
        sum + Number(transaction.rentPaid || 0),
      0
    );

    const totalExpenses = expenses.reduce(
      (sum, expense) =>
        sum + Number(expense.amount || 0),
      0
    );

    const netProfit =
      totalIncome - totalExpenses;

    const cashFlow =
      netProfit -
      Number(settings.mortgage || 0) -
      Number(settings.otherCosts || 0);

    const paid = transactions.filter(
      (transaction) =>
        transaction.status === "Paid"
    ).length;

    const partial = transactions.filter(
      (transaction) =>
        transaction.status ===
        "Partially Paid"
    ).length;

    const due = transactions.filter(
      (transaction) =>
        transaction.status === "Due"
    ).length;

    return {
      totalIncome,
      totalExpenses,
      netProfit,
      cashFlow,
      paid,
      partial,
      due,
    };
  }, [transactions, expenses, settings]);

  function handleChange(e) {
    const { name, value } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function exportCSV() {
    const rows = [
      ["Financial Report"],
      [],
      ["Total Rental Income", report.totalIncome],
      ["Total Expenses", report.totalExpenses],
      ["Net Profit", report.netProfit],
      ["Mortgage", settings.mortgage],
      ["Other Monthly Costs", settings.otherCosts],
      ["Cash Flow Remaining", report.cashFlow],
      [],
      ["Paid", report.paid],
      ["Partially Paid", report.partial],
      ["Due", report.due],
    ];

    const csv = rows
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link =
      window.document.createElement("a");

    link.href = url;
    link.download = "gomo-report.csv";

    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  function exportPDF() {
    const pdf = new jsPDF();

    pdf.setFontSize(20);
    pdf.text(
      "GOMO Property Management",
      20,
      20
    );

    pdf.setFontSize(14);
    pdf.text("Financial Report", 20, 32);

    pdf.line(20, 38, 190, 38);

    pdf.setFontSize(12);

    let y = 50;

    const addRow = (label, value) => {
      pdf.text(label, 20, y);
      pdf.text(
        `R ${Number(value).toLocaleString()}`,
        140,
        y
      );
      y += 10;
    };

    addRow(
      "Total Rental Income",
      report.totalIncome
    );

    addRow(
      "Total Expenses",
      report.totalExpenses
    );

    addRow(
      "Net Profit",
      report.netProfit
    );

    addRow(
      "Mortgage",
      settings.mortgage
    );

    addRow(
      "Other Monthly Costs",
      settings.otherCosts
    );

    addRow(
      "Cash Flow Remaining",
      report.cashFlow
    );

    y += 10;

    pdf.line(20, y, 190, y);

    y += 15;

    pdf.text(
      `Paid Transactions: ${report.paid}`,
      20,
      y
    );

    y += 10;

    pdf.text(
      `Partially Paid: ${report.partial}`,
      20,
      y
    );

    y += 10;

    pdf.text(
      `Due: ${report.due}`,
      20,
      y
    );

    y += 20;

    pdf.text(
      `Generated: ${new Date().toLocaleDateString()}`,
      20,
      y
    );

    pdf.save("gomo-financial-report.pdf");
  }
  // PART 2

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Simple financial overview of your rental portfolio."
      >
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={exportCSV}
          >
            Export CSV
          </Button>

          <Button onClick={exportPDF}>
            Export PDF
          </Button>
        </div>
      </PageHeader>

      {/* Financial Summary */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        <Card>
          <p className="text-sm text-gray-500">
            Total Rental Income
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            R {report.totalIncome.toLocaleString()}
          </h2>
        </Card>

        <Card>
          <p className="text-sm text-gray-500">
            Total Expenses
          </p>

          <h2 className="mt-2 text-3xl font-bold text-red-600">
            R {report.totalExpenses.toLocaleString()}
          </h2>
        </Card>

        <Card>
          <p className="text-sm text-gray-500">
            Net Profit
          </p>

          <h2
            className={`mt-2 text-3xl font-bold ${
              report.netProfit >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            R {report.netProfit.toLocaleString()}
          </h2>
        </Card>

        <Card>
          <p className="text-sm text-gray-500">
            Cash Flow Remaining
          </p>

          <h2
            className={`mt-2 text-3xl font-bold ${
              report.cashFlow >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            R {report.cashFlow.toLocaleString()}
          </h2>
        </Card>

      </div>

      {/* Mortgage */}

      <Card>
        <h2 className="mb-5 text-xl font-semibold">
          Mortgage & Monthly Costs
        </h2>

        <div className="grid gap-4 md:grid-cols-2">

          <Input
            label="Monthly Mortgage (R)"
            type="number"
            name="mortgage"
            value={settings.mortgage}
            onChange={handleChange}
          />

          <Input
            label="Other Monthly Costs (R)"
            type="number"
            name="otherCosts"
            value={settings.otherCosts}
            onChange={handleChange}
          />

        </div>

        <div className="mt-6 rounded-lg bg-blue-50 p-4">

          <div className="flex justify-between">
            <span>Rental Income</span>
            <strong>
              R {report.totalIncome.toLocaleString()}
            </strong>
          </div>

          <div className="mt-2 flex justify-between">
            <span>Expenses</span>
            <strong>
              - R {report.totalExpenses.toLocaleString()}
            </strong>
          </div>

          <div className="mt-2 flex justify-between">
            <span>Mortgage</span>
            <strong>
              - R {Number(settings.mortgage).toLocaleString()}
            </strong>
          </div>

          <div className="mt-2 flex justify-between">
            <span>Other Costs</span>
            <strong>
              - R {Number(settings.otherCosts).toLocaleString()}
            </strong>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-lg font-bold">
            <span>Cash Flow Remaining</span>

            <span
              className={
                report.cashFlow >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              R {report.cashFlow.toLocaleString()}
            </span>
          </div>

        </div>
      </Card>

      {/* Rent Collection Status */}

      <div className="grid gap-4 md:grid-cols-3">

        <Card>
          <p className="text-sm text-gray-500">
            Paid
          </p>

          <h2 className="mt-2 text-4xl font-bold text-green-600">
            {report.paid}
          </h2>
        </Card>

        <Card>
          <p className="text-sm text-gray-500">
            Partially Paid
          </p>

          <h2 className="mt-2 text-4xl font-bold text-yellow-500">
            {report.partial}
          </h2>
        </Card>

        <Card>
          <p className="text-sm text-gray-500">
            Due
          </p>

          <h2 className="mt-2 text-4xl font-bold text-red-600">
            {report.due}
          </h2>
        </Card>

      </div>
    </div>
  );
}