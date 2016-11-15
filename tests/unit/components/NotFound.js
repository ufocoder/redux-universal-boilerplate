import React from 'react';
import {render} from 'enzyme';
import NotFound from 'src/common/components/NotFound';

describe('<NotFound />', function() {
  it('contains `h1` header', function() {
    const wrapper = render(<NotFound />);
    expect(wrapper.find('h1').length).equal(1);
  });
});
