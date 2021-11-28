import { cartItem } from "../modules/cartItem";
import { product } from "../modules/product";


export const cartPage = ({

    cartItem : cartItem.cartItem,
    lblCartQuantity : cartItem.lblCartQuantity,
    product: product,
    btnRemove : '*[data-test^="remove-sauce-labs-"]',
    btnCheckout : '[data-test="checkout"]',

})