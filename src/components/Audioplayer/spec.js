import React, { createClass, Children, PropTypes, Component } from 'react'
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { connect} from 'react-redux';

import TestUtils from 'react-addons-test-utils';
import { createStore } from 'redux';

import Audioplayer from './index';

// Helpers
import debug from '../../helpers/debug';

describe('component:Audioplayer', () => {
  
  class Passthrough extends Component {
    render() {
      return <Audioplayer {...this.props} />
    }
  }

  class ProviderMock extends Component {
    getChildContext() {
      return { store: this.props.store }
    }

    render() {
      return Children.only(this.props.children)
    }
  };

  ProviderMock.childContextTypes = {
    store: PropTypes.object.isRequired
  };

  it('should stop audio playback on the last Ayah', () => {

    const props = {
      surahId: 1,
      currentAyah: '7',
      onLoadAyahs: (()=>([])),
      buildOnClient: (()=>([])),
      isPlaying: false,
      isLoadedOnClient: false,
      isSupported: true,
      shouldRepeat: false,
      shouldScroll: true,
      ayahIds: [0,1,2,3,4,5,6,7,8,9],
      
      // states
      files: {}
    };
    
    const store = createStore(() => ({
      currentAyah: 7
    }));
    
    @connect()
    class Container extends Component {
      render() {
        return <Passthrough {...this.props} />
      }
    };
      
    const tree = TestUtils.renderIntoDocument(
      <ProviderMock store={store} >
        <Container {...props} />
      </ProviderMock>
    );
    
    const container = TestUtils.findRenderedComponentWithType(tree, Container);
    
    // expect(container.context.store).toBe(store);
    
  });
  
});
