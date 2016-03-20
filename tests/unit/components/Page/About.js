import React from 'react';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import About from 'src/components/Page/About';

describe("<About />", function() {
  it("contains `h2` header", function() {
    const wrapper = render(<About />);
    expect(wrapper.find('h2').length).equal(1);
  });
});
