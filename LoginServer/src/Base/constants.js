export const RECEIVE_OPCODES = {
  0x01: 'LOGIN_PASSWORD',
};

export const SEND_OPCODES = {
  LOGIN_STATUS: 0x00,
  SERVER_LIST: 0x0A,
  CHAR_LIST: 0x0B,
  CHAR_NAME_REQUEST: 0x0D,
  DELETE_CHAR_RESPONSE: 0x0F,
};

export const LOGIN_RESPONSE = {
  BLOCKED: 3,
  WRONG_PASSWORD: 4,
  LOGIN_NOT_FOUND: 5,
  SYSTEM_FAILURE: 6,
  ALREADY_LOGGED_IN: 7,
  CONNECTION_LIMIT_EXCEEDED: 10,
  AGE_LIMITATION: 11,
  GM_IP_RESTRICT: 13,
  GATEWAY_ERROR: 14,
  LOGIN_PROCESSING: 15,
  EMAIL_NOT_VERIFIED: 16,
  TOS: 23,
  REQUEST_DOWNLOAD: 27,
};

export const NAME_CHECK_RESPONSE = {
  AVAILABLE: 0,
  ALREADY_IN_USE: 1,
  CANNOT_BE_USED: 2,
  UNKNOWN_ERROR: 3,
};

export const CONNECTION_CONSTS = {
  UPDATE_CONNECTION: 'CONNECTION/UPDATE_CONNECTION',
};
