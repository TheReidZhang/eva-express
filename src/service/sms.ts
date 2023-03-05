import env from './env';
import twilio from 'twilio';

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_NUMBER } = env;

const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export default {
  send,
  validateAndFormat,
};

/**
 * Send a text message via Twilio service
 *
 * @to (STRING - REQUIRED): The phone number to send to
 * @message (STRING - REQUIRED): The message to send
 *
 * Twilio Response:
 * {
 *   "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
 *   "api_version": "2010-04-01",
 *   "body": "Hi there",
 *   "date_created": "Thu, 30 Jul 2015 20:12:31 +0000",
 *   "date_sent": "Thu, 30 Jul 2015 20:12:33 +0000",
 *   "date_updated": "Thu, 30 Jul 2015 20:12:33 +0000",
 *   "direction": "outbound-api",
 *   "error_code": null,
 *   "error_message": null,
 *   "from": "+14155552345",
 *   "messaging_service_sid": null,
 *   "num_media": "0",
 *   "num_segments": "1",
 *   "price": null,
 *   "price_unit": null,
 *   "sid": "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
 *   "status": "sent",
 *   "subresource_uris": {
 *     "media": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Media.json"
 *   },
 *   "to": "+14155552345",
 *   "uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json"
 * }
 *
 */
async function send({ to, message }: { to: string; message: string }) {
  try {
    const result = await twilioClient.messages.create({
      body: message,
      from: TWILIO_NUMBER,
      to: to,
    });

    return result;
  } catch (error) {
    console.log(`Sending sms from ${TWILIO_NUMBER} to ${to} with body:\n${message}\nhas failed.`, error);
    throw error;
  }
}

async function validateAndFormat(phoneNumber: string) {
  // {
  //   "calling_country_code": "1",
  //   "country_code": "US",
  //   "phone_number": "+14159929960",
  //   "national_format": "(415) 992-9960",
  //   "valid": true,
  //   "validation_errors": null,
  //   "caller_name": null,
  //   "sim_swap": null,
  //   "call_forwarding": null,
  //   "live_activity": null,
  //   "line_type_intelligence": null,
  //   "identity_match": null,
  //   "sms_pumping_risk": null,
  //   "disposable_phone_number_risk": null,
  //   "url": "https://lookups.twilio.com/v2/PhoneNumbers/+14159929960"
  // }
  try {
    const result = await twilioClient.lookups.v2.phoneNumbers(phoneNumber).fetch();
    if (result.valid)
      return {
        valid: true,
        formattedPhoneNumber: result.phoneNumber,
        errorCode: null,
      };
    else
      return {
        valid: false,
        formattedPhoneNumber: null,
        errorCode: 'Invalid Phone Number',
      };
  } catch (error) {
    console.log(`Validating phone number ${phoneNumber} has failed.`, error);
    throw error;
  }
}
