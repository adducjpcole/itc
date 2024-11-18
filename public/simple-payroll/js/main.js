'use strict';

/**
 * @typedef {Object} PayrollEntry
 * @prop {string} employeeName
 * @prop {number} daysWorked
 * @prop {number} dailyRate
 * @prop {number} deductionAmount
 */

window.addEventListener('load', () => {
  const employeeName = /** @type {HTMLInputElement?} */ (
    document.getElementById('employee-name')
  );
  if (!employeeName) throw new Error('Something went wrong');

  // Remove trailing and leading spaces.
  employeeName.addEventListener(
    'input',
    () => (employeeName.value = employeeName.value.trim()),
  );

  document
    .getElementById('form--create-entry')
    ?.addEventListener('submit', (ev) => {
      ev.preventDefault();

      const daysWorked = /** @type {HTMLInputElement?} */ (
        document.getElementById('days-worked')
      );
      const dailyRate = /** @type {HTMLInputElement?} */ (
        document.getElementById('daily-rate')
      );
      const deductionAmount = /** @type {HTMLInputElement?} */ (
        document.getElementById('deduction-amount')
      );
      const table = /** @type {HTMLTableElement?} */ (
        document.getElementById('table--payroll-table')
      );
      if (!(daysWorked && dailyRate && deductionAmount && table))
        throw new Error('Something went wrong');

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
    .getElementById('form--delete-entry')
    ?.addEventListener('submit', (ev) => {
      ev.preventDefault();

      const deleteLineNumber = /** @type {HTMLInputElement?} */ (
        document.getElementById('delete-line-number')
      );
      const table = /** @type {HTMLTableElement?} */ (
        document.getElementById('table--payroll-table')
      );
      if (!(table && deleteLineNumber)) throw new Error('Something went wrong');

      const tbody = table.tBodies[0];
      const deleteLineNumber_value = Number(deleteLineNumber.value);
      if (
        deleteLineNumber_value < 0 ||
        deleteLineNumber_value > tbody.rows.length
      ) {
        throw new RangeError('Line number out of bounds.');
      }

      deleteTableRow(tbody, deleteLineNumber_value - 1);
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
