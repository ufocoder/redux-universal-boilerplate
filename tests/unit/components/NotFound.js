import React from 'react';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import NotFound from 'src/components/NotFound';

describe("<NotFound />", function() {
  it("contains `h1` header", function() {
    const wrapper = render(<NotFound />);
    expect(wrapper.find('h1').length).equal(1);
  });
});
