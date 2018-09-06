import 'dotenv/config';
import handleOperation from './src/DataProcessor';

const data = {
  operation: 'ETC/GET_MAKE_CHAR_INFO',
};

const result = handleOperation(data.operation);
