// FORMATAR DATA
export function formatDate(date) {

  if (!date) return '';

  const newDate = new Date(date);

  return newDate.toLocaleDateString(
    'pt-BR',
    {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }
  );
}


// FORMATAR HORA
export function formatTime(date) {

  if (!date) return '';

  const newDate = new Date(date);

  return newDate.toLocaleTimeString(
    'pt-BR',
    {
      hour: '2-digit',
      minute: '2-digit',
    }
  );
}


// FORMATAR DATA E HORA
export function formatDateTime(date) {

  if (!date) return '';

  return `${formatDate(date)} às ${formatTime(
    date
  )}`;
}


// FORMATAR NÚMERO
export function formatNumber(number) {

  if (!number && number !== 0) return '0';

  return new Intl.NumberFormat(
    'pt-BR'
  ).format(number);
}


// FORMATAR MOEDA
export function formatCurrency(value) {

  if (!value && value !== 0) return 'R$ 0,00';

  return new Intl.NumberFormat(
    'pt-BR',
    {
      style: 'currency',
      currency: 'BRL',
    }
  ).format(value);
}


// FORMATAR TEXTO CURTO
export function truncateText(
  text,
  maxLength = 100
) {

  if (!text) return '';

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.substring(
    0,
    maxLength
  )}...`;
}


// FORMATAR RELATIVO
export function timeAgo(date) {

  if (!date) return '';

  const now = new Date();

  const past = new Date(date);

  const seconds = Math.floor(
    (now - past) / 1000
  );

  const minutes = Math.floor(
    seconds / 60
  );

  const hours = Math.floor(
    minutes / 60
  );

  const days = Math.floor(
    hours / 24
  );

  if (seconds < 60) {
    return 'Agora';
  }

  if (minutes < 60) {
    return `${minutes} min atrás`;
  }

  if (hours < 24) {
    return `${hours}h atrás`;
  }

  return `${days}d atrás`;
}