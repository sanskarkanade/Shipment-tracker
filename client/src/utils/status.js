export const SHIPMENT_STATUSES = [
  'Booked',
  'Picked Up',
  'In Transit',
  'Customs Hold',
  'Out for Delivery',
  'Delivered'
];

export const getStatusStyles = (status) => {
  switch (status) {
    case 'Booked':
      return 'bg-slate-100 text-slate-700 border-slate-200';

    case 'Picked Up':
      return 'bg-blue-50 text-blue-700 border-blue-200';

    case 'In Transit':
      return 'bg-indigo-50 text-indigo-700 border-indigo-200';

    case 'Customs Hold':
      return 'bg-amber-50 text-amber-700 border-amber-200';

    case 'Out for Delivery':
      return 'bg-orange-50 text-orange-700 border-orange-200';

    case 'Delivered':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';

    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};