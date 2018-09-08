const organizeOffers = (offers, user) => {
  let object = [];
  let offersSend = [];
  let offersRecive = [];
  offers.forEach(element => {
    element = element.toJSON();
    if (element.id_firstUser === user.id) {
      offersSend.push(element);
    } else {
      offersRecive.push(element);
    }
    element.products.forEach(product => {
      if (product.offer_product.tb_user.id === user.id) {
        product.which = 1;
      } else {
        product.which = 0;
      }
    });
  });

  object.push({ 'offersRecive': offersRecive, 'offersSend': offersSend });

  return object;
}

module.exports = { organizeOffers }
