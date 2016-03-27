import React from 'react';
import sinon from 'sinon';
import {shallow, mount, render} from 'enzyme';
import About from 'src/components/Page/About';

describe("<About />", function() {
  it("contains `p` tag", function() {
    const wrapper = render(<About />);
    expect(wrapper.find('p').length).equal(1);
  });
});
