import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Home from './index.jsx'
import SortPopulation from '../Order/SortPopulation.jsx';
import OrderAlf from '../Order/OrderAlf.jsx';
import Paged from '../Paging/Paging.jsx';
import CountryCard from '../Country/CountryCard.jsx';

configure({adapter: new Adapter()});

describe('<Home />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper =  shallow(<Home />)
  })

  xit('deberia renderizar el componente < SortPopulation/>', () => {
    expect(wrapper.find(SortPopulation)).toHaveLength(1)
  })

  xit('deberia renderizar el componente < OrderAlf/>', () => {
    expect(wrapper.find(OrderAlf)).toHaveLength(1)
  })

  xit('deberia renderizar el componente < Paged/>', () => {
    expect(wrapper.find(Paged)).toHaveLength(1)
  })
  
  xit('deberia renderizar el componente < CountryCard/>', () => {
    expect(wrapper.find(CountryCard)).toHaveLength(1)
  })
})