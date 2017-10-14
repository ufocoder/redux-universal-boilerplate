import React from 'react'
import {render} from 'enzyme'
import About from 'src/common/components/Page/About'

describe('<About />', function () {
  it('contains `p` tag', function () {
    const wrapper = render(<About />)
    expect(wrapper.find('p').length).equal(1)
  })
})
