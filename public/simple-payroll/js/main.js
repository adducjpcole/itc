'use strict';

/**
 * @typedef {Object} PayrollEntry
 * @prop {string} employeeName
 * @prop {number} daysWorked
 * @prop {number} dailyRate
 * @prop {number} deductionAmount
 */

window.addEventListener('load', () => {
  document
    .getElementById('form--create_entry')
    ?.addEventListener('submit', (ev) => {
      ev.preventDefault();

      const employeeName = /** @type {HTMLInputElement?} */ (
        document.getElementById('employee_name')
      );
      const daysWorked = /** @type {HTMLInputElement?} */ (
        document.getElementById('days_worked')
      );
      const dailyRate = /** @type {HTMLInputElement?} */ (
        document.getElementById('daily_rate')
      );
      const deductionAmount = /** @type {HTMLInputElement?} */ (
        document.getElementById('deduction_amount')
      );
      if (!(employeeName && daysWorked && dailyRate && deductionAmount))
        throw new Error('Something went wrong.');

      const table = /** @type {HTMLTableElement?} */ (
        document.getElementById('table--payroll_table')
      );
      if (!table) throw new Error('Something went wrong');

      const tbody = table.tBodies[0];
      tbody.appendChild(
        createTableRow(
          tbody.rows.length,
          employeeName,
          daysWorked,
          dailyRate,
          deductionAmount,
        ),
      );
    });

  document
    .getElementById('form--delete_entry')
    ?.addEventListener('submit', (ev) => {
      ev.preventDefault();

      const deleteLineNumber = /** @type {HTMLInputElement?} */ (
        document.getElementById('delete_line_number')
      );
      if (!deleteLineNumber) throw new Error('Something went wrong');

      const table = /** @type {HTMLTableElement?} */ (
        document.getElementById('table--payroll_table')
      );
      if (!(table && deleteLineNumber)) throw new Error('Something went wrong');

      deleteTableRow(table.tBodies[0], Number(deleteLineNumber.value) - 1);
    });
});

/**
 * @param {number} rows_length
 * @param {HTMLInputElement} employeeName
 * @param {HTMLInputElement} daysWorked
 * @param {HTMLInputElement} dailyRate
 * @param {HTMLInputElement} deductionAmount
 */
function createTableRow(
  rows_length,
  employeeName,
  daysWorked,
  dailyRate,
  deductionAmount,
) {
  const tr = document.createElement('tr');

  const th = document.createElement('th');
  th.scope = 'row';
  th.innerText = (rows_length + 1).toString();
  tr.appendChild(th);

  const td_employeeName = document.createElement('td');
  td_employeeName.innerText = employeeName.value.trim();
  tr.appendChild(td_employeeName);

  const value_daysWorked = Number(daysWorked.value);
  const td_daysWorked = document.createElement('td');
  td_daysWorked.innerText = `${value_daysWorked} days`;
  tr.appendChild(td_daysWorked);

  const value_dailyRate = Number(dailyRate.value);
  const td_dailyRate = document.createElement('td');
  td_dailyRate.innerText = `${value_dailyRate.toLocaleString('en-PH', {
    style: 'currency',
    currency: 'PHP',
  })} per day`;
  tr.appendChild(td_dailyRate);

  const value_grossPay = value_daysWorked * value_dailyRate;
  const td_grossPay = document.createElement('td');
  td_grossPay.innerText = value_grossPay.toLocaleString('en-PH', {
    style: 'currency',
    currency: 'PHP',
  });
  tr.appendChild(td_grossPay);

  const value_deductionAmount = Number(deductionAmount.value);
  const td_deductionAmount = document.createElement('td');
  td_deductionAmount.innerText = value_deductionAmount.toLocaleString('en-PH', {
    style: 'currency',
    currency: 'PHP',
  });
  tr.appendChild(td_deductionAmount);

  const td_netPay = document.createElement('td');
  td_netPay.innerText = (value_grossPay - value_deductionAmount).toLocaleString(
    'en-PH',
    {
      style: 'currency',
      currency: 'PHP',
    },
  );
  tr.appendChild(td_netPay);

  return tr;
}

/**
 * @param {HTMLTableSectionElement} tbody
 * @param {number} index
 */
function deleteTableRow(tbody, index) {
  tbody.deleteRow(index);

  for (let i = index; i < tbody.rows.length; i++) {
    const th = tbody.rows[i].cells[0];

    th.innerText = (Number(th.innerText) - 1).toString();
  }
}
