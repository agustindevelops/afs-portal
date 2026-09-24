export type DimeInputs = {
  debt: number;
  annualIncome: number;
  incomeYears: number;
  mortgage: number;
  education: number;
};

export type DimeBreakdown = {
  debt: number;
  income: number;
  mortgage: number;
  education: number;
  total: number;
};

export function calculateDime(inputs: DimeInputs): DimeBreakdown {
  const debt = Math.max(0, inputs.debt);
  const income = Math.max(0, inputs.annualIncome) * Math.max(0, inputs.incomeYears);
  const mortgage = Math.max(0, inputs.mortgage);
  const education = Math.max(0, inputs.education);

  return {
    debt,
    income,
    mortgage,
    education,
    total: debt + income + mortgage + education,
  };
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
