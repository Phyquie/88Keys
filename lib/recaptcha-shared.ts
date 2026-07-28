/**
 * The action name passed to `grecaptcha.execute` on the client and asserted
 * against the siteverify response on the server. Shared so a token minted for
 * another action can't be replayed against the booking endpoint.
 */
export const RECAPTCHA_ACTION = "booking";
