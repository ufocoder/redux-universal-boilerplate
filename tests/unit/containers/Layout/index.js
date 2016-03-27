import React from 'react';
import sinon from 'sinon';
import {shallow, mount, render} from 'enzyme';
import Layout from 'src/containers/Layout';
import Header from 'src/containers/Layout/Header';
import Footer from 'src/containers/Layout/Footer';

describe("<Layout />", function() {
  it("contains <Header /> and <Footer /> components", function() {
    const wrapper = shallow(<Layout />);
    expect(wrapper.contains(<Header />)).to.equal(true);
    expect(wrapper.contains(<Footer />)).to.equal(true);
  });
});
