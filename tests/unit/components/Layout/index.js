import React from 'react';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import Layout from 'src/components/Layout';
import Header from 'src/components/Layout/Header';
import Footer from 'src/components/Layout/Footer';

describe("<Layout />", function() {
  it("contains <Header /> and <Footer /> components", function() {
    const wrapper = shallow(<Layout />);
    expect(wrapper.contains(<Header />)).to.equal(true);
    expect(wrapper.contains(<Footer />)).to.equal(true);
  });
});
