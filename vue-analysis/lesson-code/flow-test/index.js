/*@flow*/

function stringify(value: mixed) {
  if (typeof  value === 'string') {
    return "" + value;
  } else {
    return '';
  }

}

stringify("foo");