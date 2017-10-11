import 'es6-map/implement';
import 'es6-set/implement';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

let testsContext = require.context('./unit/', true, /.js$/);
testsContext.keys().forEach(testsContext);
