import 'raf/polyfill';
import * as Enzyme from 'enzyme';

// eslint-disable-next-line typescript/no-var-requires
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({adapter: new Adapter()});
