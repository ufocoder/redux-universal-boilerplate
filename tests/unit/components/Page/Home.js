import React from 'react';
import sinon from 'sinon';
import {shallow, mount, render} from 'enzyme';
import Home from 'src/common/components/Page/Home';

describe("<Home />", function() {
  it("contains logo image", function() {
    const wrapper = render(<Home />);
    expect(wrapper.find('.homepage__space__astronaut').length).equal(1);
  });
});
