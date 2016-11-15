import React from 'react';
import {mount} from 'enzyme';
import Layout from 'src/common/components/Layout';
import Header from 'src/common/components/Layout/Header';
import Footer from 'src/common/components/Layout/Footer';

describe('<Layout />', function() {
  it('contains <Header /> and <Footer /> components', function() {
    const loggedIn = true;
    const wrapper = mount(<Layout loggedIn={loggedIn} />);

    expect(wrapper.contains(<Header loggedIn={loggedIn} />)).to.equal(true);
    expect(wrapper.contains(<Footer />)).to.equal(true);
  });
});
