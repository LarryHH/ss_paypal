// MAYBE JUST GIVE HIM SANDBOX CREDS LOL
// COME UP WITH RIDDLES
// CHANGE RECIPIENT.NAME
// QR CODE

HINTTEXT = [
  decodeURIComponent(escape(atob("44Kr44Oz44Ks44Or44O844Gu6Laz44Gv6LWk44Gn44GZ44CC6Z2S44GE44OQ44Km44Oz44OG44Kj44Gv6Z2S44GE44Gn44GZ44CC44Ov44Kk44Or44OJ44OV44Op44Ov44O844Go44Ov44Kk44Oz44Gu6Kmm6aOy44KS6KaL44Gf44GE44Gn44GZ44GL77yf44GC44Gq44Gf44Gu44Gf44KB44GuMuS6uuOBruS7sumWk+OAgg=="))),
  decodeURIComponent(escape(atob("PGEgaHJlZj0naHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj04UzJmbUwxLUxwOCc+Q3JlZGl0IHdoZXJlIGNyZWRpdCBpcyBkdWUuPC9hPg=="))),
  decodeURIComponent(escape(atob("VGhlIGh1bWFuIGltbXVuZSBzeXN0ZW0gaXMgdGhlIG1vc3QgY29tcGxleCBiaW9sb2dpY2FsIHN5c3RlbSB3ZSBrbm93LCBhZnRlciB0aGUgaHVtYW4gYnJhaW4sIGFuZCB5ZXQgbW9zdCBvZiB1cyBuZXZlciBsZWFybiBob3cgaXQgd29ya3Mgb3Igd2hhdCBpdCBpcy4gWW91ciBpbW11bmUgc3lzdGVtIGNvbnNpc3RzIG9mIGh1bmRyZWRzIG9mIHRpbnktYW5kIHR3byBsYXJnZSAtb3JnYW5zLiBJdCBoYXMgaXRzIG93biB0cmFuc3BvcnQgbmV0d29yayBzcHJlYWQgdGhyb3VnaG91dCB5b3VyIGJvZHkuIEV2ZXJ5IGRheSwgaXQgbWFrZXMgaHVuZHJlZHMgb2YgYmlsbGlvbnMgb2YgZnJlc2ggY2VsbHMgb3JnYW5pc2VkIGxpa2UgYW4gYXJteS4gV2l0aCBzb2xkaWVycywgY2FwdGFpbnMsIGludGVsbGlnZW5jZSBvZmZpY2VycywgaGVhdnkgd2VhcG9ucywgYW5kIGNyYXp5IHN1aWNpZGUgYm9tYmVycy4gSXQncyBub3Qgc29tZSBzb3J0IG9mIGFic3RyYWN0IGVudGl0eS4gWW91ciBpbW11bmUgc3lzdGVtIGlzIHlvdS4gWW91ciBiaW9sb2d5IHByb3RlY3RpbmcgeW91IGZyb20gdGhlIGJpbGxpb25zIG9mIG1pY3Jvb3JnYW5pc21zIHRoYXQgd2FudCB0byBjb25zdW1lIHlvdSBhbmQgeW91ciBvd24gcGVydmVydGVkIGNlbGxzIHRoYXQgdHVybiBpbnRvIGNhbmNlci4gSXQncyBzbyBtYW5pZm9sZCB0aGF0IGl0J3MgaW1wb3NzaWJsZSB0byBjb3ZlciBpbiBvbmUgdmlkZW8sIHNvIHdlJ2xsIG1ha2UgYSBzZXJpZXMgbG9va2luZyBhdCBkaWZmZXJlbnQgYXNwZWN0cyBvZiBpdC4gVG9kYXksIHdoYXQgaGFwcGVucyB3aGVuIHlvdXIgYm9keSBpcyBpbnZhZGVkLCBhbmQgeW91ciBmaXJzdCBsaW5lcyBvZiBkZWZlbmNlcyBhcmUgZW5nYWdlZCBpbiBhIGZpZ2h0IGZvciBsaWZlIGFuZCBkZWF0aC4="))),
]

let renderedArray = [false, false, false]
const BASE_AMOUNT = 50.00

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
      index = 0;
      hint = HINTTEXT[index]
      break;
    case "buttonB":
      buttonID = '#paypalB';
      hintID = 'hintB';
      index = 1;
      hint = HINTTEXT[index]
      break;
    default:
      buttonID = '#paypalC';
      hintID = 'hintC';
      index = 2;
      hint = HINTTEXT[index]
  }

  if (renderedArray[index]) {
    return
  }
  if (purchaseIDs[index]) {
    return
  }
  else 
    renderedArray[index] = true;
  
  let total = BASE_AMOUNT * (purchaseIDs.filter(Boolean).length + 1);
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