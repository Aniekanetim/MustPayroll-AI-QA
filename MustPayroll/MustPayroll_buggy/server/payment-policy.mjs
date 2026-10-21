// CONTROLLED DEFECT: notification delivery is mistaken for payment completion.
export const paymentPolicy = {
  buildVariant: 'faulty',
  deliverNotificationsAfterPayRun: true,
  selectPayableEarnings(earnings) { return earnings.filter(earning => earning.approvalStatus === 'approved'); },
  hasCompletedPayment(service, payrollDatasetId, payPeriodStartsAt, employeeId) {
    return service.db.prepare("SELECT 1 FROM notifications n JOIN payments p ON p.id=n.payment_id WHERE p.payroll_dataset_id=? AND p.period_start=? AND p.employee_id=? AND n.state='sent'").get(payrollDatasetId, payPeriodStartsAt, employeeId);
  },
  saveEmployeePayment(service, { payrollDatasetId, employeePayRunEntry, paymentId, savePaymentRecord, saveNotificationRecord }) {
    try {
      service.withTransaction(() => {
        savePaymentRecord();
        saveNotificationRecord();
      });
      service.recordAuditEvent(payrollDatasetId, 'payment_committed', employeePayRunEntry.employee_id, { paymentId, amountCents: employeePayRunEntry.amount_minor });
    } catch (error) {
      service.recordAuditEvent(payrollDatasetId, 'payment_rolled_back', employeePayRunEntry.employee_id, { reason: error.message });
    }
  },
};
