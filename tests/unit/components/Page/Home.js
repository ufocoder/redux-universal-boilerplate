import React from 'react';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import Home from 'src/components/Page/Home';

describe("<Home />", function() {
  it("contains `h2` header", function() {
    const wrapper = render(<Home />);
    expect(wrapper.find('h2').length).equal(1);
  });
});
