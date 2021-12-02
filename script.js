
// PUT IN ACTUAL PAYPAL ROUTE AND TEST
// COME UP WITH RIDDLES
// QR CODE

let renderedArray = [false, false, false]

function renderPaypalButton(id) {

  let purchaseIDs = JSON.parse(localStorage.getItem("purchaseIDs"))

  let buttonID = '';
  let hintID = '';
  let hint = '';
  let index = null;
  switch(id) {
    case "buttonA":
      buttonID = '#paypalA';
      hintID = 'hintA';
      hint = atob("aGVsbG93IHdvcmxkIDE=");
      index = 0
      break;
    case "buttonB":
      buttonID = '#paypalB';
      hintID = 'hintB';
      hint = atob("aGVsbG93IHdvcmxkIDE=");
      index = 1;
      break;
    default:
      buttonID = '#paypalC';
      hintID = 'hintC';
      hint = atob("aGVsbG93IHdvcmxkIDE=");
      index = 2
  }

  if (renderedArray[index]) {
    return
  }
  if (purchaseIDs[index]) {
    return
  }
  else 
    renderedArray[index] = true;
  
  let total = 0.10 * (purchaseIDs.filter(Boolean).length + 1);
  paypal
  .Buttons({
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: total
          }
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        //alert('Transaction completed by ' + details.payer.name.given_name);
        buttonIDStrip = buttonID.substring(1)
        document.getElementById(buttonIDStrip).style.display = "none";
        document.getElementById(hintID).innerHTML = hint;
        document.getElementById(hintID).classList.add('active');
        purchaseIDs[index] = true;
        localStorage.setItem("purchaseIDs", JSON.stringify(purchaseIDs));
      });
    },
    style: {
      size: 'small',
      layout: 'horizontal',
      tagline: 'false',
      shape: 'pill',
      label: 'buynow'
    }
  }).render(buttonID);
}